```csharp
public class Organism
{
    private string name;
    private int age;

    public Organism(string name, int age)
    {
        this.name = name;
        this.age = age;
    }

    public override string ToString() => $"{name}, age {age}";
}

public class Mammal : Organism
{
    private bool hasFur;

    public Mammal(string name, int age, bool hasFur) : base(name, age)
    {
        this.hasFur = hasFur;
    }

    public bool GetHasFur() => hasFur; 
    public void SetHasFur(bool hasFur) => this.hasFur = hasFur; 
}

public class Dog : Mammal
{
    private string breed;

    public Dog(string name, int age, string breed)
        : base(name, age, true)
    {
        this.breed = breed;
    }

    public string GetBreed() => breed; 
    public void SetBreed(string breed) => this.breed = breed; 
}
```
