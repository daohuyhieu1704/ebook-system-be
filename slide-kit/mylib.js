const saltedSha256 = require('salted-sha256');
const fs = require("fs");

var parseToJSONFrDB = function(a){
    return JSON.parse(JSON.stringify(a))
}

var generRandString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var getMonday = function (d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    tmp = new Date(d.setDate(diff))
    return new Date(tmp.getMonth()+1+'/'+tmp.getDate()+'/'+tmp.getFullYear());
}

var numDateOfMonth = function(month,year){
    if(month==1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) return 31;
    else if(month == 4 || month == 6 || month == 9 || month == 11) return 30;
    else {
        if(year % 400 == 0 || (year %4 == 0 && year % 100 != 0)) return 29;
        else return 28;
    }
}

var getNextDate = function(curr){
    var num_date = numDateOfMonth(curr.getMonth()+1)
    if(curr.getDate()+1 <= num_date){
        curr.setDate(curr.getDate()+1)
        return curr
    } else {
        if(curr.getMonth()+1>=12){
            curr.setDate(1)
            curr.setMonth(1)
            curr.setFullYear(curr.getFullYear()+1)
            return curr
        } else {
            curr.setDate(1)
            curr.setMonth(curr.getMonth()+1)
            return curr
        }
    }
}

var convertDate = function(date){
    var a = date.split('/')
    var b = a[0]
    a[0] = a[1]
    a[1] = b
    return a[0]+'/'+a[1]+'/'+a[2]
}

var convertMilisToDate = function(milis){
    const date = new Date(milis);
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+(date.getHours())+':'+date.getMinutes()+':'+date.getSeconds();
}

var round = function(num) {
    var m = Number((Math.abs(num) * 10).toPrecision(15));
    return Math.round(m) / 10 * Math.sign(num);
}

var daysBetween2Date = function(a,b){
    var date1 = new Date(a)
    var date2 = new Date(b)
    var difference = date2.getTime() - date1.getTime()
    var res = Math.ceil(difference/(1000*3600*24))
    return res
}

var generAccessTokenEmp = function(username,password,role){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "emp"
    };
    const payloadServer = {
        username:username,
        password:password,
        role:role
    };
    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadServer)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = base64HeaderStr + '.' + base64PayloadStr + '.' + signature;
    return accesstokenServer;
}

var generAccessTokenStudent = function(mssv){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "stu"
    };
    const payloadServer = {
        mssv:mssv
    };
    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadServer)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = base64HeaderStr + '.' + base64PayloadStr + '.' + signature;
    return accesstokenServer;
}

var replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
var decodeFromBase64 = function(base64String){
    return Buffer.from(base64String,'base64').toString('ascii');
}

var verifyAuthorizationEmp = function(accesstokenClient){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "emp"
    };
    const payloadAccessClient = JSON.parse(decodeFromBase64(accesstokenClient.split('.')[1]));

    if(typeof payloadAccessClient.role === undefined
        || typeof payloadAccessClient.username === undefined
        || typeof payloadAccessClient.password === undefined) return {authState:false,data:null};

    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadAccessClient)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = (base64HeaderStr + '.' + base64PayloadStr + '.' + signature);
    return {authState:accesstokenClient == accesstokenServer,data:payloadAccessClient};
}

var verifyAuthorizationStudent = function(accesstokenClient){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "stu"
    };
    const payloadAccessClient = JSON.parse(decodeFromBase64(accesstokenClient.split('.')[1]));

    if(typeof payloadAccessClient.id === undefined) return {authState:false,data:null};
    
    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadAccessClient)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = (base64HeaderStr + '.' + base64PayloadStr + '.' + signature);
    return {authState:accesstokenClient == accesstokenServer,data:payloadAccessClient};
};

var verifyAuthorizationMulti = function(accesstokenClient){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "multi"
    };
    const payloadAccessClient = JSON.parse(decodeFromBase64(accesstokenClient.split('.')[1]));

    if(typeof payloadAccessClient.mssv === undefined) return {authState:false,data:null};
    
    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadAccessClient)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY_MULTI);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = (base64HeaderStr + '.' + base64PayloadStr + '.' + signature).replace(/[;'"-]/g,'');
    return {authState:accesstokenClient == accesstokenServer,data:payloadAccessClient};
};
var verifyAuthorizationFunc = function(accesstokenClient){
    const headerServer = {
        "typ": "JWT",
        "alg": "HS256",
        "for": "func"
    };
    const payloadAccessClient = JSON.parse(decodeFromBase64(accesstokenClient.split('.')[1]));

    if(typeof payloadAccessClient.role === undefined
        || typeof payloadAccessClient.username === undefined
        || typeof payloadAccessClient.password === undefined) return {authState:false,data:null};

    const env = JSON.parse(fs.readFileSync(__dirname+'/env.json'));
    const base64HeaderStr = Buffer.from(JSON.stringify(headerServer)).toString("base64");
    const base64PayloadStr = Buffer.from(JSON.stringify(payloadAccessClient)).toString("base64");
    const dataCombinHeadPay = base64HeaderStr + '.' + base64PayloadStr;
    const hashedData = saltedSha256(dataCombinHeadPay, env.SECRET_KEY);
    const signature = Buffer.from(hashedData).toString("base64");
    const accesstokenServer = (base64HeaderStr + '.' + base64PayloadStr + '.' + signature);
    return {authState:accesstokenClient == accesstokenServer,data:payloadAccessClient};
}
export default {
    parseToJSONFrDB:parseToJSONFrDB,
    generRandString:generRandString,
    daysBetween2Date:daysBetween2Date,
    convertDate:convertDate,
    getMonday:getMonday,
    getNextDate:getNextDate,
    round:round,
    convertMilisToDate:convertMilisToDate,
    verifyAuthorizationStudent:verifyAuthorizationStudent,
    verifyAuthorizationEmp:verifyAuthorizationEmp,
    verifyAuthorizationMulti:verifyAuthorizationMulti,
    generAccessTokenStudent:generAccessTokenStudent,
    generAccessTokenEmp:generAccessTokenEmp,
    replaceAt:replaceAt
}