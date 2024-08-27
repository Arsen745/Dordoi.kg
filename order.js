const url = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
const cart = document.querySelector('.order .left-content');
const cart2 = document.querySelector('.order .right-content');

let count = 1;

function getOrder() {
    let orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && orders.length > 0) {
        let order = orders[0];
        fetch(url + order.value + "/" + order.id)
            .then(res => res.json())
            .then((data) => {
                const price = parseFloat(data.price);

                cart.innerHTML = `
                    <div class="img-content">
                        <img src="${data.image}" alt="">
                    </div>
                    <div class="text-content">
                        <h4>${data.name}</h4>
                        <h4><span>Модель: </span>${data.model}</h4>
                        <h4><span>Страна: </span>${data.country}</h4>
                        <h4><span>О товаре: </span>${data.description}</h4>
                        <h4><span>Цена: </span><span class="price">${price}</span></h4>
                        <div class="buttons">
                            <button class="add-button">+</button>
                            <h4 class="count">1</h4>
                            <button class="prev-button">-</button>
                        </div>
                    </div>
                `;

                cart2.innerHTML = `
                    <div class="content-right-chek">
                        <div class="summa">
                            <h1>Сумма заказа</h1>
                        </div>
                        <div class="content-number">
                            <h4><span>Общее количество: </span><span class="count-price">1 шт</span> </h4>
                            <h4><span>Стоимость: </span><span class="total-price">${data.price}</span></h4>
                            <h4><span>Доставка: </span>0</h4>
                            <h4><span>Скидка: </span>0</h4>
                        </div>
                        <div class="price">
                            <span>К оплате:</span>
                            <h2>${price * count}<span>KGZ</span></h2>
                        </div>
                        <div class="button">
                            <button onClick = 'OpenRegis()'>Купить<span>(${count})</span></button>
                        </div>
                    </div>`;

                document.querySelector('.add-button').addEventListener('click', () => updateCount(1, price));
                document.querySelector('.prev-button').addEventListener('click', () => updateCount(-1, price));
            });
    } else {
        cart.innerHTML = '<p>Нет заказов</p>';
    }
}

function updateCount(change, price) {
    const countElement = document.querySelector('.count');
    const priceElement = document.querySelector('.price h2');
    const countCart = document.querySelector(".count-price");
    const countButton = document.querySelector('.button button span');
    count += change;
    if (count < 1) count = 1;
    countElement.innerText = count;
    priceElement.innerHTML = `${(price * count).toFixed(0)}<span>KGZ</span>`;
    countCart.innerText = `${count} шт`;
    countButton.innerText = `(${count})`;
}

getOrder();

function OpenRegis() {
    window.location.href = 'registration.html'
}
