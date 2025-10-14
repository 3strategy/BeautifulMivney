---
layout: page
title: "עבודה על FBref משופר"
subtitle: "הפניות לדאטאבייס"
tags: [אנדרואיד, Database, FBref, refernces, queries]
author: "Guy Siedes"
lang: en
---

<!-- https://chatgpt.com/g/g-p-6877d64a7b30819184c2b08610fe6be3-guyfirebasefinal/c/6878cad2-5d50-800e-8499-6db3a8fb9d88 -->


<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>




The `FBRef` utility class centralizes all your Firebase Realtime Database references for the current user, including per-year branches for Tasks, Done\_Tasks, Years, Students, Presence, and Maakav.
{: .box-note}

# FBRef Usage Guidelines

## 1. Initialize without year 

In activities where you do **not yet** know `activeYear` (e.g. `LoginActivity`), call:

```java
FBRef.getUser(refAuth.getCurrentUser());
```

This sets:

* `FBRef.uid`
* `FBRef.refTasks` → `Tasks/{uid}`
* `FBRef.refDoneTasks` → `Done_Tasks/{uid}`
* `FBRef.refYears` → `Years/{uid}`
* `FBRef.refStudents` → `Students/{uid}`
* `FBRef.refPresence` → `Presence/{uid}`
* `FBRef.refMaakav` → `Maakav/{uid}`

## 2. Initialize with year {: .box-note}

Once you have loaded `activeYear` (e.g. from `SharedPreferences`), call:

```java
FBRef.getUser(refAuth.getCurrentUser(), activeYear);
```

This will also invoke internally:

```java
FBRef.setActiveYear(activeYear);
```

which sets:

* *(Your existing pattern remains)* `FBRef.refTasks.child(String.valueOf(activeYear))` → `Tasks/{uid}/{activeYear}`
* `FBRef.refStudentsYear` → `Students/{uid}/{activeYear}`
* `FBRef.refPresenceYear` → `Presence/{uid}/{activeYear}`
* `FBRef.refMaakavYear` → `Maakav/{uid}/{activeYear}`

## 3. Using the references

### Tasks

```java
FBRef.refTasks
     .child(String.valueOf(activeYear))
     .addValueEventListener(...);
```

### Students

```java
FBRef.refStudentsYear
     .get()
     .addOnCompleteListener(...);
```

### Presence

```java
FBRef.refPresenceYear
     .addListenerForSingleValueEvent(...);
```

### Maakav

```java
FBRef.refMaakavYear
     .addValueEventListener(...);
```

## 4. Important notes {: .box-warning}

* Always call `setActiveYear(...)` **before** using any `*Year` reference.
* The overload `getUser(fbuser, activeYear)` is a convenience that does **both** initialization steps.
* If you change `activeYear` at runtime, remember to re‑invoke `setActiveYear` to update the year‑scoped refs.

---

*Last updated: July 17, 2025*
