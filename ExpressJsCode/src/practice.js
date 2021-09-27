var arr = ['1','2','3','4', '5', '6'];
var len = arr.length;
 

var arrOp = getPairArray(arr); 
console.log(arrOp);
var opstrArr = [];

// second number reverse

function lastNumberReverse(arrOp){
    console.log('enter', arrOp);
    var opstr = arrOp[0];
    console.log(opstr);
    for(let i=1;i<arrOp.length;i++){
        
        if(i == arrOp.length-1){
            opstr += arrOp[i];
            opstrArr.push(opstr);
            opstr = arrOp[0];
            opstr += arrOp[i].split('').reverse().join('')
        }else{
            opstr += arrOp[i];
        }
    }
    opstrArr.push(opstr);
    return opstrArr;
}

// first number reverse:

function firstNumberReverse(arrOp, doReverse=false){
    if(doReverse){
        arrOp = arrOp.reverse();
    }
    // console.log('enter2', arrOp);
    var opstr = '';
    for(let j=0;j<arrOp.length;j++){  
        if(j == arrOp.length-1){
            var temp = opstr;
            opstr += arrOp[j];
            opstrArr.push(opstr);
            opstr = temp;
            opstr += arrOp[j].split('').reverse().join('');
        }else{
            opstr += arrOp[j].split('').reverse().join('')
        }
        
    }
    opstrArr.push(opstr);
    // opstr = '';
    return opstrArr;
}


for(let i=0; i<arrOp.length; i++){
    for(let j=0; j<arrOp[i].length; j++){
        console.log(lastNumberReverse(arrOp[i][j]));
        console.log(firstNumberReverse(arrOp[i][j]));
    }
}

for(let i=0;i<arrOp.length;i++){
    for(let j=0; j<arrOp[i].length; j++){
        console.log(lastNumberReverse(arrOp[i][j].reverse()));
        console.log(firstNumberReverse(arrOp[i][j].reverse(), true));
    }
}

function getPairArray(arr){
    
var chars = '';
var res = [];

for(let i=0;i<arr.length;i++){
    chars = '';
    for(let j=i+1;j<arr.length;j++){
        chars = arr[i].toString() + arr[j];
        res.push(chars);
    }
}

// console.log(res);

var farr = [];
var ffstr = '';
var fstr = [];
let strf = '';
var finalArr = [];

for(let i=0; i<res.length;i++){ // 12
    for(let j=i+1; j<res.length;j++){ // 13
        if(res[i][0] == res[j][0] || res[i][1] == res[j][0] || res[i][0] == res[j][1] || res[i][1] == res[j][1]){
           
        }else{
            ffstr = res[i] + res[j];
            
            for(let k=0;k<arr.length;k++){
                if(ffstr.indexOf(arr[k].toString()) == -1){
                    strf += arr[k]
                }
            }
            
            fstr.push(res[i]); 
            fstr.push(res[j]);
            if(strf)
                fstr.push(strf);
            finalArr.push(fstr);
            if(!farr.includes(finalArr))
                farr.push(finalArr);
        }

        strf = '';
        fstr = [];
    }
    finalArr = [];
    ffstr ='';
}

return farr;
}


