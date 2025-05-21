import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Card } from "./Card";

export type TCardModal = Pick<IProduct, 'category' | 'description' | 'image'>

export class CardModal extends Card<TCardModal> {
    protected productCategory: HTMLElement;
    protected productImage: HTMLImageElement;
    protected productDescription: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.productCategory = ensureElement('.card__category', container);
        this.productImage = ensureElement('.card__image', container) as HTMLImageElement;
        this.productDescription = ensureElement('.card__text', container)
        this.cardButton = ensureElement('.card__button', container) as HTMLButtonElement;

        this.cardButton.addEventListener('click', () => this.events.emit('basket:change', {card: this}));
    }

    set category(value: string) {
        this.setText(this.productCategory, value);
    }

    set image(value: string) {
        this.setImage(this.productImage, value, this.title);
    }

    set description(value: string) {
        this.setText(this.productDescription, value);
    }

    changeButtonText(value: boolean) {
        if(value) {
            this.setText(this.cardButton, 'Убрать из корзины')
        } else {
            this.setText(this.cardButton, 'В корзину')
        }
    }
}