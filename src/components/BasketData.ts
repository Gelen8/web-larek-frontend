import { IBasketData, IProduct } from "../types";
import { IEvents } from "./base/events";

export class BasketData implements IBasketData {
    protected basketItems: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.basketItems = [];
    }

    addItem(item: IProduct): void {
        this.basketItems.push(item);
        this.events.emit('basket:changed');
    }

    deleteItem(id: string): void {
        this.basketItems = this.basketItems.filter(item => item.id !== id);
        this.events.emit('basket:changed');
    }

    getItems(): IProduct[] {
        return this.basketItems;
    }

    getCounter(): number {
        return this.basketItems.length;
    }

    getItem(id: string): IProduct {
        return this.basketItems.find(item => item.id === id);
    }

    hasItem(id: string): boolean {
        return this.getItem(id) ? true : false;
    }

    getTotalPrice(): number {
        return this.basketItems.reduce((prev, item) => prev + item.price, 0);
    }
}