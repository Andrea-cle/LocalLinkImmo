import initDocRoutes from "./doc.route.js";
import initHomeRoutes from "./home.route.js";
import initUserRoutes from "./user.route.js";
import initContactRoutes from "./contact.route.js";

const initRoutes = (app) => {
  initDocRoutes(app);
  initHomeRoutes(app);
  initUserRoutes(app);
  initContactRoutes(app);
};

export default initRoutes;
