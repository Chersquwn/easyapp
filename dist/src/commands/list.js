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
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const chalk_1 = __importDefault(require("chalk"));
const { cyan } = chalk_1.default;
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield request_promise_native_1.default.get('https://api.github.com/users/yokiyokiyoki/repos');
        const list = data.filter((item) => __awaiter(this, void 0, void 0, function* () { return item.name.includes('easyapp-template'); }));
        console.log();
        console.log(`Easyapp has ${list.length} templates: `);
        console.log();
        list.forEach((item, index) => {
            console.log(`${index}. ${cyan(item.name)}`);
        });
    });
}
exports.default = list;
