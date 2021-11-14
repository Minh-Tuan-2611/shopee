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

// form validation 
var input = document.querySelectorAll('.auth-form__input');
for (var i = 0; i < input.length; i++) {
    confirm(input[i]);
}

function confirm(input) {
    input.onblur = function() {
        if (input.value.trim() == '') {
            input.classList.add('input-error');
            input.parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
        }
    }
    input.onmouseout = function() {
        if (input.value.trim() !== '') {
            input.classList.remove('input-error');
            input.parentElement.querySelector('.error-msg').innerHTML = '';
        }
    }
}

// Đăng ký tài khoản
var accoutList = JSON.parse(localStorage.getItem('accoutList'));
if (accoutList == null) {
    accoutList = [];
}
console.log(accoutList);

function taoId() {
    var id = Math.random().toString().substr(2, 10) + '_' + String(new Date().getTime());
    return id;
}

function accountUser(id, email, password, username) {
    this.email = email;
    this.password = password;
    this.username = username;
    if (id == null) {
        this.id = taoId();
    } else {
        this.id = id;
    }
}

function createAccount() {
    var email = document.querySelector('#email-register').value;
    var username = document.querySelector('#username-register').value;
    var password = document.querySelector('#password-register').value;
    var password_confirm = document.querySelector('#password-confirm').value;
    var input_register = document.querySelectorAll('.register');

    for (var i = 0; i < input_register.length; i++) {
        input_register[i].classList.remove('input-error')
        input_register[i].parentElement.querySelector('.error-msg').innerHTML = '';
    }

    if (email.trim() == '') {
        document.querySelector('#email-register').classList.add('input-error');
        document.querySelector('#email-register').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }

    if (username.trim() == '') {
        document.querySelector('#username-register').classList.add('input-error');
        document.querySelector('#username-register').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }

    var checkEmail;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regex)) {
        checkEmail = true;
    } else {
        checkEmail = false;
    }

    if (email.trim() != '' && checkEmail == false) {
        document.querySelector('#email-register').classList.add('input-error');
        document.querySelector('#email-register').parentElement.querySelector('.error-msg').innerHTML = 'Trường này phải là email';
    }

    if (password.trim() == '') {
        document.querySelector('#password-register').classList.add('input-error');
        document.querySelector('#password-register').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }

    if (password_confirm.trim() == '') {
        document.querySelector('#password-confirm').classList.add('input-error');
        document.querySelector('#password-confirm').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }

    if (password.trim().length < 8 && password.trim().length > 0) {
        document.querySelector('#password-register').classList.add('input-error')
        document.querySelector('#password-register').parentElement.querySelector('.error-msg').innerHTML = 'Mật khẩu an toàn phải từ 8 ký tự trở lên';
    }

    if (password.trim().length >= 8) {
        if (password_confirm != '' && password_confirm != password) {
            document.querySelector('#password-confirm').classList.add('input-error')
            document.querySelector('#password-confirm').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng xác thực đúng mật khẩu';
        }
    }

    var check = true;
    for (var i = 0; i < accoutList.length; i++) {
        var currentAccount = accoutList[i];
        if (email == currentAccount.email) {
            check = false;
            document.querySelector('#email-register').classList.add('input-error');
            document.querySelector('#email-register').parentElement.querySelector('.error-msg').innerHTML = 'Email đã tồn tại, vui lòng nhập lại email khác';
        } else if (email !== currentAccount.email) {
            check = true;
        }
    }

    var checkUsername = true;
    for (var i = 0; i < accoutList.length; i++) {
        var currentAccount = accoutList[i];
        if (username == currentAccount.username) {
            checkUsername = false;
            document.querySelector('#username-register').classList.add('input-error');
            document.querySelector('#username-register').parentElement.querySelector('.error-msg').innerHTML = 'username đã tồn tại, vui lòng nhập lại username khác';
        } else if (username !== currentAccount.username) {
            checkUsername = true;
        }
    }

    if (checkEmail == true && checkUsername == true && username.trim() != '' && password.trim() != '' && password_confirm.trim().length >= 8 && password_confirm.trim() === password.trim() && check == true) {
        var newAccount = new accountUser(null, email, password, username);
        accoutList.push(newAccount);
        var jsonAccountList = JSON.stringify(accoutList);
        localStorage.setItem('accoutList', jsonAccountList);
        document.querySelector('#email-register').value = '';
        document.querySelector('#password-register').value = '';
        document.querySelector('#password-confirm').value = '';
        document.querySelector('#username-register').value = '';
        alert('Bạn đã đăng ký tài khoản thành công');
    }
}

// Đăng nhập
function loginAccount() {
    var email = document.getElementById('email-login').value;
    var password = document.getElementById('password-login').value;
    var input_login = document.querySelectorAll('.login');

    for (var i = 0; i < input_login.length; i++) {
        input_login[i].classList.remove('input-error')
        input_login[i].parentElement.querySelector('.error-msg').innerHTML = '';
    }

    if (email.trim() == '') {
        document.getElementById('email-login').classList.add('input-error');
        document.getElementById('email-login').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }

    if (password.trim() == '') {
        document.getElementById('password-login').classList.add('input-error');
        document.getElementById('password-login').parentElement.querySelector('.error-msg').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
}