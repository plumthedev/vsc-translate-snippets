"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expression = (function () {
    function Expression() {
    }
    Expression.prototype.replace = function (string, find, replace) {
        return string.replace(find, replace);
    };
    Expression.prototype.match = function (pattern, string) {
        return string.match(pattern);
    };
    Expression.prototype.parse = function (json) {
        return JSON.parse(json);
    };
    Expression.prototype.createString = function (array, glue) {
        if (glue === void 0) { glue = ''; }
        return array.join(glue);
    };
    Expression.prototype.createArray = function (string, delimiter) {
        return string.split(delimiter);
    };
    Expression.prototype.stringify = function (value) {
        return JSON.stringify(value);
    };
    Expression.prototype.join = function (main, addon) {
        return main.concat(addon);
    };
    return Expression;
}());
exports.default = Expression;
//# sourceMappingURL=expression.js.map