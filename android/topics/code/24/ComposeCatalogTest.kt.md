צרו **ComposeCatalogTest.kt** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```kotlin
package com.example.topics

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import org.junit.Rule
import org.junit.Test

class ComposeCatalogTest {
    @get:Rule val rule = createAndroidComposeRule<ComposeActivity>()

    /** Checks the semantic UI route and query restoration after Activity recreation. */
    @Test
    fun searchOpenAndReturn() {
        rule.onNodeWithTag("search").performTextInput("Android")
        rule.onNodeWithTag("book-b2").assertIsDisplayed().performClick()
        rule.onNodeWithText("Android Patterns").assertIsDisplayed()
        rule.onNodeWithText("Back to books").performClick()
        rule.onNodeWithTag("book-b2").assertIsDisplayed()
        rule.onNodeWithTag("book-b1").assertDoesNotExist()
        rule.activityRule.scenario.recreate()
        rule.onNodeWithTag("book-b2").assertIsDisplayed()
        rule.onNodeWithTag("book-b1").assertDoesNotExist()
    }
}
```

