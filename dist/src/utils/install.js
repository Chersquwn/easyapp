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
const npm_check_updates_1 = __importDefault(require("npm-check-updates"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = require("./index");
const { cyan } = chalk_1.default;
function install(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = index_1.getPackageManager();
        const root = path_1.default.resolve(name);
        const args = [];
        yield npm_check_updates_1.default.run({
            jsonUpgraded: true,
            packageManager: 'npm',
            silent: true,
            packageFile: `./${name}/package.json`
        });
        if (command === 'yarn') {
            args.push('--cwd', root);
        }
        args.push('--silent');
        try {
            cross_spawn_1.default.sync(command, args, { stdio: 'ignore', cwd: root });
        }
        catch (error) {
            console.log(`  ${cyan(command)} has failed.`);
        }
    });
}
exports.default = install;
