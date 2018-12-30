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

module.exports = helpers;