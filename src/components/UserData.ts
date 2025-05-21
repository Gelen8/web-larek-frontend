import { IUser, IUserData, TMethodOfPayment } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUserData {
    protected userData: IUser;
    protected _error: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData(data: IUser): void {
        this.userData = data
        this.events.emit('user:changed');
    }

    // protected isPayment(value: string): value is TMethodOfPayment {
    //     return ['online' , 'cash'].includes(value);
    // }

    getUserData(): IUser {
        return {...this.userData};
    }

    checkUserValidation(data: Partial<IUser>): boolean {
        for (const [key, value] of Object.entries(data)) {
        if (!value) {
            switch (key) {
                case 'payment':
                    this._error = 'Выберите тип оплаты';
                    return false;
                case 'address':
                    this._error = 'Введите адрес';
                    return false;
                case 'email':
                    this._error = 'Введите почту';
                    return false;
                case 'phone':
                    this._error = 'Введите номер телефона';
                    return false;
            }
        }
    }
    return true;
    }

    get error() {
        return this._error
    }
}