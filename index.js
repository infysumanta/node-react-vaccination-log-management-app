require("dotenv").config();
require("./config/db").connectDB();
const config = require("./config");
const app = require("./app");

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
