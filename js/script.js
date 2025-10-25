
// NAVBAR TOGGLE
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}


// ==================== REGISTER PAGE CODE ====================
if (window.location.pathname.includes('register.html') || document.getElementById('name')) {
    document.addEventListener('DOMContentLoaded', function() {
        const registerForm = document.querySelector('.form-box');
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirm').value
            };
            if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
                showMessage('All fields are required', 'error');
                return;
            }
            
            if (userData.password !== userData.confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (userData.password.length < 6) {
                showMessage('Password must be at least 6 characters', 'error');
                return;
            }
            registerUser(userData);
        });
        
        function registerUser(userData) {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = storedUsers.find(user => user.email === userData.email);
            if (existingUser) {
                showMessage('This email is already registered', 'error');
                return;
            }
            const userToSave = {
                name: userData.name,
                email: userData.email,
                password: userData.password
            };
            
            storedUsers.push(userToSave);
            localStorage.setItem('users', JSON.stringify(storedUsers));
            showMessage('Account created successfully! ✅', 'success');
            document.querySelector('.form-box').reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
}

// ==================== LOGIN PAGE CODE ====================
if (window.location.pathname.includes('login.html') || document.getElementById('email') && !document.getElementById('name')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.querySelector('.form-box');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('Remember me').checked;
            if (!email || !password) {
                showMessage('Email and password are required', 'error');
                return;
            }
            loginUser(email, password, rememberMe);
        });
        
        function loginUser(email, password, rememberMe) {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(u => u.email === email && u.password === password);
            if (user) {
                showMessage('Login successful! ', 'success');
                localStorage.setItem('currentUser', JSON.stringify(user));
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({email: email}));
                }
                
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 2000);
            } else {
                showMessage('Invalid email or password', 'error');
            }
        }
    });
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.message-box');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = `message-box ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 8px;
        background-color: white;
        color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        border: 2px solid ${type === 'success' ? '#27ae60' : '#e74c3c'};
        z-index: 1000;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        animation: fadeInBounce 0.5s ease-out;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        min-width: 300px;
        max-width: 90%;
    `;
    
    document.body.appendChild(messageDiv);
  
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInBounce {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    .message-box.success {
        background-color: white;
        color: #f4fff9ff;
        border: 2px solid #2a9c5aff;
    }
    
    .message-box.error {
        background-color: white;
        color: #e74c3c;
        border: 2px solid #e74c3c;
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome-text");

  if (!welcomeText) return;


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.name) {
    welcomeText.textContent = `Welcome back, ${currentUser.name}!`;
  } else {
    welcomeText.textContent = "Glow with GlamBeauty ✨";
  }
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
});


// SHOP PAGE (Filter + Search + Favorites)
const products = [
  // LIPS
  { id: 1, name: "Velvet Matte Lipstick", category: "Lips", price: 120, image: "images/velvet.jfif" },
  { id: 9, name: "Long-Lasting Lip Gloss", category: "Lips", price: 150, image: "images/lipgloss.jfif" },
  { id: 10, name: "Creamy Lip Balm", category: "Lips", price: 100, image: "images/lipbalm.jfif" },
  { id: 11, name: "Shimmer Lip Tint", category: "Lips", price: 130, image: "images/lipshimmer.jfif" },
  { id: 12, name: "Liquid Lip Color", category: "Lips", price: 160, image: "images/liquid.jfif" },

  // EYES
  { id: 3, name: "Volumizing Mascara", category: "Eyes", price: 180, image: "images/mascara.jfif" },
  { id: 6, name: "Soft Eyeshadow Palette", category: "Eyes", price: 300, image: "images/palette.jfif" },
  { id: 13, name: "Precision Eyeliner Pen", category: "Eyes", price: 140, image: "images/eyeliner.jfif" },
  { id: 14, name: "Brow Sculpting Gel", category: "Eyes", price: 170, image: "images/browwax.jfif" },
  { id: 15, name: "Lash Lifting Serum", category: "Eyes", price: 210, image: "images/lashserum.jfif" },

  // FACE
  { id: 2, name: "Hydrating Foundation", category: "Face", price: 250, image: "images/foundation.jfif" },
  { id: 4, name: "Natural Glow Highlighter", category: "Face", price: 220, image: "images/highlighter.jfif" },
  { id: 5, name: "Rose Blush Palette", category: "Face", price: 200, image: "images/rosepalette.jfif" },
  { id: 16, name: "Soft Finish Powder", category: "Face", price: 180, image: "images/powder.jfif" },
  { id: 17, name: "Cream Concealer", category: "Face", price: 190, image: "images/concealer.jfif" },
  { id: 18, name: "Makeup Setting Spray", category: "Face", price: 210, image: "images/spray.jfif" },

  // BRUSHES & TOOLS
  { id: 7, name: "Luxury Brush Set", category: "Brushes & Tools", price: 350, image: "images/brushset.jfif" },
  { id: 19, name: "Beauty Blender Sponge", category: "Brushes & Tools", price: 90, image: "images/beautyblender.jfif" },
  { id: 20, name: "Compact Travel Brushes", category: "Brushes & Tools", price: 220, image: "images/travel.jfif" },
  { id: 21, name: "Silicone Makeup Cleaner", category: "Brushes & Tools", price: 140, image: "images/cleaner.jfif" },

  // SKINCARE
  { id: 8, name: "Moisturizing Face Cream", category: "Skincare", price: 280, image: "images/moistrising.jfif" },
  { id: 22, name: "Hydrating Toner", category: "Skincare", price: 230, image: "images/toner.jfif" },
  { id: 23, name: "Vitamin C Serum", category: "Skincare", price: 310, image: "images/vitaminC.jfif" },
  { id: 24, name: "Soothing Face Mask", category: "Skincare", price: 260, image: "images/mask.jfif" },
  { id: 25, name: "Aloe Vera Moisturizer", category: "Skincare", price: 270, image: "images/aloevera.jfif" }
];

const shopContainer = document.getElementById("shop-container");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const priceFilterBtn = document.getElementById("priceFilterBtn");
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const favourites = currentUser 
  ? JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`)) || []
  : [];


