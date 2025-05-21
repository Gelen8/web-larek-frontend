import { IProduct } from "../types";
import { cloneTemplate, ensureElement } from "../utils/utils";
import { Componet } from "./base/Component";
import { IEvents } from "./base/events";

export type TCard = Pick<IProduct, 'id' | 'title' | 'price'> 

export abstract class Card<T = {}> extends Componet<TCard & T> {
    protected container: HTMLElement;
    protected productTitle: HTMLElement;
    protected productPrice: HTMLElement;
    protected cardId: string;

    constructor(container: HTMLElement) {
        super(container);

        this.productTitle = ensureElement<HTMLElement>('.card__title', container);
        this.productPrice = ensureElement<HTMLElement>('.card__price', container);
    }

    set title(value: string) {
        this.setText(this.productTitle, value);
    }

    get title() {
        return this.productTitle.textContent || '';
    }

    set price(value: number) {
        this.setText(this.productPrice, value);
    }

    set id(value: string) {
        this.cardId = value;
    }

    get id() {
        return this.cardId;
    }
}