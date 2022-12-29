// exports.parameter = (x,y) => (x*y)
module.exports = (x,y,callback) => {
    if (x===0 || y==0){
        setTimeout(()=>
        {
            callback(new Error("This value should be greater than 0"),null)
        }
        ,2000)
    }
    else{
        setTimeout(()=>
        {
            callback(null,{
                area: ()=>x*y
            })
        }
        ,2000)
    }
}
