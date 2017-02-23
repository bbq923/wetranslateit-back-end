var Page = require('../models/page');
var request = require('request');
var fs = require('fs');
var express = require('express');
var html;
var fn; // fileName

module.exports = {
    search: function(req, res) { // search by page URL. move of register and then move whether page exists.
        console.log(req.body);
        Page.findOne({src: req.body.src}
        , function(err, existingPage) {

            if (existingPage){
                fn = existingPage._id;
                return res.status(200).send({message: '번역 중인 페이지 입니다.', source: req.body.src, modifiedUrl: fn});
            }
            
            var page = new Page(req.body);

            page.save(function (err, result) {
                if(err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                fn = result._id;
                res.status(200).send({message: '아직 번역되고 있지 않은 페이지 입니다. 새로 번역을 시작해보세요!', source: req.body.src, modifiedUrl: fn});
            })
        })
    },
    get: function (req, res) {
        Page.find({}).exec(function(err, result) {
            res.send(result);
        });
    },
    save: function (req, res) { // mongoDB에 url이 저장된 document의 ObjectId를 파일이름으로 하여 HTML 파일을 저장한다.
        request({
            uri: req.body.src,
        }, function(error, response, body) {
            console.log(body);
            fs.writeFile(__dirname + '/pages/' + fn + '.html', body, { flag: 'w' }, function(err) {
                if(err) throw err;
                console.log('File write completed 파일 쓰기 끝났음');
            })
        });
    },
    show: function (req, res) {
        res.sendFile(__dirname + '/pages/' + fn + '.html');
    },
    translate: function (req, res) {
        
    }
}