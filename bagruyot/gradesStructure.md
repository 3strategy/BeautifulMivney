---
layout: page 
title: "מבנה ציון בגרות במדעי המחשב"
subtitle: "פירוט מבנה הציון של השאלונים"
tags: מבנה היבחנות, בגרות, חלוקת הניקוד בבגרות
lang: he
---


{: .box-note}
תרשים זה אינו כולל את 5 היחידות של פרוייקט הנדסת תוכנה

## חלוקת הניקוד בבגרות {#idGradeStructure}

[על פי מבנה בחינות חדש במדעי המחשב](https://meyda.education.gov.il/files/CSIT/newExamsStructure.pdf)


```mermaid
graph TD
    %% Global Styles
    classDef main fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef unit5 fill:#d1eaf0,stroke:#2980b9,stroke-width:2px;
    classDef split fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef exam fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef note fill:#fff,stroke:#ccc,stroke-dasharray: 5 5;

    %% Root
    Root["899580<br/>5 יח''ל"]
    class Root unit5

    %% First Level Split
    Root --- Split40["40%<br/>מבני נתונים + יח' בחירה<br/>2 יח''ל<br/>(השלמה ל-5 יח')"]
    Root --- Split60["60%<br/>יסודות<br/>(3 יח''ל)<br/>899380"]
    class Split40,Split60 split

    %% Path 1: 40% Completion
    Split40 --- Exam899271["899271<br/>בחינה"]
    class Exam899271 exam
    
    Exam899271 --- Detail271["40% מציון סופי<br/><hr/>הגשה: 40%<br/>בגרות: 60%"]
    class Detail271 note
    
    Detail271 --- Blocking["שאלון חוסם:<br/>**ציון 55 לפחות**"]
    class Blocking note

    %% Path 2: 60% (3 Units)
    Split60 --- Exam899371["899371<br/>בחינה"]
    Split60 --- Exam899373["899373<br/>מטלת ביצוע פנימית<br/>פרוייקט יוד"]
    class Exam899371,Exam899373 exam

    %% Sub-details for 899371
    Exam899371 --- Weight371["60% מ-3 יח'<br/>(36% מציון סופי)<br/><hr/>הגשה: 30%<br/>בגרות: 70%"]
    class Weight371 note

    %% Sub-details for 899373
    Exam899373 --- Weight373["40% מ-3 יח'<br/>(24% מציון סופי)"]
    class Weight373 note




```