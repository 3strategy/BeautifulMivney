צרו **SurfaceLoopTest.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(AndroidJUnit4.class)
public class SurfaceLoopTest {
    /**
     * Checks that frames advance while resumed, stop after pause, and advance on resume.
     */
    @Test
    public void framesStopWhenActivityPausesAndResumeWhenItReturns() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            AtomicInteger count = new AtomicInteger();
            Thread.sleep(300);
            scenario.onActivity(activity -> count.set(((BouncingBallView) activity.findViewById(R.id.ball)).getFrameCount()));
            assertTrue(count.get() > 0);
            scenario.moveToState(Lifecycle.State.STARTED);
            AtomicInteger paused = new AtomicInteger();
            scenario.onActivity(activity -> paused.set(((BouncingBallView) activity.findViewById(R.id.ball)).getFrameCount()));
            Thread.sleep(200);
            scenario.onActivity(activity -> count.set(((BouncingBallView) activity.findViewById(R.id.ball)).getFrameCount()));
            assertEquals(paused.get(), count.get());
            scenario.moveToState(Lifecycle.State.RESUMED);
            Thread.sleep(250);
            scenario.onActivity(activity -> count.set(((BouncingBallView) activity.findViewById(R.id.ball)).getFrameCount()));
            assertTrue(count.get() > paused.get());
        }
    }
}
```

