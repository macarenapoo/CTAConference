cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
    	"file": "plugins/org.apache.cordova.NetworkManager/www/network-information.js",
        "id": "org.apache.cordova.NetworkManager.NetworkManager",
        "clobbers": [
            "navigator.connection"
        ]
    }
]
});