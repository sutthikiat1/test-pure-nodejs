const { respondWith200OkJson } = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');

exports.getPings = async (req, res, next) => {
  try {
    return respondWith200OkJson(res, 'success', 'pong');
  } catch (e) {
    console.log(e);
    return routerHandleResult.ERROR;
  }
};
