# ioet_testJoelRivera
Programming exercise to evaluate skills 

## About the programm
This program calculate the salary of an employee based on days and hours:

### Monday - Friday
00:01 - 09:00 25 USD

09:01 - 18:00 15 USD

18:01 - 00:00 20 USD

### Saturday and Sunday
00:01 - 09:00 30 USD

09:01 - 18:00 20 USD

18:01 - 00:00 25 USD

The information about hours and name of the employee should be place on a .txt file named salries, following the syntax and format as the file located on the folder files of the project.

The programm first read the data of the file to process and transform to an array of objects of type Employee, once the data is loaded, the program will calculate the total salary to pay to each employee.

## How to run the programm
1. Install nodeJs from: https://nodejs.org/en/
2. Navigate to the project folder/files and be sure to place a _.txt_ file named _salaries.txt_
3. On a terminal go to the project folder and execute _npm i_ to update and install modules
4. Execute _npm run start_ to update and install modules

## How to run unit tests
1. On a terminal go to the project folder and execute _npm i_ to update and install modules
2. n a terminal go to the project folder and execute _npm run test_
