/**
 * Farm Frenzy 2 - Offline / GitHub Pages External API Layer
 * Replaces remote portal network APIs with browser LocalStorage & safe stubs.
 */
var ExternalAPI = {
    type: "local",
    storageKey: "farm_frenzy_2_savestate",
    mixer: null,

    init: function(options, callback) {
        if (typeof callback === "function") {
            callback();
        }
        return true;
    },

    exec: function(method) {
        if (method === "exec" || typeof ExternalAPI[method] !== "function") {
            return undefined;
        }
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return ExternalAPI[method].apply(ExternalAPI, args);
    },

    check: function() {
        return false;
    },

    // --- LocalStorage Save / Load System ---
    getStorageSupport: function() {
        try {
            var testKey = "__storage_test__";
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    },

    saveGameData: function(data) {
        try {
            var rawData = (typeof data === "string") ? data : JSON.stringify(data);
            window.localStorage.setItem(ExternalAPI.storageKey, rawData);
            return true;
        } catch (e) {
            console.warn("ExternalAPI: Save failed", e);
            return false;
        }
    },

    loadGameData: function(callback) {
        try {
            var rawData = window.localStorage.getItem(ExternalAPI.storageKey);
            if (typeof callback === "function") {
                callback(rawData);
            }
            return true;
        } catch (e) {
            console.warn("ExternalAPI: Load failed", e);
            if (typeof callback === "function") {
                callback(null);
            }
            return false;
        }
    },

    saveUserData: function(data) {
        return ExternalAPI.saveGameData(data);
    },

    loadUserData: function(callback) {
        return ExternalAPI.loadGameData(callback);
    },

    store: function(action, params) {
        if (action === "save" && params && params.data) {
            return ExternalAPI.saveGameData(params.data);
        } else if (action === "load" && typeof params === "function") {
            return ExternalAPI.loadGameData(params);
        }
        return false;
    },

    // --- Audio Session Hooks ---
    setMixer: function(mixer) {
        ExternalAPI.mixer = mixer;
    },

    pauseSounds: function() {
        var mixer = ExternalAPI.mixer || window.mixer;
        if (mixer && mixer.channels) {
            try {
                for (var i = 0; i < mixer.channels.length; i++) {
                    if (mixer.channels[i] && typeof mixer.channels[i].pause === "function") {
                        mixer.channels[i].pause();
                    }
                }
            } catch (e) {}
        }
    },

    resumeSounds: function() {
        var mixer = ExternalAPI.mixer || window.mixer;
        if (mixer && mixer.channels) {
            try {
                for (var i = 0; i < mixer.channels.length; i++) {
                    if (mixer.channels[i] && typeof mixer.channels[i].resume === "function") {
                        mixer.channels[i].resume();
                    }
                }
            } catch (e) {}
        }
    },

    // --- Localization ---
    getLanguage: function() {
        var lang = (navigator.language || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
        var supported = ["en", "ru", "pt", "it", "es", "fr", "de"];
        return supported.indexOf(lang) >= 0 ? lang : "en";
    },

    // --- UI, Ads & Portal Feature Stubs ---
    isPortalEnvironment: function() { return false; },
    isPlainPortalEnvironment: function() { return false; },
    showAds: function() {},
    sendGAEvent: function() {},
    trackGameEvent: function() {},
    showCompanyLogo: function(callback) {
        if (typeof callback === "function") callback();
        return true;
    },
    showWelcomeScreen: function(stage, config) {
        return false;
    },
    showHighScores: function() {},
    submitScores: function() {},
    submitScore: function() {},
    levelStarted: function() {},
    levelEnded: function() {},
    addLogo: function() { return null; },
    addKiz10Logo: function() { return null; },
    showCopyright: function() { return null; },
    getMoreGamesButtonDisable: function() { return true; },
    getPreloaderURL: function() { return ""; },
    getMoreGamesURL: function() { return ""; },
    customMoreGames: function() { return true; },
    purchase: function(item, onSuccess, onFail) {
        if (typeof onSuccess === "function") onSuccess();
    }
};