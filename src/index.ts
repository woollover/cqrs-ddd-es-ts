import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DBClient from "./db/DBClient";
import EventStoreClient from "./EventStore/EventStoreClient";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const ReadDB = new DBClient();
const WriteDB = new DBClient();
const EventStore = new EventStoreClient();

app.get("/", (req: Request, res: Response) => {
  res.send("CQRS Boilerplate");
});

app.post("/command", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({
    message: `command received at : ${Date.now()}`,
    received_body: req.body,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
