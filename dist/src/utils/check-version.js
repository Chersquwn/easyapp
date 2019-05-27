"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const chalk_1 = __importDefault(require("chalk"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const package_json_1 = require("../../package.json");
const constants_1 = require("../constants");
const { red, yellow, green } = chalk_1.default;
function checkNodeVersion() {
    if (!semver_1.default.satisfies(process.version, package_json_1.engines.node)) {
        console.log(red(`   You must upgrade node to ${package_json_1.engines.node}.x to use ${package_json_1.name}.`));
        process.exit(1);
    }
}
exports.checkNodeVersion = checkNodeVersion;
function checkPackageVersion() {
    try {
        const { body } = request_promise_native_1.default.get(constants_1.NPM_REGISTER_URL + package_json_1.name, { json: true });
        const latestVersion = JSON.parse(body.toString())['dist-tags'].latest;
        if (semver_1.default.lt(package_json_1.version, latestVersion)) {
            console.log(yellow(`    A newer version for ${package_json_1.name} is available.`));
            console.log();
            console.log(`   latest version: ${green(latestVersion)}`);
        }
    }
    catch (error) {
        console.log(red('Error' + error));
    }
}
exports.checkPackageVersion = checkPackageVersion;
