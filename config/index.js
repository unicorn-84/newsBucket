const nconf = require('nconf');
const path = require('path');

nconf.env();
nconf.argv();
nconf.file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;
