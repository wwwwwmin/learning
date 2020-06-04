// exports.a = 1;
// exports.b = 2;


//批量导出
// module.exports = {
//    c : 5 ,
//    d: 6
// }

// module.exports = function() {
//     console.log(1111)
// }

module.exports  = class {
   constructor(name){
     this.name = name
   }
   show(){
       console.log(this.name)
   }
}