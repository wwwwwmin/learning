//变量提升，在当前作用域下，会把var和function进行提前的声明或者定义
//块级作用域。判断体、循环体等大括号都是块级作用域（只对let/const/function起到作用，对var不起作用）

/*
 * EC(G)变量提升
 * [VO(G)]
 * var a;
 * function a(){};  全局的a = 函数
 */
console.log(a);  //=>函数
var a = 0;
console.log(a);  //=>0
function a() { }
console.log(a);  //=>0




/*
 *  EC(G)变量提升,实际执行：
 *  var a;               // var不受块级作用域影响，提升至全局
 *  console.log(a);       // =>undefined
 *  if(true){
 *      console.log(a);   // =>undefined
 *      a = 10;     
 *     console.log(a);    // =>10
 *  } 
 *  console.log(a);       // =>10
 */
console.log(a);
if (true) {
    console.log(a);
    var a = 10;
    console.log(a);
}
console.log(a);




/**
 * 老版本浏览器EC(G)变量提升
 * 不管条件是否成立都要进行变量提升，大括号中的function也不会产生块级作用域
 * 实际运行：
 * var a ;
 * function a() { }
 * console.log(a);   // => 函数
 * a = 0;
 *  if (true) {
 *       console.log(a);  // => 0   
 *       console.log(a);  // => 0 
 *  }
 *  console.log(a);     // => 0
 */
console.log(a);   // => 函数
var a = 0;
if (true) {
    console.log(a);  // => 0
    function a() { }
    console.log(a);  // => 0 
}
console.log(a);     // => 0





/*
 * 新版本浏览器EC(G)变量提升
 * 虽然大括号出现function会产生块级作用域，但是为了兼容ES3，还会把其在全局上下文中变量提升，只不过此时只是声明，不进行定义了
 * var a;
 * function a;
 */
console.log(a);   // => undefined
var a = 0;
if (true) {
    /*
     * 形成块级作用域，变量提升
     *   function a() { };   a是块级作用域的私有变量
     */
    console.log(a);   //=>私有的 函数
    /*
     * 到这一步不会再重新复制函数a,但是为了向后兼容ES3，它会把在这个代码之前修改过的a的值，全都映射到全局变量a中
     * =>在本代码中，前面由于提升，让全局的a修改为函数
     */
    function a() { };  
    console.log(a);   //=>私有的 函数
}
console.log(a);    //=>函数





/*
 * EC(G)变量提升
 *  var a;
 *  function a;
 */
console.log(a);   // => undefined
var a = 0;
if (true) {
    /**
     * 形成块级作用域，变量提升
     *   function a() { };   a是块级作用域的私有变量,以后当前作用域中的a都是私有的
     */
    console.log(a);   //=>私有的 函数
    a = 1;
    console.log(a);    // =>1
    function a() { };  //=>为了向后兼容ES3，它会把在这个代码之前修改过的a的值，全都映射到全局变量a中，=>在本代码中，让全局的a = 1；
    a = 21;
    console.log(a);   //=>私有的 a=21,未映射到全局
}
console.log(a);    //=> 全局a=1





/*
*变量提升：
*   var a ，
*   function test(){}
*/
var a= 10,b=11,c=12;
console.log(test)//没有块级作用域，声明并定义
function test(a){
    a= 1 //传入的形参为私有变量，不会影响公有
    var b =2//var声明function的私有变量
    c=3//没有var，全局
}
test(5)
console.log(a)         
console.log(b)
console.log(c)
/*
 * 结果：
 * ƒ test(a){
    a= 1
    var b =2
    c=3
   }
 *  10
 *  11
 *  3
 */








/*变量提升
*   var n ;
*   var c ; 
*   function a (){}
*/
var n = 0
function a() {
    //私有作用域， var n ,function b(){}
    var n = 10
    function b() {
        n++ //操作自己上级的作用域，不操作全局
        console.log(n)
    }
    b()
    return b
}
var c = a()
c()            //相当于调用b函数
console.log(n)  //全局变量不受影响，function a操作的是`var n = 10`这里的私有变量

/**
 * 结果：
 * 11
 * 12
 * 0
 */










/**
 * 分析： 
 * 变量提升 
 * var foo ; 
 * function bar (){} 
 * bar()私有作用域内：变量提升 var foo，此时的foo为undefined，!foo为true，符合条件 foo = 10 ,结果打印 10
 */
var foo = 1
function bar (){
    if(!foo){
        var foo = 10
    }
    console.log(foo)
}
bar()




/*
    代码from:https://juejin.im/post/5e9a72d86fb9a03c8e5fa29a#heading-6
*/