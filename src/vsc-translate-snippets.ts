// modules
import jadeTranslator from "./translators/jade";

class VSCTranslateSnippets{
    public jade(options){
        const jade = new jadeTranslator(options);
        jade.start();
    }
}

export const vscts = new VSCTranslateSnippets();
