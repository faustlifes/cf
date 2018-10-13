import express from 'express';
import http from 'http';
import path from 'path';
import apiRouter from './routes/api';

const app = express();
// set up ejs for templating. You can use whatever
// app.use(express.static('../../public'));
// Initialize servers
const httpPort = 3005;
const httpServer = http.createServer(app);

const src_dir = path.join(__dirname, '../../index.html');
const public_dir = path.join(__dirname, '../../public');

app.use(express.static(public_dir));
app.use('/api/', apiRouter);

app.get('/', function(req, res){
  res.sendFile(src_dir);
});
httpServer.listen(httpPort);

console.log(`Server http starting on port: ${httpPort}`);
