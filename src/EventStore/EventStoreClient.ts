import Event from "../events/Event";

export default class EventStoreClient {
  private items: Event[] = [];

  constructor() {}
  // put
  public put(new_item: Event) {
    this.items.push(new_item);
  }

  // get
  public get(id: string, offset: number = 0) {
    return this.items.filter(
      (item) => item.id == id && item.offset && item.offset > offset
    );
  }

  public getAllAggregateEvents(aggregate_root_id: string, offset: number = 0) {
    return this.items.filter(
      (item) =>
        item.aggregate_root_id == aggregate_root_id &&
        item.offset && // useless but Typescript yells
        item.offset > offset
    );
  }

  public getAll() {
    return this.items;
  }

  public getOffset() {
    return this.items.length;
  }
}
