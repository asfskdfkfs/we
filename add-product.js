document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const imagePreview = document.getElementById('imagePreview');

    // عرض الصورة قبل الإضافة
    document.getElementById('productImage').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // إضافة منتج جديد
    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // الحصول على قيم المدخلات
        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const phone = document.getElementById('productPhone').value.trim();
        const category = document.getElementById('productCategory').value;
        const imageInput = document.getElementById('productImage');

        // التحقق من صحة المدخلات
        if (!name || !description || !price || !phone || !category || !imageInput.files[0]) {
            alert("يرجى ملء جميع الحقول وإضافة صورة.");
            return;
        }

        // التحقق من صحة السعر
        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert("يرجى إدخال سعر صحيح أكبر من صفر.");
            return;
        }

        // قراءة الصورة وإضافة المنتج
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                name,
                description,
                price: priceValue, // تخزين السعر كرقم
                phone,
                category, // تخزين الفئة
                image: e.target.result // تخزين رابط الصورة
            };

            // تخزين المنتج في Local Storage
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            storedProducts.push(newProduct);
            localStorage.setItem('products', JSON.stringify(storedProducts));

            // عرض رسالة نجاح
            displayMessage("تم إضافة المنتج بنجاح!", "success");

            // إعادة تعيين النموذج
            addProductForm.reset(); 
            imagePreview.style.display = 'none'; // إخفاء صورة المعاينة

            // تحديث قائمة المنتجات
            displayProducts();
        }
        reader.readAsDataURL(imageInput.files[0]); // قراءة الصورة
    });

    // وظيفة لعرض رسالة
    function displayMessage(message, type) {
        const messageBox = document.createElement('div');
        messageBox.className = `message ${type}`;
        messageBox.innerText = message;
        document.body.insertBefore(messageBox, addProductForm);

        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }

    // وظيفة لعرض المنتجات
    function displayProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const productItems = document.getElementById('productItems');
        productItems.innerHTML = ''; // مسح المنتجات السابقة

        if (products.length === 0) {
            productItems.innerHTML = '<p>لا توجد منتجات لعرضها.</p>';
            return;
        }

        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-name">${product.name}</div>
                <div class="product-price">سعر: ${product.price} ر.س</div>
                <div class="product-description">${product.description}</div>
                <div class="product-phone">للتواصل: ${product.phone}</div>
            `;
            productItems.appendChild(productCard);
        });
    }

    // عرض المنتجات عند تحميل الصفحة
    displayProducts();
});
