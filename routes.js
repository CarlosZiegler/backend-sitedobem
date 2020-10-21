const express = require("express");
const passport = require('passport');
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const VacancyController = require("./controllers/VacancyController");
const ProfessionalController = require("./controllers/ProfessionalController");

const routes = express.Router();

//Documentation for Swagger https://github.com/fliptoo/swagger-express 
//http://localhost:3000/api-docs

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create a user
 *       
 */
routes.post("/signup", passport.authenticate('signup', { session: false }), AuthController.store);

/**
 * @swagger
 * /login:
 *  post:
 *    description: Sign in with email and password
 *       
 */
routes.post("/login", AuthController.index);

/**
 * @swagger
 * /user:
 *  get:
 *    description: access the route only with valid token
 *       
 */
routes.get("/user", passport.authenticate('jwt', { session: false }), UserController.show);
/**
 * @swagger
 * /user:
 *  post:
 *    description: access the route only with valid token
 *       
 */
routes.put("/user/update", passport.authenticate('jwt', { session: false }), UserController.update);
/**
 * @swagger
 * /vacancies:
 *  get:
 *    description: get all vacancies
 *       
 */
routes.get("/vacancies", VacancyController.index);
/**
 * @swagger
 * /vacancy:
 *  post:
 *    description: access the route only with valid token
 *       
 */
routes.get("/vacancy/:id", VacancyController.show);

/**
 * @swagger
 * /vacancies?search:
 *  get:
 *    description: access the route only with valid token
 *       
 */

// TODO implements in controller
routes.get("/vacancies?search=input", VacancyController.show);
/**
 * @swagger
 * /vacancy/create:
 *  post:
 *    description: access the route only with valid token
 *       
 */
routes.post("/vacancy/create", passport.authenticate('jwt', { session: false }), VacancyController.store);
/**
 * @swagger
 * /vacancy/update:
 *  post:
 *    description: update a vacancy with Id
 *       
 */
routes.put("/vacancy/update/:id", passport.authenticate('jwt', { session: false }), VacancyController.update);
/**
 * @swagger
 * /vacancy/update:
 *  post:
 *    description: update a vacancy with Id
 *       
 */
routes.delete("/vacancy/delete/:id", passport.authenticate('jwt', { session: false }), VacancyController.destroy);

/**
 * @swagger
 * /professionals:
 *  get:
 *    description: access the route only with valid token
 *       
 */
routes.get("/professionals", passport.authenticate('jwt', { session: false }), ProfessionalController.index);
/**
 * @swagger
 * /professional/:id:
 *  get:
 *    description: access the route only with valid token
 *       
 */
routes.get("/professional/:id", passport.authenticate('jwt', { session: false }), ProfessionalController.show);
/**
 * @swagger
 * /professional/create:
 *  post:
 *    description: access the route only with valid token
 *       
 */
routes.post("/professional/create", passport.authenticate('jwt', { session: false }), ProfessionalController.store);
/**
 * @swagger
 * /professional/update/:id:
 *  put:
 *    description: update a Profissional with Id
 *       
 */
routes.put("/professional/update/:id", passport.authenticate('jwt', { session: false }), ProfessionalController.update);
/**
 * @swagger
 * /professional/delete/:id:
 *  delete:
 *    description: update a Profissional with Id
 *       
 */
routes.delete("/professional/delete/:id", passport.authenticate('jwt', { session: false }), ProfessionalController.destroy);


module.exports = routes;
