/*jshint node:true */
"use strict";

var argv =
        require("nomnom")
            .script("clumper")
            .options(require("../args.js"))
            .parse(process.argv.slice(2)),

    Clumper = require("../lib/");

(new Clumper(argv)).run(function(err) {
    if(err) {
        process.stderr.write(err);

        return process.on("exit", function() {
            process.exit(1);
        });
    }
});
