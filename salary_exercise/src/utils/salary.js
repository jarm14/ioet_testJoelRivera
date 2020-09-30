const fs = require('fs');
const Employee = require('../models/employee');

const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync('./files/salaries.txt');
        const dataString = dataBuffer.toString().split('\n');
        return dataString;
    } catch (e) {
        console.log(e)
        return ''
    }
}

const setEmployeeData = (data) => {
    var employees = [];
    try {
        data.forEach(element => {
            employee = new Employee(element.split('=')[0]);
            daysArray = element.split('=')[1].split(',');
            var days = [];
            var hours = [];
            daysArray.forEach(day => {
                hours = day.substring(2).split('-');
                days.push({
                    name: day.substring(0, 2),
                    initHour: hours[0],
                    endHour: hours[1],
                })
            })
            employee.setDays(days);
            employees.push(employee);
        });
    } catch (e) {
        console.log(e);
    }
    return employees;
}

const calculateHoursWorked = (valueStart, valueEnd) => {
    const initHour = new Date();
    const endHour = new Date();
    valueStart = valueStart.split(':');
    valueEnd = valueEnd.split(':');
    var totalHours = 0
    try {
        initHour.setHours(valueStart[0], valueStart[1], 0, 0);
        endHour.setHours(valueEnd[0], valueEnd[1], 0, 0);
        var diffInMilliSeconds = Math.abs(endHour - initHour) / 1000;
        totalHours = (diffInMilliSeconds / 3600);
    } catch (e) {
        console.log(e)
    }
    return totalHours;
}

const calculateDaySalary = (day, initHour, endHour) => {
    var weekday = ['MO', 'TU', 'WE', 'TH', 'FR'];
    var weekend = ['SA', 'SU']
    var totalPayment = 0;
    var hours = 0;
    if (initHour > '00:00' && initHour <= '09:00') {
        if (endHour > '09:00') {
            hours = calculateHoursWorked(initHour, '09:00');
            if (weekday.includes(day)) {
                totalPayment += (hours * 25);
            } else {
                totalPayment += (hours * 30);
            }
            totalPayment += calculateDaySalary(day, '09:01', endHour)
        } else {
            hours = calculateHoursWorked(initHour, endHour);
            if (weekday.includes(day)) {
                totalPayment += (hours * 25);
            } else {
                totalPayment += (hours * 30);
            }
        }
    } else if (initHour > '09:00' && initHour <= '18:00') {
        if (endHour > '18:00') {
            hours = calculateHoursWorked(initHour, '18:00');
            if (weekday.includes(day)) {
                totalPayment += (hours * 15);
            } else {
                totalPayment += (hours * 20);
            }
            totalPayment += calculateDaySalary(day, '18:01', endHour)
        } else {
            hours = calculateHoursWorked(initHour, endHour);
            if (weekday.includes(day)) {
                totalPayment += (hours * 15);
            } else {
                totalPayment += (hours * 20);
            }
        }
    } else if (initHour > '18:00' && (initHour < '24:00' || initHour === '00:00')) {
        if (endHour < '24:00' && endHour < initHour) {
            hours = calculateHoursWorked(initHour, '24:00');
            if (weekday.includes(day)) {
                totalPayment += (hours * 20);
                if (weekday.indexOf(day) === 4) {
                    day = weekend[0];
                } else {
                    day = weekday[weekday.indexOf(day) + 1]
                }
            } else {
                totalPayment += (hours * 25);
                if (weekend.indexOf(day) == 1) {
                    day = weekday[0]
                } else {
                    day = weekend[weekend.indexOf(day) + 1]
                }
            }
            totalPayment += calculateDaySalary(day, '00:01', endHour)
        } else {
            hours = calculateHoursWorked(initHour, endHour);
            if (weekday.includes(day)) {
                totalPayment += (hours * 20);
            } else {
                totalPayment += (hours * 25);
            }
        }
    }
    return totalPayment;
}

module.exports = {
    loadData,
    setEmployeeData,
    calculateHoursWorked,
    calculateDaySalary
}