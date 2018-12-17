/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path');
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return this.get(null);
  }

  async get (id, params) {
    const destination = path.resolve(__dirname, '../../../../config/overrides.json');
    const data = JSON.parse(fs.readFileSync(destination, 'utf8'));
    console.log({destination, data});

    data.id = id || 1;
    return data;
  }

  async update (id, data, params) {
    console.log(process.cwd(), __dirname);
    const destination = path.resolve(__dirname, '../../../../config/overrides.json');
    console.log('configuration/update', {data, destination});
    try {
      fs.writeFileSync(destination, JSON.stringify(data, null, ' '));
    } catch (e) {
      throw new Error('Config file not found: '+ destination);
    }
    return data;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
