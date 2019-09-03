const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const axios = require('axios');

const port = new SerialPort('/dev/ttyACM0', {baudRate: 9600});
const parser = port.pipe(new ReadLine({delimeter: "\n"}));

port.on("open", () => {
    console.log("serial port open")
})

parser.on("data", data => {
    var lux = parseFloat(data)
    console.log(lux);
    axios.post("http://localhost:8080/api", {Lux: lux})
})
