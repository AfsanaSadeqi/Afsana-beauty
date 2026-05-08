/*
  Afsana Sadegi Beauty— Lipstick Shop
   Vanilla JavaScript: products, cart, search, filter,
   dark mode, form validation, checkout
  */

/*1. PRODUCT DATA*/
const PRODUCTS = [
  {
    id: 1,
    name: 'Soft Matte Red',
    price: 24.99,
    image: 'images/lipstick-1.jpg',
    description: 'Soft velvet texture, long-lasting wear, non-drying formula.',
    category: 'Matte',
  },
  {
    id: 2,
    name: 'Golden Classic Red',
    price: 19.99,
    image: 'images/lipstick-2.jpg',
    description: 'High shine finish with a moisturizing, plumping effect.',
    category: 'Glossy',
  },
  {
    id: 3,
    name: 'Waterproof Berry Lipstick',
    price: 27.50,
    image: 'images/lipstick-3.jpg',
    description: 'Smudge-proof and water-resistant. Stays put all day.',
    category: 'Waterproof',
  },
  {
    id: 4,
    name: '',
    price: 49.99,
    image: 'images/lipstick-4.jpg',
    description: 'Premium gold packaging with a smooth satin finish.',
    category: 'Luxury',
  },
  {
    id: 5,
    name: 'Nude Blush Matte',
    price: 22.00,
    image: 'images/lipstick-5.jpg',
    description: 'Everyday nude with a soft, pillowy matte finish.',
    category: 'Matte',
  },
  {
    id: 6,
    name: 'Coral Glow Gloss',
    price: 21.50,
    image: 'images/lipstick-6.jpg',
    description: 'Juicy coral shine for fresh, dewy summer lips.',
    category: 'Glossy',
  },
  {
    id: 7,
    name: 'Plum Storm Waterproof',
    price: 28.00,
    image: 'images/lipstick-7.jpg',
    description: 'Bold plum shade engineered to resist water and wear.',
    category: 'Waterproof',
  },
  {
    id: 8,
    name: 'Crystal Rose Couture',
    price: 59.99,
    image: 'images/lipstick-8.jpg',
    description: 'Limited-edition luxury with crystal-embellished case.',
    category: 'Luxury',
  },
  {
    id: 9,
    name: 'Mauve Mood Matte',
    price: 23.50,
    image: 'images/lipstick-9.jpg',
    description: 'Modern mauve with a clean, minimalist matte finish.',
    category: 'Matte',
  },
  {
    id: 10,
    name: 'Cherry Glaze Gloss',
    price: 20.99,
    image: 'images/lipstick-10.jpg',
    description: 'Classic cherry red with a brilliant glassy shine.',
    category: 'Glossy',
  },
];

/*2. CART (localStorage)*/
const CART_KEY = 'belleRouge.cart';

const Cart = {
  items: [],

  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    updateCartBadge();
  },

  add(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const existing = this.items.find((i) => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...product, qty: 1 });
    }
    this.save();
    bumpCartBadge();
    showToast(`${product.name} added to cart`);
  },

  remove(productId) {
    this.items = this.items.filter((i) => i.id !== productId);
    this.save();
  },

  updateQty(productId, delta) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.remove(productId);
    } else {
      this.save();
    }
  },

  clear() {
    this.items = [];
    this.save();
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
};

/*3. UTILITIES */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

const formatPrice = (n) => `$${n.toFixed(2)}`;

function showToast(message) {
  const toastEl = $('#appToast');
  if (!toastEl) return;
  $('#toastBody').textContent = message;
  // bootstrap.Toast is available because we load Bootstrap JS first
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2200 });
  toast.show();
}

function updateCartBadge() {
  const count = Cart.count();
  $$('#cartBadge').forEach((badge) => {
    badge.textContent = count;
    badge.classList.toggle('has-items', count > 0);
  });
}

function bumpCartBadge() {
  $$('#cartBadge').forEach((b) => {
    b.classList.remove('bump');
    // force reflow to restart animation
    void b.offsetWidth;
    b.classList.add('bump');
  });
}

/*4. PRODUCT RENDERING (Home page)*/

const loader = document.getElementById('loadingProducts');
// if (loader) loader.style.display = 'block';



