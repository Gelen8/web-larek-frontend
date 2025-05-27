import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Card } from "./common/Card";

interface ICardBasket {
    index: number;
}

export class CardBasket extends Card<ICardBasket> {
    protected idexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected events: IEvents;
    
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.idexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButton.addEventListener('click', () => this.events.emit('card:delete', {card: this}))
    }

    set index(value: number) {
        this.setText(this.idexElement, value);
    }
}