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

function open1() {
    document.querySelector('.modal').classList.add('active');
}

function open2() {
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
var accountActives = JSON.parse(localStorage.getItem('accountActives'));
if (accountActives == null) {
    accountActives = [];
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

function accoutActive(email, password) {
    this.email = email;
    this.password = password;
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
        alert('Bạn đã đăng ký tài khoản thành công !');
    }
}

// Đăng nhập

function renderLoginRegister() {
    document.querySelector('.user').innerHTML = `<li class="header__navbar-item header__navbar-item-strong header__navbar-item--separate">Đăng ký</li>
    <li class="header__navbar-item header__navbar-item-strong">Đăng nhập</li>`
    var arrayAccount = JSON.parse(localStorage.getItem('accountActives'));
    for (var i = 0; i < arrayAccount.length; i++) {
        arrayAccount.splice(i, 1);
    }
    localStorage.setItem('accountActives', JSON.stringify(arrayAccount));
}

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

    var checkEmail = false;
    var checkPassword = false;
    for (var i = 0; i < accoutList.length; i++) {
        var currentAccount = accoutList[i];
        if (email == currentAccount.email) {
            checkEmail = true;
            if (password == currentAccount.password) {
                checkPassword = true;
            }
        }
    }
    if (checkEmail == false && email.trim().length > 0) {
        document.getElementById('email-login').classList.add('input-error');
        document.getElementById('email-login').parentElement.querySelector('.error-msg').innerHTML = 'Email không tồn tại, vui lòng nhập lại !';
    }
    if (checkEmail == true) {
        if (checkPassword == false && password.trim().length > 0) {
            document.getElementById('password-login').classList.add('input-error');
            document.getElementById('password-login').parentElement.querySelector('.error-msg').innerHTML = 'Sai mật khẩu, vui lòng nhập lại !';
        }
    }
    if (checkEmail == true && checkPassword == true) {
        document.getElementById('email-login').value = '';
        document.getElementById('password-login').value = '';
        for (var i = 0; i < accoutList.length; i++) {
            var currentAccount = accoutList[i];
            if (email == currentAccount.email) {
                var thisAccount = currentAccount;
            }
        }
        var accountIn = new accoutActive(email, password);
        accountActives.push(accountIn);
        localStorage.setItem('accountActives', JSON.stringify(accountActives));
        modal.classList.remove('active');
        document.querySelector('.user').innerHTML = ''
        document.querySelector('.user').innerHTML = `<li class="header__navbar-item header__navbar-user">
                                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" class="header__navbar-user-img"> 
                                                        <span class="header__navbar-user-name">${thisAccount.username}</span>
                                                        <ul class="header__navbar-user-menu">
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Tài khoản của tôi</a>
                                                            </li>
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Địa chỉ của tôi</a>
                                                            </li>
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Đơn mua</a>
                                                            </li>
                                                            <li onclick="renderLoginRegister()" class="header__navbar-user-item">
                                                                <a href="">Đăng xuất</a>
                                                            </li>
                                                        </ul>
                                                    </li>`;
        alert('Bạn đã đăng nhập thành công !');
    }
}

// hiển thị accountUser

function checkAccountStatus() {
    var account = JSON.parse(localStorage.getItem('accountActives'));
    if (account == null) {
        account = [];
    }
    console.log(account);
    if (account.length == 0) {
        document.querySelector('.user').innerHTML = `<li onclick = "open1()" class="header__navbar-item header__navbar-item-strong header__navbar-item--separate">Đăng ký</li>
    <li onclick = "open2()" class="header__navbar-item header__navbar-item-strong">Đăng nhập</li>`
    }
    if (account.length == 1) {
        // var listAccount = JSON.parse(localStorage.getItem('accoutList'));
        for (var i = 0; i < accoutList.length; i++) {
            var currentAccount = accoutList[i];
            if (account[0].email == currentAccount.email) {
                var thisAccount = currentAccount;
            }
        }
        document.querySelector('.user').innerHTML = ''
        document.querySelector('.user').innerHTML = `<li class="header__navbar-item header__navbar-user">
                                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" class="header__navbar-user-img"> 
                                                        <span class="header__navbar-user-name">${thisAccount.username}</span>
                                                        <ul class="header__navbar-user-menu">
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Tài khoản của tôi</a>
                                                            </li>
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Địa chỉ của tôi</a>
                                                            </li>
                                                            <li class="header__navbar-user-item">
                                                                <a href="">Đơn mua</a>
                                                            </li>
                                                            <li onclick="renderLoginRegister()" class="header__navbar-user-item">
                                                                <a>Đăng xuất</a>
                                                            </li>
                                                        </ul>
                                                    </li>`;
    }
}

