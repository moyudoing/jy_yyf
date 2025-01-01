import {checkFiles} from '../js/utils/fileCheck.js';

if (!checkFiles()) {
    console.error('Please ensure all required files are present');
    process.exit(1);
}

console.log('All required files are present');
