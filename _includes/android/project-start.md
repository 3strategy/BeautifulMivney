{% comment %}
Required: project_name. Optional: namespace, next_change, next_commit.
Include after creating/opening the starter project and before editing its code.
Example: {% include android/project-start.md project_name="TicTacMenu" namespace="com.example.tictacmenu" next_change="הוספת Activities" %}
{% endcomment %}

{: .box-warning}
**חובה לקרוא לפרויקט בדיוק `{{ include.project_name }}`**, כולל אותיות גדולות וקטנות. במסך יצירת הפרויקט כתבו שם זה בשדה **Name**.{% if include.namespace %} ודאו שבשדה **Package name** מופיע בדיוק `{{ include.namespace }}`.{% endif %} **אם התחלתם בשם אחר, צרו פרויקט חדש בשם הנכון לפני שממשיכים.** שינוי שם של פרויקט קיים עלול לקחת 30–60 דקות לתלמיד; בשלב ההתחלתי עדיף להתחיל מחדש. **לפני השינוי הראשון בקוד, הפעילו Git ושמרו Commit ראשון לפי השלבים הבאים.**

## 0. משתפים את הפרויקט ב־GitHub ושומרים את מצב ההתחלה
{: #git-start}

**לפני {{ include.next_change | default: "השינוי הראשון בקוד" }}**, שתפו את הפרויקט ב־GitHub דרך התפריט.
פעולת השיתוף מפעילה Git, שומרת **Commit** ראשון (נקודת שמירה של הקוד) ומעלה את הפרויקט ל־GitHub.

1. בסרגל העליון, ליד שם הפרויקט `{{ include.project_name }}`, בחרו **Version Control → Share Project On → GitHub…**.
2. אם נדרשת התחברות, בחרו **Log In via GitHub** והשלימו את ההתחברות בדפדפן.
3. בחלון השיתוף קראו למאגר `{{ include.project_name }}`, השאירו את שם ה־remote כ־`origin` ולחצו **Share**.
   סמנו **Private** אם המאגר מיועד לגישה מוגבלת.
4. בחלון **Add Files for Initial Commit**, ודאו שקובצי הפרויקט מסומנים, כתבו הודעה כגון `Initial {{ include.project_name }} project` ואשרו.
   השאירו את קובצי `.gitignore` שהתבנית יצרה; `build/`,‏ `.gradle/` ו־`local.properties` צריכים להישאר מחוץ ל־Commit.
5. בסיום השיתוף, פתחו את הקישור למאגר ב־GitHub וודאו שקובצי הפרויקט וה־Commit הראשון מופיעים בו.

{: .box-success}
מצב הפתיחה שמור כעת ב־Git וב־GitHub, ואפשר להתחיל לשנות את הקוד. לאחר שהשינוי נבנה ופועל בהצלחה, שמרו Commit נוסף עם הודעה שמתארת אותו{% if include.next_commit %}, למשל `{{ include.next_commit }}`{% endif %}, ובצעו **Git → Push** כדי לעדכן גם את GitHub.
