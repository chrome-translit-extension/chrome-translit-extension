function createResponse(action){
	return {
		"action": action,
		"kirill.button": localStorage["kirill.button"],
        "kirill.global": localStorage["kirill.global"],
        "kirill.global.mode": localStorage["kirill.global.mode"]
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