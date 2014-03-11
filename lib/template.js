"use strict";

var fs = require("fs"),
    
    templates = {
        module : fs.readFileSync("./templates/module.js", "utf8"),
        pkg    : require("../templates/package.json")
    };

module.exports = {
    module : function(module) {
        return templates.module.replace("<%= module %>", module);
    },
    
    package : function(details) {
        throw new Error("Implement template.package() method");
        
        return templates.pkg;
    }
};
