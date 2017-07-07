var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url  = require('url');
var connection = mysql.createConnection({

    host :'localhost',
    user : 'root',
    password: 'root123',
    database: 'develop_db'
});

/* GET users listing. */

router.get('/insert',function (req, res, next) {

    var querydata = url.parse(req.url, true).query;

    var post = {
        user_id: querydata.user_Id,
        user_name: querydata.user_Name,
        user_mob_no: querydata.user_mob_No,
        user_district: querydata.user_District,
        user_lb_type: querydata.user_lb_Type,
        user_lb: querydata.user_Lb,
        user_type: querydata.user_Type,
        user_mail_id: querydata.user_mail_Id,
        user_gcm_reg_id: querydata.user_gcm_reg_Id
    };
    connection.query('INSERT INTO user_citizen SET ?', post, function (error, rows, fields) {

        if (!!error) {

            console.log('Error in insertion',error);
            res.send('Error in insertion');
        }
        else {
            console.log('Inserted successfully');
            res.send('Success');
        }

    })


});


router.get('/replogin', function(req, res, next) {

    var querydata = url.parse(req.url, true).query;
    var sql = 'SELECT * FROM user_citizen WHERE user_mob_no = ? AND user_password = ?';

    connection.query(sql, [querydata.mob_no, querydata.pass],function (error,rows,fields) {

        if(!!error){

            var json = JSON.stringify({
                message: "Invalid Login..!"
            });
            res.send(json);
        }
        else{

            if(rows.length>0){
                var json = JSON.stringify({
                    message: "Login Success..!"
                });
                res.send(json);
            }
            else {
                var json = JSON.stringify({
                    message: "Invalid Login..!"
                });
                res.send(json);
            }

        }

    })

});


  router.get('/selectLocalbody', function(req, res, next) {
      var querydata = url.parse(req.url, true).query;
      var sql = 'SELECT lb_name FROM local_body WHERE lb_district = ? AND lb_type = ?';

      connection.query(sql, [querydata.lb_district, querydata.lb_type],function (error,rows,fields) {


          if(!!error){

              console.log('Error in data retrieve');
              var json = JSON.stringify({
                  res_msg: "Failed"
              });
              res.send(json);
          }
          else{
              console.log("Request handler random was called.");
              var otherObject =rows;
              var json = JSON.stringify({
                  lbList: otherObject,
                  res_msg: "Success"
              });
              res.send(json);
              //res.send('Successfull query');
          }


      })

  //res.send('respond with a resource');
});
router.get('/repList', function(req, res, next) {
    var querydata = url.parse(req.url, true).query;
    var sql = 'SELECT * FROM user_rep WHERE rep_lb_type = ? AND rep_lb_name = ?';

    connection.query(sql, [querydata.rep_lb_type, querydata.rep_lb_name],function (error,rows,fields) {

        if(!!error){

            console.log('Error in data retrieve');
            var json = JSON.stringify({
                res_msg: "Failed"
            });
            res.send(json);
        }
        else{
            console.log("Request handler random was called.");
            var otherObject =rows;
            var json = JSON.stringify({
                lbList: otherObject,
                res_msg: "Success"
            });
            res.send(json);
            //res.send('Successfull query');
        }


    })

    //res.send('respond with a resource');
});

router.get('/driverList', function(req, res, next) {

    connection.query("SELECT * FROM driver_master",function (error,rows,fields) {

        if(!!error){

            console.log('Error in data retrieve');
            var json = JSON.stringify({
                res_msg: "Failed"
            });
            res.send(json);
        }
        else{
            console.log("Request handler random was called.");
            var otherObject =rows;
            var json = JSON.stringify({
                driverList: otherObject,
                res_msg: "Success"
            });
            res.send(json);
            //res.send('Successfull query');
        }

    })

    //res.send('respond with a resource');
});


connection.connect(function(error){

    if(!!error){

        console.log('FAILED');

    }
    else{
        console.log('SUCCESS');

    }
});
module.exports = router;
