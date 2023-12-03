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

for (let product of productData) {
  const productItem = createProductItem(product);
  document.querySelector('.product-catalog').appendChild(productItem);
}

const allProductCards = document.querySelectorAll('.product-item');

let hiddenProducts = [];
let favouriteProducts = [];
let comparisonProducts = [];
let showHidden = false;
let filterType = 'all';

function createProductItem(product) {
  const productItem = document.createElement('li');
  productItem.classList.add('product-catalog__item', 'product-item');
  productItem.id = product.id;

  const productItemHTML = `
    <div class="product-item__card product-card">
      <span class="product-card__badge">New</span>
      <div class="product-card__actions">
        <div class="product-card__actions-item" onclick="toggleVisibility(event, '${product.id}')">
          <i class="fa-regular fa-eye"></i>
        </div>
        <div class="product-card__actions-item" onclick="toggleFavourite(event, '${product.id}')">
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="product-card__actions-item" onclick="toggleComparison(event, '${product.id}')">
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

  productItem.innerHTML = productItemHTML;
  return productItem;
}

function toggleVisibility(e, productId) {
  const index = hiddenProducts.indexOf(productId);

  if (index === -1) {
    hiddenProducts.push(productId);
    e.currentTarget.classList.add('product-card__actions-item_active');
  } else {
    hiddenProducts.splice(index, 1);
    e.currentTarget.classList.remove('product-card__actions-item_active');
  }

  filterProducts(filterType);
}

function toggleFavourite(e, productId) {
  const index = favouriteProducts.indexOf(productId);

  if (index === -1) {
    favouriteProducts.push(productId);
    e.currentTarget.classList.add('product-card__actions-item_active');
  } else {
    favouriteProducts.splice(index, 1);
    e.currentTarget.classList.remove('product-card__actions-item_active');
  }

  filterProducts(filterType);
}

function toggleComparison(e, productId) {
  const index = comparisonProducts.indexOf(productId);

  if (index === -1) {
    comparisonProducts.push(productId);
    e.currentTarget.classList.add('product-card__actions-item_active');
  } else {
    comparisonProducts.splice(index, 1);
    e.currentTarget.classList.remove('product-card__actions-item_active');
  }

  filterProducts(filterType);
}

function toggleShowHidden() {
  showHidden = !showHidden;

  filterProducts(filterType);
}

function filterProducts(newFilterType) {
  filterType = newFilterType;

  const allBtn = document.getElementById('allBtn');
  const favBtn = document.getElementById('favBtn');
  const compBtn = document.getElementById('compBtn');

  allBtn.classList.remove('product-filter__button_active');
  favBtn.classList.remove('product-filter__button_active');
  compBtn.classList.remove('product-filter__button_active');

  switch (filterType) {
    case 'all':
      allBtn.classList.add('product-filter__button_active');
      showAllProducts();
      break;
    case 'favourites':
      favBtn.classList.add('product-filter__button_active');
      showFavouriteProducts();
      break;
    case 'comparison':
      compBtn.classList.add('product-filter__button_active');
      showComparisonProducts();
      break;
    default:
      break;
  }
}

function showAllProducts() {
  allProductCards.forEach((productCard) => {
    productCard.classList.remove('product-item_deleted');
    productCard.classList.remove('product-item_hidden');

    if (hiddenProducts.includes(productCard.id)) {
      if (showHidden) {
        // Hide product marked as hidden
        productCard.classList.add('product-item_hidden');
      } else {
        // Delete hidden
        productCard.classList.add('product-item_deleted');
      }
    }
  });
}

function showFavouriteProducts() {
  showAllProducts();

  allProductCards.forEach((element) => {
    if (!favouriteProducts.includes(element.id)) {
      element.classList.add('product-item_deleted');
    }
  });
}

function showComparisonProducts() {
  showAllProducts();

  allProductCards.forEach((element) => {
    if (!comparisonProducts.includes(element.id)) {
      element.classList.add('product-item_deleted');
    }
  });
}
