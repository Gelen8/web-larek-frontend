import { TOrderForm } from "../types";
import { ensureAllElements } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class OrderForm extends Form<TOrderForm> {
    protected buttonsElement: HTMLButtonElement[];

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.buttonsElement = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);

        this.buttonsElement.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit('payment:change', {button: button.name})
            });
        });
    }

    set address(value: string) {
        this.inputs.forEach(input => {
            if(input.name === 'address') {
                input.value = value;
            };
        });
    }

    set payment(value: string) {
        this.buttonsElement.forEach((button) => {
            this.toggleClass(button, 'button_alt-active', button.name === value)
        });
    }
}