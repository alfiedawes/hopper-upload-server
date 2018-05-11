const express = require('express')
const tus = require('tus-node-server');

const server = new tus.Server();



var app = express();
const uploadApp = express();

uploadApp.all('*', function(req, res){
  res.send('video upload for campaign: ' + req.params.campaignID);
  /*
  server.datastore = new tus.FileStore({
      path: '/files'
  });
  server.handle.bind(server);
  */
});

app.use('/upload/:campaign', uploadApp);

app.get('/video/:campaignID/:videoID', function(req, res){
  res.send('Return Video for campaign ' + req.params.campaignID + ' with ID ' + req.params.videoID);
});

app.get('/img/:campaignID/:imgID', function(req, res){
  res.send('Return Image for campaign ' + req.params.campaignID + '  with ID ' + req.params.imgID);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
