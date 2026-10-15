```csharp
using System;

class Shape
{
    public virtual double Area() => 0.0;

    public override string ToString() => "Shape";
}

class Rectangle : Shape
{
    protected double width;
    protected double height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public override double Area() => width * height;

    public override string ToString() => $"Rectangle({width}x{height})";
}

class Square : Rectangle
{
    public Square(double side) : base(side, side) { }

    public override string ToString() => $"Square({width})";
}

class Circle : Shape
{
    private double radius;

    public Circle(double radius)
    {
        this.radius = radius;
    }

    public override double Area() => Math.PI * radius * radius;

    public override string ToString() => $"Circle({radius})";
}

class ShapesDemo
{
    static void Main()
    {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Rectangle(3, 4);
        shapes[1] = new Circle(5);
        shapes[2] = new Square(2);

        foreach (Shape s in shapes)
        {
            Console.WriteLine($"{s} area = {s.Area()}");
        }
    }
}
```
