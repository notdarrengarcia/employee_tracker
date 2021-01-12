// const { connection, init } = require("./index");

// function viewDepartments() {
//     connection.query("SELECT employee.first_name, employee.last_name, role.title AS title FROM employee JOIN role ON employee.role_id = role.id;",
//         function (err, res) {
//             if (err)
//                 throw err;
//             console.table(res);
//             init();
//         });
// }
// exports.viewDepartments = viewDepartments;
