class Calculator {
  constructor() {
    this.result = 0;
  }

add(...numbers) {
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        throw new Error("All inputs must be valid numbers");
    }
    this.result = numbers.reduce((sum, num) => sum + num, 0);
    return this.result;
}

  subtract(a, b) {
    this.result = a - b;
    return this.result;
  }

  multiply(a, b) {
    this.result = a * b;
    return this.result;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result = a / b;
    return this.result;
  }
//create a factorial function
factorial(n) {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * this.factorial(n - 1);
}           
//create a power function
power(base, exponent) {
  this.result = Math.pow(base, exponent);
  return this.result;
}
}