// AURA Fashion Global JavaScript

// Product Database
const products = [
    {
        id: 'p1',
        name: 'Structured Wool Coat',
        price: 450.00,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
        brand: 'AURA EXCLUSIVE'
    },
    {
        id: 'p2',
        name: 'Minimalist Silk Blouse',
        price: 185.00,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80',
        brand: 'AURA COLLECTION'
    },
    {
        id: 'p3',
        name: 'Tailored Linen Suit',
        price: 650.00,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        brand: 'AURA TAILORING'
    },
    {
        id: 'p4',
        name: 'Classic Leather Tote',
        price: 320.00,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80',
        brand: 'AURA LEATHER'
    },
    {
        id: 'p5',
        name: 'Cashmere Turtleneck',
        price: 240.00,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80',
        brand: 'AURA ESSENTIALS'
    },
    {
        id: 'p6',
        name: 'Pleated Midi Skirt',
        price: 150.00,
        category: 'women',
        image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&q=80',
        brand: 'AURA COLLECTION'
    },
    {
        id: 'p7',
        name: 'Geometric Sunglasses',
        price: 190.00,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
        brand: 'AURA EYEWEAR'
    },
    {
        id: 'p8',
        name: 'Oxford Leather Shoes',
        price: 280.00,
        category: 'men',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
        brand: 'AURA FOOTWEAR'
    }
];

// Initialize Cart
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

// Update Cart Count in Header
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElements.forEach(el => {
        el.textContent = totalItems;
        if(totalItems === 0) {
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
        }
    });
}

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('aura_cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Added ${product.name} to cart.`);
}

// Remove from Cart Function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('aura_cart', JSON.stringify(cart));
    updateCartCount();
    
    // If on cart page, re-render
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

// Toast Notification
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Setup common elements on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const tc = document.createElement('div');
        tc.id = 'toast-container';
        tc.className = 'toast-container';
        document.body.appendChild(tc);
    }
});
