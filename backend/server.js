import express from "express";
import userRoutes from "./Routes/user.router.js";
import movieRoutes from "./Routes/movie.route.js";
import tvRoutes from "./Routes/tv.route.js";
import path from "path";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); //Allow us to parse req.body
app.use(cookieParser()); // Allow to access cookies

const port = ENV_VARS.PORT;
const __dirname = path.resolve();
//Router
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
if (ENV_VARS.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); //Our React App
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at PORT ${port} `);
});
