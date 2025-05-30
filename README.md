# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в приложении

Карточка товара

```
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}
```
Интерфейс для модели данных Каталога товаров

```
interface ICatalogData {
    preview: string | null;
    getProduct(id: string): IProduct;
    getProducts(): IProduct[];
    setProducts(items: IProduct[]): void
}
```
Интерфейс для модели данных Корзины

```
interface IBasketData {
    addItem(item: IProduct): void;
    deleteItem(id: string): void;
    getCounter(): number;
    getItems(): IProduct[];
    getItem(id: string): IProduct;
    hasItem(id: string): boolean;
    getTotalPrice(): number
    clearBasket(): void;
}
```
Данные пользователя для совершения заказа

```
interface IUser {
    payment: string;
    address: string;
    email: string;
    phone: string;
}
```
Интерфейс для модели данных пользователя
```
interface IUserData {
    errors: Partial<Record<keyof IUser, string>>;
    setUserData (data: Partial<IUser>): void;
    getUserData(): Partial<IUser>;
    checkUserValidation(): void;
    clearUserData(): void;
}
```
Данные для формы оформления заказа

```
type TOrderForm = Pick<IUser, 'payment' | 'address'>;
```
Данные для формы контактов

```
type TContactsForm = Pick<IUser, 'email' | 'phone'>;
```
Данные для отправки заказа на сервер
```
export interface IOrder extends IUser {
    total: number;
    items: string[];
}
```
Данные ответа от сервера на отправку заказа
```
export interface IOrderResult {
    id: string;
    total: number;
}
```
## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:
- слой данных отвечает за хранение и изменение данных;
- слой представления отвечает за отображение данных на странице;
- презентер отвечает за связь данных и представения;

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.\
Основные методы:
- `get` - выполняет `GET` запрос на переданный в параметрах эндпоинт и возвращает промис с объектом, которым ответил сервер.
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на эндпоинт, переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.\
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписаться на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

#### Класс Component
Абстрактный клас, позволяющий создавать компоненты представления. Является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод `render` для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. Содержит метод `render`, отвечающий за сохранение полученных в параметре данных в полях компонентов через сеттеры, возвращает обновленный контейнер компконента.
Методы:
- `toggleClass` - переключает CSS-класс у элемента
- `setText` - устанавливает текстовое содержимое элемента
- `setDisabled` - включает/выключает атрибут disabled
- `setHidden` - скрывает элемент (display: none)
- `setVisible` - показывает элемент (удаляет свойство display)
- `setImage` - устанавливает источник и альтернативный текст для изображения
- `render` - возвращает корневой DOM-элемент

### Слой данных

#### Класс CatalogData
Класс отвечает за хранение и работу с данными товаров.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- catalog: IProduct[] - массив карточек товаров
- _preview: string | null - id карточки, выбранной для просмотра в модальном окне
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных

Методы класса:
- getProduct(id: string): IProduct - возвращает один товар по id
- getProducts(): IProduct[]; - возвращает массив товаров
- setProducts(items: IProduct[]): void - заполняет массив карточек и вызывает событие изменения массива
- сеттер и геттер для свойства `preview`

#### Класс BasketData
Класс отвечает за хранение и работу с данными товаров, добавленных в корзину.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- basketItems: IProduct[] - массив карточек товаров
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных

Методы класса:
- addItem(item: IProduct): void - добавляет один товар в массив и вызывает событие изменения массива
- deleteItem(id: string): void - удаляет один товар из массива и вызывает событие изменения массива
- getCounter(): number - возвращает длину масива карточек товара
- getItem(id: string): IProduct - возвращает один товар из корзины по id
- getItems(): IProduct[] - возвращает массив товаров, находящихся в корзине
- hasItem(id: string): boolean - проверяет наличие товара в корзине
- getTotalPrice(): number - возвращает общую стоимость товаров в массиве
- clearBasket(): void - очищает массив товаров

