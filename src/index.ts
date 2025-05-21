import { AppApi } from './components/AppApi';
import { EventEmitter } from './components/base/events';
import { BasketData } from './components/BasketData';
import { CardBasket } from './components/CardBasket';
import { CardCatalog } from './components/CardCatalog';
import { CardModal } from './components/CardModal';
import { CatalogData } from './components/CatalogData';
import { UserData } from './components/UserData';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter;

const api = new AppApi(CDN_URL, API_URL);

const catalogData = new CatalogData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardCatalogContainer = cloneTemplate(cardCatalogTemplate);

const cardModalTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardModalContainer = cloneTemplate(cardModalTemplate);

const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardBasketContainer = cloneTemplate(cardBasketTemplate);

const testCard = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "index": 3,
    "title": "+1 час в сутках",
    "price": 750
};

//Тестирование 

// Тестирование моделей данных и апи
// const testUser = {
//     "payment": "online",
//     "email": "",
//     "phone": "+71234567890",
//     "address": "Spb Vosstania 1",
// }

// catalogData.setProducts(testCards);
// const arr = catalogData.getProducts();
// console.log(arr)
// console.log(catalogData.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
// catalogData.preview = "854cef69-976d-4c2a-a18c-2aa45046c390";
// console.log(catalogData.preview)

// userData.setUserData(testUser);
// console.log(userData.getUserData())
// console.log(userData.checkUserValidation(testUser))
// console.log(userData.error)

// api.getCardList()
//     .then((cards) => {
//         catalogData.setProducts(cards)
//         console.log(catalogData.getProducts())
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// const order = {
//     "payment": "online",
//     "email": "test@test.ru",
//     "phone": "+71234567890",
//     "address": "Spb Vosstania 1",
//     "total": 2200,
//     "items": [
//         "854cef69-976d-4c2a-a18c-2aa45046c390",
//         "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
//     ]
// }

// api.orderProducts(order)
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err))




//Тестирование классов представления Карточки
// const testSection = document.querySelector('.gallery')

// const cardCatalog = new CardCatalog(cardCatalogContainer, events);
// testSection.append(cardCatalog.render(testCard));
// const cardModal = new CardModal(cardModalContainer, events);
// testSection.append(cardModal.render(testCard));
// const cardBasket = new CardBasket(cardBasketContainer, events);
// testSection.append(cardBasket.render(testCard));
