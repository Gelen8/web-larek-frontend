export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ICatalogData {
    preview: string | null;
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
    getTotalPrice(): number
}

export type TMethodOfPayment = 'online' | 'cash';

export interface IUser {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IUserData {
    error: string;
    setUserData (data: IUser): void;
    getUserData(): IUser;
    checkUserValidation(data: Partial<IUser>): boolean
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