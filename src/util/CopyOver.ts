import { Templates } from './Templates';
import { writeFileSync } from 'fs';
import chalk from 'chalk';

import ReactJson from '../../templates/react/react.json';

export function CopyFiles(Template: Templates, ProjectName: string): void {
	const cwd = process.cwd();

	if (Template === Templates.REACT) {
		console.log('Copying react template to current directory...');

		writeFileSync(cwd + '/react.json', JSON.stringify(ReactJson));

		console.log(
			chalk.greenBright(
				'🎉 Successfully copied files to current directory!' +
					chalk.white(
						`\n\nThings to do now:\n\ncd ${ProjectName}\n\nnpm install\n\nnpm run dev\n\n\nHappy Coding!`
					)
			)
		);
	} else if (Template === Templates.REACT_NATIVE) {
		console.log('React native template coming soon!');
	} else if (Template === Templates.ELECTRON_REACT) {
		console.log('Electron template coming soon!');
	}
}
