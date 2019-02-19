"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2pug = require('html2pug');
var fs = require('fs');
var jadeTranslator = (function () {
    function jadeTranslator(options) {
        this.source = '';
        this.options = options;
    }
    jadeTranslator.prototype.readFile = function () {
        var _this = this;
        this.log("Reading " + this.options.sourceFile + " file");
        fs.readFile(this.options.sourceFile, 'utf8', function (err, contents) {
            if (err)
                throw err;
            _this.log('Read correctly');
            _this.saveSource(contents);
            _this.startTranslation();
        });
    };
    jadeTranslator.prototype.saveSource = function (source) {
        this.source = source;
    };
    jadeTranslator.prototype.parseSnippet = function (snippet) {
        var snippetBodyArray = JSON.parse(snippet);
        var snippetBodyString = this.conactSnippetBody(snippetBodyArray);
        return snippetBodyString;
    };
    jadeTranslator.prototype.stringifySnippet = function (snippet) {
        var translatedSnippetArray = this.createTranslatedSnippedArray(snippet);
        var translatedSnippetString = JSON.stringify(translatedSnippetArray);
        return translatedSnippetString;
    };
    jadeTranslator.prototype.translateSingleSnippet = function (bodySnippet) {
        var parsedSnippet = this.parseSnippet(bodySnippet);
        var translatedSnippet = this.translateToPug(parsedSnippet);
        var translatedSnippetString = this.stringifySnippet(translatedSnippet);
        return translatedSnippetString;
    };
    jadeTranslator.prototype.startTranslation = function () {
        var _this = this;
        var bodySnippets = this.getBodySnippets();
        this.log("Translating " + bodySnippets.length + " phrases");
        bodySnippets.forEach(function (bodySnippet) {
            var translatedSnippet = _this.translateSingleSnippet(bodySnippet);
            var translatedSource = _this.source.replace(bodySnippet, translatedSnippet);
            _this.saveSource(translatedSource);
        });
        this.createTranslatedFile();
    };
    jadeTranslator.prototype.getBodySnippets = function () {
        var bodySnippetRegex = /(\[[\s\S]+?\])/g;
        var bodySnippets = this.source.match(bodySnippetRegex);
        return bodySnippets;
    };
    jadeTranslator.prototype.createTranslatedFile = function () {
        var _this = this;
        this.log("Creating a file with translations");
        this.createFolderForTranslated();
        fs.writeFile("./translated/" + this.options.filename, this.source, function (err) {
            if (err)
                throw err;
            _this.log('Work has been completed');
        });
    };
    jadeTranslator.prototype.createFolderForTranslated = function () {
        if (!fs.existsSync('./translated')) {
            fs.mkdirSync('./translated');
        }
    };
    jadeTranslator.prototype.translateToPug = function (snippetBody) {
        return html2pug(snippetBody, { tabs: true, fragment: true });
    };
    jadeTranslator.prototype.conactSnippetBody = function (bodyArray) {
        return bodyArray.join('');
    };
    jadeTranslator.prototype.createTranslatedSnippedArray = function (translatedSnippet) {
        return translatedSnippet.split('\n');
    };
    jadeTranslator.prototype.log = function (msg) {
        console.log(msg);
    };
    jadeTranslator.prototype.start = function () {
        this.log('Starting translating');
        this.readFile();
    };
    return jadeTranslator;
}());
exports.default = jadeTranslator;
//# sourceMappingURL=jade.js.map