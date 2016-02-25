
module.exports = {
    echo:function(successCallback,errorCallback,strInput) {
/*		
        if(!strInput || !strInput.length) {
            errorCallback("Error, something was wrong with the input string. =>" + strInput);
        }
        else {
            successCallback(strInput + "echo");
        }
*/		
        var res = SQLite.Proxy.SQLiteProxy.echo(strInput);
        if(res.indexOf("Error") == 0) {
            errorCallback(res);
        }
        else {
            successCallback(res);
        }

    }
};

//require("cordova/exec/proxy").add("EchoPlugin", module.exports);
cordova.commandProxy.add("EchoPlugin", module.exports);