#### Класс UserData
Класс отвечает за хранение и работу с данными пользователя.\
Конструктор класса принимает инстант брокера событий.\
В полях класса хранятся следующие данные:
- userData: IUser - данные пользователя
- _errors: - текст ошибки валидации
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных

Методы класса:
- setUserData (data: Partial<IUser>): void; - устанавливает данные пользователя
- getUserData(): Partial<IUser> - возвращает данные пользователя
- checkUserValidation(): void - проверяет валидацию данных пользователя
- clearUserData(): void - очищает данные пользователя

Геттер для свойства `errors`

### Слой представления
Все классы представления отвечают за отображение внутри контейнера (DOM элемент) передаваемых данных.

#### Класс Page
Реализует отображение главной страницы.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий.\
В конструкторе происходит поик необходимых элементов разметки и устанвливается слушатель на кнопку окрытия Корзины, в результате нажатия на которую генерируется соответствующее событие.

В метод `render` принимает данные, необходимые для отображения на галвной странице: массив элементов карточек товаров и счетчик Корзины.

Поля класса:
- productsCatalog: HTMLElement - контейнер для каталога товаров
- basketElement: HTMLButtonElement - кнопка Корзины
- counterElement: HTMLElement - элемент счетчика Корзины
- events: IEvents - брокер событий

Сеттеры для свойств:
- catalog
- counter

Методы класса:
- setLocked(value: boolean): void - блокирует прокрутку страницы, добавляя необходимый класс

#### Класс Modal
Реализует отображение модального окна.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поик необходимых элементов разметки и устанавливаются слушатели на клавиатуру для закрытия модального окна по Esc, на клик в оверлей и кнопку крестик для закрытия модального окна.

В метод `render` принимает элемент разметки, который отображает в контейнере, за который отвечает класс. 

Поля класса:
- closeButtonElement: HTMLButtonElement - кнопка закрытия
- contentElement: HTMLElement - контейнер для контента
- events: IEvents - брокер событий

Методы класса:
- open(): void - открывает модальное окно
- close(): void - закрывает модальное окно
- handleEscUp(evt:KeyboardEvent): void - обработчик нажатия на Esc

Расширяет родительский метод `render`, вызывая метод `open`

Сеттер для свойства `content` - устанавливает содержимое модального окна

#### Класс Card
Абстрактный класс, является дженериком и родителем всех компонентов, ргеализующих отображение карточки товара. В дженерик принимает тип объекта, в котором данные будут передаваться в метод `render` для отображения данных в компоненте. 
- constructor(container: HTMLElement) - конструктор принимает в качестве параметров корневой HTMLElement компонента (темплейт карточки товара для формирования разных вариантов верстки карточки).\
В конструкторе происходит поик необходимых элементов разметки.

Поля класса:
- productTitle: HTMLElement
- productPrice: HTMLElement
- cardId: number - id карточки товара

Сеттеры для свойств:
- title
- price
- id

Геттеры для свойств:
- id

#### Класс CardCatalog
Реализует отображение карточки товара в каталоге товаров. 
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки и устанвливается слушатель на кнопку, которой является сама карточка и генерируется соответствующее событие.

В метод `render` принимает данные, необходимые для отображения каточки товара в каталоге. 

Поля класса:
- productCategory: HTMLElement
- productImage: HTMLElement
- events: IEvents - брокер событий

Сеттеры для свойств:
- category
- image

#### Класс CardModal
Реализует отображение карточки товара в модальном окне. 
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки и устанвливается слушатель на кнопку добаления/удаления карточки и генерируется соответствующее событие.

В метод `render` принимает данные, необходимые для отображения каточки товара в модальном окне. 

Поля класса:
- productCategory: HTMLElement
- productImage: HTMLElement
- productDescription: HTMLElement
- cardButton: HTMLButtonElement
- events: IEvents - брокер событий

Сеттеры для свойств:
- category
- image
- description

Методы класса:
- changeButtonText(value: boolean): void - меняет текст кнопки
- changeActiveButton(value: boolean): void - меняет активность кнопки

