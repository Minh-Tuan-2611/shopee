var product_list = JSON.parse(localStorage.getItem('productList'));
if (product_list == null) {
    product_list = [];
}
console.log(product_list);

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
    if (img != '' && name != '' && priceOld != '' && percentSale != '' && rating != '') {
        var productItem = new product(null, img, name, priceOld, percentSale, rating);
        product_list.push(productItem);
        localStorage.setItem('productList', JSON.stringify(product_list));
        document.querySelector('.product-img').value = '';
        document.querySelector('.product-name').value = '';
        document.querySelector('.product-price-old').value = '';
        document.querySelector('.product-percent-sale').value = '';
        document.querySelector('.product-rating').value = '';
        alert('Tạo sản phẩm thành công');
    }
}
var listProduct = [];
for (var i = 0; i < product_list.length; i++) {
    var product_item = new product(product_list[i].id, product_list[i].img, product_list[i].name, product_list[i].priceOld, product_list[i].percentSale, product_list[i].rating);
    listProduct.push(product_item);
}
console.log(listProduct);

function renderProduct() {
    var y = listProduct.map(function(product, index) {
        return `<div class="grid__column-2-5">
        <a class="home-product-item" href="#">
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

renderProduct();