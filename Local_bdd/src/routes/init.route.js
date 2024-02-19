import initDocRoutes from "./doc.route.js";
import initHomeRoutes from "./home.route.js";
import initUserRoutes from "./user.route.js";

const initRoutes = (app) => {
  initDocRoutes(app);
  initHomeRoutes(app);
  initUserRoutes(app);
};

export default initRoutes;
