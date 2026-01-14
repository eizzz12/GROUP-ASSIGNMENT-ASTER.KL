// ==========================================
// 1. DATA & INITIALIZATION
// ==========================================
let cart = JSON.parse(localStorage.getItem('asterCart')) || [];

// Database Produk untuk Quick Add (EID 2025)
const productsData = {
    aude1:{name:"Aude Classic Hazel",price:249,img:"images/aude 1.jpg"},
    aude2:{name:"Aude Classic White",price:249,img:"images/aude 2.jpg"},
    aude3:{name:"Aude Classic Smokey",price:269,img:"images/aude 3.jpg"},
    aude4:{name:"Aude Classic Blossom",price:289,img:"images/aude 4.jpg"},
    aude5:{name:"Aude Classic Olive",price:229,img:"images/aude 5.jpg"},
    asim1:{name:"Asimetrik White Top",price:189,img:"images/asimetrik 1.jpg"},
    asim2:{name:"Asimetrik Hazel Top",price:189,img:"images/asimetrik 2.jpg"},
    asim3:{name:"Asimetrik Set White",price:289,img:"images/asimetrik 3.jpg"},
    asim4:{name:"Asimetrik Set Hazel",price:289,img:"images/asimetrik 4.jpg"},
    asim5:{name:"Asimetrik Selendang",price:99,img:"images/selendang.jpg"}
};

// ==========================================
// 2.  CART LOGIC 
// ==========================================
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');

    if (!container || !countSpan) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += (item.price * item.qty);
        container.innerHTML += `
            <div class="cart-item" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #eee;">
                <img src="${item.img}" style="width:50px; height:70px; object-fit:cover;">
                <div style="flex:1;">
                    <h4 style="margin:0; font-size:13px;">${item.name}</h4>
                    <p style="margin:2px 0; font-size:11px;">Size: ${item.size || 'M'} | Qty: ${item.qty}</p>
                    <p style="margin:0; font-weight:600;">RM ${item.price * item.qty}.00</p>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; cursor:pointer; color:red;">✕</button>
            </div>
        `;
    });

    countSpan.innerText = cart.length;
    if (totalSpan) totalSpan.innerText = `RM ${total}.00`;
    
    localStorage.setItem('asterCart', JSON.stringify(cart));
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

window.toggleCart = function(show) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.toggle('open', show);
    if (overlay) overlay.classList.toggle('active', show);
};

// ==========================================
// 3. EVENT LISTENERS (ON LOAD)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animation
    const checkReveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // Cart Controls
    const cartIcon = document.getElementById('cart-icon');
    const closeBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('cart-overlay');
    const checkoutBtn = document.getElementById('checkout');

    if (cartIcon) cartIcon.onclick = (e) => { e.preventDefault(); toggleCart(true); };
    if (closeBtn) closeBtn.onclick = () => toggleCart(false);
    if (overlay) overlay.onclick = () => toggleCart(false);

    // FIX: Checkout Button Logic
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert("Your cart is empty. Please add items before checkout.");
            }
        });
    }

    // Quick Add Setup (for eid2025 page)
    const quickAddBtns = document.querySelectorAll(".quick-add");
    if (quickAddBtns.length > 0) {
        const productKeys = Object.keys(productsData);
        quickAddBtns.forEach((btn, index) => {
            btn.onclick = () => {
                const pId = productKeys[index];
                const p = productsData[pId];
                if (p) {
                    cart.push({ ...p, size: "M", qty: 1 });
                    updateCartUI();
                    toggleCart(true);
                }
            };
        });
    }

    updateCartUI();
});

// ==========================================
// 4. SLIDERS & ANIMATIONS
// ==========================================
let advIndex = 0;
const advTrack = document.getElementById('advTrack');
if (advTrack) {
    setInterval(() => {
        advIndex = (advIndex + 1) % 3;
        advTrack.style.transform = `translateX(-${advIndex * 33.333}%)`;
    }, 5000);
}

window.moveColSlide = function(direction) {
    const track = document.querySelector('.collection-track');
    const wrapper = document.querySelector('.collection-wrapper');
    if (!track || !wrapper) return;
    
    let currentIdx = parseInt(track.dataset.index || 0);
    currentIdx += direction;
    
    if (currentIdx < 0) currentIdx = 0;
    if (currentIdx > 1) currentIdx = 1; // Based on your 2 slides
    
    track.dataset.index = currentIdx;
    track.style.transform = `translateX(-${currentIdx * wrapper.offsetWidth}px)`;
};

function moveColSlide(direction) {
    const track = document.getElementById('colTrack');
    const wrapper = document.querySelector('.collection-wrapper');
    const slides = document.querySelectorAll('.col-slide');
    
    const width = wrapper.offsetWidth; 
    
    colIndex += direction;

    if (colIndex < 0) colIndex = 0;
    if (colIndex > slides.length - 1) colIndex = slides.length - 1;

    track.style.transform = `translateX(-${colIndex * width}px)`;
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Tutup menu kalau user klik link
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));