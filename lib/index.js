"use strict";

var fs   = require("fs"),
    path = require("path"),

    Y     = require("yui").use("loader"),
    shell = require("shelljs"),
    
    template = require("./template"),
    
    loader = Y.Env._loader,
    Clumper;

Clumper = module.exports = function Clumper(args) {
    this._modules = args._;
    this._output  = args.output;
};

Clumper.prototype = {
    _resolve : function() {
        var modules;

        loader.require(this._modules);

        modules = loader.resolve(true).js;

        // Stick core YUI on node functionality in there
        modules.unshift(path.resolve(__dirname, "../node_modules/yui/index.js"));

        return modules;
    },

    _copy : function(files) {
        var self = this,
            base = path.resolve(__dirname, "../node_modules/yui");

        files.forEach(function(file) {
            var dest = path.join(self._output, path.relative(base, file));
            
            shell.mkdir("-p", path.dirname(dest));
            shell.cp("-f", file, dest);
        });
    },

    _create : function() {
        var self = this;

        this._modules.forEach(function(module) {
            var file = template(module);

            fs.writeFileSync(path.join(self._output, module + ".js"), file);
        });
    },

    run : function(done) {
        var files = this._resolve();

        this._copy(files);
        this._create();

        done();
    }
};
