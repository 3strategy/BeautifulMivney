צרו **ComposeActivity.kt** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```kotlin
package com.example.topics

import android.os.Bundle
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

private data class Book(val id: String, val title: String)
private val books = listOf(
    Book("b1", "Ada and Algorithms"),
    Book("b2", "Android Patterns"),
    Book("b3", "Data Structures"),
    Book("b4", "Signals and Sensors")
)

class ComposeActivity : ComponentActivity() {
    /** Creates the Compose host; its content function describes UI from current state. */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { CatalogApp() }
    }
}

/** Owns this demonstration's navigation; each route describes its current UI state. */
@Composable
private fun CatalogApp() {
    val nav = rememberNavController()
    MaterialTheme {
        NavHost(navController = nav, startDestination = "books") {
            composable("books") {
                // Save a small input value, not a copied filtered list.
                var query by rememberSaveable { mutableStateOf("") }
                Column(Modifier.fillMaxSize().safeDrawingPadding().padding(24.dp)) {
                    Text("Books", style = MaterialTheme.typography.headlineMedium)
                    OutlinedTextField(
                        value = query,
                        onValueChange = { query = it },
                        label = { Text("Search titles") },
                        modifier = Modifier.fillMaxWidth().testTag("search")
                    )
                    LazyColumn {
                        items(books.filter { it.title.contains(query, ignoreCase = true) },
                            key = { it.id }) { book ->
                            // This state belongs to this row composition, not a persistent database.
                            var favorite by rememberSaveable(book.id) { mutableStateOf(false) }
                            Row(Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
                                Text(book.title, modifier = Modifier.weight(1f)
                                    .clickable { nav.navigate("book/${book.id}") }
                                    .testTag("book-${book.id}"))
                                TextButton(onClick = { favorite = !favorite }) {
                                    Text(if (favorite) "★" else "☆")
                                }
                            }
                        }
                    }
                }
            }
            composable("book/{id}") { entry ->
                val id = entry.arguments?.getString("id")
                val book = books.find { it.id == id }
                Column(Modifier.fillMaxSize().safeDrawingPadding().padding(24.dp)) {
                    Text(book?.title ?: "Book not found",
                        style = MaterialTheme.typography.headlineMedium)
                    AndroidView(
                        // Create the legacy View here; keep changing data in update.
                        factory = { context -> TextView(context) },
                        update = { view -> view.text = "Classic TextView for ID: ${book?.id ?: "?"}" },
                        modifier = Modifier.padding(vertical = 16.dp)
                    )
                    Button(onClick = { nav.popBackStack() }) { Text("Back to books") }
                }
            }
        }
    }
}
```

