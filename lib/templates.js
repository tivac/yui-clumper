"use strict";

var fs = require("fs");

module.exports = {
    module : function(module) {
        return fs.readFileSync("./templates/module.js", "utf8").replace("<%= module %>", module);
    },
    
    package : function(template, details) {
        var pkg = JSON.parse(fs.readFileSync(template, "utf8"));
        
        pkg.name        = details.name;
        pkg.version     = details.version;
        pkg.description = pkg.description.replace("<%= modules %>", details.modules.join(", "));
        
        if(details.dependencies) {
            pkg.dependencies = details.dependencies;
        }
        
        return pkg;
    }
};
