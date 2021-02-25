let products = [
    
    {
        "id": 1,
        "title": "Coffee Grinder",
        "body": "This legendary coffe grinder will crush your beans like no one before! new blades allowing to extract the best contents from every piece of coffee to get that astonishing blend!",
        "img":  "coffeegrinder.jpg",
        "price": "41.99"
    },

    {
        "id": 2,
        "title": "POP Snack and Cookie Jars",
        "body": "Handy storage for your beans. Product made easly compositable components to make sure that every little piece of it will be safe reused in the future!",
        "img":  "jar.jpg",
        "price": "41.99"
    },

    {
        "id": "03",
        "title": "Brush",
        "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quasnvoluptate dolores velit et doloremque molestiae",
        "img":  "brush.png",
        "price": "14.49"
    },

    {
        "id": "04",
        "title": "cream & sugar set",
        "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
        "img":  "creamsugarset.png",
        "price": "19.95"
    },

    {
        "id": "05",
        "title": "Eco straws",
        "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum",
        "img":  "straws.png",
        "price": "5.00"
    },

    {
        "id": "06",
        "title": "Thermos (each)",
        "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae",
        "img":  "thermos.jpg",
        "price": "22.99"
    },

    {
        "id": "07",
        "title": "white Cup",
        "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae",
        "img":  "white-cup.jpg",
        "price": "9.99"
    }

];

let PRODUCTS =[];
let imgPath = "/img/"

let shopFeatured = document.getElementById('featured')

let CART = {
    KEY: 'asdasd',
    contents: [],
    init() {
        //check local storage and initialise the contents of cart.contents.
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } 
        else {
            //dummy test data
            CART.contents = [
                {id:1, title:"Coffee Grinder", qty:5, price:"41.99"}
            ];
            //in production use an empty array here only!
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id) {
        //find an item in the cart by it's id
        let match = CART.contents.filter(item=>{
            console.log(match);
            if(item.id = id)
                return true;
        }); 
        if(match && match[0])
            return match[0];
    },
    add(id) {
        //add a new item to the cart
        //check that it is not in the cart already
        if(CART.find(id)) {
            CART.increase(id, 1);
        }
        else {
            let arr = PRODUCTS.filter(product=>{
                if(product.id == id) {
                    return true;
                }
            });
            if (arr & arr[0].id) {
                let.obj = { 
                    id: arr[0].id,
                    title: arr[0].title,
                    qty: 1,
                    itemPrice: arr[0].price 
                };
                //desc:arr[0].desc
                CART.contents.push(obj);
                //update localStorage
                CART.sync();
            }
            else {
                //product id does not exist in products data
                console.error('invalid product');
            }
                
        }         
    },
    increase(id, qty=1){
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        //update localStorage
        CART.sync()
    }    
}

document.addEventListener('DOMContentLoaded', () => { 
getProducts( showProducts, ), shopFeaturedItem();
});

shopFeaturedItem = function () {
    // console.log("active");
    document.getElementById('featured').style.translate = "50px, 100px";
}

// showProducts(products);
function getProducts(success, failure) {
    const URL = "merch.json"
    fetch(URL, {
        method: "GET",
        mode: "cors"
    })
    .then(response=>response.json())
    .then(success)
    .catch(failure);
}

function showProducts(products) {
    PRODUCTS = products;
    shopGrid = document.getElementById('products');
    let url = " ";
    // const imagePath = 
    products.forEach(products => {

        let shopListing = document.createElement('div');
        shopListing.className = "shopListing";
        shopGrid.append(shopListing);
        shopListing.innerHtml = "lalalal";

        shopListing.setAttribute("id", products.id);
        
        //Title
        let cardTitle = document.createElement("h1");
        cardTitle.className = "shopListingHeading";
        cardTitle.textContent = products.title;
        shopListing.append(cardTitle);
        

        //Image
        let cardImg = document.createElement("div");
        cardImg.className = "itemImg";
        cardImg.setAttribute("id", products.img);
        cardImg.src = imgPath + products.img;
        shopListing.append(cardImg);

        //Description
        let cardTxt = document.createElement("p");
        cardTxt.className ="shopListingDescription"
        cardTxt.textContent = products.body;
        shopListing.append(cardTxt);


        //Price & Button Container
        let cardBuy = document.createElement("div");
        cardBuy.className ="shopListingPricing"
        shopListing.append(cardBuy);

        //Set Pricing
        let cardPrice = document.createElement("p");
        cardPrice.className ="shopListingPrice";
        cardPrice.textContent = "£" + products.price;
        cardBuy.append(cardPrice);

        //Create an ValueInput
        let cardInput = document.createElement("input");
        cardInput.className ="shopListingCounter";
        cardInput.setAttribute("type", "number");
        cardInput.setAttribute("id", "quantity");
        cardInput.setAttribute("value", 1);
        cardInput.setAttribute("max", 50);
        cardInput.setAttribute("min", 1);
        cardBuy.append(cardInput);

        //Create a button
        let cardBtn = document.createElement("Button");
        cardBtn.className ="shopAddBtn";
        cardBtn.textContent = "Add to Cart";
        cardBtn.setAttribute("data-id", products.id);
        cardBtn.addEventListener('click', addItem);
        cardBuy.append(cardBtn);

        document.getElementById(products.img).style.backgroundImage  = "url('"+imgPath + products.img+"')";
    })

    function errorMessage(err){
        console.error(err);
    }
    
}

function addItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log("add item to cart", id, CART);
    CART.add(id, 1);
    showCart();
}

function showCart(){
    let cartSection = document.getElementById('cart');
    cart.innerHTML = '';
    let s = CART.sort('qty');
    s.forEach( item =>{
        let cartitem = document.createElement('div');
        cartitem.className = 'cart-item';
        
        let title = document.createElement('h3');
        title.textContent = item.title;
        title.className = 'title'
        cartitem.appendChild(title);
        
        let controls = document.createElement('div');
        controls.className = 'controls';
        cartitem.appendChild(controls);
        
        let plus = document.createElement('span');
        plus.textContent = '+';
        plus.setAttribute('data-id', item.id)
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart)
        
        let qty = document.createElement('span');
        qty.textContent = item.qty;
        controls.appendChild(qty);
        
        let minus = document.createElement('span');
        minus.textContent = '-';
        minus.setAttribute('data-id', item.id)
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart)
        
        let price = document.createElement('div');
        price.className = 'price';
        let cost = new Intl.NumberFormat('en-CA', 
                        {style: 'currency', currency:'CAD'}).format(item.qty * item.itemPrice);
        price.textContent = cost;
        cartitem.appendChild(price);
        
        cartSection.appendChild(cartitem);
    })
}