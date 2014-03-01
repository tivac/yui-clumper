/*jshint node:true */
"use strict";

module.exports = {
    modules : {
        position : 0,
        help     : "YUI modules to package together",
        required : true,
        list     : true
    },

    output : {
        string  : "-o DIR, --output=DIR",
        help    : "Directory to write package to",
        default : "."
    }
};
