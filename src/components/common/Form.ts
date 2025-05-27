import { ensureElement } from "../../utils/utils";
import { Componet } from "../base/Component";
import { IEvents } from "../base/events";

interface IFormState {
    valid: boolean;
    error: string;
}

export abstract class Form<T> extends Componet<IFormState> {
    protected submitButton: HTMLButtonElement;
    protected errorElement: HTMLElement;
    protected inputs: NodeListOf<HTMLInputElement>;
    protected events: IEvents;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);
        this.events = events;

        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');

        this.container.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit(`${container.name}:submit`, this.getInputValues());
        });

        this.container.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.events.emit(`${container.name}.${String(field)}:change`, {
                field,
                value
            })
        })
    }

    getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set error(value: string) {
        this.setText(this.errorElement, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, error, ...inputs} = state;
        super.render({valid, error});
        Object.assign(this, inputs);
        return this.container;
    }
}