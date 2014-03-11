"use strict";

module.exports = {
    filters : {
        string  : "-f FILTER, --filter=FILTER",
        help    : "YUI file versions to include",
        list    : true,
        default : [ "min" ]
    },
    
    modules : {
        position : 0,
        help     : "YUI modules to package together",
        required : true,
        list     : true
    },
    
    name : {
        string : "-n NAME, --name=NAME",
        help   : "Name to write into package.json"
    },

    output : {
        string  : "-o DIR, --output=DIR",
        help    : "Directory to write clumped package to",
        default : "."
    },
    
    template : {
        string  : "-t TEMPLATE, --template=TEMPLATE",
        help    : "Package.json template file",
        default : "./templates/package.json"
    }
};