checkAccountStatus();

function product(id, img, name, priceOld, percentSale, rating) {
    if (id == null) {
        this.id = taoId();
    } else {
        this.id = id;
    }
    this.img = img;
    this.name = name;
    this.priceOld = priceOld;
    this.percentSale = percentSale;
    this.priceNew = function() {
        return parseInt(this.priceOld * (1 - this.percentSale / 100));
    }
    this.rating = rating;
}

function renderAppContainer() {
    document.querySelector('.app__container').innerHTML = `<div class="grid">
    <div class="grid__row app__content">
        <div class="grid__column-2">
            <nav class="category">
                <h3 class="category__heading">
                    <i class="category__heading-icon fas fa-list"></i> Danh mục
                </h3>

                <ul class="category-list">
                    <li class="category-item category-item--active">
                        <a href="#" class="category-item__link">Trang điểm mặt</a>
                    </li>
                    <li class="category-item">
                        <a href="#" class="category-item__link">Trang điểm môi</a>
                    </li>
                    <li class="category-item">
                        <a href="#" class="category-item__link">Trang điểm mắt</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="grid__column-10">
            <div class="home-filter">
                <span class="home-filter__lable">Sắp xếp theo</span>
                <button class="home-filter-btn btn">Phổ biến</button>
                <button class="home-filter-btn btn btn--primary">Mới nhất</button>
                <button class="home-filter-btn btn">Bán chạy</button>

                <div class="select-input">
                    <span class="select-input__lable">
                        Giá
                    </span>
                    <i class="select-input__icon fas fa-angle-down"></i>
                    <ul class="select-input__list">
                        <li class="select-input__item">
                            <a href="" class="select-input__link">Giá: Thấp đến cao</a>
                        </li>
                        <li class="select-input__item">
                            <a href="" class="select-input__link">Giá: Cao đến thấp</a>
                        </li>
                    </ul>
                </div>
                <div class="home-filter__page">
                    <span class="home-filter__page-num">
                        <span class="home-filter__page-current">1</span> / 14
                    </span>
                    <div class="home-filter__page-control">
                        <a class="home-filter__page-btn home-filter__page-btn__disable">
                            <i class="fas fa-angle-left home-filter__page-btn__no-enable"></i>
                        </a>
                        <a class="home-filter__page-btn ">
                            <i class="fas fa-angle-right home-filter__page-btn__enable"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="home-product">
                <div class="grid__row list-product">
                    
                </div>
            </div>

            <ul class="pagination home-product-pagination">
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">
                        <i class="pagination-item__icon fas fa-angle-left"></i>
                    </a>
                </li>

                <li class="pagination-item pagination-item--active">
                    <a href="" class="pagination-item__link">1</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">2</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">3</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">4</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">5</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">...</a>
                </li>
                <li class="pagination-item">
                    <a href="" class="pagination-item__link">14</a>
                </li>

                <li class="pagination-item">
                    <a href="" class="pagination-item__link">
                        <i class="pagination-item__icon fas fa-angle-right"></i>
                    </a>
                </li>
            </ul>

        </div>
    </div>
</div>`
    var product_list = JSON.parse(localStorage.getItem('productList'));
    if (product_list == null) {
        product_list = [];
    }

    var listProduct = [];
    for (var i = 0; i < product_list.length; i++) {
        var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
        listProduct.push(product_item);
    }

    var y = listProduct.map(function(product, index) {
        return `<div class="grid__column-2-5">
    <a onclick="renderProductDetail('${product.id}')" class="home-product-item" href="#">
        <img src="${product.img}" alt="" class="home-product-item__img">
        <h4 class="home-product-item__name">${product.name}</h4>
        <div class="home-product-item__price">
            <span class="home-product-item__price-old">${product.priceOld} ₫</span>
            <span class="home-product-item__price-current">${product.priceNew()} ₫</span>
        </div>
        <div class="home-product-item__action">
            <span class="home-product-item__like home-product-item__like--liked">
                <i class="home-product-item__like-icon-empty far fa-heart"></i>
                <i class="home-product-item__like-icon-fill fas fa-heart"></i>
            </span>
            <div class="home-product-item__rating">
                <i class="home-product-item__star-gold fas fa-star"></i>
                <i class="home-product-item__star-gold fas fa-star"></i>
                <i class="home-product-item__star-gold fas fa-star"></i>
                <i class="home-product-item__star-gold fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <div class="home-product-item__sold">${product.rating} đã bán</div>
        </div>
        <div class="home-product-item__origin">
            <span class="home-product-item__brand">Whoo</span>
            <span class="home-product-item__origin-title">Hàn Quốc</span>
        </div>
        <div class="home-product-item__favourite">
            <i class="fas fa-check"></i>
            <span>Yêu thích</span>
        </div>
        <div class="home-product-item__sale-off">
            <span class="home-product-item__sale-off-percent">${product.percentSale}%</span>
            <span class="home-product-item__sale-off-lable">GIẢM</span>
        </div>
    </a>
</div>`
    })
    var z = y.join(' ');

    document.querySelector('.list-product').innerHTML = z;
}

