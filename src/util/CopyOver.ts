import { Templates } from "./Templates";

import * as path from "path";
import * as fs from "fs-extra";
import consola from "consola";
import * as chalk from "chalk";
import Listr from "listr";
import execa from "execa";

const RootDir: any = path.join(__dirname, "../", "../");
const ReactTemplatePath: any = path.join(RootDir, "templates", "react");
const ReactNativeTemplatePath: any = path.join(
    RootDir,
    "templates",
    "react-native"
);
const ElectronReactTemplatePath: any = path.join(
    RootDir,
    "templates",
    "electron-react"
);

export function CopyFiles(
    Template: Templates,
    ProjectName: string,
    ProjectDescription: string,
    ProjectVersion: string
): void {
    if (Template === Templates.REACT) {
        ExecTasks(
            ReactTemplatePath,
            ProjectName,
            ProjectDescription,
            ProjectVersion
        );
    } else if (Template === Templates.REACT_NATIVE) {
        console.log("React native template coming soon!");
    } else if (Template === Templates.ELECTRON_REACT) {
        console.log("Electron template coming soon!");
    }
}

function ExecTasks(
    template: any,
    ProjectName: string,
    ProjectDescription: string,
    ProjectVersion: string
) {
    const CreateProjectTasks = new Listr([
        {
            title: "copy templates",
            task: ({
                root,
                yarn,
                git,
            }: {
                root: string;
                yarn: boolean;
                git: boolean;
            }) => {
                fs.mkdirSync(`${process.cwd()}\\${ProjectName}`);
                fs.copy(
                    template,
                    `${process.cwd()}\\${ProjectName}`,
                    (err: any) => {
                        if (err) {
                            consola.error(
                                chalk.red(`copy failed with the ${err}`)
                            );
                        } else if (!err) {
                            process.chdir(root);

                            const PackageJson = fs.readJSONSync("package.json");

                            PackageJson.name = ProjectName;
                            PackageJson.description = ProjectDescription;
                            PackageJson.version = ProjectVersion;

                            fs.removeSync("package.json");

                            fs.writeJSONSync("package.json", PackageJson);
                        }
                    }
                );
            },
        },
        {
            title: "Install package dependencies with Yarn",
            task: async (ctx, task) => {
                await execa("yarn").catch(() => {
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
                await execa("npm", ["install"]).catch((err) => {
                    consola.error(
                        chalk.red(
                            `could not install dependencies with npm: ${err}`
                        )
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

    CreateProjectTasks.run({ root: ProjectName, yarn: true, git: true })
        .then(() => {
            consola.success(chalk.green("🎉 Successfully created a project!"));
            console.log(`\n\nThings to do now:\n\n
            cd ${ProjectName}\n\n
            npm run start
            \n\n\nHappy Coding!`);
        })
        .catch((err) => {
            consola.error(chalk.red(`failed to initialize project: ${err}`));
        });
}
