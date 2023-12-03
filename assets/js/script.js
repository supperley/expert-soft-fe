const allProductCards = document.querySelectorAll('.product-item');

const products = ['product1', 'product2'];

let hiddenProducts = [];
let favouriteProducts = [];
let comparisonProducts = [];
let showHidden = false;
let filterType = 'All';

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

  if (!showHidden) {
    // Hide products marked as hidden
    hiddenProducts.forEach((productId) => {
      const productCard = document.getElementById(productId);
      productCard.classList.add('product-item_hidden');
    });
  } else {
    // Show all products
    showAllProducts();
  }
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

    if (!showHidden && hiddenProducts.includes(productCard.id)) {
      // Hide product marked as hidden
      productCard.classList.add('product-item_hidden');
    } else {
      productCard.classList.remove('product-item_hidden');
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
