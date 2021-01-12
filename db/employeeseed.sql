DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jesse", "Garcia", NULL, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mogens", "Briede", NULL, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Yasmin", "Kayce", NULL, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jana", "Garcia", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Aly", "Garcia", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sara", "Weenie", 3, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Levi", "Travieso", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ivy", "Blue", 5, 6);

SELECT * FROM employee;
