const texts = [
    { name: "Пылесос", category: "VacuumCleaner" },
    { name: "Холодильник", category: "Fridge" },
    { name: "Кухонный комбайн", category: "FoodProcessor" },
    { name: "Утюг", category: "Iron" },
    { name: "Морозильник", category: "Freezer" },
    { name: "Телевизор", category: "Tv" },
    { name: "Аристон", category: "Ariston" },
    { name: "Стейк машина", category: "Steik" },
    { name: "Вафельница", category: "Waffli" },
    { name: "Блендер", category: "Blender" },
    { name: "Миксер", category: "Mikser" },
    { name: "Вытяжка", category: "Vitishka" },
    { name: "Стиральная машина", category: "Washing" },
    { name: "Кондиционер", category: "Condis" },
    { name: "Микроволновка", category: "Microvol" },
    { name: "Духовка", category: "Duhovka" },
    { name: "Газ плита", category: "Plita" },
    { name: "Тепловентилятор", category: "Heater" },
    { name: "Кофеварка", category: "Coffe" },
    { name: "Фритюрница", category: "Fryer" },
    { name: "Соковыжималка", category: "Socovij" },
    { name: "Электрическая мясорубка", category: "Miasorubka" },
    { name: "Электрический плита", category: "ElectricStove" },
    { name: "Электрический чайник", category: "Kettle" },
    { name: "Электрический нагреватель", category: "Nagrevatel" },
    { name: "Встраиваемая техника", category: "BuiltIn" },
    { name: "Отпариватель", category: "Otparivatel" },
    { name: "Посудомоечная машина", category: "Dishwasher" }
];
const containerCategory = document.querySelector('.content-text-left')
const cards = document.querySelector('.cards')
const cart_l = document.querySelector('.right-content h4')
const onclickFetch = 'https://66b47fde9f9169621ea332aa.mockapi.io/'


function displayCart() {
    const card = document.querySelector(".card");
    const cartString = localStorage.getItem('cart') || '';

    const cartArray = cartString ? cartString.split(';').map(item => {
        const [id, value] = item.split('|');
        return { id: parseInt(id, 10), value: decodeURIComponent(value) };
    }) : [];

    const cartLength = cartArray.length;
    console.log(cartLength, "Number of items in cart");

    if (cartLength === 0) {
        cart_l.style.display = 'block';
        cart_l.innerText = '0';
    } else {
        let i = 0;
        for (const el of cartArray) {
            i++;
            console.log(i, "Arsen ");
            cart_l.style.display = 'block';
            cart_l.innerText = i;
        }
    }
}

displayCart();





function Value(category) {
    fetch(onclickFetch + category)
        .then(res => res.json())
        .then((data) => {
            openCategory3()
            cards.innerHTML = ''

            for (const el of data) {
                if (el.length === 0) {
                    cards.innerHTML += `<h3>Пока что пусто</h3>`
                }
                cards.innerHTML += `
            <div class="card">
                <div class="img">
                    <img src="${el.image}" alt="${el.name}">
                </div>
                <div class="text-content-card">
                    <div class="name">
                        <h4><span>Названия</span>${el.name}</h4>
                    </div>
                    <div class="model">
                        <h5><span>Модель</span>${el.model}</h5>
                    </div>
                    <div class="country">
                        <h5><span>Страна</span>${el.country}</h5>
                    </div>
                    <div class="price">
                        <h3><span>Цена</span>${el.price}</h3>
                    </div>
                    <div class="button">
                        <button onclick='AddToCart2(
                            "${el.id}", 
                            "${el.values}", 
                          
                        )'>
                            Добавить корзину<i class="bi bi-cart4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;


            }

        })

}

for (const el of texts) {
    containerCategory.innerHTML += `<a onclick="Value('${el.category}')">${el.name}</a>`;
}

const base_url = 'https://66b47fde9f9169621ea332aa.mockapi.io/'
const categor = [
    {
        name: "Fridge"
    },
    {
        name: "VacuumCleaner"
    },
    {
        name: "Plita"
    },
    {
        name: "Washing"
    },

]


function Data() {
    for (const el of categor) {
        fetch(base_url + el.name)
            .then(res => res.json())
            .then((data) => {
                console.log(data, "Новый");
                for (const el of data) {
                    cards.innerHTML += `
                <div class="card">
                    <div class="img">
                        <img src="${el.image}" alt="${el.name}">
                    </div>
                    <div class="text-content-card">
                        <div class="name">
                            <h4><span>Названия</span>${el.name}</h4>
                        </div>
                        <div class="model">
                            <h5><span>Модель</span>${el.model}</h5>
                        </div>
                        <div class="country">
                            <h5><span>Страна</span>${el.country}</h5>
                        </div>
                        <div class="price">
                            <h3><span>Цена</span>${el.price}</h3>
                        </div>
                        <div class="button">
                            <button onclick='AddToCart2(
                                "${el.id}", 
                                "${el.values}", 
                              
                            )'>
                                Добавить корзину<i class="bi bi-cart4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;


                }

            })

    }
}
Data()
// Dom 
const input = document.querySelector('input');
const button = document.querySelector('#search');
const clear = document.querySelector('.search i')
function checkInputValue() {
    if (input.value.length > 0) {
        clear.style.display = 'none';
    } else {
        clear.style.display = 'none';
    }
}
input.addEventListener('input', checkInputValue);
checkInputValue();

