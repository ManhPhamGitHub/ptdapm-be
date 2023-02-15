const controllers = require('../controllers/testController') 
module.exports = function(app){
  app.route("/send").post(controllers.sendmail)
}
