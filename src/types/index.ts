export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ICatalogData {
    _preview: string | null;
    getProduct(id: string): IProduct;
    getProducts(): IProduct[];
    setProducts(items: IProduct[]): void
}

export interface IBasketData {
    addItem(item: IProduct): void;
    deleteItem(id: string): void;
    getCounter(): number;
    getItems(): IProduct[];
    getItem(id: string): IProduct;
    hasItem(id: string): boolean;
    getTotalPrice(items: IProduct[]): number
}

export type TMethodOfPayment = 'Онлайн' | 'При получении';

export interface IUser {
    payment: TMethodOfPayment;
    address: string;
    email: string;
    phone: string;
}

export interface IUserData {
    setField (data: Record<keyof IUser, string>): void;
    getUser(): IUser;
    isPayment(value: string): value is TMethodOfPayment;
    checkUserValidation(data: Record<keyof IUser, string>): boolean
}

export type TOrderForm = Pick<IUser, 'payment' | 'address'>;

export type TContactsForm = Pick<IUser, 'email' | 'phone'>;

export interface IOrder extends IUser {
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}