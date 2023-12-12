const productData = [
  {
    id: 'product1',
    category: 'Books',
    name: 'Bear Town',
    rating: 4.4,
    image: '1.jpg',
    oldPrice: 24.9,
    newPrice: 14.9,
  },
  {
    id: 'product2',
    category: 'Books',
    name: 'Beneath a Scarlet Sky',
    rating: 3.65,
    image: '2.jpg',
    oldPrice: 29.9,
    newPrice: 19.9,
  },
  {
    id: 'product3',
    category: 'Books',
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    rating: 4.8,
    image: '3.jpg',
    oldPrice: 19.9,
    newPrice: 18.2,
  },
  {
    id: 'product4',
    category: 'Books',
    name: 'The Great Disappearance: 31 Ways to be Rapture Ready',
    rating: 4.7,
    image: '4.jpg',
    oldPrice: 19,
    newPrice: 16.5,
  },
  {
    id: 'product5',
    category: 'Books',
    name: 'All the Light We Cannot See',
    rating: 4.5,
    image: '5.jpg',
    oldPrice: 24,
    newPrice: 14,
  },
  {
    id: 'product6',
    category: 'Books',
    name: 'The Heaven & Earth Grocery Store: A Novel',
    rating: 4.5,
    image: '6.jpg',
    oldPrice: 25,
    newPrice: 21.5,
  },
  {
    id: 'product7',
    category: 'Books',
    name: "Where's Bluey?: A Search-and-Find Book",
    rating: 4.8,
    image: '7.jpg',
    oldPrice: 10,
    newPrice: 5.89,
  },
  {
    id: 'product8',
    category: 'Books',
    name: "From Crook to Cook: Platinum Recipes from Tha Boss Dogg's Kitchen",
    rating: 4.8,
    image: '8.jpg',
    oldPrice: 29,
    newPrice: 19,
  },
  {
    id: 'product9',
    category: 'Books',
    name: 'The Covenant of Water',
    rating: 4.6,
    image: '9.jpg',
    oldPrice: 14.9,
    newPrice: 9.24,
  },
  {
    id: 'product10',
    category: 'Books',
    name: 'Holly',
    rating: 4.4,
    image: '10.jpg',
    oldPrice: 19.49,
    newPrice: 14.99,
  },
];

const HIDDEN_PRODUCTS_KEY = 'hiddenProducts';
const FAVOURITE_PRODUCTS_KEY = 'favouriteProducts';
const COMPARISON_PRODUCTS_KEY = 'comparisonProducts';
const SHOW_HIDDEN_KEY = 'showHidden';
const FILTER_TYPE_KEY = 'filterType';
const FILTER_ALL = 'all';
const FILTER_HIDDEN = 'hidden';
const FILTER_FAVOURITE = 'favourite';
const FILTER_COMPARISON = 'comparison';

let productItems = [];
let hiddenProducts = [];
let favouriteProducts = [];
let comparisonProducts = [];
let showHidden = true;
let filterType = FILTER_ALL;

const allBtn = document.getElementById('allBtn');
const favBtn = document.getElementById('favBtn');
const compBtn = document.getElementById('compBtn');

document.addEventListener('DOMContentLoaded', function () {
  loadStateFromLocalStorage();

  if (showHidden) {
    document.querySelector('.filter-checkbox__input').checked = true;
  }

  for (let product of productData) {
    const productItem = createProductItem(product);
    setBadgesState(productItem);
    productItems.push(productItem);
  }

  filterProducts(filterType);

  for (let productItem of productItems) {
    document.querySelector('.product-catalog').appendChild(productItem);
  }
});

function loadStateFromLocalStorage() {
  hiddenProducts = JSON.parse(localStorage.getItem(HIDDEN_PRODUCTS_KEY)) || [];
  favouriteProducts = JSON.parse(localStorage.getItem(FAVOURITE_PRODUCTS_KEY)) || [];
  comparisonProducts = JSON.parse(localStorage.getItem(COMPARISON_PRODUCTS_KEY)) || [];
  showHidden = JSON.parse(localStorage.getItem(SHOW_HIDDEN_KEY)) || false;
  filterType = JSON.parse(localStorage.getItem(FILTER_TYPE_KEY)) || 'all';
}

function saveStateToLocalStorage() {
  localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify(hiddenProducts));
  localStorage.setItem(FAVOURITE_PRODUCTS_KEY, JSON.stringify(favouriteProducts));
  localStorage.setItem(COMPARISON_PRODUCTS_KEY, JSON.stringify(comparisonProducts));
  localStorage.setItem(SHOW_HIDDEN_KEY, JSON.stringify(showHidden));
  localStorage.setItem(FILTER_TYPE_KEY, JSON.stringify(filterType));
}

