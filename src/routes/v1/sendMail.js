const controllers = require('../../controllers/sendMailController') 
module.exports = function(app){
  app.route("/").post(controllers.sendmail)
}