renderAppContainer();

function renderProductDetail(id) {

    var product_list = JSON.parse(localStorage.getItem('productList'));
    if (product_list == null) {
        product_list = [];
    }

    var listProduct = [];
    for (var i = 0; i < product_list.length; i++) {
        var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
        listProduct.push(product_item);
    }

    for (var i = 0; i < listProduct.length; i++) {
        var currentProduct = listProduct[i];
        if (currentProduct.id == id) {
            var thisProduct = currentProduct;
        }
    }

    document.querySelector('.app__container').innerHTML = `<div class="grid">
    <div class="grid__row product-detail">
        <img src="${thisProduct.img}" alt="" class="product-detail-img">
        <div class="product-detail-infor">
            <h1 class="product-detail-name">${thisProduct.name}</h1>
            <div class="product-detail-price">
                <div class="product-detail-price-price">
                    <p class="product-detail-priceOld">${thisProduct.priceOld} ₫</p>
                    <p class="product-detail-priceSale">${thisProduct.priceNew()} ₫</p>
                    <p class="product-detail-percentSale">${thisProduct.percentSale}% GIẢM</p>
                </div>
                <div class="product-detail-price-slogan">
                    <img src="./asset/img/soganicon.png" alt="" class="product-detail-price-slogan-img">
                    <div class="product-detail-price-slogan-text-text">
                        <p class="product-detail-price-slogan-text">Gì cũng rẻ</p>
                        <p class="product-detail-price-slogan-ad">Giá tốt nhất so với các sản phẩm cùng loại trên Shopee!</p>
                    </div>
                </div>
            </div>
            <button onclick="addCart('${thisProduct.id}'),renderCartNoti()" class="product-detail-btn">
                <i class="fas fa-cart-plus product-detail-btn-icon"></i>
                Thêm Vào Giỏ Hàng
            </button>
        </div>
    </div>
</div>`
}

function cartItem(id, number) {
    this.id = id;
    this.number = number;
}

var keyLocalStorage = 'cartListItem';

function getCartListItem() {
    var cartListItem = new Array();
    var jsonCartListItem = localStorage.getItem(keyLocalStorage);
    if (jsonCartListItem == null) {
        cartListItem = new Array();
    } else {
        cartListItem = JSON.parse(jsonCartListItem);
    }
    return cartListItem;
}

function saveCartListItemToStorage(cartListItem) {
    var jsonCartListItem = JSON.stringify(cartListItem);
    localStorage.setItem(keyLocalStorage, jsonCartListItem);
}

function addCart(id) {
    alert('Thêm thành công sản phẩm này');
    var cartListItem = getCartListItem();
    var checkCart = false;
    for (var i = 0; i < cartListItem.length; i++) {
        var currentItem = cartListItem[i];
        if (currentItem.id == id) {
            cartListItem[i].number++;
            checkCart = true;
        }
    }
    if (checkCart == false) {
        var itemCart = new cartItem(id, 1);
        cartListItem.push(itemCart);
    }
    saveCartListItemToStorage(cartListItem);
}