let currentCategory = 'all';
let currentSearch = '';
const FILTER_KEY = 'belleRouge.filters';

function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  const filtered = PRODUCTS.filter((p) => {
    const matchCategory =
      currentCategory === 'all' || p.category === currentCategory;
    const matchSearch =
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch);
    return matchCategory && matchSearch;

if (loader) loader.style.display = 'none';

  });

  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <button class="quick-view" data-id="${p.id}" aria-label="Quick view ${p.name}">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>
        <div class="product-body">
          <span class="badge category-badge">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-footer">
            <p class="price">${formatPrice(p.price)}</p>
            <button class="add-btn" data-id="${p.id}">
              <i class="fa-solid fa-bag-shopping"></i> Add
            </button>
          </div>
        </div>
      </article>
    </div>
  `
    )
    .join('');

if (loader) loader.style.display = 'none';



  $('#noResults').hidden = filtered.length > 0;

  // Bind add-to-cart
  $$('.add-btn', grid).forEach((btn) => {
    btn.addEventListener('click', () => Cart.add(Number(btn.dataset.id)));
  });

  // Bind quick view
  $$('.quick-view', grid).forEach((btn) => {
    btn.addEventListener('click', () => openQuickView(Number(btn.dataset.id)));
  });
}

function openQuickView(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

const modalImg = $('#modalImg');
if (modalImg) {
  modalImg.src = product.image;
  modalImg.alt = product.name;
}

  $('#modalName').textContent = product.name;
  $('#modalDesc').textContent = product.description;
  $('#modalCategory').textContent = product.category;
  $('#modalPrice').textContent = formatPrice(product.price);
  $('#modalAddBtn').onclick = () => {
    Cart.add(id);
    bootstrap.Modal.getInstance($('#quickViewModal')).hide();
  };
  new bootstrap.Modal($('#quickViewModal')).show();
}

/*5. SEARCH + FILTER*/
function initSearchAndFilter() {
  const searchInput = $('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderProducts();
localStorage.setItem(FILTER_KEY, JSON.stringify({
  category: currentCategory,
  search: currentSearch
}));

    });

// Footer filter links
document.querySelectorAll('.footer-filter').forEach(link => {
  link.addEventListener('click', () => {
    const category = link.dataset.category;
    currentCategory = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
      if (btn.dataset.category === category) {
        btn.classList.add('active');
      }
    });

    renderProducts();
  });
});

  }

$$('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    currentCategory = btn.dataset.category;
    renderProducts();
  });
});


}

/*6. DARK MODE*/
const THEME_KEY = 'belleRouge.theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') document.body.classList.add('dark-mode');
  updateThemeIcon();

  $$('#themeToggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  });
}
function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  $$('#themeToggle i').forEach((icon) => {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

/*7. CART PAGE*/
function renderCartPage() {
  const cartItems = $('#cartItems');
  if (!cartItems) return; // not on cart page

  const empty = $('#emptyCart');
  const summaryCol = $('#summaryCol');

  if (Cart.items.length === 0) {
    cartItems.innerHTML = '';
    empty.hidden = false;
    if (summaryCol) summaryCol.style.display = 'none';
  } else {
    empty.hidden = true;
    if (summaryCol) summaryCol.style.display = '';

    cartItems.innerHTML = Cart.items
      .map(
        (i) => `
      <div class="cart-item">
        <img src="${i.image}" alt="${i.name}" />
        <div class="cart-item-info">
          <h6>${i.name}</h6>
          <small>${i.category} • ${formatPrice(i.price)}</small>
        </div>
        <div class="qty-control" aria-label="Quantity">
          <button data-action="dec" data-id="${i.id}" aria-label="Decrease">−</button>
          <span>${i.qty}</span>
          <button data-action="inc" data-id="${i.id}" aria-label="Increase">+</button>
        </div>
        <strong>${formatPrice(i.price * i.qty)}</strong>
        <button class="remove-btn" data-id="${i.id}" aria-label="Remove ${i.name}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
      )
      .join('');

    // Bind qty buttons
    $$('.qty-control button', cartItems).forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        Cart.updateQty(id, btn.dataset.action === 'inc' ? 1 : -1);
        renderCartPage();
      });
    });
    // Bind remove
    $$('.remove-btn', cartItems).forEach((btn) => {
      btn.addEventListener('click', () => {
        Cart.remove(Number(btn.dataset.id));
        renderCartPage();
      });
    });
  }

  // Totals
  const subtotal = Cart.subtotal();
  const shipping = subtotal > 0 && subtotal < 50 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if ($('#subtotal')) $('#subtotal').textContent = formatPrice(subtotal);
  if ($('#shipping')) $('#shipping').textContent = formatPrice(shipping);
  if ($('#tax')) $('#tax').textContent = formatPrice(tax);
  if ($('#total')) $('#total').textContent = formatPrice(total);
}

