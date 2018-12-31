/*
 * Helpers for various tasks
 *
 */

// Dependencies
const crypto = require('crypto');
const https = require('https');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

const config = require('./config');

const helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = str => {
  try{
    const obj = JSON.parse(str);
    return obj;
  } catch(e){
    console.log('parseJsonToObject helper error', e);
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = str => {
  if(typeof(str) == 'string' && str.length > 0){
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

module.exports = helpers;