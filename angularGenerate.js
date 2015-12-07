'use strict';
var fs = require('fs');
var CodeGen = require('swagger-js-codegen-soracom').CodeGen;
var async = require('async');
var apiRoot = 'https://dev.soracom.io/jp/docs/swagger/soracom-api.ja.json';
var path = './json/default/'
var https = require('https');
var getJsonFunctions = [];
var mkdirp = require('mkdirp');
var outputDirPath = './soracom-sdk/angularjs/';
mkdirp.sync(outputDirPath);
https.get(apiRoot,function(res){
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        body += chunk;
    });
    res.on('end', function(res){
        var apiDocs = JSON.parse(body);
        apiDocs.securityDefinitions = {};
        var angularjsSourceCode = CodeGen.getAngularCode({moduleName:'soracom', className: 'SoracomSDK', swagger: apiDocs });
        fs.writeFileSync(outputDirPath + 'soracomSdk.js',angularjsSourceCode);
        console.log('soracom SDK for angular.js Generated');
    });
});
