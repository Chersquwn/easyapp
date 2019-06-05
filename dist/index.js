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
const commander_1 = __importDefault(require("commander"));
const package_json_1 = require("./package.json");
const create_1 = __importDefault(require("./src/commands/create"));
const list_1 = __importDefault(require("./src/commands/list"));
const check_version_1 = require("./src/utils/check-version");
check_version_1.checkNodeVersion();
commander_1.default
    .version(package_json_1.version, '-v, --version')
    .command('create [name]')
    .description('create project')
    .action((name) => __awaiter(this, void 0, void 0, function* () {
    yield create_1.default(name);
}))
    .command('list')
    .description('list templates')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    yield list_1.default();
}));
commander_1.default.parse(process.argv);
if (commander_1.default.args.length < 1) {
    commander_1.default.help();
}
