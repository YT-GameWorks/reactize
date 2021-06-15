import { Templates } from './Templates';
import * as fs from 'fs-extra';
import chalk from 'chalk';

export function CopyFiles(
    Template: Templates,
    ProjectName: string,
    ProjectDescription: string,
    Router: boolean,
    Redux: boolean,
    mobx: boolean,
): void {
    const cwd = process.cwd();

    if (Template === Templates.REACT) {
        console.log('Copying react template to current directory...');

        fs.mkdirSync(cwd + `/${ProjectName}`);
        fs.copy('templates\\react', cwd + `/${ProjectName}`, (err) => {
            if (err) {
                console.log(chalk.red(`copy failed with the ${err}`));
            } else if (!err) {
                console.log(
                    chalk.greenBright(
                        '🎉 Successfully copied files to current directory!' +
                            chalk.white(
                                `\n\nThings to do now:\n\ncd ${ProjectName}\n\nnpm install\n\nnpm run dev\n\n\nHappy Coding!`,
                            ),
                    ),
                );
            }
        });
    } else if (Template === Templates.REACT_NATIVE) {
        console.log('React native template coming soon!');
    } else if (Template === Templates.ELECTRON_REACT) {
        console.log('Electron template coming soon!');
    }
}
