function createResponse(action, callback) {
  chrome.storage.local.get([PROPERTY_BUTTON, PROPERTY_GLOBAL, PROPERTY_GLOBAL_MODE], function(items) {
    var response = { action: action };
    response[PROPERTY_BUTTON] = items[PROPERTY_BUTTON];
    response[PROPERTY_GLOBAL] = items[PROPERTY_GLOBAL];
    response[PROPERTY_GLOBAL_MODE] = items[PROPERTY_GLOBAL_MODE];
    callback(response);
  });
}
// send localStorage properties to requester
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getProperties") {
    createResponse(undefined, sendResponse);
    return true;
  }
  else if (request.action == "propagateGlobalToggleMode") {
    var obj = {};
    obj[PROPERTY_GLOBAL_MODE] = request[PROPERTY_GLOBAL_MODE];
    chrome.storage.local.set(obj, function() {
      createResponse("setProperties", function(response) {
        sendRequestToAllTabs(response);
      });
    });
    return true;
  }
  return false;
});
