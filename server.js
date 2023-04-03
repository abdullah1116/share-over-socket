var net = require('net');
var fs = require('fs');

if (!process.argv[2]) {
  console.log('error: 1 parameter required\n[File Name]\n');
  process.exit(1);
}

const fileName = process.argv[2];

const server = net.createServer(function (client) {
  var fileStream = fs.createReadStream(fileName, { highWaterMark: 16384 });

  fileStream.on('data', function (chunk) {
    client.write(chunk);
  });

  fileStream.on('close', function () {
    client.end();
    console.log('File send successfully');
  });

  client.on('error', () => console.log('Error: File not send!'));
});

server.listen(5000);
server.on('listening', () => console.log('Ready to send: ', fileName));
server.on('error', () => console.log("Server: Error\n Can't open 5000 port\n"));
