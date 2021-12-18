var product_list = JSON.parse(localStorage.getItem('productList'));
if (product_list == null) {
    product_list = [];
}

function taoId() {
    var id = Math.random().toString().substr(2, 10) + '_' + String(new Date().getTime());
    return id;
}

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

function creareProduct() {
    var img = document.querySelector('.product-img').value;
    var name = document.querySelector('.product-name').value;
    var priceOld = document.querySelector('.product-price-old').value;
    var percentSale = document.querySelector('.product-percent-sale').value;
    var rating = document.querySelector('.product-rating').value;
    if (img == '') {
        document.querySelector('.product-img').classList.add('input-error');
        document.querySelector('.product-img').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
    if (name == '') {
        document.querySelector('.product-name').classList.add('input-error');
        document.querySelector('.product-name').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
    if (priceOld == '') {
        document.querySelector('.product-price-old').classList.add('input-error');
        document.querySelector('.product-price-old').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
    if (priceOld != '' && priceOld <= 0) {
        document.querySelector('.product-price-old').classList.add('input-error');
        document.querySelector('.product-price-old').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập giá trị lớn hơn 0';
    }
    if (percentSale == '') {
        document.querySelector('.product-percent-sale').classList.add('input-error');
        document.querySelector('.product-percent-sale').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
    if (percentSale != '' && (percentSale <= 0 || percentSale > 100)) {
        document.querySelector('.product-percent-sale').classList.add('input-error');
        document.querySelector('.product-percent-sale').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập giá trị lớn hơn 0 và nhỏ hơn 100';
    }
    if (rating == '') {
        document.querySelector('.product-rating').classList.add('input-error');
        document.querySelector('.product-rating').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
    }
    if (rating != '' && rating <= 0) {
        document.querySelector('.product-rating').classList.add('input-error');
        document.querySelector('.product-rating').parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập giá trị lớn hơn 0';
    }

    if (img != '' && name != '' && priceOld != '' && percentSale != '' && rating != '' && priceOld > 0 && percentSale > 0 && rating > 0 && percentSale < 100) {
        var productItem = new product(null, img, name, priceOld, percentSale, rating);
        product_list.push(productItem);
        localStorage.setItem('productList', JSON.stringify(product_list));
        document.querySelector('.product-img').value = '';
        document.querySelector('.product-name').value = '';
        document.querySelector('.product-price-old').value = '';
        document.querySelector('.product-percent-sale').value = '';
        document.querySelector('.product-rating').value = '';
        document.querySelector('.modal').classList.remove('active');
        alert('Tạo sản phẩm thành công !');
        renderAppContainer();
        document.querySelector('title').innerHTML = value;
    }
}
var listProduct = [];
for (var i = 0; i < product_list.length; i++) {
    var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
    listProduct.push(product_item);
}

function renderProduct() {
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
        if (product.rating < 1000) {
            return `<div class="grid__column-2-5">
            <a onclick="renderProductDetail('${product.id}')" class="home-product-item" href="#">
                <img src="${product.img}" alt="" class="home-product-item__img">
                <h4 class="home-product-item__name">${product.name}</h4>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${parseInt(product.priceOld).toLocaleString()} ₫</span>
                    <span class="home-product-item__price-current">${product.priceNew().toLocaleString()} ₫</span>
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
                    <div class="home-product-item__sold">${parseInt(product.rating)} đã bán</div>
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
        } else if (product.rating >= 1000) {
            return `<div class="grid__column-2-5">
            <a onclick="renderProductDetail('${product.id}')" class="home-product-item" href="#">
                <img src="${product.img}" alt="" class="home-product-item__img">
                <h4 class="home-product-item__name">${product.name}</h4>
                <div class="home-product-item__price">
                    <span class="home-product-item__price-old">${parseInt(product.priceOld).toLocaleString()} ₫</span>
                    <span class="home-product-item__price-current">${product.priceNew().toLocaleString()} ₫</span>
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
                    <div class="home-product-item__sold">1000 + đã bán</div>
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
        }
    })
    var z = y.join(' ');

    document.querySelector('.list-product').innerHTML = z;
}

// form validation 
var input = document.querySelectorAll('.input');
for (var i = 0; i < input.length; i++) {
    confirm(input[i]);
}

function confirm(input) {
    input.onblur = function() {
        if (input.value.trim() == '') {
            input.classList.add('input-error');
            input.parentElement.querySelector('.msg-error').innerHTML = 'Vui lòng nhập đúng giá trị của trường này';
        }
    }
    input.onmouseout = function() {
        if (input.value.trim() !== '') {
            input.classList.remove('input-error');
            input.parentElement.querySelector('.msg-error').innerHTML = '';
        }
    }
}