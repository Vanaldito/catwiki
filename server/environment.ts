import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, ".env.local") });

const env = {
  API_KEY: process.env.API_KEY as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
};

export default env;
