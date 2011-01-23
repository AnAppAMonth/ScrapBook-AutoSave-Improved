// Improvements:
// 1. A regular expression can be specified so that URLs matching this RE aren't captured.
// 2. Captured pages are arranged in two-levels of directories: months and days, instead of just days.
// 3. URLs already captured in the current browser session aren't captured again.
// 4. Option to suppress error alerts when auto-saving.

var sbAutoSaveService = {

	CapturedURLs : {},

	init : function()
	{
		if ( !("newItem" in sbCommonUtils) )
		{
			setTimeout(function(){ alert("Please upgrade ScrapBook to 1.2 or later."); }, 1000);
			return;
		}
		gBrowser.addEventListener("load", function(aEvent){ sbAutoSaveService.handleBrowserLoad(aEvent); }, true);
	},

	handleBrowserLoad : function(aEvent)
	{
		if ( !sbCommonUtils.getBoolPref("scrapbook.autosave.enabled", true) ) {
			return;
		}

		var win = aEvent.originalTarget.defaultView;
		if ( win != win.top ) {
			return;
		}

		var url = win.location.href;
		var idx = url.indexOf('#');
		if (idx >= 0) {
			url = url.slice(0, idx);
		}

		if ( url in this.CapturedURLs ) {
			return;
		}
		if ( url.indexOf("http") !== 0 ) {
			return;
		}

		try {
			var exclude = sbCommonUtils.PREF.getCharPref("scrapbook.autosave.exclude");
			if (exclude != "") {
				var regex = new RegExp(exclude, "i");
				if (win.location.href.search(regex) >= 0) {
					return;
				}
			}
		}
		catch(ex) {}

		var ts = sbCommonUtils.getTimeStamp();
		var monthStamp = ts.substring(0,6) + "00000000";
		var DirURI = "urn:scrapbook:item" + monthStamp;
		var fItem, fRes;
		if ( !sbDataSource.exists(sbCommonUtils.RDF.GetResource(DirURI)) )
		{
			fItem = sbCommonUtils.newItem(monthStamp);
			monthStamp.match(/^(\d{4})(\d{2})\d{8}$/);
			fItem.title = RegExp.$1 + "/" + RegExp.$2;
			fItem.type = "folder";
			fRes = sbDataSource.addItem(fItem, "urn:scrapbook:root", 0);
			sbDataSource.createEmptySeq(fRes.Value);
		}

		var timeStamp = ts.substring(0,8) + "000000";
		var targetURI = "urn:scrapbook:item" + timeStamp;
		if ( !sbDataSource.exists(sbCommonUtils.RDF.GetResource(targetURI)) )
		{
			fItem = sbCommonUtils.newItem(timeStamp);
			timeStamp.match(/^(\d{4})(\d{2})(\d{2})\d{6}$/);
			fItem.title = (new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10))).toLocaleDateString();
			fItem.type = "folder";
			fRes = sbDataSource.addItem(fItem, DirURI, 0);
			sbDataSource.createEmptySeq(fRes.Value);
		}

		var presetData = [
			null,
			null,
			{
				"images" : sbCommonUtils.getBoolPref("scrapbook.autosave.images", true),
				"styles" : sbCommonUtils.getBoolPref("scrapbook.autosave.styles", true),
				"script" : sbCommonUtils.getBoolPref("scrapbook.autosave.script", false)
			},
			null,
			null
		];

		if (sbCommonUtils.getBoolPref("scrapbook.autosave.ignore", false)) {
			var sv = window.alert;
			try {
				window.alert = function(s){ return s; };
				sbContentSaver.captureWindow(win, false, false, targetURI, 0, presetData, null);
			}
			finally {
				window.alert = sv;
			}
		} else {
			sbContentSaver.captureWindow(win, false, false, targetURI, 0, presetData, null);
		}

		this.CapturedURLs[url] = true;
	}
};

window.addEventListener("load", sbAutoSaveService.init, false);
