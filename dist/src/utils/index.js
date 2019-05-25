"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const constants_1 = require("../constants");
const { red, green } = chalk_1.default;
function isSafeDirectory(projectName) {
    const projectPath = path_1.default.resolve(projectName);
    const validFiles = ['package.json', '.git'];
    const conflicts = fs_extra_1.default
        .readdirSync(projectPath)
        .filter((file) => !validFiles.includes(file));
    if (conflicts.length > 0) {
        console.log(`The directory ${green(name)} contains files that could conflict:`);
        console.log();
        for (const file of conflicts) {
            console.log(`  ${red(file)}`);
        }
        console.log();
        return false;
    }
    return true;
}
exports.isSafeDirectory = isSafeDirectory;
function isValidPackageName(name) {
    const { validForNewPackages } = validate_npm_package_name_1.default(name);
    if (!validForNewPackages) {
        console.error(`Could not create a project called ${red(`"${name}"`)} because of npm naming restrictions:`);
        return false;
    }
    return true;
}
exports.isValidPackageName = isValidPackageName;
function createAppDir(name) {
    const root = path_1.default.resolve(name);
    fs_extra_1.default.ensureDirSync(root);
}
exports.createAppDir = createAppDir;
function getPackageManager() {
    try {
        child_process_1.execSync('yarnpkg --version', { stdio: 'ignore' });
        return 'yarn';
    }
    catch (e) {
        return 'npm';
    }
}
exports.getPackageManager = getPackageManager;
function getGitAuthor() {
    let name = '';
    let email = '';
    try {
        name = child_process_1.execSync('git config --get user.name')
            .toString()
            .trim();
        email = child_process_1.execSync('git config --get user.email')
            .toString()
            .trim();
    }
    catch (e) { }
    return { name, email };
}
exports.getGitAuthor = getGitAuthor;
function getProjectInfo(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const question = getQuestion(name);
        const answers = yield inquirer_1.default.prompt(question);
        return answers;
    });
}
exports.getProjectInfo = getProjectInfo;
function getQuestion(name) {
    const author = getGitAuthor();
    const choices = Object.keys(constants_1.TEMPLATE).map((name) => ({
        name,
        value: constants_1.TEMPLATE[name]
    }));
    return [
        {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: name,
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'Project version',
            default: '0.1.0',
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Project description',
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'input',
            name: 'repository',
            message: 'Repository',
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: `${author.name} <${author.email}>`,
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'MIT',
            filter(value) {
                return value.trim();
            }
        },
        {
            type: 'list',
            name: 'template',
            message: 'Please select a template for the project',
            choices,
            default: choices[0]
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Is this ok?',
            default: true
        }
    ];
}
