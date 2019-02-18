var http = require('http');
var fs = require('fs');
var stdin = process.openStdin();
var moment = require('moment');
var fse = require('fs-extra');
var path = require('path');
var express = require('express');
var app = express();
app.use(express.static('public'));
var userformat = {
    "0004945646": "UdayGarud",
    "0004947754": "AkshayJadhav",
    "0004959843": "MeenalSahu",
    "0004946811": "NishaMane",
    "0004954631": "SumitPathare",
    "0004955031": "SnehalMunjewar",
    "0004962365": "PriyankaUrgunde",
    "0004962366": "GauravPatil",
    "0004938406": "MadhubalaChandak",
    "0004941571": "ShrutikaJadhav",
    "0004951716": "SaukhyaMahure",
    "0004952748": "SujitPasalkar"

}

var record = {
    "in" : "",
    "out": ""
}

stdin.addListener("data", async function (d) {
    rfid = d.toString().trim();
    var date =  moment().format('DD-MM-YYYY');
    var time= moment().format('h:mm a');
    var filename = './attendance_data/' + userformat[rfid] + '.json';
    var check = await checkIfbeforafternoon();
    console.log(check);
    if (fs.existsSync(filename)) {
        let rawdata = JSON.parse(fs.readFileSync(filename)); 
        if(rawdata[date]){
            if(!check){
                rawdata[date].in= time;
            }else if(check){
                rawdata[date].out = time;
            } 
        }else{
            rawdata[date] = {
                "in" : "",
                "out": ""
            };

            if(!check){
                rawdata[date].in= time;
            }else if(check){
                rawdata[date].out = time;
            } 
        } 
        

        fs.writeFile (filename, JSON.stringify(rawdata), function(err) {
            if (err) throw err;
            console.log('complete');
            
            }
        );

    } else {
        let rawdata = JSON.parse('{}'); 
        if(rawdata.date){
            if(!check){
                rawdata[date].in= time;
            }else if(check){
                rawdata[date].out = time;
            } 
        }else{
            rawdata[date] = {
                "in" : "",
                "out": ""
            };
            if(!check){
                rawdata[date].in= time;
            }else if(check){
                rawdata[date].out = time;
            } 
        }
        

        fs.writeFile (filename, JSON.stringify(rawdata), function(err) {
            if (err) throw err;
            console.log('complete');
            
            }
        );
    }
});

function checkIfbeforafternoon(){
    var now = moment();
    var hourToCheck = (now.day() !== 0)?15:00;
    var dateToCheck = now.hour(hourToCheck).minute(30);
    console.log(dateToCheck);
    return new Promise((resolve, reject) => {
        var result = moment().isAfter(dateToCheck);
        resolve(result);
      });
    
}