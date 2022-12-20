import http from "./app.js";
import mongoConnect from "./src/config/mongo.config.js";

if (process.env.DATACORE === "MONGO") {
  (async () => {
    await mongoConnect();
  })();
}

if (process.env.DATACORE === "FIREBASE") {
  (async () => {
    await import("./src/config/firebase.config.js");
  })();
}

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.info(`server up and running on port: ${PORT}`));
