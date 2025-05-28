import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Card } from "./common/Card";

type TCardModal = Pick<IProduct, 'category' | 'description' | 'image'>

export class CardModal extends Card<TCardModal> {
    protected productCategory: HTMLElement;
    protected productImage: HTMLImageElement;
    protected productDescription: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.productCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.productImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.productDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.cardButton.addEventListener('click', () => this.events.emit('basket:change', {id: this.cardId}));
    }

    set category(value: string) {
        this.setText(this.productCategory, value);
        this.productCategory.classList.remove('card__category_other', 'card__category_additional', 'card__category_button', 'card__category_hard', 'card__category_soft');
        switch(value) {
            case 'софт-скил':
                this.productCategory.classList.add('card__category_soft');
                break
            case 'другое':
                this.productCategory.classList.add('card__category_other');
                break
            case 'дополнительное':
                this.productCategory.classList.add('card__category_additional');
                break
            case 'кнопка':
                this.productCategory.classList.add('card__category_button');
                break
            case 'хард-скил':
                this.productCategory.classList.add('card__category_hard');
        };
    }

    set image(value: string) {
        this.setImage(this.productImage, value, this.title);
    }

    set description(value: string) {
        this.setText(this.productDescription, value);
    }

    changeButtonText(value: boolean) {
        if(value) {
            this.setText(this.cardButton, 'Убрать из корзины')
        } else {
            this.setText(this.cardButton, 'В корзину')
        }
    }

    changeActiveButton(value: boolean) {
        this.setDisabled(this.cardButton, value);
    }
}