DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Representative", 20000-100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Accounting Clerk", 33000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Financial Manager", 92000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Manager", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Management Analyst", 95000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Financial Advisor", 88000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Financial Analyst", 82000, 4);


SELECT * FROM role;