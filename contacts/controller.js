const {
  respondWith200OkJson,
  respondWith404NotFound,
  respondWith400BadRequest,
  getParamsId,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const url = require('url');
const _ = require('lodash');

exports.getContacts = async (req, res, next) => {
  try {
    var query = url.parse(req.url, true).query;
    var jsonData = _.sortBy(
      fakeDatabase.selectAllFromContacts(),
      ['type', 'name'],
      ['asc', 'desc'],
    );

    if (undefined != query.phrase) {
      var keyword = query.phrase;

      if ('' == keyword) {
        return respondWith400BadRequest(res);
      }
      var newJsonData = [];
      jsonData &&
        jsonData.map((v, k) => {
          if (v.name.toLowerCase().search(keyword.toLowerCase()) > -1)
            newJsonData.push(v);
        });
      jsonData = newJsonData;
    }

    if (undefined != query.limit) {
      var errFlag = false;
      var limit = parseFloat(query.limit);
      if (isNaN(limit) && !errFlag) {
        errFlag = true;
      } else {
        if (limit % 1 != 0 && !errFlag) {
          errFlag = true;
        }
        if (limit < 0 && !errFlag) {
          errFlag = true;
        }
      }
      if (errFlag) {
        return respondWith400BadRequest(res);
      }
      jsonData = jsonData.slice(0, limit);
    }

    return respondWith200OkJson(res, 'success', jsonData);
  } catch (e) {
    console.log(e);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const id = getParamsId(req);

    var arrJsonData = fakeDatabase.selectFromContactsById(id);
    var jsonData =
      arrJsonData && arrJsonData.length > 0 ? arrJsonData[0] : null;

    if (!jsonData) {
      return respondWith404NotFound(res);
    }
    return respondWith200OkJson(res, 'success', jsonData);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContacts = async (req, res, next) => {
  try {
    const id = getParamsId(req);
    if (!id) {
      return respondWith400BadRequest(res);
    }
    var jsonData = fakeDatabase.deleteContactsById(id);
    if (!jsonData) {
      return respondWith404NotFound(res);
    }
    return respondWith200OkJson(res, jsonData);
  } catch (e) {
    console.log(e);
  }
};
