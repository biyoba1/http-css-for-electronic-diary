
(function EBLAN() {
    console.log('eblan')
})();


 var ob = {
    name: "Иван",
    secondName: "ХУЕГЛОТИЩЕВ",
    patronymic: "ПИДАРАСОВИЧ",
};

fetch('http://localhost:7080/users?name=' + ob.name + '&secondName=' + ob.secondName + '&patronymic=' + ob.patronymic, {
    method: "post",
    mode: 'no-cors'
})


