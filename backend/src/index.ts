import "reflect-metadata";
import express, { Application} from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./config/data-source.js";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
import routes from "./routes/index.js";

dotenv.config()

const PORT = process.env.PORT || 8000;

const app: Application = express();


app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use('/doc-gpt', routes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) =>     {
    console.log("Unable to connect to db", error)
    process.exit(1);
  })

