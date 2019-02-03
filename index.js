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
    "0004945646" : "UdayGarud",
    "0004947754" : "AkshayJadhav",
    "0004959843" : "MeenalSahu",
    "0004946811" : "NishaMane",
    "0004954631" : "SumitPathare",
    "0004955031" : "SnehalMunjewar",
    "0004962365" : "PriyankaUrgunde",
    "0004962366" : "GauravPatil",
    "0004938406" : "MadhubalaChandak",
    "0004941571" : "ShrutikaJadhav",
    "0004951716" : "SaukhyaMahure",
    "0004952748" : "SujitPasalkar"
    
}
var empList = {
    "UdayGarud": {"in":"","out":""},
    "AkshayJadhav":{"in":"","out":""},
    "MeenalSahu":{"in":"","out":""},
    "NishaMane":{"in":"","out":""},
    "SumitPathare":{"in":"","out":""},
    "SnehalMunjewar":{"in":"","out":""},
    "PriyankaUrgunde":{"in":"","out":""},
    "GauravPatil":{"in":"","out":""},
    "MadhubalaChandak":{"in":"","out":""},
    "ShrutikaJadhav":{"in":"","out":""},
    "SaukhyaMahure":{"in":"","out":""},
    "SujitPasalkar":{"in":"","out":""}
}

stdin.addListener("data", async function(d) {
    var blankdata = {
        "UdayGarud": {"in":"","out":""},
        "AkshayJadhav":{"in":"","out":""},
        "MeenalSahu":{"in":"","out":""},
        "NishaMane":{"in":"","out":""},
        "SumitPathare":{"in":"","out":""},
        "SnehalMunjewar":{"in":"","out":""},
        "PriyankaUrgunde":{"in":"","out":""},
        "GauravPatil":{"in":"","out":""},
        "MadhubalaChandak":{"in":"","out":""},
        "ShrutikaJadhav":{"in":"","out":""},
        "SaukhyaMahure":{"in":"","out":""},
        "SujitPasalkar":{"in":"","out":""}
    }
    currentemplist = empList;
    console.log(d.toString().trim());
    rfid = d.toString().trim();
    var date =  moment().format('DD-MM-YYYY');
    time= moment().format('h:mm a');
    var check = await checkIfbeforafternoon();
    let rawdata = fs.readFileSync('./data/attendance.json');  
    let attendanceformat = JSON.parse(rawdata);
    var empname = userformat[rfid];
    console.log(empname);
    if(attendanceformat[date] == undefined){
        attendanceformat[date] = blankdata;
    }
    currentemplist = attendanceformat[date];
    if(!check){
        currentemplist[empname]["in"] = time;
    }else if(check){
        currentemplist[empname]["out"] = time;
    } 
    attendanceformat[date] = currentemplist;
    fs.writeFile ('./data/attendance.json', JSON.stringify(attendanceformat), function(err) {
        if (err) throw err;
        console.log('complete');
        fs.copySync(path.resolve(__dirname,'./data/attendance.json'), './datacopy/'+date+'attendance.json');
        }
    );
});

function checkIfbeforafternoon(){
    var now = moment();
    var hourToCheck = (now.day() !== 0)?15:00;
    var dateToCheck = now.hour(hourToCheck).minute(30);
    return new Promise((resolve, reject) => {
        var result = moment().isAfter(dateToCheck);
        resolve(result);
      });
    
}

app.get('/getattendance', function (req, res) {
    let rawdata = fs.readFileSync('./data/attendance.json');  
    res.send(JSON.parse(rawdata));
 })
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 });

 
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

