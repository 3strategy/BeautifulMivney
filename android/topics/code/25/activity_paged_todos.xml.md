צרו **activity_paged_todos.xml** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/main" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ScrollView android:layout_width="0dp" android:layout_height="0dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent">
        <LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content"
            android:orientation="vertical" android:padding="24dp">
            <TextView android:layout_width="match_parent" android:layout_height="wrap_content"
                android:text="@string/paged_title" android:textSize="22sp" />
            <Switch android:id="@+id/offline" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:text="@string/paged_offline" />
            <Button android:id="@+id/previous" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:text="@string/paged_prev" />
            <Button android:id="@+id/next" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:text="@string/paged_next" />
            <Button android:id="@+id/refresh" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:text="@string/paged_refresh" />
            <TextView android:id="@+id/status" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:layout_marginTop="12dp"
                android:accessibilityLiveRegion="polite" android:text="@string/paged_status" />
            <TextView android:id="@+id/items" android:layout_width="match_parent"
                android:layout_height="wrap_content" android:layout_marginTop="16dp"
                android:textSize="18sp" />
        </LinearLayout>
    </ScrollView>
</androidx.constraintlayout.widget.ConstraintLayout>
```

