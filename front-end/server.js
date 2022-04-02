// const express = require('express');
// const http = require('http');
// const path = require('path');

// const app = express();

// const port = process.env.PORT || 4200;

// app.use(express.static(__dirname + '/dist/tca'));

// app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

// const server = http.createServer(app);

// server.listen(port, () => console.log(`App running on: http://localhost:${port}`));

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = process.env.NODE_PORT || 4200;

const root = path.join(__dirname, 'dist', 'tca');


app.get('*' ,function(req, res) {
  fs.stat(root + req.path, function(err){
    if(err){
        res.sendFile("index.html", { root });
    }else{
        res.sendFile(req.path, { root });
    }
  })
});

app.listen(port);
console.log(`App running on: http://localhost:${port}`)