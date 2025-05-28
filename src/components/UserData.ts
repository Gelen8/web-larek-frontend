import { IUser, IUserData } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUserData {
    protected userData: Partial<IUser>;
    protected _errors: Partial<Record<keyof IUser, string>>;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData(data: Partial<IUser>): void {
        this.userData = {
            ...this.userData,
            ...data
        };
        this.events.emit('user:changed');
    }

    getUserData(): Partial<IUser> {
        return {...this.userData};
    }

    checkUserValidation(): void {
        this._errors = {};

        if(!this.userData.payment) {
            this._errors.payment = 'Выберите тип оплаты';
        } else if(!this.userData.address) {
            this._errors.address = 'Введите адрес';
        } else if(!this.userData.email) {
            this._errors.email = 'Введите почту';
        } else if(!this.userData.phone) {
            this._errors.phone = 'Введите номер телефона';
        };
    }

    clearUserData() {
        this.userData = {};
    }

    get errors() {
        return this._errors
    }
}