var http = require("http");
var httpMsgs = require("./httpMsgs");
var settings = require("../settings");
var cam = require("../controllers/classCamera");

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === "/cameras") {
                cam.getList(req, resp);
            }
            else {
                var camnoPatt = "[0-9]+";
                var patt = new RegExp("/cameras/" + camnoPatt);
                if (patt.test(req.url)) {
                    patt = new RegExp(camnoPatt);
                    var camno = patt.exec(req.url);
                    cam.get(req, resp, camno);
                }
                else {
                    httpMsgs.show404(req, resp);
                }                
            }
            break;
        case "POST":
            if (req.url === "/cameras") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {                    
                    cam.add(req, resp, reqBody);
                });
            }
            else if (req.url === "/login") {
                var reqBody = '';                
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {
                    cam.validateLogin(req, resp, reqBody);
                });
            } 
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "PUT":
            if (req.url === "/cameras") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {
                    cam.update(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (req.url === "/cameras") {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) { //10MB
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on('end', function () {
                    cam.delete(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});