function renderCart() {
    var cartListItem = getCartListItem();
    if (cartListItem.length == 0) {
        document.querySelector('.app__container').innerHTML = `<div class="cart-empty">
        <img src="./asset/img/no_cart.png" alt="" class="cart-empty-img">
        <div class="cart-empty-text">Giỏ hàng của bạn còn trống</div>
        <button onclick="renderAppContainer();" class="cart-empty-btn">MUA NGAY</button>
    </div>`
    } else if (cartListItem.length > 0) {
        var product_list = JSON.parse(localStorage.getItem('productList'));
        if (product_list == null) {
            product_list = [];
        }

        var listProduct = [];
        for (var i = 0; i < product_list.length; i++) {
            var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
            listProduct.push(product_item);
        }

        var thisProducts = [];
        var thisCartItems = [];

        for (var i = 0; i < cartListItem.length; i++) {
            for (var j = 0; j < listProduct.length; j++) {
                if (cartListItem[i].id == listProduct[j].id) {
                    var thisProduct = listProduct[j];
                    thisProducts.push(thisProduct);
                    var thisCartItem = cartListItem[i];
                    thisCartItems.push(thisCartItem);
                }
            }
        }

        var htmlCart = `<div class="cart">`
        for (var i = 0; i < thisProducts.length; i++) {
            htmlCart += `
            <div class="cart-item">
                <img class="cart-item-img" src="${thisProducts[i].img}" alt="">
                <p class="cart-item-name">${thisProducts[i].name}</p>
                <div class="cart-item-price">
                    <p class="cart-item-price-old">${thisProducts[i].priceOld} ₫</p>
                    <p class="cart-item-price-sale">${thisProducts[i].priceNew()} ₫</p>
                </div>
                <input type="number" class="cart-item-number" value="${thisCartItems[i].number}">
                <p class="cart-item-sum-money">${thisProducts[i].priceNew()*thisCartItems[i].number} ₫</p>
                <div class="cart-item-delete">
                    <i onclick="removeCart('${thisProducts[i].id}'),renderCartNoti()" class="fas fa-trash cart-item-delete-icon"></i>
                </div>
            </div>`
        }
        htmlCart += `<button onclick="removeAllCart(),renderCartNoti()" class="delete-all">Xóa toàn bộ sản phẩm</button>`
        document.querySelector('.app__container').innerHTML = htmlCart;
    }
}

function removeCart(id) {
    var cartListItem = getCartListItem();
    for (var i = 0; i < cartListItem.length; i++) {
        var currentItem = cartListItem[i];
        if (currentItem.id == id) {
            cartListItem[i].number--;
            saveCartListItemToStorage(cartListItem);
            renderCart()
        }
        if (cartListItem[i].number == 0) {
            cartListItem.splice(i, 1);
            saveCartListItemToStorage(cartListItem);
            renderCart()
        }
    }
}

function removeAllCart() {
    var cartListItem = getCartListItem();
    cartListItem.splice(0, cartListItem.length);
    saveCartListItemToStorage(cartListItem);
    document.querySelector('.app__container').innerHTML = `<div class="cart-empty">
        <img src="./asset/img/no_cart.png" alt="" class="cart-empty-img">
        <div class="cart-empty-text">Giỏ hàng của bạn còn trống</div>
        <button onclick="renderAppContainer();" class="cart-empty-btn">MUA NGAY</button>
    </div>`
}

function renderCartNoti() {
    var cartListItem = getCartListItem();
    if (cartListItem.length == 0) {
        document.querySelector('.header__cart-list').innerHTML = `<img src="./asset/img/no_cart.png" alt="" class="header__cart--no-cart-img">
        <p class="header__cart-list--no-cart-msg">
            Chưa có sản phẩm
        </p>`
    } else if (cartListItem.length > 0) {
        var product_list = JSON.parse(localStorage.getItem('productList'));
        if (product_list == null) {
            product_list = [];
        }

        var listProduct = [];
        for (var i = 0; i < product_list.length; i++) {
            var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
            listProduct.push(product_item);
        }

        var thisProducts = [];
        var thisCartItems = [];

        for (var i = 0; i < cartListItem.length; i++) {
            for (var j = 0; j < listProduct.length; j++) {
                if (cartListItem[i].id == listProduct[j].id) {
                    var thisProduct = listProduct[j];
                    thisProducts.push(thisProduct);
                    var thisCartItem = cartListItem[i];
                    thisCartItems.push(thisCartItem);
                }
            }
        }

        htmlNoti = `<h4 class="header__cart-heading">Sản phẩm đã thêm</h4>`
        for (var i = 0; i < thisProducts.length; i++) {
            htmlNoti += `<ul class="header__cart-list-item">
                <li class="header__cart-item">
                    <img src="${thisProducts[i].img}" alt="" class="header__cart-img">
                    <div class="header__cart-item-info">
                        <div class="header__cart-item-head">
                            <h5 class="header__cart-item-name">${thisProducts[i].name}</h5>
                            <div class="header__cart-item-price-wrap">
                                <span class="header__cart-item-price">${thisProducts[i].priceNew()} ₫</span>
                                <span class="header__cart-item-multiply">x</span>
                                <span class="header__cart-item-qnt">${thisCartItems[i].number}</span>
                            </div>
                        </div>
                        <div class="header__cart-item-body">
                            <span class="header__cart-item-description">Phân loại hàng: Bạc</span>
                        </div>
                    </div>
                </li>
            </ul>`
        }
        htmlNoti += `<button onclick="renderCart()" class="btn btn--primary header__cart-has-cart-button">Xem giỏ hàng</button>`
        document.querySelector('.header__cart-list').innerHTML = htmlNoti;
    }
}

renderCartNoti();