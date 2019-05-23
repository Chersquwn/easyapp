"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const generate_1 = __importDefault(require("../utils/generate"));
const download_1 = __importDefault(require("../utils/download"));
const install_1 = __importDefault(require("../utils/install"));
const utils_1 = require("../utils");
const { red, green } = chalk_1.default;
function create(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!utils_1.isValidPackageName(name))
            process.exit(1);
        utils_1.createAppDir(name);
        if (!utils_1.isSafeDirectory(name))
            process.exit(1);
        const root = path_1.default.resolve(name);
        const _a = yield utils_1.getProjectInfo(name), { template } = _a, projectInfo = __rest(_a, ["template"]);
        console.log();
        console.log();
        const spinner = ora_1.default('Downloading please wait...');
        spinner.start();
        try {
            yield download_1.default(`${template.path}#${template.version}`, `./${name}`);
        }
        catch (error) {
            console.log();
            console.log(red(`Failed to download template ${template}: ${error.message}.`));
            process.exit(1);
        }
        generate_1.default(name, projectInfo);
        spinner.succeed(`${green('Template download successfully!')}`);
        spinner.start('Installing packages. This might take a couple of minutes.');
        yield install_1.default(name);
        spinner.succeed(`${green('All packages installed successfully!')}`);
        console.log();
        console.log(green(`Success! Created ${name} at ${root}`));
        console.log();
    });
}
exports.default = create;
