const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const sequelize = require("./src/db/index");
const user = require("./src/routes/user.routes");
const task = require("./src/routes/task.routes");

const app = express();
env.config();

app.use(express.json());

app.use(helmet());
app.use(cors());

// Connect to PostgreSQL
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized with the database.");
  })
  .catch((err) => {
    console.error("Error syncing models with the database:", err);
  });

app.use("/user", user);
app.use("/task", task);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
