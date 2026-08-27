var TTLoader = {
	endCallback: null,
	loadedData: null,
	landscapeMode: true,
	skipPlayButton: true,
	completed: false,
	progressVal: 0,
	create: function(callback, landscape, skipButton) {
		TTLoader.endCallback = callback;
		TTLoader.landscapeMode = landscape;
		TTLoader.skipPlayButton = true;
		TTLoader.completed = false;
		var pc = document.getElementById("progress_container");
		if (pc) {
			pc.style.background = "#000";
			pc.style.backgroundColor = "#000";
			pc.style.display = "block";
			pc.style.zIndex = "1000";
		}
		var pr = document.getElementById("progress");
		if (pr) {
			pr.style.background = "transparent";
			pr.style.backgroundColor = "transparent";
		}
	},
	setSizes: function() {
		var pc = document.getElementById("progress_container");
		if (!pc) return;
		var rect = (typeof Utils !== 'undefined' && Utils.getWindowRect) ? Utils.getWindowRect() : { width: window.innerWidth, height: window.innerHeight };
		pc.style.width = rect.width + "px";
		pc.style.height = rect.height + "px";
	},
	showLoadProgress: function(val) {
		TTLoader.progressVal = val;
	},
	loadComplete: function(data) {
		TTLoader.loadedData = data;
		TTLoader.close();
	},
	close: function() {
		if (TTLoader.completed) return;
		TTLoader.completed = true;
		var pc = document.getElementById("progress_container");
		if (pc) pc.style.display = "none";
		var sc = document.getElementById("screen_container");
		if (sc) sc.style.display = "block";
		var sbc = document.getElementById("screen_background_container");
		if (sbc) sbc.style.display = "block";
		if (typeof TTLoader.endCallback === "function") {
			TTLoader.endCallback(TTLoader.loadedData);
		}
	}
};
