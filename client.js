const net = require('net');
const fs = require('fs');

if (!process.argv[3]) {
  console.log('error: 2 parameters required\n[IPV4] [File Name]\n');
  process.exit(1);
}

const socket = new net.Socket();
socket.connect(5000, process.argv[2]);

var fileStream;
socket.on('connect', function () {
  fileStream = fs.createWriteStream(process.argv[3]);
});

socket.on('data', function (chunk) {
  fileStream.write(chunk);
});

socket.on('close', function () {
  fileStream.end();
});
