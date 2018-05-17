const tus = require('tus-node-server');
const server = new tus.Server();
const EVENTS = require('tus-node-server').EVENTS;
var os = require("os");
const metadataStringToObject = (stringValue) => {
  const keyValuePairList = stringValue.split(',');
  return keyValuePairList.reduce((metadata, keyValuePair) => {
    let [key, base64Value] = keyValuePair.split(' ');
    metadata[key] = new Buffer(base64Value, "base64").toString("ascii");
    return metadata;
  }, {})
}



server.datastore = new tus.FileStore({
  path: '/temp'
});



/*
server.datastore = new tus.GCSDataStore({
    path: '/temp',
    projectId: 'hopper-203813',
    bucket: 'hopper-images',
});
*/

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  var metadata = metadataStringToObject(event.file.upload_metadata);
  console.log(event.file.id);
  console.log('Upload complete for file ' + metadata.campaign);
});


const host = os.hostname();
const port = 8080;
server.listen({ port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at ${port}`);
});


server.get('/', (req, res) => {
  res.write('hello!');
  res.end();
});
