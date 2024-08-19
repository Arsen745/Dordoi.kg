function displayCart() {
    const url = 'https://66b47fde9f9169621ea332aa.mockapi.io/';
    const card = document.querySelector(".card");
    let cartString = localStorage.getItem('cart') || '';

    if (!cartString) {
        card.innerHTML = '<p>Вашa корзина пустa</p>';
        return;
    }

    const cartArray = cartString.split(';').map(item => {
        const [id, value] = item.split('|');
        return { id: parseInt(id, 10), value: decodeURIComponent(value) };
    });

    if (cartArray.length === 0) {
        card.innerHTML = '<p>Вашa корзина пустa</p>';
    } else {
        card.innerHTML = ''; 
        cartArray.forEach((el, index) => {
            fetch(url + el.value + "/" + el.id)
                .then(res => res.json())
                .then((data) => {
                    card.innerHTML += `
                        <div class="card2" data-index="${index}">
                            <div class="content-img">
                                <img src="${data.image}" alt="">
                            </div>
                            <div class="text-content-card">
                                <h1>${data.name}</h1>
                                <h2><span>Модель: </span>${data.model}</h2>
                                <h4><span>Страна: </span>${data.country}</h4>
                                <p><span>Характеристики: </span>${data.description}</p>
                                <h3><span>Цена: </span>${data.price}</h3>
                                <div class="button">
<a href="#" onclick="Order('${data.values}', ${data.id})">Оформить заказ</a>
                                    <a href="#" class="delete-item" data-id="${el.id}" data-value="${el.value}">Удалить из корзины</a>
                                </div>
                            </div>
                        </div>`;

                    document.querySelectorAll('.delete-item').forEach(button => {
                        button.addEventListener('click', function (event) {
                            event.preventDefault();
                            const idToDelete = this.getAttribute('data-id');
                            const valueToDelete = this.getAttribute('data-value');
                            deleteItemFromCart(idToDelete, valueToDelete);
                        });
                    });
                });
        });
    }
}
const success_message_delete = document.querySelector('.suucess-delete')

function deleteItemFromCart(id, value) {
    success_message_delete.style.display = 'block'
    setTimeout(function () {
        success_message_delete.style.display = 'none';
    }, 2000);
    let cartArray = localStorage.getItem('cart').split(';').filter(item => {
        const [itemId, itemValue] = item.split('|');
        return itemId !== id || decodeURIComponent(itemValue) !== value;
    });

    localStorage.setItem('cart', cartArray.join(';'));
    displayCart();
}


displayCart();

function Order(value, id) {
    localStorage.removeItem('orders');
    let orders = [{ id: id, value: value }];
    localStorage.setItem('orders', JSON.stringify(orders));
    window.location.href = "order.html"
}