let currentCategory = "All";
let currentSearch = "";
let currentMin = 0;
let currentMax = 500;
let filteredProducts = products || [];

function displayProducts(filteredProducts) {
  if (!shopContainer) return;
  
  if (filteredProducts.length > 0) {
  shopContainer.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
          <button class="fav-btn ${favourites.some((f) => f.id === product.id) ? "active" : ""}" data-id="${product.id}">
            <i class="fa-solid fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button class="add-to-cart">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>`
    )
    .join("");
} else {
  shopContainer.innerHTML = `<p class="no-products">No products found.</p>`;
}

}
  
function filterProducts() {
  const filtered = products.filter(
    (p) =>
      (currentCategory === "All" || p.category === currentCategory) &&
      p.name.toLowerCase().includes(currentSearch.toLowerCase()) &&
      p.price >= currentMin &&
      p.price <= currentMax
  );
  displayProducts(filtered);
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    filterProducts();
  });
});

searchInput?.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  filterProducts();
});

priceFilterBtn?.addEventListener("click", () => {
  currentMin = parseFloat(minPrice.value) || 0;
  currentMax = parseFloat(maxPrice.value) || 9999;
  filterProducts();
});

displayProducts(products);


function attachFavoriteEvents() {
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!currentUser) {
        alert("Please login first to use favourites 💖");
        return;
      }

      const productId = parseInt(btn.dataset.id);
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const exists = favourites.some((f) => f.id === product.id);

      if (exists) {
        favourites = favourites.filter((f) => f.id !== product.id);
        btn.classList.remove("active");
        alert("💔 Removed from favourites");
      } else {
        favourites.push(product);
        btn.classList.add("active");
        alert("💖 Added to favourites");
      }

      // Save for current user
      localStorage.setItem(
        `favorites_${currentUser.email}`,
        JSON.stringify(favourites)
      );
    });
  });
}

