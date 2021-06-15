import { prompt } from 'enquirer';
import { CopyFiles } from './util/CopyOver';
import { Templates } from './util/Templates';

prompt([
	{
		type: 'autocomplete',
		name: 'type',
		message: 'Choose your project type',
		choices: ['react', 'react-native', 'electron-react'],
	},
	{
		type: 'input',
		name: 'projectName',
		message: 'Name your awesome project!',
	},
]).then((answers: any) => {
	if (answers.type === 'react') {
		CopyFiles(Templates.REACT, answers.projectName);
	} else if (answers.type === 'react-native') {
		CopyFiles(Templates.REACT_NATIVE, answers.projectName);
	} else if (answers.type === 'electron-react') {
		CopyFiles(Templates.ELECTRON_REACT, answers.projectName);
	}
});
