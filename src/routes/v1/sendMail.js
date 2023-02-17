const controllers = require('../../controllers/sendMailController') 
module.exports = function(app){
    console.log("da vao routes");
  app.route("/api/v1/sendmail").post(controllers.sendmail)
}
