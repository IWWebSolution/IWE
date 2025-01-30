window.addEventListener('load', function(){
  new Glider(document.querySelector('.glider'), {
  slidesToShow: 1.2,
  slidesToScroll: 1,
  draggable: true,
  dots: '.dots',
  dragVelocity: 1.5,  
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  },
    responsive: [
    {
    // screens greater than >= 775px
      breakpoint: 500,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1
      }
    },
  {
    // screens greater than >= 775px
    breakpoint: 768,
    settings: {
      slidesToShow: 2.2,
      slidesToScroll: 1
    }
  },{
    // screens greater than >= 1024px
    breakpoint: 1000,
    settings: {
      slidesToShow: 3.2,
      slidesToScroll: 1,
      itemWidth: 120
    }
  }
 ]
});

})

let backStack = [];

function openPopup(title, subcategories) {
document.getElementById('popup-header').innerText = title;

// Populate the subcategories
const list = document.getElementById('popup-list');
list.innerHTML = ''; // Clear previous items
subcategories.forEach(subcategory => {
  const li = document.createElement('li');
  li.textContent = subcategory.name || subcategory; // Handle nested or flat subcategories
  li.style.cursor = 'pointer';

  // Attach click event to open subcategories, if available
  li.onclick = () => {
    if (subcategory.subcategories) {
      backStack.push({ title, subcategories }); // Save current state
      openSubPopup(subcategory.name, subcategory.subcategories);
    }
  };

  list.appendChild(li);
});

// Toggle back button visibility
document.getElementById('back-button').style.display = backStack.length > 0 ? 'block' : 'none';

// Show popup and overlay
document.getElementById('popup').style.display = 'block';
document.getElementById('popup-overlay').style.display = 'block';
}

// Function to open a sub-pop-up
function openSubPopup(title, subSubcategories) {
document.getElementById('popup-header').innerText = title;

// Populate the sub-subcategories
const list = document.getElementById('popup-list');
list.innerHTML = ''; // Clear previous items
subSubcategories.forEach(subSubcategory => {
    const li = document.createElement('li');
    li.textContent = subSubcategory;
    list.appendChild(li);
});

document.getElementById('back-button').style.display = 'block';
}

function goBack() {
if (backStack.length > 0) {
  const previousState = backStack.pop(); // Get the last state
  openPopup(previousState.title, previousState.subcategories);
}
}
// Function to close the pop-up
function closePopup() {
document.getElementById('popup').style.display = 'none';
document.getElementById('popup-overlay').style.display = 'none';
backStack = []; // Clear the back stack
}

document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.card').forEach((card, index) => {
  card.onclick = () => {
    openPopup(categories[index].name, categories[index].subcategories || []);
  };
});
});

