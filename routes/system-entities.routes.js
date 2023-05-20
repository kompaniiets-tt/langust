const controller = require('../controllers/system-entities.controller');
const authenticate = require('../middleware/authenticate');

module.exports = function (app) {
    app.get("/welcome",   (req, res) => {
        res.status(200).send("Welcome 🙌 ");
      });
    app.post('/create-entity', authenticate, controller.createEntity);
    app.get('/entities', authenticate, controller.getEntities);
    app.delete('/clearDB', controller.clearDB);
}