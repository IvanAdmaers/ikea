import {getData} from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';


export const catalog = ()=>{
  const updateSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger'),
    catalog = document.querySelector('.catalog'),
    subCatalog = document.querySelector('.subcatalog'),
    subCatalogHeader = document.querySelector('.subcatalog-header'),
    btnReturn = document.querySelector('.btn-return');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.append(overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  };

  const handlerCatalog = e => {
    e.preventDefault();
    const itemList = e.target.closest('.catalog-list__item>a');

    if(itemList){
      getData.subCatalog(itemList.textContent, data=>{
        updateSubCatalog(itemList.textContent, data);
        subCatalog.classList.add('subopen');
      });
    }

    if(e.target.closest('.btn-close')){
      closeMenu();
    }
  };

  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  };


  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', handlerCatalog);
  subCatalog.addEventListener('click', e=>{
    const btnReturn = e.target.closest('.btn-return');
    if(btnReturn) closeSubMenu();
  });
};