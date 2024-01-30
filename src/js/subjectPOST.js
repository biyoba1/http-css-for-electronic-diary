function saveAndSendForSubject() {
    var ob1 = {
        name: document.getElementById('name').value,
    };

    fetch('http://localhost:7080/subject?name=' + ob1.name, {
        method: "post",
        mode: 'no-cors'
    })
    .then(response => console.log('Данные успешно отправлены'),alert("Предмет успешно добавлен!"))
    .catch(error => console.error('Произошла ошибка при отправке данных:', error));
}

