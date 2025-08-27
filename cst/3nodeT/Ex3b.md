
---
layout: page
title: "ex3b1 שרשרת חוליות"
subtitle: "Node⟨T⟩ תרגילי codeboard 2024"
tags: []
lang: he
---



### codeboard



https://codeboard.io/projects/265187

```csharp


    הפעולה מקבלת מערך ומחזירה רשימה של איברי המערך באותו סדר

    // 1
    // build list from 1st element to last
    // add element at end
    // param : int[]
    // return : Node<Integer>
    // example:
    // param : {1,2,3,4} return : ->1->2->3->4
    public static Node<Integer> buildListFromArrForword(int[] arr){
        
        return null;
    }
    
    הפעולה מקבלת מערך ומחזירה רשימה של איברי המערך בסדר הפוך
    // 2
    // build list from last element to first
    // param : Node<Integer>
    // return : Node<Integer>
    // example:
    // param : ->1,2,3,4,5 return : ->5,4,3,2,1
    public static Node<Integer> buildReverseList(Node<Integer> lst){
        
        return null;
    }
    
    הפעולה מחזירה את אורך הרשימה
    // 3
    // List Length
    // param : Node<Integer>
    // return : int
    // example: param: ->1->2->1->4, return: 4
    // example: param: ->1->2->1, return: 3
    public static int len(Node<Integer> lst){
        
        return 0;
    }
    
    הפעולה מחזירה את מספר המופעים של האיבר המועבר כפרמטר
    // 4
    // number of occurrences of an element in a List 
    // param1 : Node<Integer>
    // param2 : int
    // return : int
    // example: param1: ->1->2->1->4, param2: 1, return: 2
    // example: param1: ->1->2->1->4, param2: 6, return: 0
    public static int count(Node<Integer> lst, int num){
        
        return 0;
    }
    
    הפעולה מחזירה את מספר האיברים שגדולים מהאיבר שאחריהם
    // 5
    // count elements greater than the one next
    // param : Node<Integer>
    // return : int
    // example: param: ->1->2->1->4->3->1, return: 3
    // example: param: ->1->2->3->4, return: 0
    public static int greaterThan(Node<Integer> lst){
        
        return 0;
    }
    
    הדפסת רשימה על פי התבנית הנתונה
    // 6
    // print List
    // param : Node<Integer>
    // print list in pattern : [1Element,2Element,....nElement]
    // example: param: ->1->2->1->4->3->1, print [1,2,1,4,3,1]
    // example: param: -> print null
    // *** println at end!
    public static void print(Node<Integer> lst){
       
        
    }

    הפעולה משנה כל איבר לאיבר המקסימלי שנמצא ברשימה לפניו
    // 7
    // change element to the max element from list begin to the element (include)
    // param : Node<Integer>
    // before: ->5->3->9->2->3->10->4->7
    // after : ->5->5->9->9->9->10->10->10
    // before: ->5
    // after : ->5
    // before: null
    // after : null
    public static void change(Node<Integer> lst){
       
    }
  
  הפעולה מוחקת כל איבר הגדול מהאיבר שלפניו
    // 8
    // delete elements greater than the previous
    // after - no element should be greather than previous
    // param : Node<Integer>
    // before: ->8->7->9->5->10->9->4->4->3->9
    // after : ->8->7->5->4->4->3
    // before: ->5
    // after : ->5
    // before: null
    // after : null
    public static void deleteGreaters(Node<Integer> lst){
       
    }




```