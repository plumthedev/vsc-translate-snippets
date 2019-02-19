const { vscts } = require('./../dist/vsc-translate-snippets');

vscts.jade({
    sourceFile: './data/snippets.json',
    filename: 'jade-snippets.json'
});