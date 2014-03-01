/*jshint node:true */
"use strict";

var fs = require("fs"),
    
    template = fs.readFileSync("./lib/module.tmpl", "utf8");

module.exports = function(module) {
    return template.replace("<%= module %>", module);
};
