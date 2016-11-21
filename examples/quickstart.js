'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}
var person ='';
const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart
const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  
  getUsername({context, entities}) {
    return new Promise(function(resolve, reject) {
      var username_tmp = firstEntityValue(entities, 'username');
      if (username_tmp) {
        context.usename = username_tmp;
      }
      return resolve(context);
    });
  },

  getPhonenumber({context, entities}) {
    return new Promise(function(resolve, reject) {
      var phonenum_tmp = firstEntityValue(entities, 'phone_number');
      if (phonenum_tmp) {
        context.phonenumber = phonenum_tmp;
      }
      return resolve(context);
    });
  },
  
  getInfor({context, entities}) {
    return new Promise(function(resolve, reject) {
      var time = firstEntityValue(entities, 'datetime');
      if (time) {
        if(person == ''){
          person = firstEntityValue(entities, 'person');
        }
        context.infor = 'Bạn muốn gặp ông/bà ' + person + ' vào thời gian ' + time;
        delete context.missingDatetime;
      }else{
        if(person == ''){
          person = firstEntityValue(entities, 'person');
        }
        context.missingDatetime = true;
        delete context.infor;
      }
      return resolve(context);
    });
  },

  finish({context, entities}) {
    return new Promise(function(resolve, reject) {
      context.done = 'done';
      return resolve(context);
    });
  }

};

const client = new Wit({accessToken, actions});
interactive(client);
