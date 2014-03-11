"use strict";

var assert = require("assert"),

    Clumper = require("../lib/index.js");

describe("yui-clumper", function() {
    describe("Clumper class", function() {
        describe("_resolve()", function() {
            it("should return an array of modules", function() {
                var c = new Clumper({
                        _      : [ "template" ],
                        output : "."
                    }),
                    modules;
                    
                assert.doesNotThrow(function() {
                    modules = c._resolve();
                });
                
                assert(modules.length);
                assert.equal(modules.length, 10);
                assert.notEqual(modules[0].indexOf("index.js"), -1);
            });
        });
    });
});
