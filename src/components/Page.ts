import { ensureElement } from "../utils/utils";
import { Componet } from "./base/Component";
import { IEvents } from "./base/events";

interface IPage {
    catalog: HTMLElement[];
    counter: number;
    locked: boolean;
}

export class Page extends Componet<IPage> {
    protected productsCatalog: HTMLElement;
    protected basketElement: HTMLButtonElement;
    protected counterElement: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.productsCatalog = ensureElement<HTMLElement>('.gallery', this.container);
        this.basketElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

        this.basketElement.addEventListener('click', () => this.events.emit('basket:open'));
    }

    set catalog(items: HTMLElement[]) {
        this.productsCatalog.replaceChildren(...items);
    }

    set counter(value: number) {
        this.setText(this.counterElement, value);
    }

    setLocked(value: boolean) {
        if (value) {
            this.container.classList.add('page__wrapper_locked');
        } else {
            this.container.classList.remove('page__wrapper_locked');
        }
    }
}