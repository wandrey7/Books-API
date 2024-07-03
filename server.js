const sequelize = require("./database/db");
const app = require("./index");
const PORT = process.env.SERVER_PORT || 3000;

const startServer = async () => {
  try {
    sequelize.options.logging = false;
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to synchronize the database");
    process.exit(1);
  }
};

startServer();