#### Класс CardBasket
Реализует отображение карточки товара в корзине. 
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки и устанвливается слушатель на кнопку удаления карточки и генерируется соответствующее событие.

В метод `render` принимает данные, необходимые для отображения каточки товара в Корзине. 

Поля класса:
- idexElement: HTMLElement
- deleteButton: HTMLButtonElement
- events: IEvents - брокер событий

Сеттеры для свойств:
- index

#### Класс Basket
Реализует отображение Корзины товаров.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки и устанвливается слушатель на кнопку оформления заказа и генерируется соответствующее событие.

В метод `render` принимает данные, необходимые для отображения Корзины. 

Поля класса:
- itemsContainer: HTMLElement - контейнер для списка товаров
- totalElement: HTMLElement - элемент для общей стоимости Корзины
- buttonOrder: HTMLButtonElement - кнопка для оформления заказа

Сеттеры для свойств:
- itemsList
- total

Методы класса:
- changeActiveButton(value: boolean): void - меняет активность кнопки

#### Класс Form
Абстрактный класс, является дженериком и родителем всех компонентов, ргеализующих отображение форм. В дженерик принимает тип объекта, в котором данные будут передаваться в метод `render` для отображения данных в компоненте.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки и на форму устанвливаются слушатели событий `input`и `submit` и генерируются соответствующие события.

Поля класса:
- submitButton: HTMLButtonElement
- errorsElement: HTMLElement
- inputs: NodeListOf<HTMLInputElement>

Сеттеры для свойств:
- valid
- errors

#### Класс OrderForm
Реализует отображение формы оформления заказа.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий. В конструкторе происходит поиск необходимых элементов разметки. 

Поля класса:
- buttonsElement: HTMLButtonElement[]

Сеттеры для свойств:
- payment
- address

#### Класс FormContacts
Реализует отображение формы контактной информации.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и экземпляр класса `EventEmitter` для возможности инициации событий.

Сеттеры для свойств:
- phone
- email

#### Класс Success
Реализует отображение сообщения об успешной оплате.
- constructor(container: HTMLElement, events: IEvents) - конструктор принимает в качестве параметров корневой HTMLElement компонента и объект с обработчиком клика. В конструкторе происходит поиск необходимых элементов разметки, устанвливается слушатель на кнопку.

В метод `render` принимает данные, необходимые для отображения окна успеха. 

Поля класса:
- orderDescription: HTMLElement
- buttonElement: HTMLButtonElement

Сеттеры для свойств:
- total

### Слой коммуникации
#### Класс AppApi
Наследуется от базового класса Api, предоставляет методы реализующие взаимодействие с бэкэндом сервиса:

Методы класса:
- gretCagrdList(): Promise - получение массива карточек с сервера
- orderProducts(order: IOgrdegr): Promise - отправка данных заказа на сервер

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, опкисанных в `index.ts`.\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

Список всех событий, которые могут генерироваться в системе:\
*События изменения данных (генерируются классами моделями данных)*
- `cards:changed` - изменение массива карточек товаров в каталоге
- `basket:changed` - изменение массива карточек товаров в корзине
- `card:selected` - изменение открываемой в модальном окне карточки
- `user:changed` - изменение данных пользователя

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `basket:open` - открытие Корзины в модальном окне
- `order:open` - клик по кнопке "Оформить" в корзине
- `card:select` - выбор карточки для отображения в модальном окне
- `basket:change` - клик на добавление/удаление карточки из корзины
- `modal:open` - открытие модальнорго окна
- `modal:close` - закрытие модальнорго окна
- `card:delete` - клик в Корзине на удаление карточки
- `order:submit` - открытие формы контактных данных
- `contacts:submit` - отправка заказа на сервер
- `payment:change` - изменение способа оплаты
- `order.adress:change` - изменение данных в поле ввода адреса
- `contacts.email:change` - изменение данных в поле ввода почты
- `contacts.phone.change` - изменение данных в поле ввода ьелефона