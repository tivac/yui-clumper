"use strict";

var fs   = require("fs"),
    path = require("path"),

    Y     = require("yui").use("loader"),
    shell = require("shelljs"),
    
    templates = require("./templates"),
    
    loader = Y.Env._loader,
    Clumper;

Clumper = module.exports = function Clumper(args) {
    this._modules = args._;
    this._args    = args;
};

Clumper.prototype = {
    _resolve : function() {
        var resolved;
        
        loader.require(this._modules);

        resolved = loader.resolve(true).js;
        
        // Stick core YUI on node functionality in there
        resolved.unshift(path.resolve(__dirname, "../node_modules/yui/index.js"));

        this._resolved = resolved;
    },
    
    _copy : function() {
        var self = this,
            base = path.resolve(__dirname, "../node_modules/yui");

        this._resolved.forEach(function(file) {
            var dest = path.join(self._args.output, path.relative(base, file));
            
            shell.mkdir("-p", path.dirname(dest));
            
            shell.cp("-f", file, dest);
            shell.cp("-f", file.replace("-min.js", ".js"), dest);
        });
    },

    _create : function() {
        var self = this;

        this._modules.forEach(function(module) {
            var file = templates.module(module);

            fs.writeFileSync(path.join(self._args.output, module + ".js"), file);
        });
    },
    
    _package : function() {
        var yui     = require("../node_modules/yui/package.json"),
            details = {
                name    : this._args.name || "it-is-a-mystery",
                version : yui.version,
                modules : this._modules
            },
            request;
        
        request = this._modules.some(function(module) {
            return module.indexOf("io") > -1 ||
                   module.indexOf("get") > -1;
        });
        
        if(request) {
            details.dependencies = {
                // Copy exact YUI request version
                request : yui.dependencies.request
            };
        }
        
        fs.writeFileSync(
            path.join(this._args.output, "/package.json"),
            JSON.stringify(templates.package(this._args.template, details), null, 2),
            "utf8"
        );
    },

    run : function(done) {
        this._resolve();
        this._copy();
        this._create();
        this._package();

        done();
    }
};
