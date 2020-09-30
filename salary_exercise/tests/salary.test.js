const salary = require('../src/utils/salary')
const Employee = require('../src/models/employee')

test('Should load data from txt file', () => {
    var data = salary.loadData();
    expect(data).not.toBe(null || '');
})

test('Should set a list of employees', () => {
    var data = salary.loadData();
    var employees = salary.setEmployeeData(data);
    employees.forEach((employee) => {
        expect(employee).toBeInstanceOf(Employee)
        expect(employee.name).not.toBe(null || '')
        expect(employee.days).not.toBe(null || [])
    })
})

test('Should calculate difference between two hours', () => {
    var hours = salary.calculateHoursWorked('10:00', '12:00');
    expect(hours).toBe(2);

    hours = salary.calculateHoursWorked('01:00', '08:00');
    expect(hours).toBe(7);

    hours = salary.calculateHoursWorked('19:00', '23:00');
    expect(hours).toBe(4);
})

test('Should calculate amout to pay from a day', () => {
    var total = salary.calculateDaySalary('MO', '10:00', '12:00');
    expect(total).toBeCloseTo(30)

    var total = salary.calculateDaySalary('SA', '14:00', '18:00');
    expect(total).toBeCloseTo(80)

    var total = salary.calculateDaySalary('MO', '22:30', '04:00');
    expect(total).toBeCloseTo(129.58)
})