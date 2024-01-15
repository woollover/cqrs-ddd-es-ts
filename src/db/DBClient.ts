export type Item = {
  id: string;
  [key: string]: any;
};

export default class DBClient {
  private items: Item[] = [];

  constructor() {}
  // put
  public put(new_item: Item) {
    const item_index = this.items.findIndex((item) => item.id === new_item.id);
    if (item_index != -1) {
      this.items[item_index] = new_item;
    } else this.items.push(new_item);
  }

  // get
  public get(id: string) {
    return this.items.filter((item) => (item.id = id));
  }

  public getAll() {
    return this.items;
  }

  // delete
  public delete(id: string) {
    const item_index = this.items.findIndex((item) => item.id === id);
    if (item_index != -1) {
      this.items.splice(item_index, 1);
    } else {
      throw new Error("Item not found");
    }
  }
}
