"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
inquirer_1.prompt([
    {
        type: 'list',
        message: 'Pick your framework',
        name: 'framework',
        choices: ['react', 'react-native', 'node'],
    },
])
    .then(function (answers) {
    console.log(answers);
});
