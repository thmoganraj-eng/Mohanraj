// Sample menu items (replace with real images & data)

const menuItems = [

  { id: 'm1', name: 'Veg Thali', price: 120, img: 'assets/food1.jpg', desc: 'Seasonal veg with rice & sides' },

  { id: 'm2', name: 'Chicken Biryani', price: 180, img: 'assets/food2.jpg', desc: 'Aromatic biryani with raita' },

  { id: 'm3', name: 'Paneer Butter Masala', price: 140, img: 'assets/food3.jpg', desc: 'Creamy paneer curry' },

  { id: 'm4', name: 'Gulab Jamun (2 pcs)', price: 50, img: 'assets/dessert.jpg', desc: 'Sweet finish' }

];

function el(q){ return document.querySelector(q) }

function elAll(q){ return document.querySelectorAll(q) }

function renderMenu(){

  const grid = el('#menuGrid');

  const select = el('#itemSelect');

  grid.innerHTML = '';

  select.innerHTML = '<option value="">-- choose an item --</option>';

  menuItems.forEach(it => {

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `

      <img src="${it.img}" alt="${it.name}">

      <div>

        <h4>${it.name}</h4>

        <p>${it.desc}</p>

        <p style="color:var(--accent);font-weight:600;margin-top:6px">₹ ${it.price}</p>

      </div>

    `;

    grid.appendChild(card);

    const opt = document.createElement('option');

    opt.value = it.id;

    opt.textContent = `${it.name} — ₹ ${it.price}`;

    select.appendChild(opt);

  });

}

function findItemById(id){

  return menuItems.find(i=>i.id===id);

}

function setupForms(){

  const orderForm = el('#orderForm');

  orderForm.addEventListener('submit', e=>{

    e.preventDefault();

    const fd = new FormData(orderForm);

    const item = findItemById(fd.get('item'));

    if(!item){ alert('Please select an item.'); return; }

    const name = fd.get('name');

    const phone = fd.get('phone');

    const qty = Number(fd.get('qty') || 1);

    const notes = fd.get('notes') || '';

    const subject = encodeURIComponent(`New Order — ${item.name}`);

    const body = encodeURIComponent(

      `Order details:\n\nName: ${name}\nPhone: ${phone}\nItem: ${item.name}\nPrice: ₹${item.price}\nQty: ${qty}\nNotes: ${notes}\n\nTotal: ₹${item.price * qty}`

    );

    // mailto fallback — replace with API (fetch) to send to server

    window.location.href = `mailto:orders@example.com?subject=${subject}&body=${body}`;

  });

  document.getElementById('clearBtn').addEventListener('click', ()=> orderForm.reset());

  const contactForm = el('#contactForm');

  contactForm.addEventListener('submit', e=>{

    e.preventDefault();

    const fd = new FormData(contactForm);

    const name = fd.get('cname');

    const email = fd.get('cemail');

    const message = fd.get('cmessage');

    const subject = encodeURIComponent(`Contact from ${name}`);

    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:info@example.com?subject=${subject}&body=${body}`;

  });

}

// try to open the uploaded PPT when "Open Project PPT" clicked (if file placed near website)

document.addEventListener('click', (e)=>{

  if(e.target && e.target.id === 'viewPPT'){

    e.preventDefault();

    // If PPT is hosted, link here; otherwise instruct user to open local file.

    alert('Open the project PPT from your presentation folder (food hotel-1.pptx). If you host the site, add a link to the hosted PPT or attach it to your GitHub repo.');

  }

});

renderMenu();

setupForms();