const enquirer = require("enquirer");
const CreateFiles = require("./create");

enquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "Name your awesome project!",
        },
        {
            type: "input",
            name: "description",
            message: "enter the description of your awesome project!",
        },
        {
            type: "input",
            name: "version",
            message: "enter the version of your awesome project (semver)",
        },
        {
            type: "autocomplete",
            name: "type",
            message: "Choose your project type",
            choices: ["react", "react-native", "electron-react"],
        },
    ])
    .then((answers) => {
        CreateFiles(answers);
    });
