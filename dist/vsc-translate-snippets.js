"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jade_1 = require("./translators/jade");
var VSCTranslateSnippets = (function () {
    function VSCTranslateSnippets() {
    }
    VSCTranslateSnippets.prototype.jade = function (options) {
        var jadeTranslator = new jade_1.default(options);
        jadeTranslator.translate();
    };
    return VSCTranslateSnippets;
}());
exports.vscts = new VSCTranslateSnippets();
//# sourceMappingURL=vsc-translate-snippets.js.map