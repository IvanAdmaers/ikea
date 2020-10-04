import {getData} from './getData.js';
import userData from './userData.js';

const COUNTER = 6;

const generateIemPage = ()=>{

  const renderCard = ({category, count, description, id, img, name: itemName, price, subcategory})=>{

    const breadCrumbLink = document.querySelectorAll('.breadcrumb__link');
    const goodImages = document.querySelector('.good-images');
    const goodItemNew = document.querySelector('.good-item__new');
    const goodItemHeader = document.querySelector('.good-item__header');
    const goodItemDescription = document.querySelector('.good-item__description');
    const goodItemEmpty = document.querySelector('.good-item__empty');
    const goodItemPriceValue = document.querySelector('.good-item__price-value');
    const btnGood = document.querySelector('.btn-good');
    const btnAddWishList = document.querySelector('.btn-add-wishlist');

    breadCrumbLink[0].textContent = category;
    breadCrumbLink[0].href = `goods.html?cat=${category}`;

    breadCrumbLink[1].textContent = subcategory;
    breadCrumbLink[1].href = `goods.html?subcat=${subcategory}`;

    breadCrumbLink[2].textContent = itemName;


    goodImages.textContent = '';
    goodItemHeader.textContent = itemName;
    goodItemDescription.textContent = description;
    goodItemPriceValue.textContent = price;
    btnGood.dataset.idd = id;
    btnAddWishList.dataset.idd = id;

    img.forEach(item=>{
      goodImages.insertAdjacentHTML('afterbegin', `
      <div class="good-image__item">
        <img src="${item}" alt="${itemName} - ${description}">
      </div>
      `);
    });

    if(count >= COUNTER){
      goodItemNew.style.display = 'block';
    } else if(!count){
      goodItemEmpty.style.display = 'block';
      btnGood.style.display = 'none';
    }

    const checkWishList = ()=>{
      if(userData.wishList.includes(id)){
        btnAddWishList.classList.add('contains-wishlist');
      } else {
        btnAddWishList.classList.remove('contains-wishlist');
      }
    };

    checkWishList();

    btnAddWishList.addEventListener('click', ()=>{
      userData.wishList = id;
      checkWishList();
    });

    btnGood.addEventListener('click', ()=>{
      userData.cartList = id;
    });


  };

  if(location.hash && location.pathname.includes('card')){
    getData.item(window.location.hash.substring(1), renderCard);
  }

};

export default generateIemPage;

