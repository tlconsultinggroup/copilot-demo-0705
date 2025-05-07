class Employee {
    private position: string;
    private salary: number;

    constructor(position: string, salary: number) {
        this.position = position;
        this.salary = salary;
    }

    // Public getter for position
    public getPosition(): string {
        return this.position;
    }

    // Public getter for salary
    public getSalary(): number {
        return this.salary;
    }

    // Method to calculate bonus
    public calculateBonus(): number {
        return this.salary * 0.1; // Example: 10% of salary as bonus
    }
}

describe('Employee', () => {
  it('should create an employee with the correct properties', () => {
    const employee = new Employee('Software Engineer', 50000);
    expect(employee.getPosition()).toBe('Software Engineer');
    expect(employee.getSalary()).toBe(50000);
  });

  it('should calculate the annual bonus correctly', () => {
    const employee = new Employee('Manager', 80000);
    const bonus = employee.calculateBonus();
    expect(bonus).toBe(8000); // Example: 10% of salary as bonus
  });
});