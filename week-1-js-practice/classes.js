class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    getPerimeter() {
        return 2 * (this.length + this.width);
    }
}

const rect = new Rectangle(5, 3);
const area = rect.getArea();
const perimeter = rect.getPerimeter();

console.log(`Area: ${area}`);
console.log(`Perimeter: ${perimeter}`);
