import {getLocalStorage, setLocalStorage} from './storage.js';

const userData = {
  wishListData: getLocalStorage('wishlist'),
  get wishList(){
    return this.wishListData
  },
  set wishList(id){
    if(this.wishListData.includes(id)){
      const idx = this.wishListData.indexOf(id);
      this.wishListData.splice(idx, 1);
    } else {
      this.wishListData.push(id);
    }
    setLocalStorage('wishlist', this.wishList);
    
  },


  cartListData: getLocalStorage('cartList'),

  get cartList(){
    return this.cartListData
  },
  set cartList(id){
    let obj = this.cartListData.find(item=>item.id === id);
    if(obj){
      obj.count++;
    } else {
      obj = {
        id,
        count: 1
      };
      this.cartListData.push(obj);
    }
    setLocalStorage('cartList', this.cartList);
  },
  set changeCountCartList(itemCart){
    let obj = this.cartListData.find(item=>item.id === itemCart.id);
    obj.count = itemCart.count;

    setLocalStorage('cartList', this.cartList);
  },
  set deleteItemCart(id){
    let idx = -1;

    this.cartList.forEach((item, i)=>{
      if(item.id === id){
        idx = i;
      }
    });
    this.cartList.splice(idx, 1);
    setLocalStorage('cartList', this.cartList);

  }


};

export default userData;




