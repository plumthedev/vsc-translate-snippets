const { vscts } = require('./../dist/vsc-translate-snippets');

vscts.jade({
    source: './data/snippets.json',
    translatedPath: './translated/',
    translatedFilename: 'jade-snippets.json'
});