/*8. CHECKOUT (show/hide section + validation) */
function initCheckout() {
  const toggleBtn = $('#toggleCheckout');
  const form = $('#checkoutForm');
  if (!toggleBtn || !form) return;

  toggleBtn.addEventListener('click', () => {
    if (Cart.items.length === 0) {
      showToast('Your cart is empty');
      return;
    }
    form.hidden = !form.hidden;
    if (!form.hidden) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Real-time validation per field
  const fields = [
    { id: 'fullName',  rule: (v) => v.trim().length >= 2,                  msg: 'Please enter your full name (min 2 characters).' },
    { id: 'email',     rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),  msg: 'Please enter a valid email address.' },
    { id: 'address',   rule: (v) => v.trim().length >= 5,                  msg: 'Please enter a valid shipping address.' },
    { id: 'card',      rule: (v) => /^[0-9\s]{13,19}$/.test(v.trim()),     msg: 'Card number must be 13–19 digits.' },
    { id: 'cvv',       rule: (v) => /^[0-9]{3,4}$/.test(v.trim()),         msg: 'CVV must be 3 or 4 digits.' },
  ];

  fields.forEach((f) => {
    const input = $(`#${f.id}`);
    input.addEventListener('input', () => validateField(f, input));
    input.addEventListener('blur',  () => validateField(f, input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields
      .map((f) => validateField(f, $(`#${f.id}`)))
      .every(Boolean);
    if (!allValid) {
      showToast('Please check your information again');
      return;
    }
    // Fake order confirmation
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    Cart.clear();
    $('#cartLayout').hidden = true;
    $('#confirmation').hidden = false;
    $('#orderNum').textContent = orderNum;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function validateField(field, input) {
  const errorEl = $(`#${field.id}Error`);
  const valid = field.rule(input.value);
  input.classList.toggle('invalid', !valid);
  input.classList.toggle('valid', valid && input.value.length > 0);
  if (errorEl) errorEl.textContent = valid ? '' : field.msg;
  return valid;
}

/*9. CONTACT FORM */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const fields = [
    { id: 'cName',    rule: (v) => v.trim().length >= 2,                  msg: 'Please enter your name (min 2 characters).' },
    { id: 'cEmail',   rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),  msg: 'Please enter a valid email address.' },
    { id: 'cMessage', rule: (v) => v.trim().length >= 10,                 msg: 'Message must be at least 10 characters.' },
  ];

  fields.forEach((f) => {
    const input = $(`#${f.id}`);
    input.addEventListener('input', () => validateField(f, input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = fields.map((f) => validateField(f, $(`#${f.id}`))).every(Boolean);
    if (!ok) {
      showToast('Please check your information again');
      return;
    }
    $('#contactSuccess').hidden = false;
    form.reset();
    $$('.form-control', form).forEach((i) => i.classList.remove('valid', 'invalid'));
    setTimeout(() => ($('#contactSuccess').hidden = true), 5000);
  });
}

/*10. INIT*/
document.addEventListener('DOMContentLoaded', () => {

const saved = JSON.parse(localStorage.getItem(FILTER_KEY));

if (saved) {
  currentCategory = saved.category || 'all';
  currentSearch = saved.search || '';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = currentSearch;
}

  Cart.load();
  updateCartBadge();
  initTheme();

  // Home page only
  if ($('#productGrid')) {
    renderProducts();
    initSearchAndFilter();
  }

  // Cart page only
  if ($('#cartItems')) {
    renderCartPage();
    initCheckout();
  }

  // Contact page only
  if ($('#contactForm')) {
    initContactForm();
  }
});
