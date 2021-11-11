// Chuyển đổi đăng kí và đăng nhập
var button_1 = document.querySelector('.auth-form__switch-btn');
var button_2 = document.querySelectorAll('.auth-form__switch-btn')[1];

var tab_1 = document.querySelector('.auth-form');
var tab_2 = document.querySelectorAll('.auth-form')[1];

button_1.onclick = function() {
    tab_1.classList.remove('active');
    tab_2.classList.add('active');
}

button_2.onclick = function() {
    tab_2.classList.remove('active');
    tab_1.classList.add('active');
}

// Ấn để hiên ra đăng kí và đăng nhập

var button_registed = document.querySelector('.header__navbar-item-strong');
var button_login = document.querySelectorAll('.header__navbar-item-strong')[1];
console.log(button_registed);
console.log(button_login);

button_registed.onclick = function() {
    document.querySelector('.modal').classList.add('active');
}

button_login.onclick = function() {
    document.querySelector('.modal').classList.add('active');
    tab_1.classList.remove('active');
    tab_2.classList.add('active');
}

var modal = document.querySelector('.modal');
modal.onclick = function() {
    modal.classList.remove('active');
}

document.querySelector('.modal__body').addEventListener('click', function(event) {
    event.stopPropagation();
})

var button_cancles = document.querySelectorAll('.btn.cancle');

button_cancles.forEach(function(button_cancle, index) {
    button_cancle.onclick = function() {
        document.querySelector('.modal').classList.remove('active');
    }
})