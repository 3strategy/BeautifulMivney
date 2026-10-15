```cs
public class Organism
{
    private static int counter = 0;   // counts instances
    private readonly int id;          // assigned unique id
    private string name;
    private int age;

    public Organism(string name, int age)
    {
        this.id = counter++;
        this.name = name;
        this.age = age;
    }

    public string GetName() { return name; }
    public void SetName(string name) { this.name = name; }
    public int GetAge() { return age; }
    public void SetAge(int age) { this.age = age; }
    public int GetId() => id;
    public override string ToString() => $"{id}: {name}, age {age}";
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
    public void SetBreed(string value) => breed = value;
    public override string ToString() =>
        base.ToString() + $", breed {breed}";
}

// Example usage
class Program
{
    static void Main()
    {
        Dog[] kennel = new Dog[]
        {
            new Dog("Rex", 5, "Labrador"),
            new Dog("Luna", 2, "Husky"),
            new Dog("Milo", 3, "Beagle")
        };

        foreach (var dog in kennel)
            Console.WriteLine(dog);

    }
}
```
