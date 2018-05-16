const tus = require('tus-node-server');
const server = new tus.Server();
const EVENTS = require('tus-node-server').EVENTS;

const metadataStringToObject = (stringValue) => {
  const keyValuePairList = stringValue.split(',');
  return keyValuePairList.reduce((metadata, keyValuePair) => {
    let [key, base64Value] = keyValuePair.split(' ');
    metadata[key] = new Buffer(base64Value, "base64").toString("ascii");
    return metadata;
  }, {})
}


/*
server.datastore = new tus.FileStore({
  path: '/temp'
});
*/



server.datastore = new tus.GCSDataStore({
    path: '/temp',
    projectId: 'hopper-203813',
    bucket: 'hopper-images',
});


server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  var metadata = metadataStringToObject(event.file.upload_metadata);
  console.log(event.file.id);
  console.log('Upload complete for file ' + metadata.campaign);
});


const host = '127.0.0.1';
const port = 8000;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});
