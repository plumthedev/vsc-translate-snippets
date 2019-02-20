"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var System = (function () {
    function System() {
    }
    System.prototype.readFile = function (fileToReadPath) {
        var source = fs.readFileSync(fileToReadPath, 'utf8');
        return source;
    };
    System.prototype.createFile = function (data, path, filename) {
        this.createFolder(path);
        fs.writeFile("" + path + filename, data, function (err) {
            if (err)
                throw err;
        });
    };
    System.prototype.createFolder = function (path) {
        if (!this.isFolderExits(path)) {
            fs.mkdirSync(path);
        }
    };
    System.prototype.isFolderExits = function (path) {
        return fs.existsSync(path);
    };
    return System;
}());
exports.default = System;
//# sourceMappingURL=system.js.map