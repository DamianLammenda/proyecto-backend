import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false,
};

const mongoConnect = async () => {
  let MONGO_URI;
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
  const MONGO_QUERY = process.env.MONGO_QUERY;
  const MONGO_HOST = process.env.MONGO_HOST;

  if (!MONGO_USER) {
    MONGO_URI = `${process.env.MONGO_URI}/${MONGO_DB_NAME}`;
  } else {
    MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`;
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    console.info(`Connected to Mongodb with the user ${MONGO_USER}`);
  } catch (err) {
    console.error(err);
  }
};

export default mongoConnect;
