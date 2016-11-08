class Sem{
    private _end:boolean=false;
    
    Wait(){
        while(this._end===false){
            setTimeout(()=>{},300);
            
        }
    }
    Red(){
        this._end=false;
    }
    Green(){
        this._end=true;
    }
}
export = Sem;