clear.addEventListener('click', () => {
    input.value = ''
})

function Search() {
    button.addEventListener('click', () => {
        cards.innerHTML = '';
        for (const text of texts) {
            fetch(base_url + text.category)
                .then(res => res.json())
                .then((data) => {
                    console.log(data, "Kerezbekov");
                    for (const item of data) {
                        if (item.name.toLowerCase().includes(input.value.toLowerCase())) {
                            input.value = ''
                            cards.innerHTML += `
                                <div class="card">
                                    <div class="img">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <div class="text-content-card">
                                        <div class="name">
                                            <h4><span>Названия: </span>${item.name}</h4>
                                        </div>
                                        <div class="model">
                                            <h5><span>Модель: </span>${item.model}</h5>
                                        </div>
                                        <div class="country">
                                            <h5><span>Страна: </span>${item.country}</h5>
                                        </div>
                                        <div class="price">
                                            <h3><span>Цена: </span>${item.price}</h3>
                                        </div>
                                        <div class="button">
                                            <button onclick='AddToCart2(
                                "${item.id}", 
                                "${item.values}", 
                              
                            )'>
                                Добавить корзину<i class="bi bi-cart4"></i>
                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    }
                });
        }
    });
}

Search();

const success_message = document.querySelector('.succes-message')


function AddToCart2(id, value) {
    success_message.style.display = 'block'
    setTimeout(function() {
        success_message.style.display = 'none';
    }, 3000);
    let cartString = localStorage.getItem('cart') || '';
    const itemString = `${id}|${encodeURIComponent(value)}`;
    if (cartString) {
        cartString += ';' + itemString;
    } else {
        cartString = itemString;
    }
    localStorage.setItem('cart', cartString);
    // window.location.href = "cart.html";
    console.log(cartString);
    displayCart();

}
// Dom 
const buttonSearch = document.querySelector('.right-content button');
const formSearch = document.querySelector('.search');

function OpenButtons() {
    buttonSearch.addEventListener('click', () => {
        if (formSearch.style.display === 'none' || formSearch.style.display === '') {
            formSearch.style.display = 'block';
        } else {
            formSearch.style.display = 'none';
        }
    });
}

OpenButtons();


const buttonCategory = document.querySelector('.logo .burger-menu');
const openCategory = document.querySelector('.content-left');

function openCategory2() {
    buttonCategory.addEventListener('click', () => {
        if (openCategory.style.display === 'block') {
            openCategory.style.display = 'none';
        } else {
            openCategory.style.display = 'block';
        }
    });
}

openCategory2();
function openCategory3() {
        if (openCategory.style.display === 'block') {
            openCategory.style.display = 'none';
        } else {
            openCategory.style.display = 'block';
        }
}
