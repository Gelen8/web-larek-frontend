import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Componet } from "../base/Component";


type TCard = Pick<IProduct, 'id' | 'title' | 'price'> 

export abstract class Card<T = {}> extends Componet<TCard & T> {
    protected productTitle: HTMLElement;
    protected productPrice: HTMLElement;
    protected cardId: string;

    constructor(container: HTMLElement) {
        super(container);

        this.productTitle = ensureElement<HTMLElement>('.card__title', this.container);
        this.productPrice = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.setText(this.productTitle, value);
    }

    set price(value: number) {
        if(value === null) {
            this.setText(this.productPrice, `Бесценно`);
        } else {
            this.setText(this.productPrice, `${value} синапсов`);
        };
    }

    set id(value: string) {
        this.cardId = value;
    }

    get id() {
        return this.cardId;
    }
}