attachFavoriteEvents();

function attachProductClickEvents() {
  document.querySelectorAll(".product-card img, .product-card h3").forEach((el) => {
    el.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const productId = parseInt(card.dataset.id);
      const selected = products.find((p) => p.id === productId);
      if (selected) {
        localStorage.setItem("selectedProduct", JSON.stringify(selected));
        window.location.href = "productDetails.html";
      }
    });
  });
}
attachProductClickEvents();


const favGrid = document.getElementById("fav-flex");

if (favGrid) {
  if (!currentUser) {
    favGrid.innerHTML = `<p class="empty-message">Please login to see your favourites 💖</p>`;
  } else {
    const favorites =
      JSON.parse(localStorage.getItem(`favorites_${currentUser.email}`)) || [];

    if (favorites.length === 0) {
      favGrid.innerHTML = `
        <p class="empty-message">
          💔 You have no favourites yet! Go to the
          <a href="shop.html">Shop</a> and add some!
        </p>`;
    } else {
      favGrid.innerHTML = favorites
        .map(
          (item, index) => `
          <div class="fav-card">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <div class="actions">
              <button class="add-to-cart">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
              <button class="remove-fav" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>`
        )
        .join("");

      // Remove Favorite
      document.querySelectorAll(".remove-fav").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.currentTarget.dataset.index;
          const updated = favorites.filter((_, i) => i != index);
          localStorage.setItem(
            `favorites_${currentUser.email}`,
            JSON.stringify(updated)
          );
          e.target.closest(".fav-card").remove();
          if (updated.length === 0) {
            favGrid.innerHTML = `<p class="empty-message">💔 No favourites left!</p>`;
          }
        });
      });
    }
  }
}
//  Add to Cart
const cartItems = currentUser
  ? JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || []
  : [];

const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card, .fav-card');
    if (!card) return;

    const product = {
      name: card.querySelector('h3').textContent,
      price: card.querySelector('p').textContent,
      img: card.querySelector('img').src,
    };

    if (!currentUser) {
      alert("Please login first to add products 🩷");
      return;
    }

    let cart =
      JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || [];

    const exists = cart.find((item) => item.name === product.name);

    if (!exists) {
      cart.push(product);
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
      alert(`${product.name} added to cart 🛒`);
    } else {
      alert("🛒 Already in cart!");
    }
  });
});


// CART PAGE DISPLAY
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalElement = document.getElementById("total-price");

  function getCart() {
    if (!currentUser) return [];
    return JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || [];
  }

  function updateTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
      return sum + price;
    }, 0);
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
  }

  function renderCart() {
    const cart = getCart();

    if (!cartContainer) return;

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="empty-message">🛍️ Your cart is empty!</p>`;
      updateTotal();
      return;
    }

    cartContainer.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
        <button class="remove-btn" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
      )
      .join("");

    attachRemoveEvents();
    updateTotal();
  }

  function attachRemoveEvents() {
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.dataset.index;
        let cart = getCart();
        cart.splice(index, 1);
        localStorage.setItem(
          `cart_${currentUser.email}`,
          JSON.stringify(cart)
        );
        renderCart(); 
      });
    });
  }

  renderCart();
});


document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn");
  const orderPopup = document.getElementById("order-popup");
  const orderDetails = document.getElementById("order-details");
  const orderTotal = document.getElementById("order-total");
  const closePopup = document.getElementById("close-popup");

  if (!checkoutBtn) return; 

  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || [];

    if (cart.length === 0) {
      alert("Your cart is empty 💔");
      return;
    }

    orderDetails.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
      total += price;

      const div = document.createElement("div");
      div.classList.add("order-item");
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;border-radius:8px;">
          <p style="margin:0;">${item.name} - ${item.price}</p>
        </div>
      `;
      orderDetails.appendChild(div);
    });

    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
    orderPopup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    orderPopup.style.display = "none";
  });
});

