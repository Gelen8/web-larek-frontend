import { AppApi } from './components/AppApi';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { BasketData } from './components/BasketData';
import { CardBasket } from './components/CardBasket';
import { CardCatalog } from './components/CardCatalog';
import { CardModal } from './components/CardModal';
import { CatalogData } from './components/CatalogData';
import { ContactsForm } from './components/ContactsForm';
import { Modal } from './components/Modal';
import { OrderForm } from './components/OrderForm';
import { Page } from './components/Page';
import { Success } from './components/Success';
import { UserData } from './components/UserData';
import './scss/styles.scss';
import { IOrder, IUser } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter;

const api = new AppApi(CDN_URL, API_URL);

const catalogData = new CatalogData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const pageContainer = ensureElement<HTMLElement>('.page__wrapper');
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const cardModal = new CardModal(cloneTemplate(cardModalTemplate), events);
const page= new Page(pageContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const modal = new Modal(modalContainer, events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                }
            });

events.on('cards:changed', () => {
    const cardsArray = catalogData.getProducts().map((card) => {
        const cardInstance = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
        return cardInstance.render(card);
    });
    page.render({
        catalog: cardsArray
    });
});

events.on('card:select', (data: {id: string}) => {
    catalogData.preview = data.id;
});

events.on('card:selected', () => {
    const product = catalogData.getProduct(catalogData.preview);
    const content = cardModal.render(product);

    if(basketData.hasItem(catalogData.preview)) {
        cardModal.changeButtonText(true);
    } else {
        cardModal.changeButtonText(false);
    };

    if(product.price === null) {
        cardModal.changeActiveButton(true);
    } else {
        cardModal.changeActiveButton(false);
    };

    modal.render({
        content: content
    });
});

events.on('basket:change', (data: {id: string}) => {
    const product = catalogData.getProduct(data.id);

    if(basketData.hasItem(product.id)) {
        basketData.deleteItem(product.id);
    } else {
        basketData.addItem(product);
    };

    modal.close();
});

events.on('basket:changed', () => {
    page.counter = basketData.getCounter();
    const total = basketData.getTotalPrice();
    const itemsList = basketData.getItems().map((item, index) => {
        const cardInstance = new CardBasket(cloneTemplate(cardBasketTemplate), events);
        return cardInstance.render({...item, index: index + 1})
    });

    if(itemsList.length) {
        basket.changeActiveButton(false);
    } else {
        basket.changeActiveButton(true);
    };

    basket.render({
        itemsList: itemsList,
        total: total
    }); 
});

events.on('basket:open', () => {
    
    modal.render({
        content: basket.render()
    });
});

events.on('card:delete', (data: {id: string}) => {
    basketData.deleteItem(data.id);
})

events.on('order:open', () => {
    const content = orderForm.render({valid: false, error: '', payment: '', address: ''});
    modal.render({
        content: content
    });
});

events.on('user:changed', () => {
    const dataUser = userData.getUserData();
    userData.checkUserValidation();
    const {payment, address, email, phone} = userData.errors;

    const validOrder = !payment && !address;
    const errorOrder = Object.values({payment, address}).filter(i => !!i).join('');
    console.log(errorOrder)
    orderForm.render({...dataUser, valid: validOrder, error: errorOrder});

    const validContacts = !email && !phone;
    const errorContacts = Object.values({email, phone}).filter(i => !!i).join('');
    contactsForm.render({...dataUser, valid: validContacts, error: errorContacts});
});

events.on('payment:change', (data: {button: string}) => {
    userData.setUserData({'payment': data.button});
    
});

events.on(/^([^.]+)\.([^.:]+):change$/, (data: { field: keyof IUser, value: string }) => {
    userData.setUserData({[data.field]: data.value});
});

events.on('order:submit', () => {
    const content = contactsForm.render({valid: false, error: '', phone: '', email: ''});
    modal.render({
        content: content
    });
});

events.on('contacts:submit', () => {
    const dataUser = userData.getUserData();
    const order = dataUser as IOrder;
    const total = basketData.getTotalPrice();
    const items = basketData.getItems().map(item => item.id);
    order.total = total;
    order.items = items;
    
    api.orderProducts(order)
        .then((data) => {
            basketData.clearBasket();
            userData.clearUserData();
            modal.render({
                content: success.render({
                    total: data.total
                })
            })
        })
        .catch((err) => console.log(err))
});

events.on('modal:open', () => {
    page.setLocked(true);
});

events.on('modal:close', () => {
    page.setLocked(false);
});

api.getCardList()
    .then((cards) => {
        catalogData.setProducts(cards)
    })
    .catch((err) => {
        console.log(err)
    })