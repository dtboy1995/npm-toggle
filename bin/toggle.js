#!/usr/bin/env node
'use strict';

var TAOBAO = 'https://registry.npm.taobao.org/';
var NPM = 'https://registry.npmjs.org/';
var command = require('commander');
var exec = require('execa');
var colors = require('colors/safe');
command.usage(colors.green('--taobao') + ' or ' + colors.green('--npm')).version('0.0.1').option('-t, --taobao', 'set taobao regitry ').option('-n, --npm', 'set npm regitry').parse(process.argv);

var taobao = command.taobao,
    npm = command.npm;


var registry = null;

if (taobao) {
    registry = TAOBAO;
} else if (npm) {
    registry = NPM;
} else {
    command.help();
}

if (registry) {
    exec.shell('npm config set registry ' + registry).then(function () {
        console.log('npm registry has switched to ' + colors.yellow(registry));
    }).catch(console.error);
}