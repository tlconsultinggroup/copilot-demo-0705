class Calculator {
  // Functions for addition, subtraction, multiplication, and division
    add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error("Invalid input: both arguments must be numbers");
        }
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }       
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
    // Function to calculate the square root of a number
}   