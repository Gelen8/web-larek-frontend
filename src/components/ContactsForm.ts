import { TContactsForm } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class ContactsForm extends Form<TContactsForm> {

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        this.inputs.forEach(input => {
            if(input.name === 'email') {
                input.value = value;
            }
        })
    }

    set phone(value: string) {
        this.inputs.forEach(input => {
            if(input.name === 'phone') {
                input.value = value;
            }
        })
    }
}