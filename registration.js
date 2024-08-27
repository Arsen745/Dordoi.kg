// Dom
const name1 = document.querySelector("#name1")
const number = document.querySelector("#number")
const comment = document.querySelector("#comment")
const button = document.querySelector("button")

const baseUrl = 'https://669fa4ceb132e2c136fe972e.mockapi.io/api/v1/order'


function fetchData(number, name, comment) {
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number,
            name: name,
            comment: comment
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'index.html'
    })

}
button.addEventListener(('click'), () => {
    let hasError = false;

    if (number.value.trim().length === 0) {
        number.style.border = '1px solid red'
        hasError = true
    } else {
        number.style.border = ''; 
    }
    if (name1.value.trim().length === 0) {
        name1.style.border = '1px solid red'
        hasError = true

    } else {
        name1.style.border = ''; 
    }
    if (comment.value.trim().length === 0) {
        comment.style.border = '1px solid red'
        hasError = true

    }
    else {
        comment.style.border = ''; 
    }
    if(!hasError) {

        fetchData(name1.value, number.value, comment.value)
        name1.value = ''
        number.value = ''
        comment.value = ''
    }
})


