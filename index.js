'use strict'

const bookList = document.querySelector('.book-list');
const list = document.querySelector('.shopping-container');


let cart = [];

const bookListOfItem = [
   {
      id: 1,
      image: './images/p1.jpg',
      title: 'Realise it!',
      author: 'Michael T. Nygard',
      price: 45,
      bookPage: './items/RealiseIt.html',
      oldPrice: '$ 50',
   },
   {
      id: 2,
      image: './images/p2.jpg',
      title: 'Production Ready Microservices',
      author: 'Susan J. Flower',
      price: 35,
      bookPage: './items/ProductionReady.html',
      oldPrice: '$ 40',
   }
];

const amount = () => {
   const price = document.querySelectorAll('.item-price > span');
   const total = document.querySelector('.total > span');
   const items = document.querySelectorAll('.shopping-body');

   if (items.length) {
      total.textContent = Array.from(price)
         .map((el) => Number(el.textContent))
         .reduce((prev, acc) => prev + acc);
   } else {
      total.textContent = 0;
   }

};

const renderBookItems = (title, id, author, price, image, bookPage, oldPrice) => {
   const items =
      `<div class='book-item' id=${id}>
   <div class='ook-item-cover'>
   <img src=${image} alt='image' />
   </div>

   <div class="book-item-info">
   <ul class="book-item-list">
      <li class="book-item-list-name">
         <a href= ${bookPage}> ${title}</a>
      </li>
      <li class="book-item-list-author">${author}</li>
      <small class="small"><del> ${oldPrice} </del>&nbsp; &nbsp;<br></i></small>
      <li class="book-item-list-price">${price}</li>
      
      <li class="book-item-list-btn">
         <button>Add to cart</button>
      </li>
   </ul>
</div>
   `;
   bookList.insertAdjacentHTML('afterbegin', items);
   amount();
};



bookListOfItem.map(({ title, id, author, price, image, bookPage, oldPrice }) => {
   renderBookItems(title, id, author, price, image, bookPage, oldPrice);

   const addBtn = document.querySelector('.book-item-list-btn > button');

   addBtn.addEventListener('click', (e) => {

      const id = Number(e.target.closest('.book-item').getAttribute('id'));
      const items = bookListOfItem.find((item) => {
         if (item.id === id) {
            return cart.push(item);
         }
      });
      renderList([items]);
      amount();
   })
});


const renderList = (array) => {
   array.map(({ id, title, price }) =>
      list.insertAdjacentHTML(
         'afterbegin', `
      <ul class="shopping-body">
      <li>${id}</li>
      <li class="title">${title}</li>
      <li class="item-count">1</li>
      <li class="item-price">$<span>${price}</span></li>
      <li>
         <button class="btn btn-succes"><i class="fas fa-plus"></i></button>
         <button class="btn btn-warning"><i class="fas fa-minus"></i></button>
         <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
      </li>
      </ul>
      `
      )
   );

   const [itemPrice] = array.map((el) => el.price);
   const count = document.querySelector('.item-count');
   const plus = document.querySelector('.btn-succes');
   const minus = document.querySelector('.btn-warning');
   const price = document.querySelector('.item-price > span');
   const removeBtn = document.querySelector('.btn-danger');

   addCount(count, plus, price, itemPrice, minus, amount);
   minusCount(count, minus, price, itemPrice, amount);
   removeItem(removeBtn);
};

const addCount = (count, plus, price, itemPrice, minus, amount) => {
   plus.addEventListener('click', (e) => {

      if (minus.hasAttribute('disabled')) {
         minus.removeAttribute('disabled');
      }
      let qty = Number(count.textContent++) + 1;
      const total = qty * itemPrice;
      price.textContent = `${total}`;

      amount();
   });
};

const minusCount = (count, minus, price, itemPrice, amount) => {
   minus.addEventListener('click', () => {
      count.textContent;
      let cost = Number(price.textContent);
      let total = cost - itemPrice;
      count.textContent -= 1;


      if (total < 1) {
         const notification = document.querySelector('.notification');
         notification.classList.remove('hide');
         total = itemPrice;
         count.textContent = 1;
         minus.setAttribute('disabled', 'disabled');
         setTimeout(() => {
            notification.classList.add('hide');
         }, 3000);
      }

      price.textContent = `${total}`;
      amount();

   });
};

const removeItem = (removeBtn) => {
   removeBtn.addEventListener('click', function (e) {
      this.closest('.shopping-body').remove();
      amount();
   });


};






























