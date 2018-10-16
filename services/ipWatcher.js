const { promisify } = require('util');
const fs = require('fs-extra');
const getIP = promisify(require('external-ip')());
const Mailer = require('./Mailer');
const emailTemplate = require('../emailTemplates/generic');
const logger = require('./logger');

const ipFileLocation = './ip.txt';
const email = process.env.EMAIL;

async function ipSetup() {
    await fs.ensureFile(ipFileLocation);

}

async function hasIpChanged() {
    const prevIp = (await fs.readFile(ipFileLocation)).toString();
    const ip = await getIP();

    if(prevIp !== ip) {
        logger.info(`Old ip (${prevIp}) has been changed to ${ip}. Sending email...`);
        await sendMail(ip);
        logger.info(`Email sent to ${email}.`);
    }
}

async function sendMail(ip) {
    await updateIpFile(ip);
    const mailConfig = {
        subject: 'IP for Servers Have Changed!!!!', 
        recipients: [{ email }]
    };
    const mailer = new Mailer(mailConfig, emailTemplate(ip));
    await mailer.send();
}

async function updateIpFile(ip) {
    await fs.writeFile(ipFileLocation, ip);
}

module.exports = {
    ipSetup, 
    hasIpChanged
}