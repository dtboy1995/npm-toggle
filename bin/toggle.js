#!/usr/bin/env node
const TAOBAO = 'https://registry.npm.taobao.org/';
const NPM = 'https://registry.npmjs.org/';
const command = require('commander');
const exec = require('execa');
const colors = require('colors/safe');
command
    .usage(`${colors.green('--taobao')} or ${colors.green('--npm')}`)
    .version('0.0.1')
    .option('-t, --taobao', 'set taobao regitry ')
    .option('-n, --npm', 'set npm regitry')
    .parse(process.argv);

let { taobao, npm } = command;

let registry = null;

if (taobao) {
    registry = TAOBAO;
} else if (npm) {
    registry = NPM;
} else {
    command.help();
}

if (registry) {
    exec.shell(`npm config set registry ${registry}`)
        .then(() => {
            console.log(`npm registry has switched to ${colors.yellow(registry)}`);
        })
        .catch(console.error);
}