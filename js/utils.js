function createResponse(action, callback) {
  chrome.storage.local.get(["kirill.button", "kirill.global", "kirill.global.mode"], function(items) {
    callback({
      action: action,
      "kirill.button": items["kirill.button"],
      "kirill.global": items["kirill.global"],
      "kirill.global.mode": items["kirill.global.mode"]
    });
  });
}
function sendRequestToAllTabs(request) {
  chrome.windows.getAll({ populate: true }, function (windows) {
    for (var i in windows) {
      for (var j in windows[i].tabs) {
        chrome.tabs.sendMessage(windows[i].tabs[j].id, request, function (r) {});
      }
    }
  });
}
