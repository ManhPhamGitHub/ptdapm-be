const controllers = require('../../controllers/sendMailController') 
module.exports = function(app){
  app.route("/api/v1/sendmail").post(controllers.sendmail)
}
