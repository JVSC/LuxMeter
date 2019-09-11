const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const axios = require('axios');
const b = require('brightness');

const port = new SerialPort('/dev/ttyACM1', {baudRate: 9600});
const parser = port.pipe(new ReadLine({delimeter: "\n"}));

function normalizar(value, min, max) {
	normalized = (value - min) / (max - min);
	return normalized;
}

port.on("open", () => {
    console.log("serial port open")
})

parser.on("data", data => {
    var lux = normalizar(parseFloat(data), 0, 100)
    console.log(lux);
    b.set(lux + 0.02);
    axios.post("http://lumaxima.herokuapp.com/api", {Lux: lux})
})
