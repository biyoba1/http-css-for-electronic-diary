let students = [];
async function fetchStudents() {
  const response = await fetch('http://localhost:7080/users');
  const studentsResponse = await response.json();
  console.log(studentsResponse);
  students = studentsResponse["all_students"].map(item => {
    const { name, secondName, patronymic } = item;
    return `${secondName} ${name} ${patronymic}`;
  });
  console.log(students);
  return students;
}

let subjects = [];
async function fetchSubjects() {
  const response = await fetch('http://localhost:7080/subject');
  const subjectResponse = await response.json();
  console.log(subjectResponse);
  subjects = subjectResponse["all_subjects"].map(item => {
    const { subjectName } = item;
    return `${subjectName}`;
  });
  console.log(subjects);
  return subjects;
}

async function displayData(students) {
  if (!Array.isArray(students)) {
    console.error("Students is not an array!");
    return;
  }
  const studentSelector = document.getElementById('student');
  studentSelector.innerHTML = '';
  students.forEach(student => {
    const option = document.createElement('option');
    option.value = student;
    option.textContent = student;
    studentSelector.appendChild(option);
  });
}

fetchStudents().then(students => {
  displayData(students);
  
});

async function displayData1(subjects) {
  if (!Array.isArray(subjects)) {
    console.error("Subjects is not an array!");
    return;
  }
  const subjectSelector = document.getElementById('subject');
  subjectSelector.innerHTML = '';
  subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectSelector.appendChild(option);
  });
}

fetchSubjects().then(subjects => {
  displayData1(subjects);
  
});

document.getElementById('grade-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const studentInput = document.getElementById('student').value;
  const subjectInput = document.getElementById('subject').value;
  const gradeInput = document.getElementById('grade').value;
  const dateInput = document.getElementById('datePicker').value;
  alert("Пользователь успешно добавлен!")

 
  const studentParts = studentInput.split(' ');
  const student = {
    firstName: studentParts[0],
    lastName: studentParts[1],
    middleName: studentParts[2] || ''
  };

  
  const response = await fetch(`http://localhost:7080/grades?name=${student.lastName}&secondName=${student.firstName}&patronymic=${student.middleName}&subjectName=${subjectInput}&grade=${gradeInput}&date=${dateInput}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log('Grade added successfully');
  } else {
    console.error('Failed to add grade');
  }
});





function fetchDataAndRenderTable() {
  fetch('http://localhost:7080/grades')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = ''; 

      if (Array.isArray(data.grades) && Array.isArray(data.all_students)) {
        data.all_students.forEach((student, index) => {
          const grade = data.grades[index];
          const subject = data.subject[index % data.subject.length]; 
          const date = data.date[index];

          const row = `<tr>
                        <td>${student.Name} ${student['Second name']} ${student.Patronymic} </td>
                        <td>${subject['Subject name']}</td>
                        <td>${grade.Grade}</td>
                        <td>${date.Date}</td>
                       </tr>`;
          tableBody.innerHTML += row;
        });
      } else {
        console.error('Data is not in the expected format:', data);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchDataAndRenderTable();


const datePicker = document.getElementById('datePicker');
const submitButton = document.getElementById('submit-button');

datePicker.addEventListener('input', () => {
  if (datePicker.value) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
});

// Add the rest of the fetchDataAndRenderTable function here
