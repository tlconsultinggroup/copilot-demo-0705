class Employee {
    private id: number;
    private name: string;
    private position: string;
    private salary: number;

    constructor(id: number, name: string, position: string, salary: number) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    // Getter and Setter for ID
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    // Getter and Setter for Name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and Setter for Position
    public getPosition(): string {
        return this.position;
    }

    public setPosition(position: string): void {
        this.position = position;
    }

    // Getter and Setter for Salary
    public getSalary(): number {
        return this.salary;
    }

    public setSalary(salary: number): void {
        this.salary = salary;
    }

    // Method to display employee details
    public displayEmployeeDetails(): void {
        console.log(`ID: ${this.id}, Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`);
    }

    // Method to calculate bonus
    public calculateBonus(): number {
        return this.salary * 0.1;
    }
}

export default Employee;

// Example test cases
const employee = new Employee(1, 'John Doe', 'Software Engineer', 50000);
expect(employee.getPosition()).toBe('Software Engineer');
expect(employee.getSalary()).toBe(50000);
const bonus = employee.calculateBonus();
expect(bonus).toBe(5000); // Example test for bonus calculation