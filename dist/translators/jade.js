"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html2pug = require('html2pug');
var system_1 = require("./../modules/system");
var expression_1 = require("./../modules/expression");
var jadeTranslator = (function () {
    function jadeTranslator(args) {
        this.args = args;
        this.system = new system_1.default();
        this.expression = new expression_1.default();
        this.originalSource = this.system.readFile(this.args.source);
        this.originalSourceSnippets = new Array(0);
        this.translatedSource = this.system.readFile(this.args.source);
        this.translatedSourceSnippets = new Array(0);
    }
    jadeTranslator.prototype.translate = function () {
        var _this = this;
        this.getSnippets();
        console.info("Translating " + this.originalSourceSnippets.length + " phrases");
        this.originalSourceSnippets.forEach(function (snippet) {
            var translatedSnippet = _this.translateSingleSnippet(snippet);
            _this.translatedSource = _this.expression.replace(_this.translatedSource, snippet, translatedSnippet);
        });
        this.system.createFile(this.translatedSource, this.args.translatedPath, this.args.translatedFilename);
        console.log('Translated!');
    };
    jadeTranslator.prototype.prepareToTranslate = function (snippet) {
        var preparedSnippet = this.expression.replace(snippet, '"body": ', '');
        preparedSnippet = this.expression.parse(preparedSnippet);
        if (preparedSnippet instanceof Array) {
            preparedSnippet = this.expression.createString(preparedSnippet);
        }
        return preparedSnippet;
    };
    jadeTranslator.prototype.translateSingleSnippet = function (snippet) {
        var prepared = this.prepareToTranslate(snippet);
        var translated = this.translateToJade(prepared);
        return translated;
    };
    jadeTranslator.prototype.translateToJade = function (snippetBody) {
        var translated = html2pug(snippetBody, { tabs: true, fragment: true });
        var translatedArray = this.expression.createArray(translated, '\n');
        var stringify = this.expression.stringify(translatedArray);
        var readySnippet = this.expression.join('"body": ', stringify);
        this.translatedSourceSnippets.push(readySnippet);
        return readySnippet;
    };
    jadeTranslator.prototype.getSnippets = function () {
        var bodySnippetRegex = /("body": \"[\s\S]+?\"$)|("body": \[[\s\S]+?\])/gm;
        this.originalSourceSnippets = this.expression.match(bodySnippetRegex, this.originalSource);
    };
    Object.defineProperty(jadeTranslator.prototype, "getOriginal", {
        get: function () {
            return this.originalSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(jadeTranslator.prototype, "getOriginalSnippets", {
        get: function () {
            return this.originalSourceSnippets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(jadeTranslator.prototype, "getJade", {
        get: function () {
            return this.translatedSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(jadeTranslator.prototype, "getJadeSnippets", {
        get: function () {
            return this.translatedSourceSnippets;
        },
        enumerable: true,
        configurable: true
    });
    return jadeTranslator;
}());
exports.default = jadeTranslator;
//# sourceMappingURL=jade.js.map