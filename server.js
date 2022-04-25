const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/bts-angular-ui'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/bts-angular-ui/index.html'));});
app.listen(process.env.PORT || 8080);