function createResponse(action){
	return {
		"action": action,
		"tocyrillic.button": localStorage["tocyrillic.button"],
        "tocyrillic.global": localStorage["tocyrillic.global"],
        "tocyrillic.global.mode": localStorage["tocyrillic.global.mode"]
    };
}
function sendRequestToAllTabs(request){
	chrome.windows.getAll({"populate":true}, function(windows){
		  for(var i in windows){
			  for(var j in windows[i].tabs){
				  chrome.tabs.sendRequest(windows[i].tabs[j].id, request, function(r){});
		  	}
	  	}
	});
}