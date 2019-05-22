"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const os_1 = __importDefault(require("os"));
const { red } = chalk_1.default;
function generate(name, packageInfo) {
    const packageFile = path_1.default.resolve(name, 'package.json');
    const readmeFile = path_1.default.resolve(name, 'README.md');
    try {
        const data = fs_extra_1.default.readFileSync(packageFile, 'utf-8');
        const pkg = JSON.parse(data);
        pkg.name = packageInfo.name;
        pkg.version = packageInfo.version;
        pkg.description = packageInfo.description;
        pkg.author = packageInfo.author;
        pkg.license = packageInfo.license;
        pkg.repository = { type: 'git', url: packageInfo.repository };
        pkg.bugs = { url: `${packageInfo.repository}/issues` };
        pkg.homepage = `${packageInfo.repository}#readme`;
        if (pkg.module)
            pkg.module = `dist/${packageInfo.name}.mjs`;
        if (pkg['umd:main'])
            pkg['umd:main'] = `dist/${packageInfo.name}.js`;
        if (pkg.main)
            pkg.main = `dist/${packageInfo.name}.js`;
        fs_extra_1.default.writeFileSync(packageFile, JSON.stringify(pkg, null, 2), 'utf-8');
        fs_extra_1.default.writeFileSync(readmeFile, `# ${packageInfo.name}${os_1.default.EOL}${packageInfo.description}`, 'utf-8');
    }
    catch (error) {
        console.log(red(`Fail to generate: ${error.message}`));
        process.exit(1);
    }
}
exports.default = generate;
