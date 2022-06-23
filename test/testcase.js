

const fs=require("fs");
//const papa=require('papaparse');
//const reader=new FileReader();
const testaccrual=fs.readFileSync('abcde_20220622.txt.csv');
var accrualArray=testaccrual.toString().split("\r");
let accrualResult=[];
let accrualHeaders=accrualArray[0].split(",");
for (let i=1;i<accrualArray.length-1;i++){
    let accuralObj={};
    let accrualStr=accrualArray[i];
    let as='';
    let aflag=0;
    for(let ch of accrualStr){
        if(ch==='"'&&aflag===0){
            aflag=1;
        }
        else if (ch==='"'&&aflag===1)aflag=0;
        if(ch===','&&aflag===0)ch='|';
        if(ch!=='"') as+=ch;  
    }
    let aproperties=as.split("|");
    for (let j in accrualHeaders){
        if(aproperties[j].includes(",")){
            accuralObj[accrualHeaders[j]]=aproperties[j].split(",").map(item=>item.trim());
        }
        else accuralObj[accrualHeaders[j]]=aproperties[j];
    }
    accrualResult.push(accuralObj);
}

let json=JSON.stringify(accrualResult);
fs.writeFileSync('abced_20220622.json',json);
/*testaccrualfile=$.testaccrual.toArray(testaccrual,{delimiter:"'",separator:';',});
//var count = 0;
papa.parse(testaccrual,{worker:true});
console.log(testaccrualfile);
fs.readFile('abced_20220622.txt.csv',function(err,testaccrual){
    if(err){return console.error(err);}
    console.log(testaccrual.toString());
})
const fs=require("fs");
const papa=require('papaparse');
const testhandback=fs.createReadStream('abcde_20220622.HANDBACK.txt.csv');
//var count = 0;
papa.parse(testhandback,{worker:true});
//console.log(testhandback);*/
const testhandback=fs.readFileSync('abcde_20220622.HANDBACK.txt.csv');
var handbackArray=testhandback.toString().split("\r");
let handbackResult=[];
let handbackHeaders=handbackArray[0].split(",");
for (let i=1;i<handbackArray.length-1;i++){
    let handbackObj={};
    let handbackStr=handbackArray[i];
    let hs='';
    let hflag=0;
    for(let ch of handbackStr){
        if(ch==='"'&&hflag===0){
            hflag=1;
        }
        else if (ch==='"'&&hflag===1)hflag=0;
        if(ch===','&&hflag===0)ch='|';
        if(ch!=='"') hs+=ch;  
    }
    let hproperties=hs.split("|");
    for (let j in handbackHeaders){
        if(hproperties[j].includes(",")){
            handbackObj[handbackHeaders[j]]=hproperties[j].split(",").map(item=>item.trim());
        }
        else handbackObj[handbackHeaders[j]]=hproperties[j];
    }
    handbackResult.push(handbackObj);
}

let json2=JSON.stringify(handbackResult);
fs.writeFileSync('abced_20220622.HANDBACK.json',json2);


