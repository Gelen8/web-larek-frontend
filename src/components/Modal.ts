import { ensureAllElements, ensureElement } from "../utils/utils";
import { Componet } from "./base/Component";
import { IEvents } from "./base/events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Componet<IModal> {
    protected closeButtonElement: HTMLButtonElement;
    protected contentElement: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButtonElement.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this);

    }

    set content (value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        document.removeEventListener('keyup', this.handleEscUp);
        this.events.emit('modal:close');
    }

    handleEscUp(evt: KeyboardEvent) {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}