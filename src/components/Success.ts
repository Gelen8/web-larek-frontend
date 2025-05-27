import { ensureElement } from "../utils/utils";
import { Componet } from "./base/Component";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Componet<ISuccess> {
    protected orderDescription: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, action: ISuccessActions) {
        super(container);

        this.orderDescription = ensureElement<HTMLElement>('.order-success__description', container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', container);
        
        if(action.onClick) {
            this.buttonElement.addEventListener('click', action.onClick)
        }
    }

    set total(value: number) {
        this.setText(this.orderDescription, `Списано ${value} синапсов`);
    }
}