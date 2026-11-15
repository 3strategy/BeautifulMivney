```csharp
using System;

class Animal
{
    public virtual string Speak() => "Animal sound";
}

class Dog : Animal
{
    public override string Speak() => "Woof!";
    public void Bark() => Console.WriteLine("Bark!");
}

class Program
{
    static void Main()
    {
        Animal pet = new Dog();

        Console.WriteLine(pet.Speak()); // Woof!
        // pet.Bark();                  // CS1061

        Dog sameDog = (Dog)pet;
        sameDog.Bark();                 // Bark!

        if (pet is Dog dog)
        {
            dog.Bark();                 // Bark!
        }
    }
}
```
