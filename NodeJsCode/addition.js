module.exports = {
    add:function(a,b){
        return `add function call with ${a} ${b} parameter`;
    },
    a:20,
    b:30
}

/*
 or we can write above code same as below:

 var add = function(a,b){
    return `add function call with ${a} ${b} parameter`;
 }

 module.exports.addFunction = add;
 module.exports.a = 20;
 module.exports.b = 30;
*/