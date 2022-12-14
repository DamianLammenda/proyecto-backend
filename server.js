//import app
import http from "./app.js";

//Descomentar abajo para probar la conexión a mongo

//import mongoConnect from './src/config/mongo.config.js';
// mongoConnect();

//Descomentar abajo para probar la conexión a firebase

// import app from "./src/config/firebase.config.js";
// app;

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.info(`server up and running on port: ${PORT}`));
