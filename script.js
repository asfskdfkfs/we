document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.getElementById('productItems');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // التحقق مما إذا كانت هناك منتجات لعرضها
    if (products.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.textContent = 'لا توجد منتجات لعرضها.';
        noProductsMessage.style.textAlign = 'center';
        noProductsMessage.style.fontSize = '18px';
        noProductsMessage.style.color = '#888';
        productItems.appendChild(noProductsMessage);
    } else {
        products.forEach(product => {
            const productCard = createProductCard(product);
            productItems.appendChild(productCard);
        });
    }
});

// دالة لإنشاء بطاقة المنتج
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h4 class="product-name">${product.name}</h4>
        <p class="product-description">${product.description}</p>
        <p class="product-price">سعر: <strong>${product.price} ₪</strong></p>
        <p>رقم الهاتف: <strong>${product.phone}</strong></p>
        <button class="btn add-to-cart">أضف إلى السلة</button>
    `;

    // إضافة تأثير عند التحويم
    productCard.querySelector('.add-to-cart').addEventListener('mouseover', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1.05)';
    });

    productCard.querySelector('.add-to-cart').addEventListener('mouseout', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = 'scale(1)';
    });

    return productCard;
}
