import app from "./server.js";
import initDb from "./db/init.js";

const PORT = 1337;

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
})();
