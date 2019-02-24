
export default class cleaning{
    public removeWhiteCharacters(){
        let obj = {};
        return obj = {
            string: function(s:string){
                return s.replace(/\s/g,"");
            },

            object: function(o:object){
                let string:string = "";
                   Object.entries(o).forEach(([key,value])=>{
                       string += value;
                   })
                return string.replace(/\s/g,"");
            },
            
            array: function(a:Array<string>){
                let string:string = a.join("");
                return string.replace(/\s/g,"");
            }
        }
    }
}