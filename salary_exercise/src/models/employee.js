var Employee = function (name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name;
}

Employee.prototype.getDays = function () {
    return this.days;
}

Employee.prototype.setName = function (name) {
    this.name = name;
}

Employee.prototype.setDays = function (days) {
    this.days = days;
}

module.exports = Employee; 