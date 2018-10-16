require('dotenv').config();
const config = require('config');
const ipWatcher = require('./services/ipWatcher');
const logger = require('./services/logger');

doWork();

async function doWork() {
    const pollTime = config.pollTimingInMinutes;
    await ipWatcher.ipSetup();
    logger.info('Started IP watching service.')
    logger.info(`Polling every ${pollTime} minutes...`);
    
    setInterval(async () => {
        await ipWatcher.hasIpChanged();
    }, pollTime * 60000);
}