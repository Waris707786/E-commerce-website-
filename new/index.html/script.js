// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "High-quality wireless headphones with noise cancellation",
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Feature-rich smartwatch with health tracking",
        category: "electronics"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Durable laptop backpack with multiple compartments",
        category: "accessories"
    },
    {
        id: 4,
        name: "Wireless Mouse",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Ergonomic wireless mouse for comfortable use",
        category: "accessories"
    },
    {
        id: 5,
        name: "Smart Speaker",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Voice-controlled smart speaker with premium sound",
        category: "electronics"
    },
    {
        id: 6,
        name: "Phone Stand",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Adjustable phone stand for desk or bedside",
        category: "accessories"
    },
    {
        id: 7,
        name: "Wireless Charger",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Fast wireless charging pad for smartphones",
        category: "gadgets"
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Portable Bluetooth speaker with deep bass",
        category: "gadgets"
    }
];

// Shopping cart state
let cart = [];
let currentCategory = 'all';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const closeCart = document.querySelector('.close-cart');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-bar input');
const featuredSlider = document.getElementById('featured-slider');
const newsletterForm = document.querySelector('.newsletter-form');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const sortSelect = document.getElementById('sort-products');

// Initialize the product grid
function initializeProducts() {
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize featured products slider
function initializeFeaturedSlider() {
    const featuredProducts = products.slice(0, 4); // Show first 4 products as featured
    featuredSlider.innerHTML = `
        <div class="featured-wrapper">
            ${featuredProducts.map(product => `
                <div class="featured-product">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="featured-product-info">
                        <h3>${product.name}</h3>
                        <p class="featured-price">$${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`);
    
    // Animate cart icon
    cartIcon.style.animation = 'bounce 0.5s ease';
    setTimeout(() => cartIcon.style.animation = '', 500);
}

// Update cart display
function updateCart() {
    // Update cart count with animation
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.animation = 'pulse 0.5s ease';
    setTimeout(() => cartCount.style.animation = '', 500);

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="removeFromCart(${item.id})" class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + shipping;

    cartSubtotal.textContent = subtotal.toFixed(2);
    cartShipping.textContent = shipping.toFixed(2);
    cartTotal.textContent = total.toFixed(2);

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart');
}

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    initializeProducts();

    // Add animation to products
    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        product.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Search products
function searchProducts(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        filterAndSortProducts();
        return;
    }

    const searchResults = products.filter(product => {
        const searchString = `${product.name} ${product.description} ${product.category}`.toLowerCase();
        return searchString.includes(query);
    });

    productGrid.innerHTML = searchResults.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    if (searchResults.length === 0) {
        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try different keywords or browse our categories</p>
            </div>
        `;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
        filterAndSortProducts();
    });
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    filterAndSortProducts();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// Enhanced product filtering and sorting
let filteredAndSortedProducts = [...products];
let currentSort = 'default';

function filterAndSortProducts() {
    // First filter
    filteredAndSortedProducts = currentCategory === 'all' 
        ? [...products]
        : products.filter(product => {
            if (currentCategory === 'new') {
                // Example: Consider products with ID > 6 as new
                return product.id > 6;
            } else if (currentCategory === 'sale') {
                // Example: Products with price less than 50 are on sale
                return product.price < 50;
            } else {
                return product.category === currentCategory;
            }
        });

    // Then sort
    switch (currentSort) {
        case 'price-low':
            filteredAndSortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredAndSortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredAndSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order for default/featured
            break;
    }

    updateProductDisplay();
}

function updateProductDisplay() {
    productGrid.innerHTML = filteredAndSortedProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">
                    ${product.price < 50 ? '<span class="sale-badge">Sale!</span>' : ''}
                    $${product.price.toFixed(2)}
                </p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add animation to products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedSearch = debounce((query) => searchProducts(query), 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortProducts();
    initializeFeaturedSlider();

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCart();
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            localStorage.removeItem('cart');
            cart = [];
        }
    }
}); 