"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jade_1 = require("./translators/jade");
var VSCTranslateSnippets = (function () {
    function VSCTranslateSnippets() {
    }
    VSCTranslateSnippets.prototype.jade = function (options) {
        var jade = new jade_1.default(options);
        jade.start();
    };
    return VSCTranslateSnippets;
}());
exports.vscts = new VSCTranslateSnippets();
//# sourceMappingURL=vsc-translate-snippets.js.map