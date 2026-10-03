צרו **BookListUiTest.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import androidx.test.core.app.ActivityScenario;
import androidx.test.espresso.contrib.RecyclerViewActions;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import org.junit.Test;
import org.junit.runner.RunWith;

import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;

/** A favorite belongs to a book ID, not to the ViewHolder currently on screen. */
@RunWith(AndroidJUnit4.class)
public final class BookListUiTest {
    /**
     * Checks that favorite identity survives row reuse, reload, and Activity recreation.
     * The waits cover the lab's known fake delay; production async tests need explicit idle signals.
     *
     * @throws InterruptedException if the controlled test wait is interrupted
     */
    @Test
    public void favoriteSurvivesRecyclingReloadAndRotation() throws InterruptedException {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            onView(withId(R.id.load_books)).perform(click());
            Thread.sleep(1800);
            onView(withId(R.id.book_list)).perform(
                    RecyclerViewActions.actionOnItemAtPosition(1, click()));
            Thread.sleep(250);
            onView(withText(R.string.favorite_on)).check(matches(isDisplayed()));

            onView(withId(R.id.book_list)).perform(RecyclerViewActions.scrollToPosition(20));
            onView(withId(R.id.book_list)).perform(RecyclerViewActions.scrollToPosition(1));
            onView(withText(R.string.favorite_on)).check(matches(isDisplayed()));

            onView(withId(R.id.load_books)).perform(click());
            Thread.sleep(1800);
            onView(withText(R.string.favorite_on)).check(matches(isDisplayed()));
            scenario.recreate();
            onView(withText(R.string.favorite_on)).check(matches(isDisplayed()));
        }
    }
}
```

