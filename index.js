const tus = require('tus-node-server');
const express = require('express')
const server = new tus.Server();


/*
server.datastore = new tus.FileStore({
    path: 'D:/Dropbox (The Box)/BOX Projects/XOB013 Hopper/3. Project files/Code/hopper-upload-server/files'
});
*/
server.datastore = new tus.GCSDataStore({
    path: '/',
    projectId: 'hopper-203813',
    bucket: 'hopper-images',
});


server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(`[${new Date().toLocaleTimeString()}] [EVENT HOOK] Upload complete for file ${event.file.id}`);
});

var app = express();
const uploadApp = express();
uploadApp.all('*', server.handle.bind(server));
app.use('/uploads', uploadApp);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
