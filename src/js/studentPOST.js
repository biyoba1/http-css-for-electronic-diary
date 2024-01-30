function saveAndSend() {
    var ob = {
        name: document.getElementById('name').value,
        secondName: document.getElementById('secondName').value,
        patronymic: document.getElementById('patronymic').value
    };

    fetch('http://localhost:7080/users?name=' + ob.name + '&secondName=' + ob.secondName + '&patronymic=' + ob.patronymic, {
        method: "post",
        mode: 'no-cors'
    })
    .then(response => console.log('Данные успешно отправлены'),alert("Пользователь успешно добавлен!"))
    .catch(error => console.error('Произошла ошибка при отправке данных:', error));
    fetchDataAndRenderTable();
}

function fetchDataAndRenderTable() {
    fetch('http://localhost:7080/users')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Очистить содержимое таблицы перед обновлением
  
        if (Array.isArray(data['All students'])) {
          data['All students'].forEach(student => {
            const row = `<tr>
                          <td>${student.secondName}</td>
                          <td>${student.name}</td>
                          <td>${student.patronymic}</td>
                        </tr>`;
            tableBody.innerHTML += row;
          });
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }