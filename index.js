// Import the mysql package
const mysql = require('mysql2');
const express = require("express");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { response } = require("express");
const { inherits } = require('util');



// establishing the connection between the sql and the js file
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_tracker_db',
});

connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    init();
});


// this is to initialize the whole operation and app
function init() {
    inquirer.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: [
            "View All Employees", 
            "View All Departments", 
            "View All Roles", 
            "View all Employees by Department", 
            "View All Employees by Manager", 
            "Add Employee", 
            "Remove Employee", 
            "Update Employee Role", 
            "Add Employee Role", 
            "Remove Roll", 
            "Add New Department", 
            "Remove Department"]
    })

    .then(function (response) {
        switch (answer.action) {
            
            case "View All Employees":
                displayEmployees();
                break;

            case "View All Departments":
                viewDepartments();
                break;
            
            case "View All Roles":
                viewRoles();
                 break;

            case "View All Employees by Department":
                displayEmByDepartment();
                break;
                
            case "View All Employees by Manager":
                displayEmByManager();
                break;

            case "View All Employees":
                displayEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employee":
                removeEmployee();
                break;
            
            case "Update Employee Role":
                updateEmRole();
                break;

            case "Add Employee Role":
                addRole();
                break;
            
            case "Remove Role":
                removeRole();
                break;

            case "Add New Department":
                addDepartmnet();
                break;

            case "Remove Department":
            removeDepartment();
            break;
        }
    })
};

// code to display employees 

function displayEmployees() {
    const emQuery = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name
    FROM rmployee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manger_id = manager.id`

    connection.connect(async (err) => {
        if (err) throw err;
        console.table(data);
        init();
    })
};

function viewDepartments() {
    const depQuery = `SELECT * FROM department`
    connection.query(depQuery, (err, data) => {
        connection.connect(async (err) => {
            if (err) throw err;
            console.table(data);
            init();
    })
}

function viewRoles() {
    const roleQuery = `SELECT * FROM role`
    connection.query(roleQuery, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
}

// finding employees

function displayEmByDepartment() {}