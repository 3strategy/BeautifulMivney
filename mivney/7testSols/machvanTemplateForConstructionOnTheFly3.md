# ניקוד שאלה 3

Below is C# Unit 4 question number 3.

* You will be grading student solutions, and rank them as we go along, **in Hebrew**.
* You will also slowly **build deduction category titles** (you can end up with **up to 11** categories, but let's not guess them in advance and try to add new ones as needed. This is how I grade).
* When something comes up that's similar to previous mistakes we can **change the category title to be broader** and fit more cases. This is why **we also have specific comments.**
* If it's totally new - then new category.
* Category titles should be in Hebrew (except run time errors like Null Reference Exception). Specific comments should be Hebrew. Only in extreme cases switch to english if the specific comment requires mixing too much english into the hebrew.

* This process is the same as we just did in a chat for question 1.

## The question

**3.1:**

⁠כתבו פעולה חיצונית Correct שתקבל את רשימה מקושרת lst ותחזיר אמת אם ניתן להרכיב סדרה חשבונית מכל ערכי החוליות שברשימה, ושקר אחרת.

* אין צורך לשמור על הרשימה.
* אין להשתמש במערך.
* ניתן להניח שיש לפחות 2 איברים ברשימה.
* יש לשים לב, סדר האיברים אינו חייב להיות תואם את סדר המספרים בסדרה החשבונית.
* זמינה לכם פעולה המכניסה מספר למקום המתאים בתוך רשימה ממויינת ומחזירה אותה:

 `public static Node<int> InsertSorted(Node<int> head, int number)`

**3.2:** מה סיבוכיות הפעולה שכתבתם בסעיף 1. נמקו.

**Here is my validated teacher solution to the question** (this can be considered score 105+). Anything close, gets a 100. Awful solutions should get a 30-40 (for the effort).

```csharp

public static bool Correct(Node<int> ls)

{

   Node<int> sorted = null;

   while (ls != null)
   {
       sorted = InsertSorted(sorted, ls.GetValue());
       ls = ls.GetNext();
   }

   ls = sorted; // ls נח לי לעבוד עם המשתנה 
   int diff = ls.GetValue() - ls.GetNext().GetValue();
   ls = ls.GetNext();

   while (ls.HasNext())
   {
       if (diff != ls.GetValue() - ls.GetNext().GetValue())
           return false;
       ls = ls.GetNext();
   }
   return true;
}
```

3.2: הסיבוכיות היא O(n²) מפני שתהליך המיון InsertSorted עצמו הוא O(n²). כל איבר יכול תיאורית לעבור על כל האיברים שקדמו לו לפני שהוא מוכנס.

* Deductions should be per mistake.
* No specific requirement regarding your response format, as I will manually grade, with 0 automation:
  * Just make it brief, almost laconic - as the students are at K11 grade, before Bagrut (bac 899271).
  * Students have my solutions and we review them in class. Therefore, both categories and specific comments should be very concise.

* Specific comments:
  * 30–90 characters, concise, almost telegram-style
  * Assume students already know your solution and class discussion
  * No pedagogy, no explanations, just the fault

If you have questions tell me, before I start pouring solutions (in handwriting) that you'll need to transcribe. **But we can begin and improve along the way.**
