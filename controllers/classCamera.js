var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.validateLogin = function (req, resp, reqBody) {
	try {
        if (!reqBody) throw new Error("Input not valid");        
        var data = JSON.parse(reqBody);
        if (data) {//add more validations if necessary
            var sql = "SELECT * FROM Admin WHERE AdminId='" + data.usrName +"' AND Password='"+ data.pwd +"'";
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                	httpMsgs.sendJson(req, resp, data);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.getList = function (req, resp) {
    db.executeSql("SELECT * FROM class", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.get = function (req, resp, classId) {
    db.executeSql("SELECT * FROM class WHERE classId=" + classId, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.add = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {//add more validations if necessary
            var sql = "INSERT INTO class (ClassId,RoomNo,Semester,Branch,Section,CameraIP,ClassLaptop) VALUES ";
            sql += util.format("(%d, %d, %d, '%s', '%s', '%s', '%s') ", data.ClassId, data.RoomNo, data.Semester,data.Branch,data.Section,data.CameraIP,data.ClassLaptop);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
    
};

exports.update = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.ClassId) throw new Error("ClassId not provided");

            var sql = "UPDATE class SET ";
            
            var isDataProvided = false;
            if (data.RoomNo) {
                sql += "RoomNo = " + data.RoomNo + ",";
                isDataProvided = true;
            }
            if (data.Semester) {
                sql += "Semester = " + data.Semester + ",";
                isDataProvided = true;
            }
            if (data.Branch) {
                sql += "Branch = '" + data.Branch + "',";
                isDataProvided = true;
            }
            if (data.Section) {
                sql += "Section = '" + data.Section + "',";
                isDataProvided = true;
            }
            if (data.CameraIP) {
                sql += "CameraIP = '" + data.CameraIP + "',";
                isDataProvided = true;
            }
            if (data.ClassLaptop) {
                sql += "ClassLaptop = '" + data.ClassLaptop + "',";
                isDataProvided = true;
            }
            
            if (!isDataProvided) throw new Error("No data provided to update");

            sql = sql.slice(0, -1); //remove last comma
            sql += " WHERE ClassId = " + data.ClassId;

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.ClassId) throw new Error("ClassId not provided");
            
            var sql = "DELETE FROM Class ";
            sql += " WHERE ClassId = " + data.ClassId;
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};