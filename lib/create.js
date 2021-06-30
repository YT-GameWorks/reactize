const fs = require("fs-extra");
const listr = require("listr");
const execa = require("execa");
const path = require("path");
const consola = require("consola");
const chalk = require("chalk");

const rootDir = path.join(__dirname, "../");
const reactDir = path.join(rootDir, "templates", "react");
const reactNativeDir = path.join(rootDir, "templates", "react-native");
const electronReactDir = path.join(rootDir, "templates", "electron-react");

const ExecTasks = new listr([
    {
        title: "copy templates",
        task: ({
            yarn,
            git,
            cwd,
            template,
            projectName,
            projectDescription,
            projectVersion,
        }) => {
            fs.mkdirSync(`${cwd}\\${projectName}`);
            fs.copy(template, `${cwd}\\${projectName}`, (err) => {
                if (err) {
                    consola.error(chalk.red(`copy failed with the ${err}`));
                } else if (!err) {
                    const PackageJson = fs.readJSONSync(
                        `${cwd}\\${projectName}\\package.json`
                    );

                    PackageJson.name = projectName;
                    PackageJson.description = projectDescription;
                    PackageJson.version = projectVersion;

                    fs.removeSync(`${cwd}\\${projectName}\\package.json`);

                    fs.writeJSONSync(
                        `${cwd}\\${projectName}\\package.json`,
                        PackageJson
                    );
                }
            });
        },
    },
    {
        title: "change into project directory",
        task: (ctx) => {
            const projectName = ctx.projectName;

            process.chdir(projectName);
        },
    },
    {
        title: "Install package dependencies with Yarn",
        task: async (ctx, task) => {
            await execa("yarn", ["install"]).catch(() => {
                ctx.yarn = false;

                task.skip(
                    "Yarn not available, install it via `npm install -g yarn`"
                );
            });
        },
    },
    {
        title: "Install package dependencies with npm",
        enabled: (ctx) => ctx.yarn === false,
        task: async () => {
            await execa("npm", ["install", "--force"]).catch((err) => {
                consola.error(
                    chalk.red(`could not install dependencies with npm: ${err}`)
                );
            });
        },
    },
    {
        title: "Initialize git repo",
        task: async (ctx, task) => {
            await execa("git", ["init"]).catch(() => {
                ctx.git = false;

                task.skip(
                    "Git not available, install it from `https://git-scm.com/downloads`"
                );
            });
        },
    },
]);

const createFiles = ({ name, description, version, type }) => {
    if (type === "react") {
        ExecTasks.run({
            yarn: true,
            git: true,
            cwd: process.cwd(),
            template: reactDir,
            projectName: name,
            projectDescription: description,
            projectVersion: version,
        })
            .then(() => {
                consola.success(
                    chalk.green(
                        `🎉 Successfully initialized a(an) ${type} app! in ${cwd}\\${name}`
                    )
                );

                console.log(
                    `Things to do now\n\n\n cd ${name}\n\nnpm run start\n\n\n🎂 Happy Coding!`
                );
            })
            .catch((err) => {
                consola.error(
                    chalk.red(`Failed to initialize the project: ${err}`)
                );
            });
    } else if (type === "react-native") {
        consola.info("react-native template coming soon!");
    } else if (type === "electron-react") {
        consola.info("electron-react template coming soon!");
    }
};

module.exports = createFiles;
