var Page = require('../models/page');
var Translation = require('../models/translation');
var request = require('request');
var fs = require('fs');
var express = require('express');
var html;
var fn; // fileName

module.exports = {
    translate: function (req, res) {
        Page.findOne({src: req.body.src})
        Translation.findOne({articleid: req.body.articleid, 
            uniqueselector: req.body.uniqueselector}, function (err, existingTranslation) {
                if (existingTranslation) {
                    existingTranslation.text = req.body.text;
                }

                var trans = new Translation(req.body);

                trans.save(function (err, result) {
                    if (err) {
                        console.log(err.message);
                    }
                })
            })
    }
}