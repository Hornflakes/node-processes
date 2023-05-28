const cluster = require('cluster');

if (cluster.isMaster) require('./parent.js');
else require('./child.js');
