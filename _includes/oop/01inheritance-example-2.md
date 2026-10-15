```csharp
Dog[] kennel = new Dog[]
{
    new Dog("Rex", 5, "Labrador"),
    new Dog("Luna", 2, "Husky"),
    new Dog("Milo", 3, "Beagle")
};

for (int i = 0; i < kennel.Length; i++)
{
    Console.WriteLine(
        $"{i}: {kennel[i]}, breed {kennel[i].GetBreed()}");
}
```
