// translators
import JadeTranslator from "./translators/jade";

class VSCTranslateSnippets {
    public jade(options: {
        source: string,
        translatedPath: string,
        translatedFilename: string
    }){
        const jadeTranslator = new JadeTranslator(options);

        jadeTranslator.translate();
    }
}

export const vscts = new VSCTranslateSnippets();
