const fs = require("fs-extra");
const path = require("path");
const consola = require("consola");
const chalk = require("chalk");

const rootDir = path.join(__dirname, "../");
const sourceDir = path.join(rootDir, "packages");
const distDir = path.join(rootDir, "templates");

const genTemplates = ({ templateName }) => {
    if (fs.existsSync(path.join(rootDir, "templates"))) {
        fs.mkdir(path.join(rootDir, "templates"))
            .then(() => {
                fs.copy(
                    path.join(sourceDir, templateName),
                    path.join(distDir, templateName)
                )
                    .then(() => {
                        consola.success(
                            chalk.green(
                                `Successfully copied ${templateName} template to ${distDir}`
                            )
                        );
                    })
                    .catch((err) => {
                        consola.error(
                            chalk.red(`Failed to copy templates: ${err}`)
                        );
                    });
            })
            .catch((err) => {
                consola.error(
                    chalk.red(`Failed to create template dir: ${err}`)
                );
            });
    } else {
        fs.copy(
            path.join(sourceDir, templateName),
            path.join(distDir, templateName)
        )
            .then(() => {
                consola.success(
                    chalk.green(
                        `Successfully copied ${templateName} template to ${distDir}`
                    )
                );
            })
            .catch((err) => {
                consola.error(chalk.red(`Failed to copy templates: ${err}`));
            });
    }
};

genTemplates({ templateName: "react" });
genTemplates({ templateName: "electron-react" });
genTemplates({ templateName: "react-native" });
