import { IUser, IUserData } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUserData {
    protected userData: Partial<IUser>;
    protected _error: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData(data: Partial<IUser>): void {
        this.userData = {
            ...this.userData,
            ...data
        };

        if(this.hasKey(data, ['payment', 'address'])) {
            this.events.emit('user-order:changed');
        } else {
            this.events.emit('user-contacts:changed');
        };
    }

    protected hasKey(data: object, keys: string[]) {
        return keys.some(key => Object.keys(data).includes(key));
    }

    getUserData(): Partial<IUser> {
        return {...this.userData};
    }

    checkOrderValidation(): boolean {
        if((this.userData.payment && this.userData.address) || (this.userData.email && this.userData.phone)) {
            this._error = '';
            return true
        } else if(!this.userData.payment) {
            this._error = 'Выберите тип оплаты';
            return false
        } else if(!this.userData.address) {
            this._error = 'Введите адрес';
            return false
        };
    }

    checkContactsValidation(): boolean {
        if(this.userData.email && this.userData.phone) {
            this._error = '';
            return true
        } else if(!this.userData.email) {
            this._error = 'Введите почту';
            return false
        } else if(!this.userData.phone) {
            this._error = 'Введите номер телефона';
            return false
        };
    }

    clearUserData() {
        this.userData = {};
    }

    get error() {
        return this._error
    }
}