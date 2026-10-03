צרו **BouncingBallView.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import java.util.concurrent.atomic.AtomicInteger;

/** A tiny game surface with one render thread while the surface is visible. */
public class BouncingBallView extends SurfaceView implements SurfaceHolder.Callback {
    private final Object positionLock = new Object();
    private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
    private final SurfaceHolder holder;
    private final AtomicInteger frames = new AtomicInteger();
    private final float radius;
    private float x = -1;
    private float y = -1;
    private float vx = 360;
    private float vy = 280;
    private boolean resumed;
    private boolean surfaceReady;
    private volatile boolean running;
    private Thread renderer;

    /**
     * Connects XML inflation to a Surface holder and sets a density-scaled radius.
     *
     * @param context View context
     * @param attrs XML attributes used by the inflater
     */
    public BouncingBallView(Context context, AttributeSet attrs) {
        super(context, attrs);
        holder = getHolder();
        radius = 28 * getResources().getDisplayMetrics().density;
        holder.addCallback(this);
        setContentDescription(getResources().getString(R.string.ball_description));
    }

    /**
     * Allows the loop to start if the Surface also exists; called on main.
     */
    public void resume() {
        resumed = true;
        startIfReady();
    }

    /**
     * Stops and joins the loop before returning; called on main.
     */
    public void pause() {
        resumed = false;
        stopRenderer();
    }

    /**
     * Marks the Surface ready and starts only if the Activity is also resumed.
     *
     * @param holder holder whose Surface became available
     */
    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        surfaceReady = true;
        startIfReady();
    }

    /**
     * Receives size changes; the loop reads the current Canvas size each frame.
     *
     * @param holder changed Surface holder
     * @param format pixel format
     * @param width current width in pixels
     * @param height current height in pixels
     */
    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) { }

    /**
     * Stops the worker before Android releases this Surface.
     *
     * @param holder holder whose Surface is being removed
     */
    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        surfaceReady = false;
        stopRenderer();
    }

    /**
     * Creates at most one renderer when both lifecycle conditions permit drawing.
     */
    private void startIfReady() {
        if (!resumed || !surfaceReady || renderer != null) return;
        running = true;
        renderer = new Thread(this::renderLoop, "ball-renderer");
        renderer.start();
    }

    /**
     * Signals the worker, wakes its sleep, and joins it before clearing its reference.
     * The main thread must never hold a lock needed by the worker while joining.
     */
    private void stopRenderer() {
        // Do not hold positionLock while joining: the renderer may need that lock to exit.
        running = false;
        Thread thread = renderer;
        if (thread == null) return;
        thread.interrupt();
        boolean interrupted = false;
        while (thread.isAlive()) {
            try {
                thread.join(); // surfaceDestroyed must wait until the worker stops touching the Surface.
            } catch (InterruptedException retry) {
                interrupted = true;
            }
        }
        if (interrupted) Thread.currentThread().interrupt();
        renderer = null;
    }

    /**
     * Advances positions by elapsed seconds and redraws the full buffer on the renderer thread.
     * Every nonnull locked Canvas is returned in finally, even if drawing fails.
     */
    private void renderLoop() {
        long previous = System.nanoTime();
        while (running) {
            long start = System.nanoTime();
            // Limit a delayed frame so a pause does not produce one huge physics jump.
            float dt = Math.min(0.05f, (start - previous) / 1_000_000_000f);
            previous = start;
            Canvas canvas = null;
            try {
                canvas = holder.lockCanvas();
                if (canvas != null) {
                    canvas.drawColor(Color.rgb(15, 25, 45)); // Redraw the full buffer each frame.
                    synchronized (positionLock) {
                        if (x < 0 || y < 0) {
                            x = canvas.getWidth() / 2f;
                            y = canvas.getHeight() / 2f;
                        }
                        x += vx * dt;
                        y += vy * dt;
                        if (x < radius || x > canvas.getWidth() - radius) {
                            vx = -vx;
                            x = Math.max(radius, Math.min(x, canvas.getWidth() - radius));
                        }
                        if (y < radius || y > canvas.getHeight() - radius) {
                            vy = -vy;
                            y = Math.max(radius, Math.min(y, canvas.getHeight() - radius));
                        }
                        paint.setColor(Color.rgb(64, 210, 244));
                        canvas.drawCircle(x, y, radius, paint);
                    }
                    // UI/test readers can observe this counter without sharing the position lock.
                    frames.incrementAndGet();
                }
            } finally {
                if (canvas != null) holder.unlockCanvasAndPost(canvas);
            }
            long elapsedMs = (System.nanoTime() - start) / 1_000_000;
            try {
                Thread.sleep(Math.max(1, 16 - elapsedMs));
            } catch (InterruptedException stopped) {
                if (!running) return;
            }
        }
    }

    /**
     * Moves the ball under a touch while sharing position access safely with the renderer.
     *
     * @param event current touch event on main
     * @return true because this View consumes the gesture
     */
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (event.getActionMasked() == MotionEvent.ACTION_DOWN) {
            synchronized (positionLock) {
                x = event.getX();
                y = event.getY();
            }
            return true;
        }
        if (event.getActionMasked() == MotionEvent.ACTION_UP) performClick();
        return true;
    }

    /**
     * Reports the completed click through the View accessibility event machinery.
     *
     * @return true because this View handles the click
     */
    @Override
    public boolean performClick() {
        super.performClick();
        return true;
    }

    /**
     * Returns a thread-safe count of frames whose drawing code ran.
     *
     * @return total rendered frame count
     */
    public int getFrameCount() { return frames.get(); }
}
```

