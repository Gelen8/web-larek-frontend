import { ICatalogData, IProduct } from "../types";
import { IEvents } from "./base/events";

export class CatalogData implements ICatalogData {
    protected products: IProduct[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(items: IProduct[]): void {
        this.products = items;
        this.events.emit('cards:changed');
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProduct(id: string): IProduct {
        return this.products.find(item => item.id === id);
    }

    set preview(id: string | null) {
        if(!id) {
            this._preview = null;
            return;
        };

        const selectedCard = this.getProduct(id);

        if(selectedCard) {
            this._preview = id;
            this.events.emit('card:selected');
        }
    }

    get preview() {
        return this._preview;
    }
}