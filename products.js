function filterProducts() {
    const category = document.getElementById('productCategory').value;
    const productItems = document.getElementById('productItems');

    // مسح المنتجات الموجودة
    productItems.innerHTML = '';

    // جلب المنتجات من localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // تصفية المنتجات حسب الفئة
    const filteredProducts = category ? products.filter(product => product.category === category) : products;

    // عرض المنتجات المصفاة
    if (filteredProducts.length === 0) {
        productItems.innerHTML = '<p style="text-align: center; color: #888; font-size: 18px;">لا توجد منتجات في هذه الفئة.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productItems.appendChild(productCard);
        });
    }
}

// دالة لإنشاء بطاقة المنتج
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h4 class="product-name">${product.name}</h4>
        <p class="product-description">${product.description}</p>
        <p class="product-price">سعر: <strong>${product.price} ر.س</strong></p>
        <button class="btn add-to-cart">إضافة إلى السلة <i class="fas fa-shopping-cart"></i></button>
    `;

    // إضافة حدث عند الضغط على زر الإضافة إلى السلة
    productCard.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product);
    });

    return productCard;
}

// دالة لإضافة المنتج إلى السلة
function addToCart(product) {
    alert(`${product.name} تمت إضافته إلى السلة!`);
}

// لا تنسَ استدعاء الدالة filterProducts في الوقت المناسب، مثل عند تغيير الفئة
document.getElementById('productCategory').addEventListener('change', filterProducts);

// استدعاء الدالة بشكل افتراضي لعرض جميع المنتجات عند التحميل
filterProducts();
