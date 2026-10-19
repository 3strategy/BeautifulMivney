---
layout: page
title: "Android topics — 01: What survives rotation?"
subtitle: "Fields, Bundle, persistent storage, and the Fragment View lifecycle"
permalink: /android/topics/01-lifecycle-state/en/
lang: en
full-width: true
tags: [Android, Java, lifecycle, Fragment]
---

[Lab map]({{ '/android/topics/' | relative_url }}) · [Hebrew version]({{ '/android/topics/01-lifecycle-state/' | relative_url }})

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

[Lab source on GitHub — Android-Lifecycle](https://github.com/3strategy/Android-Lifecycle). Open the project in Android Studio, run the experiments, and compare the code with the explanations here.

{: .box-success}
By the end of this lab, the Activity will display three counters and the Fragment will display another. Increment them, rotate the device, force stop the app, and return to it. You will be able to predict **which value survives each action**. A separate button destroys only the Fragment's View; pressing Back restores the View while the same Fragment instance remains.

## Pause and predict

You increment all three Activity counters once, then rotate the screen. What values will appear, and why? Write your prediction before opening the explanation. Then identify the field or condition in the code that supports it.

<details markdown="1">
<summary>Check your understanding</summary>

The ordinary field starts at 0 in the new Activity. The Bundle counter is restored to 1 during recreation. The preferences counter is read from storage and remains 1. Restoring state before rendering brings the correct values to the new Views.

</details>

## Starting point and predictions

Start with an **Empty Views Activity** project using Java and XML, with the package `com.example.topics`. First enable and learn View Binding below; the rest of the lab assumes that conversion is complete. The finished project is on the `main` branch of [Android-Lifecycle](https://github.com/3strategy/Android-Lifecycle). In Git Log, compare the change implementing this lab with the template baseline using View Binding. In Android Studio's **Android** view, find the files under **app > kotlin+java > com.example.topics**, **app > res > layout**, and **app > res > values**.

{% include android/view-binding-en.md namespace="com.example.topics" %}

Before writing the code, make a prediction for each row:

| Action | Ordinary Activity field | Value in `Bundle` | Value in `SharedPreferences` |
|:---|:---:|:---:|:---:|
| Rotate the screen | ? | ? | ? |
| Go to the background with `Don't keep activities`, then return | ? | ? | ? |
| Force stop and relaunch | ? | ? | ? |

The `onSaveInstanceState` Bundle restores UI state when the system recreates a component. It **is not a database** and does not promise restoration after force stopping or freshly launching the app. `SharedPreferences` supplies local data that survives the app process ending. An ordinary Java field lives only as long as its owning instance.

## Mental model: value, owner, and lifetime

When you say a value is "saved," complete the thought: **where is it stored, and who can recover it after its owner disappears?** A button increments three equal numbers, but their recovery paths differ. `memoryCount` belongs to the current Java instance; `savedCount` is copied into restoration state that Android may give to the next instance; `persistentCount` is read from a private file. The text on screen displays those values; it should not be their source of truth.

```mermaid
sequenceDiagram
    participant Old as Activity A
    participant OS as Android
    participant New as Activity B
    participant Disk as Preferences file
    Old->>Disk: apply persistent count
    Old->>OS: save small UI state in Bundle
    Note over Old: rotation destroys A
    OS->>New: onCreate(savedInstanceState)
    New->>Disk: read persistent count
    Note over New: ordinary fields start anew
    New->>New: restore state, then render
```

Follow one number, such as 2, through the diagram. It does not move automatically between fields in two instances: the code reads it from the Bundle or the file. After force stopping and freshly launching the app, the file path remains, but you must not assume Android supplies the old task's Bundle. These are different experiments.

A Fragment also has **two lifetimes**: the object holding `count`, and the View tree displaying it. Detaching and returning through the back stack can destroy and recreate the tree without replacing the object. The old binding references the destroyed tree, so clear it. Do not reset `count` in `onCreateView`: creating a display is not a request to erase the data. The [Android Fragment lifecycle documentation](https://developer.android.com/guide/fragments/lifecycle) defines the View lifecycle separately.

{: .box-note}
When reading a callback, ask: who calls me, and which resource is valid now? Android calls `onCreateView`, where you can create a binding. Android calls `onDestroyView`, after which you must not use that binding. `renderCount` is our own method, so we are responsible for calling it only while a View exists.

## Build the experiment

New files are shown in full. For an existing file, a `diff` excerpt shows only the changed region: remove `-` lines, add `+` lines, and keep context lines. Do not delete template code omitted from the excerpt. The `⁞` marker represents omitted context; do not type it into Java.

### 1. Display strings

In **app > res > values > strings.xml**, add these strings. The numbered format placeholders receive values through `getString`.

```diff
 <resources>
     <string name="app_name">topics</string>
+    <string name="lifecycle_intro">Tap Increment, rotate the device, then force stop and relaunch. Which values survive?</string>
+    <string name="memory_value">Activity field: %1$d</string>
+    <string name="saved_value">Saved Bundle: %1$d</string>
+    <string name="persistent_value">SharedPreferences: %1$d</string>
+    <string name="increment">Increment all three</string>
+    <string name="reset">Reset counters</string>
+    <string name="fragment_intro">Fragment view lifecycle (watch LifecycleDemo in Logcat)</string>
+    <string name="fragment_value">Fragment saved count: %1$d</string>
+    <string name="fragment_increment">Increment Fragment</string>
+    <string name="detach_view">Destroy Fragment View (press Back to restore)</string>
 </resources>
```

### 2. The Fragment's View

Create `fragment_lifecycle.xml` under **app > res > layout**. The last button temporarily detaches the Fragment; Back attaches it again. This reveals a new View lifecycle **without creating a new Fragment instance**.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/fragment_intro" />

    <TextView
        android:id="@+id/fragment_value"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <Button
        android:id="@+id/fragment_increment"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/fragment_increment" />

    <Button
        android:id="@+id/detach_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/detach_view" />
</LinearLayout>
```

### 3. The Fragment class

Under **app > kotlin+java > com.example.topics**, create a Java class named `LifecycleFragment`. It stores `count` in a field and also copies it into a Bundle for system restoration. The binding refers **only to the current View**: create it in `onCreateView` and clear it in `onDestroyView` so the Fragment does not retain a destroyed View tree.

```java
package com.example.topics;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.topics.databinding.FragmentLifecycleBinding;

/** Demonstrates that a Fragment and its View have separate lifetimes. */
public final class LifecycleFragment extends Fragment {
    private static final String TAG = "LifecycleDemo";
    private static final String SAVED_COUNT = "fragment_count";

    private FragmentLifecycleBinding binding;
    private int count;

    /**
     * Creates the current View tree; the Fragment object may already exist.
     *
     * @param inflater creates Views using the host theme
     * @param container parent used for layout parameters; do not attach yet
     * @param savedInstanceState prior UI state, or null on a fresh creation
     * @return the root of this new View tree
     */
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        Log.d(TAG, "Fragment " + System.identityHashCode(this) + " onCreateView");
        // The manager attaches the root; attaching here would attach it twice.
        binding = FragmentLifecycleBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    /**
     * Restores the counter and connects actions after the current binding exists.
     * A detach/back cycle retains the field when no saved Bundle is supplied.
     *
     * @param view the newly created root
     * @param savedInstanceState saved counter when Android restores this Fragment
     */
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Log.d(TAG, "Fragment " + System.identityHashCode(this) + " onViewCreated");
        if (savedInstanceState != null) {
            count = savedInstanceState.getInt(SAVED_COUNT);
        }
        binding.fragmentIncrement.setOnClickListener(v -> {
            count++;
            renderCount();
        });
        binding.detachView.setOnClickListener(v -> getParentFragmentManager()
                .beginTransaction()
                .detach(this)
                .addToBackStack("detached_view")
                .commit());
        renderCount();
    }

    /**
     * Copies this component's small UI counter into Android's restoration Bundle.
     * This is a restoration snapshot, not durable storage for a fresh app launch.
     *
     * @param outState destination delivered to a later restored instance
     */
    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        outState.putInt(SAVED_COUNT, count);
        super.onSaveInstanceState(outState);
    }

    /**
     * Releases references to the old View tree while the Fragment may stay alive.
     */
    @Override
    public void onDestroyView() {
        Log.d(TAG, "Fragment " + System.identityHashCode(this)
                + " onDestroyView; clearing binding");
        // The Fragment can outlive this View; release the obsolete references.
        binding = null;
        super.onDestroyView();
    }

    /**
     * Displays the Fragment counter without changing it.
     * Call only between View creation and View destruction.
     */
    private void renderCount() {
        binding.fragmentValue.setText(getString(R.string.fragment_value, count));
    }
}
```

The number from `identityHashCode(this)` identifies the Fragment instance **within the same process for this observation only**; do not persist it as a business identifier. After `detach`, Logcat shows `onDestroyView`; after Back, it shows `onCreateView` with the same number. The count remains in the `count` field even though the View and binding have been replaced.

### 4. The Activity screen

In **app > res > layout > activity_main.xml**, keep the template's `ConstraintLayout` and its `main` ID. Replace only the Hello World `TextView` with the following content. The `ScrollView` keeps the buttons accessible on small screens and in landscape. `FragmentContainerView` creates `LifecycleFragment` from `android:name`.

```diff
-    <TextView
-        android:layout_width="wrap_content"
-        android:layout_height="wrap_content"
-        android:text="Hello World!"
+    <ScrollView
+        android:layout_width="0dp"
+        android:layout_height="0dp"
         app:layout_constraintBottom_toBottomOf="parent"
         app:layout_constraintEnd_toEndOf="parent"
         app:layout_constraintStart_toStartOf="parent"
-        app:layout_constraintTop_toTopOf="parent" />
+        app:layout_constraintTop_toTopOf="parent">

+        <LinearLayout
+            android:layout_width="match_parent"
+            android:layout_height="wrap_content"
+            android:orientation="vertical"
+            android:padding="24dp">
+
+            <TextView
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="@string/lifecycle_intro"
+                android:textSize="18sp" />
+
+            <TextView
+                android:id="@+id/memory_value"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="24dp"
+                tools:text="Activity field: 0" />
+
+            <TextView
+                android:id="@+id/saved_value"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="8dp"
+                tools:text="Saved Bundle: 0" />
+
+            <TextView
+                android:id="@+id/persistent_value"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="8dp"
+                tools:text="SharedPreferences: 0" />
+
+            <Button
+                android:id="@+id/increment"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="16dp"
+                android:text="@string/increment" />
+
+            <Button
+                android:id="@+id/reset"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:text="@string/reset" />
+
+            <androidx.fragment.app.FragmentContainerView
+                android:id="@+id/lifecycle_fragment"
+                android:name="com.example.topics.LifecycleFragment"
+                android:layout_width="match_parent"
+                android:layout_height="wrap_content"
+                android:layout_marginTop="32dp" />
+        </LinearLayout>
+    </ScrollView>
```

`tools:text` affects only Android Studio's design preview; runtime values come from `renderCounts`. `android:name` is the Fragment's fully qualified class name, so a typo can cause a crash during layout inflation.

### 5. Three ways to preserve state in MainActivity

In **app > kotlin+java > com.example.topics > MainActivity**, add the import, constants, and fields. We deliberately do not restore `memoryCount`: it is the experiment's control. Restore `savedCount` from `savedInstanceState`, and load `persistentCount` from local storage.

```diff
 package com.example.topics;

+import android.content.SharedPreferences;
 import android.os.Bundle;
 ⁞
 public class MainActivity extends AppCompatActivity {
+    private static final String PREFS = "lifecycle_demo";
+    private static final String SAVED_COUNT = "saved_count";
+    private static final String PERSISTENT_COUNT = "persistent_count";
+
     private ActivityMainBinding binding;
+    private int memoryCount;
+    private int savedCount;
+    private int persistentCount;
+    private SharedPreferences preferences;
```

Inside `onCreate`, after the existing `ViewCompat.setOnApplyWindowInsetsListener(...)` call, add the reads, listeners, and initial rendering below. If your template places `return insets;` on the same line as `setPadding`, separate them into two lines; the behavior stays the same.

```java
        preferences = getSharedPreferences(PREFS, MODE_PRIVATE);
        persistentCount = preferences.getInt(PERSISTENT_COUNT, 0);
        if (savedInstanceState != null) {
            savedCount = savedInstanceState.getInt(SAVED_COUNT);
        }
        binding.increment.setOnClickListener(v -> {
            memoryCount++;
            savedCount++;
            persistentCount++;
            // Persist the model value, never the formatted TextView text.
            preferences.edit().putInt(PERSISTENT_COUNT, persistentCount).apply();
            renderCounts();
        });
        binding.reset.setOnClickListener(v -> {
            memoryCount = 0;
            savedCount = 0;
            persistentCount = 0;
            preferences.edit().remove(PERSISTENT_COUNT).apply();
            renderCounts();
        });
        renderCounts();
```

`apply()` updates the in-memory preferences immediately and writes the file asynchronously. For the experiment, press the button and allow the preferences write to complete before force stopping the app; displaying the new value alone does not prove the disk write has finished. At the end of the class, add the temporary-state save callback and rendering method. Calling `super.onSaveInstanceState` also allows Android to save supported View state.

```java
    /**
     * Copies this component's small UI counter into Android's restoration Bundle.
     * This is a restoration snapshot, not durable storage for a fresh app launch.
     *
     * @param outState destination delivered to a later restored instance
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        outState.putInt(SAVED_COUNT, savedCount);
        super.onSaveInstanceState(outState);
    }

    /**
     * Displays the three counters from their owning state.
     * Rendering does not increment, restore, or write any counter.
     */
    private void renderCounts() {
        binding.memoryValue.setText(getString(R.string.memory_value, memoryCount));
        binding.savedValue.setText(getString(R.string.saved_value, savedCount));
        binding.persistentValue.setText(getString(R.string.persistent_value, persistentCount));
    }
```

Build and run the app. If `binding.increment` or `FragmentLifecycleBinding` is unresolved, check that the XML files are saved, the IDs match, and Gradle Sync/Build has completed.

Add this Javadoc above the existing `@Override` for `onCreate`. Do not replace the method body or remove the template's window-inset handling:

```java
    /**
     * Creates the current Activity View tree and connects the screen's actions.
     *
     * @param savedInstanceState prior small UI snapshot, or null for a fresh launch
     */
```

## Test your predictions

1. Press **Increment all three** twice and **Increment Fragment** once. All Activity counters should display 2; the Fragment counter should display 1.
2. Rotate the device. The ordinary Activity field returns to 0; the Bundle and SharedPreferences counters remain 2; the Fragment counter remains 1 through its saved Bundle.
3. Press **Destroy Fragment View**, then device Back. Filter Logcat by `LifecycleDemo`: you should see `onDestroyView` followed by `onCreateView` with the same instance number. The Fragment counter remains 1. This distinguishes the Fragment's lifetime from its View's lifetime.
4. Enable **Don't keep activities** in Developer options. Go to the home screen, then return through Recent apps. Check all three counters again. Disable the option afterward. The result may differ if Android starts a new task rather than restoring the previous one.
5. **Force stop** the app through its settings, then launch it from its icon. Only the SharedPreferences counter should remain 2. Clear app data only if you want a completely fresh experiment.

The following table uses a separate starting example in which every counter has been incremented once:

| Observation in the example project | Activity field | `Bundle` | `SharedPreferences` | Fragment counter |
|:---|:---:|:---:|:---:|:---:|
| After rotation, starting from 1 | 0 | 1 | 1 | 1 |
| After force stop and relaunch | 0 | 0 | 1 | 0 |

{: .box-note}
Rotation creates a new Activity, so ordinary fields start anew. `savedInstanceState` can restore an Activity after process death **when Android restores the same task**; it is not persistent storage. Force stopping and freshly launching the app does not use that restoration path. A long-lived source of truth belongs in suitable storage, not only in a View or Fragment field.

## Check your understanding

1. What happens to the Fragment counter if you remove `outState.putInt` and rotate? Why can Back after `detach` still preserve it?
2. Why does `binding = null` belong in `onDestroyView` rather than `onDestroy`?
3. If you stored `savedCount` in SharedPreferences, what kind of state would become persistent? Is that always appropriate for a temporary screen draft?

## Companion example: a typical Fragments implementation

The [3strategy/fragments repository](https://github.com/3strategy/fragments) demonstrates a simple Java/XML implementation: one Activity, a display container, and three screens — Home, Dashboard, and Notifications — selected through bottom navigation. Compare it with the lifecycle lab: here we destroy and recreate a View, while the companion example replaces the displayed Fragment.

[Detailed callback map: who calls each method, and when?](#lifecycle-callbacks)

## More about controlling Fragments

<details markdown="1" id="fragment-control">
<summary>Fragment control: creation, replacement, Back, saved state, and the View lifecycle</summary>

The questions below are adapted from the [Android-Lifecycle Q&A document](https://github.com/3strategy/Android-Lifecycle/blob/main/QuestionsAndAnswers.md). The first three concern this lab; the last two concern the companion **Fragments** project. These excerpts explain existing code and are not additional implementation steps.

### 1. How does Back reattach the Fragment without an explicit attach() call?

**Back reverses the transaction recorded by FragmentManager**

The key is `.addToBackStack("detached_view")` in `LifecycleFragment.onViewCreated()` in [`LifecycleFragment.java`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/java/com/example/topics/LifecycleFragment.java):

```java
binding.detachView.setOnClickListener(v -> getParentFragmentManager()
        .beginTransaction()
        .detach(this)
        .addToBackStack("detached_view")
        .commit());
```

`getParentFragmentManager()` returns this Fragment's owning manager. `beginTransaction()` starts a transaction: a group of operations on Fragments. `detach(this)` requests detachment of the View, and `addToBackStack(...)` records the transaction on the back stack. `commit()` schedules execution; it does not guarantee the transaction has already run by the next line. The string `"detached_view"` names the back-stack entry; it is not a method name or a callback.

When the user presses device Back, AndroidX's built-in Back handling pops the top fragment transaction. Popping reverses its operations: the reverse of `detach(this)` is to attach that fragment again. The manager performs that operation internally, so this project does not need its own Back listener or an explicit `attach()` call. See the Android documentation on [fragment back-stack handling](https://developer.android.com/guide/fragments/fragmentmanager) and [fragment transactions](https://developer.android.com/guide/fragments/transactions).

The experiment follows this sequence:

1. The fragment and its view are visible.
2. **Destroy Fragment View** runs the detach transaction. The view is destroyed, but the fragment object remains managed by `FragmentManager`.
3. `onDestroyView()` clears `binding`, releasing this fragment's references to the old view tree.
4. Back pops the transaction and reverses the detach.
5. `onCreateView()` creates a new view tree and binding. `onViewCreated()` reconnects the listeners and calls `renderCount()`.

The relevant cleanup in this project's `onDestroyView()` is:

```java
binding = null;
super.onDestroyView();
```

The new view is created in `onCreateView()`:

```java
binding = FragmentLifecycleBinding.inflate(inflater, container, false);
return binding.getRoot();
```

During a simple detach/Back cycle, with no activity recreation or process death, the same fragment object survives. Its `count` field therefore survives too. Clearing `binding` does not clear `count`; `renderCount()` displays that field through the new binding. The instance numbers logged by this class let you compare the fragment identity before and after the cycle.

If Android recreates the component, retaining the old Java object is no longer the explanation. This project also saves `count` in `onSaveInstanceState()` and reads it in `onViewCreated()` when a saved bundle is supplied.

Without `addToBackStack(...)`, Back would not undo this detach automatically. Explicit reattachment would then require another transaction using `attach(fragment)`. Also, the transaction operation `detach()` is distinct from the lifecycle callback `onDetach()`; destroying the fragment's view does not mean destroying the fragment object or disconnecting it from its activity. See [attaching and detaching fragments](https://developer.android.com/guide/fragments/transactions#attaching-and-detaching-fragments).

### 2. Is the XML declaration enough to display the Fragment?

**XML declares the fragment, and MainActivity inflates and displays the layout**

There is no explicit fragment-add transaction in [`MainActivity.java`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/java/com/example/topics/MainActivity.java). The declaration in [`activity_main.xml`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/res/layout/activity_main.xml) selects the fragment class and its container:

```xml
<androidx.fragment.app.FragmentContainerView
    android:id="@+id/lifecycle_fragment"
    android:name="com.example.topics.LifecycleFragment"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="32dp" />
```

`android:name` is the important part for automatic fragment creation. A `FragmentContainerView` without that attribute supplies a container, but does not select a fragment to instantiate. The ID identifies the container. AndroidX adds the declared fragment during layout inflation, or uses the fragment restored by its manager when applicable. See [adding a fragment using XML](https://developer.android.com/guide/fragments/create#add-xml).

The XML still needs to be loaded by a fragment-capable activity. This project's activity extends `AppCompatActivity`, which inherits AndroidX fragment support, and its `onCreate()` calls:

```java
super.onCreate(savedInstanceState);
EdgeToEdge.enable(this);
binding = ActivityMainBinding.inflate(getLayoutInflater());
setContentView(binding.getRoot());
```

Here, `ActivityMainBinding` is generated from `activity_main.xml` because View Binding is enabled in [`app/build.gradle.kts`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/build.gradle.kts). `inflate(...)` builds that layout, including the `FragmentContainerView`. `setContentView(...)` installs the resulting root as the activity's screen. The superclass supplies the fragment infrastructure and restoration handling.

The fragment then supplies its own UI through `LifecycleFragment.onCreateView()`. That method inflates [`fragment_lifecycle.xml`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/res/layout/fragment_lifecycle.xml) using `FragmentLifecycleBinding` and returns the root. The `false` argument to its `inflate(...)` call leaves attachment of that root to `FragmentManager`.

So the XML declaration is sufficient to specify and automatically add this fragment within the existing activity setup. The Java code is still necessary to host fragments and load/display the activity layout, but it does not need an additional `add()` or `attach()` transaction. The counter listeners, edge-to-edge setup, and window-inset listener do not select or add the fragment.

If you removed `android:name`, you would need to add the fragment through code instead. That alternative should normally add it only on a fresh creation (`savedInstanceState == null`), allowing the manager to restore it on recreation. It is an alternative to this project's XML declaration, not an extra step required by the current code.

### 3. Who calls onSaveInstanceState(), and how does the Bundle reach the new instance?
{: #saved-state-flow}

**Android requests a snapshot, your code fills it, and Android supplies it during restoration**

Android calls the activity's `onSaveInstanceState(Bundle outState)` through its lifecycle machinery. You override this callback to contribute your state; the button listeners do not call it. Android supplies `outState`, your method writes values into it, and Android retains the resulting saved state for possible recreation. See [saving activity instance state](https://developer.android.com/guide/components/activities/activity-lifecycle#save-simple-lightweight-ui-state-using-onsaveinstancestate).

In [`MainActivity.java`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/java/com/example/topics/MainActivity.java), the callback is:

```java
@Override
protected void onSaveInstanceState(Bundle outState) {
    outState.putInt(SAVED_COUNT, savedCount);
    super.onSaveInstanceState(outState);
}
```

`SAVED_COUNT` is the key `"saved_count"`. If `savedCount` is 2 when the callback runs, `putInt(...)` puts that number into the supplied bundle under that key. It does not save the activity object, the binding, or every field automatically.

`super.onSaveInstanceState(outState)` lets the inherited Android/AndroidX implementation contribute framework state, including supported view state and fragment-manager state. It is part of completing the save operation, rather than calling your override again.

#### When is the snapshot collected during rotation?

The lab uses `minSdk` 31 and `targetSdk` 37. A normal rotation that recreates the Activity follows this Activity callback sequence:

```text
Old MainActivity:
    onPause()
    onStop()
    onSaveInstanceState(outState)   <-- copy savedCount into the snapshot
    onDestroy()

New MainActivity:
    onCreate(savedInstanceState)   <-- read savedCount from the snapshot
    onStart()
    onRestoreInstanceState(...)    <-- inherited restoration; no override here
    onResume()
```

For apps targeting API 28 or later, `onSaveInstanceState()` occurs after `onStop()` when it is invoked. Older targeting rules differ. This is a rotation example, not a promise that every pause, stop, or destruction invokes saving. See the [Activity callback reference](https://developer.android.com/reference/android/app/Activity#onSaveInstanceState(android.os.Bundle)).

The new activity reads the saved value in this project's `onCreate()`:

```java
if (savedInstanceState != null) {
    savedCount = savedInstanceState.getInt(SAVED_COUNT);
}
```

`outState` means the outgoing snapshot being filled; `savedInstanceState` means the incoming saved state being read. These are parameter names, not two storage services. Restoration preserves the saved values; it does not require the exact same Java `Bundle` object to survive.

That explains this project's rotation result after two increments: `memoryCount` starts at 0 in the new activity because the code never saves it, `savedCount` becomes 2 from the bundle, and `persistentCount` becomes 2 by reading `SharedPreferences`. `renderCounts()` then displays those fields.

This project does not override `onRestoreInstanceState()`: our counter is already restored in `onCreate()`, while the inherited callback handles framework restoration.

#### Who saves and restores the Fragment?

The fragment's snapshot is coordinated by AndroidX `FragmentManager` as part of saving the host activity. It calls the fragment's `onSaveInstanceState()` and includes that fragment's saved state within the manager's state. The activity and fragment receive their own state bundles; they do not share one flat collection of custom keys. See [saving state with fragments](https://developer.android.com/guide/fragments/saving-state#savedstate).

In [`LifecycleFragment.java`](https://github.com/3strategy/Android-Lifecycle/blob/main/app/src/main/java/com/example/topics/LifecycleFragment.java), the fragment contributes its own counter:

```java
@Override
public void onSaveInstanceState(@NonNull Bundle outState) {
    outState.putInt(SAVED_COUNT, count);
    super.onSaveInstanceState(outState);
}
```

Here, `SAVED_COUNT` means `"fragment_count"`. On restoration, the manager supplies this fragment's saved bundle to its creation callbacks. This project reads the counter in `onViewCreated()`:

```java
if (savedInstanceState != null) {
    count = savedInstanceState.getInt(SAVED_COUNT);
}
```

The activity does not manually call the fragment's save method or forward its own bundle to the fragment. Also, the earlier detach/Back experiment can retain `count` in the surviving fragment object without needing a fresh saved-state callback just because its view was destroyed.

#### Is the Bundle written to a file?

The Bundle is a small restoration snapshot, not a file your code writes or permanent app storage. Android keeps saved state outside the app process so it can restore an existing task after system-initiated process death. **The snapshot must already have been collected**; killing a process does not give the app a final opportunity to run this callback. Finishing the Activity, force stopping, or dismissing the task does not replace persistent storage. Use persistent storage for values that must survive those actions. See [saved state and persistence](https://developer.android.com/topic/libraries/architecture/saving-states).

In this demo, the persistent counter is written separately on every increment:

```java
preferences.edit().putInt(PERSISTENT_COUNT, persistentCount).apply();
```

So there are two distinct triggers in the code: an increment changes the fields and requests a preferences write immediately; an Android save request copies the current `savedCount` and fragment `count` into restoration bundles later.

**Check your understanding:** after two increments, the counters display 2, but no new save request has occurred yet. Which line will put 2 into the Bundle when the callback arrives? Does killing the process now guarantee restoration of the latest value? Explain using the time at which the snapshot is collected.

### 4. How does the Fragments project display and switch screens?

**MainActivity places one of three Fragments in an empty container.** The [Fragments activity_main.xml](https://github.com/3strategy/fragments/blob/main/app/src/main/res/layout/activity_main.xml) contains a `FragmentContainerView` with the ID `fragment_container` and a bottom navigation bar. The container has no `android:name`, so [MainActivity.java](https://github.com/3strategy/fragments/blob/main/app/src/main/java/com/example/topic/MainActivity.java) chooses the Fragment in code.

After loading the Activity layout, `onCreate()` connects the navigation listener and chooses Home on first creation:

```java
binding.navView.setOnItemSelectedListener(item -> showFragment(item.getItemId()));
if (savedInstanceState == null) {
    showFragment(R.id.navigation_home);
}
```

`showFragment(...)` maps the Home, Dashboard, and Notifications menu IDs to `new HomeFragment()`, `new DashboardFragment()`, and `new NotificationsFragment()`. It then checks the class of the Fragment currently displayed in the container, replacing the screen only when the container is empty or the classes differ:

```java
Fragment current = getSupportFragmentManager()
        .findFragmentById(R.id.fragment_container);
if (current == null || current.getClass() != fragment.getClass()) {
    getSupportFragmentManager().beginTransaction()
            .setReorderingAllowed(true)
            .replace(R.id.fragment_container, fragment)
            .commit();
}
```

`getSupportFragmentManager()` accesses the manager from the Activity. `setReorderingAllowed(true)` lets it coordinate the transaction's state and lifecycle changes. `replace(...)` removes the current Fragment from the container and adds the selected one; `commit()` schedules execution. Selecting the already displayed screen does not replace it. Switching to another screen and then returning creates a new Fragment; this implementation does not retain a separate instance for each tab.

The `savedInstanceState == null` condition avoids selecting Home again during Activity recreation and lets FragmentManager restore the previously displayed Fragment.

### 5. Why do the example classes have no onCreateView(), and does Back undo a tab change?

**Each Fragment passes its layout to the superclass; tab replacements are not recorded on the back stack.** Each of the three classes has only a public no-argument constructor passing its layout resource to `Fragment`. For example, [HomeFragment.java](https://github.com/3strategy/fragments/blob/main/app/src/main/java/com/example/topic/HomeFragment.java):

```java
public class HomeFragment extends Fragment {
    public HomeFragment() {
        super(R.layout.fragment_home);
    }
}
```

The inherited `onCreateView()` implementation inflates that layout. Dashboard and Notifications use the same pattern with `fragment_dashboard` and `fragment_notifications`. Their layouts display simple screen labels, so the classes do not need View Binding or button listeners. In contrast, `LifecycleFragment` overrides `onCreateView()` to create a binding for its interactive View and clears it in `onDestroyView()`.

The replacement transactions in the Fragments project do not call `addToBackStack(...)`, so Back does not return to the previous tab. These are three peer screens selected through the navigation bar. In the lifecycle lab, we deliberately record `detach(this)` on the stack, so Back reverses the detach and recreates the View of the same managed Fragment.

**Test the distinction:** in the lifecycle lab, increment the counter, detach the View, and return with Back. In the Fragments project, switch from Home to Dashboard and press Back. Before running, predict which experiment will reverse its transaction, and identify the code call responsible.

</details>

## More detail: who triggers each lifecycle callback, and when?

<details markdown="1" id="lifecycle-callbacks">
<summary>The callback map: from onCreate and onAttach to onDestroyView and onDetach</summary>

### First distinguish an operation, a callback, and a state

**A callback is a method the framework calls when a component reaches a particular point in its lifecycle.** We override it to respond. We do not call `onCreate()` to open a screen or `onDestroyView()` to remove a View: we request an operation through the appropriate API, and Android or `FragmentManager` manages the transition and invokes the callbacks.

For example, the lab's detach button produces this chain of causes:

1. The user taps the button; our click listener runs.
2. The listener requests a `detach(this)` transaction and submits it with `commit()`.
3. When the manager executes the transaction, it lowers the Fragment's state and removes its View.
4. During that transition, `onPause()`, `onStop()`, and finally `onDestroyView()` run. Our code clears the binding in the last callback.

The operation is the request; the callback reports a stage in carrying it out. `new LifecycleFragment()` alone creates a Java object, but does not display it or run its entire lifecycle. A constructor is not `onCreate()` either.

A **state** describes where the component is now; an **event** describes a transition. AndroidX's main states are `INITIALIZED`, `CREATED`, `STARTED`, `RESUMED`, and `DESTROYED`. After `onPause()`, the component returns to `STARTED`; after `onStop()`, it returns to `CREATED`. `Lifecycle.State` has no states named `PAUSED` or `STOPPED`. Events have names such as `ON_PAUSE`; these are not methods we call in the lab. See [Lifecycle states](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State) and [Lifecycle events](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.Event).

### Activity callbacks: the host screen

This table concerns an ordinary Activity using Views, such as the lab's `MainActivity`. Some method names also appear in Fragment, but each call belongs to the object receiving it. The Activity does not need to call `fragment.onStart()` manually.

| Callback | What triggers it, and when? | What belongs here, and what should you not infer? |
|:---|:---|:---|
| `onCreate(savedInstanceState)` | Android initializes a new Activity instance: on first launch or during recreation, such as normal rotation. | Inflate the layout and binding, connect listeners, and restore small pieces of state if a Bundle exists. It runs once per instance, **not once per app installation**. Ordinary fields start afresh in the new instance. |
| `onStart()` | The Activity becomes visible, after creation or when returning from a stopped state. | Start updates needed while the screen is visible. Visibility does not necessarily mean it is the active screen for interaction. |
| `onResume()` | The Activity enters the active state for interaction, including when returning from an interruption that did not destroy it. | Resume work restricted to the active state that was paused in `onPause()`. Do not add another set of button listeners or reset counters on every return. |
| `onPause()` | The Activity leaves `RESUMED`, for example when another screen takes precedence. | Pause work that requires the active state. The screen may still be visible; this does not prove the user has left the app. Keep the callback short, without heavy file or network work. |
| `onStop()` | The Activity is no longer visible, for example after switching to another app that covers it. | Stop updates needed only for a visible screen and release resources acquired in `onStart()`. The object may remain in memory; its fields are not automatically reset. |
| `onRestart()` | A stopped Activity is returning **as the same instance**, before `onStart()`. | Respond to returning from a stopped state. This is not part of creating a new instance after rotation or process death; that path starts with `onCreate()` again. |
| `onDestroy()` | Orderly teardown of an instance, for example after `finish()` or during recreation for a configuration change. | Complete cleanup of resources belonging to the instance. This does not prove the user has finished: rotation may be about to create another screen instance. It is not guaranteed to run when the process is killed. |

Pairs help you choose the right place: a resource needed only while visible generally fits `onStart()` / `onStop()`; one needed only while active fits `onResume()` / `onPause()`. The choice depends on the resource and intended experience. You do not need to override every callback simply because it exists. See [the Activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle) and the [Activity reference](https://developer.android.com/reference/android/app/Activity).

#### What about saving and restoration?

`onSaveInstanceState(outState)` requests a restoration snapshot. It is not another name for `onPause()`, does not run on every click, and does not promise a write before shutdown. The lab targets API 28 or later, so when Activity state is saved, saving occurs after `onStop()`. Do not insert it as a mandatory step in every exit sequence: an intentional finish does not require saving for restoration of that screen.

`onRestoreInstanceState(savedInstanceState)` runs when there is saved Activity state to restore, after `onStart()` and before `onResume()`. In contrast, `onCreate()` runs even without saved state, so code there checks `savedInstanceState != null`. The lab already restores its counter in `onCreate()`; it does not need to restore that counter again in both methods. Calls to `super` allow the framework to perform its own saving and restoration too.

The [Bundle flow explanation](#saved-state-flow) follows the values between instances. In particular, **process death does not trigger a final round of callbacks**. Saving important data cannot wait for `onDestroy()`.

### Fragment callbacks: the object and its View are different

`FragmentManager` coordinates the Fragment's lifecycle according to the host's state, navigation transactions, and other limits. A Fragment cannot reach a higher state than its host permits. Moving the Activity to the background therefore affects its Fragments even without a button click inside them.

#### 1. Connecting to the host and initializing the object

**`onAttach(Context context)` — a host is now available.** This runs when the Fragment connects to its host, before `onCreate()`. It is an opportunity to obtain a dependency supplied by the host, such as an interface for communicating with the Activity. The Fragment's View tree does not exist yet; connection to an Activity is not View creation. Do not assume `requireContext()` is available in the constructor.

**`onCreate(savedInstanceState)` — initialize the Fragment itself.** This runs after attachment, as the manager brings the instance to `CREATED`. Initialize information independent of Views and read the Fragment's saved state here. This does not automatically inflate our binding. Normal rotation creates a new Fragment and invokes this method on that new instance; the lab's detach/Back cycle retains the same instance, so it does not invoke `onCreate()` again.

#### 2. Creating a new View lifecycle

**`onCreateView(inflater, container, savedInstanceState)` — build a View tree.** This runs when the manager needs the Fragment's View, both initially and after a previous View was destroyed. The lab creates `FragmentLifecycleBinding` here and returns its root. One Fragment object can pass through this callback multiple times, with a new binding each time. A Fragment returning `null` has no View lifecycle; our lab returns a View.

**`onViewCreated(view, savedInstanceState)` — the tree exists and behavior can be connected.** This runs after `onCreateView()` supplies a valid View. Connect button listeners, adapters, and observations that update the View here. The lab also reads the counter state and calls `renderCount()` here. An existing View does not mean a frame has been displayed or its final dimensions calculated; calculations requiring actual width and height must wait for layout.

A `LiveData` observation that updates Views is generally bound to `getViewLifecycleOwner()`, so it is removed when that View is destroyed. An observation bound only to the Fragment may outlive the View and reach a binding that has already been cleared. This is the practical difference between the two lifecycle owners.

**`onViewStateRestored(savedInstanceState)` — View state restoration is complete.** This runs after `onViewCreated()` and after the framework restores any previous View state, before `onStart()`. Automatic restoration may include text in an `EditText` with an ID. Complete adjustments that depend on that restored state here. The method also runs on creation without previous state, with `null`; its name does not mean there was always something to restore.

#### 3. Appearance, activity, and stepping back

| Fragment callback | What triggers it? | Meaning in this lab |
|:---|:---|:---|
| `onStart()` | The manager raises the Fragment to `STARTED`, according to its host and transaction. | Its View exists if it supplies one. Resume work intended for screen display. The state may be capped at `STARTED`, for example for an adjacent page in ViewPager2. |
| `onResume()` | The manager raises it to `RESUMED`, ready for interaction and after the relevant transition effects finish. | No need to rebuild the binding: it was created earlier. Returning without View destruction can also invoke this callback. |
| `onPause()` | The Fragment leaves `RESUMED` because of its host, navigation, or a transaction lowering its state. | Pause work intended only for the active state. This does not yet report View destruction. |
| `onStop()` | Its state drops from `STARTED` to `CREATED`, for example when the host stops or the Fragment leaves the screen. | Stop work intended for visible time. Do not clear the binding merely because of stopping; View destruction is a separate step. |

A Fragment **has no `onRestart()`**. If it returns from a stopped state within the same View lifecycle, the path is `onStart()` followed by `onResume()`. If its View was destroyed, a new View creation cycle must come first. See [the Fragment lifecycle map](https://developer.android.com/guide/fragments/lifecycle).

#### 4. Teardown: three different methods

**`onDestroyView()` — the current View lifecycle has ended.** This runs when the manager tears down the View tree, after the relevant exit effects finish. In the lab, `detach()` causes this; removal or destruction of the host can also cause it. Clear the binding and other references to the old Views here, and cancel work that is not automatically managed and might update them. The Fragment itself may retain `count` and create another View later.

**`onDestroy()` — the Fragment instance's lifecycle has ended.** This runs during orderly teardown, for example on final removal or destruction of its manager. Do not postpone View cleanup until here: `onDestroyView()` may have run much earlier. Again, process death does not guarantee this call; the name does not promise that garbage collection has already reclaimed the Java object.

**`onDetach()` — the connection to the host has ended.** This runs at the end of detachment from the host, after the preceding lifecycle steps. Release a reference to an Activity interface here if you stored one in `onAttach()`. After detachment, do not rely on obtaining an Activity or Context from the Fragment.

{: .box-warning}
**`FragmentTransaction.detach(fragment)` and `Fragment.onDetach()` are not a request/notification pair.** The lab's `detach` transaction keeps the Fragment managed in `CREATED` and destroys its View; it does not disconnect the Fragment from its host or call `onDetach()`. Reversing it creates a new View, without another `onAttach()` or `onCreate()` on that same instance. See [what attach and detach transactions mean](https://developer.android.com/guide/fragments/transactions#attaching-and-detaching-fragments).

#### 5. Saving and names you may encounter elsewhere

A Fragment also has `onSaveInstanceState(outState)`, which its manager invokes when its state needs saving. There is no Fragment callback named `onRestoreInstanceState()`; saved state is supplied to `onCreate()`, `onCreateView()`, `onViewCreated()`, and `onViewStateRestored()` at their respective stages. Choose where to read it according to the kind of information, without resetting it at every stage. [Saving Fragment state](https://developer.android.com/guide/fragments/saving-state) distinguishes fields, View state, and saved state.

Older code may use `onActivityCreated()`; it is deprecated. Do not add it to the lab: Fragment initialization belongs in `onCreate()` and View initialization in `onViewCreated()`. You may also see `onHiddenChanged()`: it reports a change to the hidden flag following `hide()` / `show()`, rather than another lifecycle stage. Those operations alone do not change the lifecycle state, so a hidden Fragment is not necessarily stopped. See the [Fragment callback reference](https://developer.android.com/reference/androidx/fragment/app/Fragment).

### Connect the names to actual actions

Each sequence below describes only the named component. Do not merge them into one list of Activity and Fragment calls: calls are coordinated between components, and animations can affect teardown timing. Saving is discussed separately because it is not mandatory on every path.

#### Opening a new Activity and a temporary interruption

```text
New Activity:
onCreate -> onStart -> onResume

Temporary interruption, without stopping:
onPause -> onResume

Home, then return (same Activity instance, not destroyed):
onPause -> onStop
onRestart -> onStart -> onResume
```

**Home is not a request to destroy the screen.** Returning to the same instance retains its fields and does not call `onCreate()` again. If Android killed the process meanwhile, or `Don't keep activities` destroyed the Activity, the "same instance" condition no longer holds; returning requires recreation. **`Don't keep activities` destroys Activities, but does not necessarily kill the app process**, so it is not a substitute for testing system-initiated process death. A window covering part of the screen may cause only a pause; opening an ordinary `Dialog` inside the Activity does not require the Activity to pause.

#### Creating a Fragment and destroying its View

```text
First Fragment display:
onAttach -> onCreate
onCreateView -> onViewCreated -> onViewStateRestored
onStart -> onResume

Destroy Fragment View (detach transaction):
onPause -> onStop -> onDestroyView

Back reverses that transaction (same Fragment instance):
onCreateView -> onViewCreated -> onViewStateRestored
onStart -> onResume

Final removal of a resumed Fragment with a View:
onPause -> onStop -> onDestroyView -> onDestroy -> onDetach
```

The last path means final removal, without retaining the Fragment on the back stack. With a replacement using `addToBackStack()`, the previous Fragment can remain managed without a View; Back can restore its View. **The word Back alone does not determine destruction or creation**: inspect which operation it reverses. In this lab it reverses detachment; the tab example has no replacement transactions on its back stack.

#### Normal rotation versus process death

During rotation that recreates the Activity, the old instance pauses, stops, saves state, and is destroyed; the new one starts at `onCreate(savedInstanceState)`. An ordinary Fragment is also restored as a new instance with a new View lifecycle. The fact that `count` survives in a field during detach therefore does not mean the field survives rotation: these are different recovery mechanisms.

During system-initiated process death, you may see no `onDestroyView()`, `onDestroy()`, or `onDetach()` at all. Restoring an existing task uses a previously collected snapshot; no callback tells an old field to "transfer yourself now." Force stopping and relaunching is a different experiment.

### Predict before looking in Logcat

For each prediction, identify **the action, the object that survives, and which Views remain valid**.

1. We increment the Fragment counter to 3, destroy its View, and return with Back. Will `onCreate()` run again? What displays 3 in the new tree?
2. We press Home and return without Activity destruction. Must button listeners be connected again? Which Activity callback runs on return but does not exist in Fragment?
3. We rotate the screen. Does `onDestroy()` prove the user is finished? Did the same Java field move into the new instance?
4. Network code started earlier tries to write through the binding after `onDestroyView()`. Does the surviving Fragment make that write valid?

<details markdown="1">
<summary>Answers and guidance for checking</summary>

1. The same instance does not receive another `onCreate()`. A new binding and View are created, and `renderCount()` displays the counter through the new binding.
2. Listeners remain connected to the existing View. The Activity receives `onRestart()` before `onStart()`; the Fragment has no `onRestart()`.
3. No to both. The old instance is destroyed for a configuration change; the value returns only if we read it from a suitable source, such as a Bundle or preferences.
4. No. The result should update state that can be rendered in a valid View, or the work/update should be canceled with the View lifecycle. Merely checking that the Fragment exists is insufficient.

The lab does not override every callback: Logcat shows only those where logging was added. **A missing log line does not prove a callback never ran.** For a focused check, set a breakpoint in the inherited implementation in Android Studio, or temporarily add logging to one callback, preserving its signature and required `super` call. Always compare the component name and instance number too; two `onCreate` lines from different instances are not two calls on the same instance.

</details>

</details>
