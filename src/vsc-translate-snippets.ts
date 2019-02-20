// modules
import jadeTranslator from "./translators/jade";
import jadeData from "./translators/jadeData";

class VSCTranslateSnippets {
    public jade(options) {
        const JadeData = new jadeData(options);
        const source = JadeData.getFile;
        const JadeTranslate = new jadeTranslator(source);

        JadeData.save(JadeTranslate.getHtml);
    }
}

export const vscts = new VSCTranslateSnippets();
