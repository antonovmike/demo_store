import app from "./server.js";
import initDb from "./db/init.js";
import { Error } from "sequelize";

const PORT = 1337;

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    });
  } catch (err: any) {
    console.error("Failed to initialize application:", err.message);
    console.error(err.stack);
    process.exit(1); // End the process with error
  }
})();
