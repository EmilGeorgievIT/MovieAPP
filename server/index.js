const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const cors =  require('cors');
const helmet = require('helmet');
const compression = require('compression');
const proxyBlob = require('http-proxy-middleware');

const path = require('path');
const { port, mysql_host } = require('./config/config');
const sequelize = require('./database/mysql-database');
const app = express();
const server = app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });


global.__basedir = __dirname + "/..";

app.use(helmet());
app.use(cors())
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true })); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

sequelize.sync()
  .then((result) => {
    console.log('Successfully connected to the database on host ' + mysql_host);
  }).catch((error) => {
    console.log(error);
});
  
app.use('/auth', authRoutes);
app.use('/movie', movieRoutes);


// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
})

const restream = async function (proxyReq, req, res, options) {
  if (
      req.headers['content-type'] &&
      req.headers['content-type'].match(/^multipart\/form-data/)
  ) {
      req.body.reqUser = req.user
  } else {
      const requestBody = JSON.stringify({ ...req.body })
      proxyReq.setHeader('Content-Type', 'application/json')
      proxyReq.setHeader('Content-Length', Buffer.byteLength(requestBody))
      proxyReq.write(requestBody)
  }
}

app.use('/api', proxyBlob(
  {
      target: 'http://localhost:' + port, // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: false, // proxy websockets
      pathRewrite: {
          "^/api": ""
      },
      onProxyReq: restream
  }
));


app.use(express.static('../dist/MovieAPP/'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/MovieAPP/index.html'));
});


