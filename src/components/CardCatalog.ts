import { IProduct} from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Card } from "./Card";

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>

export class CardCatalog extends Card<TCardCatalog> {
    protected productCategory: HTMLElement;
    protected productImage: HTMLImageElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.productCategory = ensureElement<HTMLElement>('.card__category', container);
        this.productImage = ensureElement<HTMLImageElement>('.card__image', container) as HTMLImageElement;

        this.container.addEventListener('click', () => this.events.emit('card:select', {card: this}));
    }

    set category(value: string) {
        this.setText(this.productCategory, value);
    }

    set image(value: string) {
        this.setImage(this.productImage, value, this.title);
    }
}