// Import the mysql package
const mysql = require('mysql');
const express = require("express");
const inquirer = require("inquirer");
// const cTable = require("console.table");
// const db = require("/db");



// establishing the connection between the sql and the js file
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_tracker_db',
});
exports.connection = connection;

connection.connect(async (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    init();
});


// function viewDepartments() {
//     console.log("departments")
//     connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
//         function (err, res) {
//             if (err) throw err;
//             console.table(res);
//             init();
//         })
// }



// this is to initialize the whole operation and app
function init() {
    inquirer.prompt({
        type: "list",
        name: "choice",
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

    .then(function (val) {
        switch (val.choice) {
            
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
}



//view employees and manage the functions and roles of each one
function displayEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewDepartments() {
    console.log("departments")
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
}

// more actions for the manager to do
var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role", function(err,res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].first_name);
        }
    })

    return roleArr;
}

var managersArr = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    })

    return managersArr;
}

// we are adding a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your first name?",
            name: "firstname"
        },
        {
            type: "input",
            message: "What is your last name?",
            name: "lastname"
        },
        {
            type: "list",
            message: "What is the role of the employee?",
            name: "employeeRole",
            choices: selectRole()
        },
        {
            type: "rawlist",
            message: "What is the managers name?",
            name: "choice",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: val.managerId,
            role_id: roleId
        }, function (err) {
            if (err) throw err
            console.table(val) 
            init();
        })
    })
}

function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function (err, res) {
        if (err) throw err
        console.log(res)
    inquirer.prompt([
        {
            type: "rawlist",
            name: "lastName",
            choices: function() {
                var lastName = [];
                for (var i = 0; i < res.length; i++) {
                    lastnName.push(res[i].last_name);
                }
                return lastName;
            },
            message: "What is employee's last name?",
        },
        {
            type: "rawlist",
            name: "role",
            message: "What is the new title of the employee?",
            choices: selectRole()
        },
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE?",
        {
            last_name: val.lastnName
        },
        {
            role_id: roleId
        },
        function(err){
            if (err) throw err
            console.table(val)
            init();
        })
    });
});

}

function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
        inquirer.prompt([
            {
                type: "input",
                name: "Title",
                message: "What is the title?"
            },
            {
                type: "input",
                message: "What is the annual Salary?",
                name: "Salary"
            },
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    init();
                }
            )
        });
    });
}



function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add to the database?",
            name: "addDepartment"
        },
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    })
}
