// const data = require("./rectangle")
//  console.log(data.parameter(1,2));

const rectangle = require("./rectangle")
var data = require("./rectangle")

function checkarea(l,b) {
    
    rectangle(l,b,(err,rectangle)=>{
        if(err){
            console.log("error: ",err.message);
        }
        else{
            console.log("area of rectangle is ",rectangle.area());
        }
    })

}
checkarea(0,0)
checkarea(2,4)