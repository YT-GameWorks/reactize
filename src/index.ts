import { prompt } from "enquirer";
import { CopyFiles } from "./util/CopyOver";
import { Templates } from "./util/Templates";

prompt([
    {
        type: "input",
        name: "projectName",
        message: "Name your awesome project!",
    },
    {
        type: "input",
        name: "projectDescription",
        message: "enter the description of your awesome project!",
    },
    {
        type: "autocomplete",
        name: "type",
        message: "Choose your project type",
        choices: ["react", "react-native", "electron-react"],
    },
    {
        type: "confirm",
        name: "routing",
        message: "Do you want to add routing?",
    },
]).then((answers: any) => {
    if (answers.type === "react") {
        CopyFiles(
            Templates.REACT,
            answers.projectName,
            answers.projectDescription,
            false,
            false,
            false
        );
    } else if (answers.type === "react-native") {
        CopyFiles(
            Templates.REACT_NATIVE,
            answers.projectName,
            answers.projectDescription,
            false,
            false,
            false
        );
    } else if (answers.type === "electron-react") {
        CopyFiles(
            Templates.ELECTRON_REACT,
            answers.projectName,
            answers.projectDescription,
            false,
            false,
            false
        );
    }
});
