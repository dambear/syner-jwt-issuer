import dotenv from "dotenv";
dotenv.config();

import express from "express";
import auth from "./modules/auth/auth.route";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Use the user routes
app.use("/api/auth", auth);


const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
