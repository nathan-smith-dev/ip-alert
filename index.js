require('dotenv').config();
const ipWatcher = require('./services/ipWatcher');

doWork();

async function doWork() {
    await ipWatcher.ipSetup();
    await ipWatcher.hasIpChanged();
}