const categories = [
{
  name: 'Food Products & Beverages',
  subcategories: [
    {
      name: 'Dairy Products',
      subcategories: ['Milk','Cheese','Butter','Ice-Cream','Paneer']
    },
    {
      name: 'Confectionery & Bakery Products',
      subcategories: ['Chocolates', 'Cookies', 'Biscuit', 'Birthday Cake', 'Candy']
    },
    {
      name: 'Cooking Spices & Masala',
      subcategories: ['Cinnamon', 'Ginger', 'Turmeric', 'Coriander', 'Garam Masala']
    },
    {
      name: 'Beverages',
      subcategories: ['Beer', 'Ice', 'Coconut Water', 'Apple Cider Vinegar']
    },
    {
      name: 'Dry Fruits',
      subcategories: ['Almond', 'Cashews', 'Walnuts', 'Dates', 'Foxnuts']
    },
    {
      name: 'Black Tea'
    }
  ]
},
{
  name: 'Agriculture',
  subcategories: [
    {
      name: 'Fresh Flowers & Plants',
      subcategories: ['Rose', 'Marigold', 'Orchids', 'Money Plant', 'Wheat Grass']
    },
    {
      name: 'Food Grains & Cereals',
      subcategories: ['Oats', 'Rice', 'Jaggery', 'Wheat']
    },
    {
      name: 'Fruits',
      subcategories: ['Mango', 'Apple', 'Blackberry', 'Dragon Fruit']
    },
    {
      name: 'Agricultural Equipments & Supplies',
      subcategories: ['Seed Drills', 'Pickaxe', 'Other Equipments','Agricultural Tools']
    }
  ]
},
{
  name: 'Fashion & Apparel',
  subcategories: [
    {
      name: 'Leather Clothing',
      subcategories: ['Leather Jacket', 'Waist Coat', 'Leather Belts', 'Leather Gloves', 'Leather Pants']
    },
    {
      name: 'Men',
      subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Watch', 'Wallet', 'Shoes']
    },
    {
      name: 'Women',
      subcategories: ['Anarkali Suits', 'Designer Blouses', 'Pakistani Suits', 'Anarkali Dress', 'Salwar Kameez']
    },
    {
      name: 'Kids',
      subcategories: ['Baby Dresses', 'Kids Lehenga', 'Tutu Dress', 'Kids Frocks']
    }
  ]
},
{
  name: 'Ayurveda & Herbal',
  subcategories: [
    {
      name: 'Ayurvedic, Herbal Medicines & Products',
      subcategories: ['Herbal Raw Material', 'Herbal Formulation Products', 'Herbal Medicines', 'Honey']
    },
    {
      name: 'Ayurvedic Consultants',
      subcategories: ['Hair Loss Treatment Service', 'Homeopathic Skin Treatment Service', 'Joint Pain Treatment Service', 'Piles Treatment Service']
    },
    {
      name: 'Herbal Foods',
      subcategories: ['Pure & Natural Herbs', 'Pure Herbs', 'Aloe Vera', 'Split Cassia', 'Herb Plant']
    },
    {
      name: 'Pure & Natural Herbs',
      subcategories: ['Pure Herbs', 'Aloe Vera', 'Split Cassia', 'Herb Plant']
    }
  ]
},
{
  name: 'Transportation & Logistics',
  subcategories: [
    {
      name: 'Transportation, Logistics & Air Freight Services'
    },
    {
      name: 'Warehousing & Cold Storage Services'
    },
    {
      name: 'Cargo & Shipping Services'
    },
    {
      name: 'Packers & Movers'
    }
  ]
},
{
  name: 'Packaging Material'
},
{
  name: 'Machinery & Equipment',
  subcategories: [
    {
      name: 'Boiler & Boiler Parts',
    },
    {
      name: 'Paper Work & Making Mackinery'
    },
    {
      name: 'Chemical Machinery & Plant'
    },
    {
      name: 'Rubber Processing Machinery'
    }
  ]
},
{
  name: 'Medical Equipment'
},
{
  name: 'Personal Care & Hygiene',
  subcategories: [
    {
      name: 'Aromatic & Essential Oils'
    },
    {
      name: 'Cosmetics, Hair Care & Beauty Products'
    },
    {
      name: 'Health Care Products'
    }
  ]
},
{
  name: 'Safety Products'
},
{
  name: 'Electronics & Electrical Goods',
  subcategories: [
    {
      name: 'Solar & Renewable Energy Products'
    },
    {
      name: 'Generators, Turbines & Power Plants'
    },
    {
      name: 'Electric Cables & Wires'
    },
    {
      name: 'Electric Fittings & Components'
    }
  ]
},
{
  name: 'Handicraft & Gift Items'
},
{
  name: 'Automobile Tools & Equipments'
},
{
  name: 'Chemical & Dyes Products'
},
{
  name: 'Plastic Products'
},
{
  name: 'Furniture & Home Decoration',
  subcategories: [
    {
      name: 'Bedroom, Bathroom & Kids Furniture',
      subcategories: ['Almirah', 'Double Bed', 'Beds', 'Closet']
    },
    {
      name: 'Living Room & Plastic Furniture',
      subcategories: ['Sofa Set', 'Cupboard', 'TV Unit', 'Chairs']
    },
    {
      name: 'Metal Furniture Suppliers',
      subcategories: ['Steel Furniture', 'Steel Almirah', 'Recliner Chair', 'Steel Table']
    },
    {
      name: 'Furniture Hardware & Fittings',
      subcategories: ['Table Top', 'Backrest', 'Bed Frames', 'Window Screens']
    }
  ]
}
];