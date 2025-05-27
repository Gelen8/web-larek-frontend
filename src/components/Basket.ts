import { createElement, ensureElement } from "../utils/utils";
import { Componet } from "./base/Component";
import { IEvents } from "./base/events";

interface IBasket {
    itemsList: HTMLElement[];
    total: number;
}

export class Basket extends Componet<IBasket> {
    protected itemsContainer: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonOrder: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.itemsContainer = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.buttonOrder.addEventListener('click', () => this.events.emit('order:open'));
    }

    set itemsList(items: HTMLElement[]) {
        if(items.length) {
            this.itemsContainer.replaceChildren(...items);
        } else {
            this.itemsContainer.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set total(value: number) {
        this.setText(this.totalElement, `${value} синапсов`);
    }

    changeActiveButton(value: boolean) {
        this.setDisabled(this.buttonOrder, value);
    }
}