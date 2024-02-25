function saveAndSend1() {
  var ob = {
      name: document.getElementById('name').value
  };

  fetch('http://localhost:7080/subject?name=' + ob.name, {
      method: "post",
      mode: 'no-cors'
  })
  
  .then(response => console.log('Данные успешно отправлены'),alert("Пользователь успешно добавлен!"))
  .catch(error => console.error('Произошла ошибка при отправке данных:', error));
  fetchDataAndRenderTable1();
}

function fetchDataAndRenderTable1() {
  fetch('http://localhost:7080/subject')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = ''; // Очистить содержимое таблицы перед обновлением

      if (Array.isArray(data['all_subjects'])) {
        data['all_subjects'].forEach(subject => {
           // Добавим эту строку для отладки
          const row = `<tr>
                       <td>${subject.subjectName}</td>
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

function deleteUser1() {
  var ob = {
    name: document.getElementById('subjectName').value
  };
  fetch('http://localhost:7080/subject/:name/:id?name=' + ob.name, {
      method: "delete",
      
    })
    .then(response => {
      console.log('Предмет успешно удален');
      fetchDataAndRenderTable1(); // После удаления обновляем таблицу
    })
    .catch(error => {
      console.error('Произошла ошибка при удалении предмета:', error);
    });
}