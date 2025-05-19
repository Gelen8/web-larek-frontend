export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface ICatalogData {
    getProduct(id: string): IProduct;
    setProducts(items: IProduct[]): void

}

export type TBasketItem = Pick<IProduct, 'id' | 'title' | 'price'>;

export interface IBasketData {
    addItem(item: TBasketItem): void;
    deleteItem(id: string): void;
    getCounter(): number;
    getItems(): TBasketItem[];
    getItem(id: string): TBasketItem;
    hasItem(id: string): boolean;
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