function createProductItem(product) {
  const productItem = document.createElement('li');
  productItem.classList.add('product-catalog__item', 'product-item');
  productItem.id = product.id;

  productItem.innerHTML = `
    <div class="product-item__card product-card">
      <span class="product-card__badge">New</span>
      <div class="product-card__actions">
        <div class="product-card__actions-item" onclick="toggleStatus(event, '${
          product.id
        }', '${FILTER_HIDDEN}')">
          <i class="fa-regular fa-eye"></i>
        </div>
        <div class="product-card__actions-item" onclick="toggleStatus(event, '${
          product.id
        }', '${FILTER_FAVOURITE}')">
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="product-card__actions-item" onclick="toggleStatus(event, '${
          product.id
        }', '${FILTER_COMPARISON}')">
          <i class="fa-solid fa-scale-balanced"></i>
        </div>
      </div>
      <div class="product-card__photo-container">
        <img class="product-card__photo" src="assets/images/${
          product.image
        }" alt="product-card photo" />
      </div>
      <div class="product-card__description">
        <span class="product-card__category">${product.category}</span>
        <div class="product-card__stars-container">
          <div class="product-stars">
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
          </div>
          <div class="product-stars product-stars_active" style="width: ${
            (product.rating / 5) * 100
          }%">
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
            <i class="product-stars__star fa-solid fa-star"></i>
          </div>
        </div>
        <span class="product-card__title">${product.name}</span>
        <div class="product-card__prices">
          <span class="product-card__price product-card__price_new">${product.newPrice}$</span>
          <span class="product-card__price product-card__price_old">${product.oldPrice}$</span>
        </div>
      </div>
    </div>
    <button class="product-item__button-add">
      <i class="fa-solid fa-cart-shopping"></i> add to cart
    </button>
  `;

  return productItem;
}

function setBadgesState(productItem) {
  if (hiddenProducts.includes(productItem.id)) {
    productItem
      .querySelector('.product-card__actions-item:nth-child(1)')
      .classList.add('product-card__actions-item_active');
  }

  if (favouriteProducts.includes(productItem.id)) {
    productItem
      .querySelector('.product-card__actions-item:nth-child(2)')
      .classList.add('product-card__actions-item_active');
  }

  if (comparisonProducts.includes(productItem.id)) {
    productItem
      .querySelector('.product-card__actions-item:nth-child(3)')
      .classList.add('product-card__actions-item_active');
  }
}

function toggleStatus(event, productId, statusType) {
  let specificProducts;

  if (statusType === FILTER_HIDDEN) {
    specificProducts = hiddenProducts;
  } else if (statusType === FILTER_FAVOURITE) {
    specificProducts = favouriteProducts;
  } else if (statusType === FILTER_COMPARISON) {
    specificProducts = comparisonProducts;
  }

  const index = specificProducts.indexOf(productId);

  if (index === -1) {
    specificProducts.push(productId);
    event.currentTarget.classList.add('product-card__actions-item_active');
  } else {
    specificProducts.splice(index, 1);
    event.currentTarget.classList.remove('product-card__actions-item_active');
  }

  filterProducts(filterType);
}

function toggleShowHidden() {
  showHidden = !showHidden;

  filterProducts(filterType);
}

function filterProducts(newFilterType) {
  filterType = newFilterType;

  allBtn.classList.remove('product-filter__button_active');
  favBtn.classList.remove('product-filter__button_active');
  compBtn.classList.remove('product-filter__button_active');

  switch (filterType) {
    case FILTER_ALL:
      allBtn.classList.add('product-filter__button_active');
      showProducts();
      break;
    case FILTER_FAVOURITE:
      favBtn.classList.add('product-filter__button_active');
      showProducts(FILTER_FAVOURITE);
      break;
    case FILTER_COMPARISON:
      compBtn.classList.add('product-filter__button_active');
      showProducts(FILTER_COMPARISON);
      break;
    default:
      break;
  }

  saveStateToLocalStorage();
}

function showProducts(productType = FILTER_ALL) {
  productItems.forEach((productItem) => {
    productItem.classList.remove('product-item_deleted');
    productItem.classList.remove('product-item_hidden');

    if (hiddenProducts.includes(productItem.id)) {
      if (showHidden) {
        // Hide product marked as hidden
        productItem.classList.add('product-item_hidden');
      } else {
        // Delete hidden
        productItem.classList.add('product-item_deleted');
      }
    }
  });

  if (productType != FILTER_ALL) {
    let specificProducts;

    if (productType === FILTER_FAVOURITE) {
      specificProducts = favouriteProducts;
    } else if (productType === FILTER_COMPARISON) {
      specificProducts = comparisonProducts;
    }

    productItems.forEach((element) => {
      if (!specificProducts.includes(element.id)) {
        element.classList.add('product-item_deleted');
      }
    });
  }
}
