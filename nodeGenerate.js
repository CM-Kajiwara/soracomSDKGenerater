'use strict';
var fs = require('fs');
var CodeGen = require('swagger-js-codegen-soracom').CodeGen;
var async = require('async');
var apiRoot = 'https://dev.soracom.io/jp/docs/swagger/soracom-api.ja.json';
var path = './json/default/'
var https = require('https');
var getJsonFunctions = [];
var mkdirp = require('mkdirp');
var outputDirPath = './soracom-sdk/nodejs/';
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
        var nodejsSourceCode = CodeGen.getNodeCode({moduleName:'soracom', className: 'SoracomSDK', swagger: apiDocs });
        fs.writeFileSync(outputDirPath +  'soracomSdk.js',nodejsSourceCode);
        console.log('soracom SDK for Node.js Generated');
    });
});
