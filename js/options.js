// Saves options to chrome.storage.local.
function save_options() {
  var select = document.getElementById("kirill.button");
  var button = select.children[select.selectedIndex].value;
  var global = document.getElementById("kirill.global").checked;
  var obj = {};
  obj[PROPERTY_BUTTON] = button;
  obj[PROPERTY_GLOBAL] = global;
  if (!global) {
    obj[PROPERTY_GLOBAL_MODE] = false;
  }
  chrome.storage.local.set(obj, function() {
    chrome.runtime.sendMessage({ action: "getProperties" }, function(response) {
      sendRequestToAllTabs(response);
    });
    var status = document.getElementById("status");
    status.innerHTML = "Options saved";
    setTimeout(function () {
      status.innerHTML = "";
    }, 1000);
  });
}

// Restores select box state to saved value from chrome.storage.local.
function restore_options() {
  chrome.storage.local.get([PROPERTY_BUTTON, PROPERTY_GLOBAL], function(items) {
    var button = items[PROPERTY_BUTTON];
    if (button) {
      var select = document.getElementById("kirill.button");
      for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == button) {
          child.selected = true;
          break;
        }
      }
    }
    var global = items[PROPERTY_GLOBAL];
    if (global) {
      var globalCheckbox = document.getElementById("kirill.global");
      globalCheckbox.checked = true;
    }
  });
}
function init() {
  restore_options();
  var t = document.getElementById("conversionTable");
  t.innerHTML = "<table>";
  for (var k in LAT) {
    t.innerHTML += "<tr><th>" + LAT[k] + "</th><td>&nbsp;" + k + "</td></tr>";
  }
  t.innerHTML += "</table>";
}
