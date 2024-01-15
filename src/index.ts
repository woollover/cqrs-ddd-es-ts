import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DBClient from "./db/DBClient";
import EventStoreClient from "./EventStore/EventStoreClient";
import { CommandRouter } from "./command_router/CommandRouter";
import EventEmitter from "events";
import { CommandEventListener } from "./handlers/CommandEventListener";
import { DomainEventsListener } from "./handlers/EventListener";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const ReadDB = new DBClient();
const WriteDB = new DBClient();
const EventStore = new EventStoreClient();

const eventEmitter = new EventEmitter();

const commandBroker = new CommandEventListener(eventEmitter);
const eventBroker = new DomainEventsListener(eventEmitter);

/**
 * The commandsEventListener listens for commands and mimics a command bus, it will handle each command
 */
commandBroker.registerCommandEventListener();
/**
 * The eventBroker will collect the domain events and handles them
 */
eventBroker.registerDomainEventListener();

/**
 * Endpoints
 */
app.get("/", (req: Request, res: Response) => {
  res.send("CQRS Boilerplate");
});

app.post("/command", (req: Request, res: Response) => {
  /**
   * It emits an event that will handle the commands in the CommandHandler
   */
  const r = eventEmitter.emit(req.body.command_name, req.body);

  res.send({
    message: `command received at : ${Date.now()}`,
    received_body: req.body,
  });
});

app.get("/assets", (req: Request, res: Response) => {
  const assets = ReadDB.getAll();

  res.send({
    data: assets,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
