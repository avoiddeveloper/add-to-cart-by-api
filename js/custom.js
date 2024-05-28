
const loadData = async(query="") => {
    document.getElementById('loading').classList.remove('hidden');
    const url = `https://fakestoreapi.com/products${query}`;
    const response = await fetch(url);
    const data = await response.json();
    if(!data.length){
        document.getElementById('not_found').classList.remove('hidden');
        document.getElementById('loading').classList.add('hidden');
    }

    if(data.length > 0){
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('not_found').classList.add('hidden');
    }
    displayData(data);
}

const handelSearch = () => {
    const searchValue = document.getElementById('search_field').value;
    loadData(`/category/${searchValue}`);
}

const displayData = (products) => {
    const showCaseContainer = document.getElementById('showCase_container');
    showCaseContainer.innerHTML='';
    products.forEach(product => {
        // console.log(product);
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-base-100 shadow-xl`;
        cardDiv.innerHTML = `
        <figure><img src="${product.image}" alt="Shoes" /></figure>
        <div class="p-4 text-center">
          <h2 class="card-title justify-center">${product.title}</h2>
          <p class="py-2">${product.description}</p>
          <p class="font-bold text-xl">Price: ${product.price}$</p>
            <div class="text-center gap-2 py-6">
               <p class="font-bold">Rating: ${product.rating?.rate}</p>
               <p>Category: ${product.category}</p>
            </div>
          <div class="card-actions justify-center">
            <button onclick="addToCart('${product.title}','${product.price}')" class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        showCaseContainer.appendChild(cardDiv);
    });
}

const addToCart = (name, price) => {
    const cartContainer = document.getElementById('cart_container');
    const div = document.createElement('div');
    div.classList=`border rounded-xl p-2 mb-2`;
    div.innerHTML = `
    <p>Product: ${name}</p>
    <p>Price: ${price}$</p>
    `;
    cartContainer.appendChild(div);
    console.log(name,price);
}

loadData();