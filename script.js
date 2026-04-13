const products = [
    {
        id: 1,
        name: "Smartphone Pro Max",
        category: "electronics",
        price: 4500000,
        description: "12GB RAM, 256GB xotira, 108MP kamera, 5000mAh batareya",
        emoji: "📱"
    },
    {
        id: 2,
        name: "Wireless AirPods",
        category: "electronics",
        price: 850000,
        description: "Aktiv shovqin bekor qilish, 30 soat batareya",
        emoji: "🎧"
    },
    {
        id: 3,
        name: "Erkaklar Kostyumi",
        category: "clothing",
        price: 1200000,
        description: "Premium mato, klassik kesim, 3 parcha",
        emoji: "👔"
    },
    {
        id: 4,
        name: "Ayollar Kleydasi",
        category: "clothing",
        price: 950000,
        description: "Yengil mato, zamonaviy dizayn, turli o'lchamlar",
        emoji: "👗"
    },
    {
        id: 5,
        name: "Robot Pylesos",
        category: "home",
        price: 2800000,
        description: "Avtomatik tozalash, APP boshqaruv, 2000Pa so'rish",
        emoji: "🤖"
    },
    {
        id: 6,
        name: "Smart Televizor 55\"",
        category: "electronics",
        price: 6500000,
        description: "4K UHD, HDR, Android OS, Wi-Fi",
        emoji: "📺"
    },
    {
        id: 7,
        name: "Fitness Turniket",
        category: "sports",
        price: 650000,
        description: "Uy sharoitida mashq qilish uchun, metall konstruktsiya",
        emoji: "🏋️"
    },
    {
        id: 8,
        name: "Elektr Choynak",
        category: "home",
        price: 280000,
        description: "1.8L hajm, tez qizish, avtomatik o'chish",
        emoji: "☕"
    },
    {
        id: 9,
        name: "Futbolka Seti",
        category: "clothing",
        price: 350000,
        description: "3 dona, paxta mato, turli ranglar",
        emoji: "👕"
    },
    {
        id: 10,
        name: "Velosiped",
        category: "sports",
        price: 3800000,
        description: "21 tezlik, alyuminiy rama, shahar sayohatlari uchun",
        emoji: "🚴"
    },
    {
        id: 11,
        name: "Noutbuk Ultra",
        category: "electronics",
        price: 12500000,
        description: "16GB RAM, 512GB SSD, 15.6\" ekran",
        emoji: "💻"
    },
    {
        id: 12,
        name: "Mebel Komplekti",
        category: "home",
        price: 5500000,
        description: "Divan + stol + stullar, zamonaviy dizayn",
        emoji: "🛋️"
    }
];

let cart = [];
let currentCategory = 'all';

function formatPrice(price) {
    return price.toLocaleString('uz-UZ');
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)} <span>so'm</span></div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Savatga qo'shish
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        electronics: 'Elektronika',
        clothing: 'Kiyimlar',
        home: 'Uy-ro\'zg\'or',
        sports: 'Sport'
    };
    return names[category] || category;
}

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    renderProducts(filtered);
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

document.getElementById('searchInput').addEventListener('keyup', searchProducts);

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${product.name} savatga qo'shildi!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <p>Savatingiz bo'sh</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>${formatPrice(item.price)} so'm x ${item.quantity}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">O'chirish</button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const detail = document.getElementById('productDetail');
    
    detail.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <h2>${product.name}</h2>
        <span class="product-category">${getCategoryName(product.category)}</span>
        <div class="product-price">${formatPrice(product.price)} <span>so'm</span></div>
        <p>${product.description}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id}); closeProductDetail();">
            🛒 Savatga qo'shish
        </button>
    `;
    
    modal.style.display = 'flex';
}

function closeProductDetail() {
    document.getElementById('productModal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Savatingiz bo\'sh!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Buyurtmangiz qabul qilindi!\nJami: ${formatPrice(total)} so'm\n\nTez orada biz bilan bog'lanamiz!`);
    cart = [];
    updateCartUI();
    toggleCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');
    
    if (event.target === cartModal) {
        toggleCart();
    }
    if (event.target === productModal) {
        closeProductDetail();
    }
}

renderProducts(products);
