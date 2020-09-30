const Employee = require('./models/employee');
const salary = require('./utils/salary');

const data = salary.loadData();
const employees = salary.setEmployeeData(data);

employees.forEach((employee) => {
    var totalPayment = 0;
    employee.days.forEach((day) => {
        totalPayment += salary.calculateDaySalary(day.name, day.initHour, day.endHour)
    })
    console.log(`The amount to pay ${employee.name} is: ${totalPayment.toFixed(2)}`)
})