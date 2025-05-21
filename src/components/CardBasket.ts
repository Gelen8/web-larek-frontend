import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Card } from "./Card";

export interface TCardBasket {
    index: number;
}

export class CardBasket extends Card<TCardBasket> {
    protected idexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected events: IEvents;
    
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.idexElement = ensureElement('.basket__item-index', container);
        this.deleteButton = ensureElement('.basket__item-delete', container) as HTMLButtonElement;

        this.deleteButton.addEventListener('click', () => this.events.emit('card:delete'))
    }

    set index(value: number) {
        this.setText(this.idexElement, value);
    }
}