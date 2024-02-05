import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import DBClient from "./db/DBClient";
import EventStoreClient from "./EventStore/EventStoreClient";
import EventEmitter from "events";
import { CommandEventListener } from "./handlers/CommandEventListener";
import { DomainEventsListener } from "./handlers/EventListener";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

export const ReadDB = new DBClient();
export const WriteDB = new DBClient();
export const EventStore = new EventStoreClient();

const eventEmitter = new EventEmitter();

const commandBroker = new CommandEventListener(eventEmitter);
const eventBroker = new DomainEventsListener(eventEmitter, EventStore, ReadDB);

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
app.get("/write_db_debug", (req: Request, res: Response) => {
  const assets = WriteDB.getAll();

  res.send({
    data: assets,
  });
});
app.get("/event_store_db", (req: Request, res: Response) => {
  const events = EventStore.getAll();

  res.send({
    data: events,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
