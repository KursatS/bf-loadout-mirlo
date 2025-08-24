// Sample weapon data
const weapons = [
  {
    id: "m4a1",
    name: "M4A1",
    type: "rifle",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/PEO_M4_Carbine_RAS_M68_CCO.png",
    attachments: [
      "Muzzle: Suppressor",
      "Barrel: Extended Barrel",
      "Laser: Tactical Laser",
      "Optic: Holo",
      "Stock: Tactical Stock",
      "Underbarrel: Grip",
      "Magazine: Extended Mag"
    ],
    description: "A versatile assault rifle with excellent handling and customization options. Perfect for medium to long-range engagements."
  },
  {
    id: "ak47",
    name: "AK-47",
    type: "rifle",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/AK-47_assault_rifle.jpg",
    attachments: [
      "Muzzle: Muzzle Brake",
      "Barrel: Extended Barrel",
      "Laser: Tactical Laser",
      "Optic: ACRO",
      "Stock: Heavy Stock",
      "Underbarrel: Foregrip",
      "Magazine: Extended Mag"
    ],
    description: "Legendary assault rifle known for its reliability and powerful damage. Slightly slower handling but packs a punch."
  },
  {
    id: "mp5",
    name: "MP5",
    type: "smg",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/MP5.jpg/960px-MP5.jpg",
    attachments: [
      "Muzzle: Suppressor",
      "Barrel: Factory Barrel",
      "Laser: Tactical Laser",
      "Optic: Reflex",
      "Stock: Standard Stock",
      "Underbarrel: Laser Grip",
      "Magazine: Extended Mag"
    ],
    description: "Highly controllable submachine gun with excellent close-quarters performance. Great hip-fire accuracy."
  },
  {
    id: "svd",
    name: "SVD",
    type: "sniper",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/SVD_Dragunov.jpg/960px-SVD_Dragunov.jpg",
    attachments: [
      "Muzzle: Suppressor",
      "Barrel: Extended Barrel",
      "Laser: Tactical Laser",
      "Optic: Variable Zoom",
      "Stock: Marksman Stock",
      "Underbarrel: Bipod",
      "Magazine: Extended Mag"
    ],
    description: "Semi-automatic marksman rifle with impressive range and accuracy. Perfect for medium to long-range elimination."
  },
  {
    id: "m9",
    name: "M9",
    type: "pistol",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/M9-pistolet.jpg/960px-M9-pistolet.jpg",
    attachments: [
      "Muzzle: Suppressor",
      "Barrel: Extended Barrel",
      "Laser: Tactical Laser",
      "Optic: Reflex",
      "Stock: (N/A)",
      "Underbarrel: (N/A)",
      "Magazine: Extended Mag"
    ],
    description: "Reliable sidearm with good accuracy and handling. Effective in close-quarters combat and as a backup weapon."
  }
];

// Function to render weapons
function renderWeapons(weaponsToRender) {
  const weaponsList = document.getElementById('weapons-list');
  weaponsList.innerHTML = '';

  weaponsToRender.forEach(weapon => {
    const weaponCard = document.createElement('div');
    weaponCard.className = 'weapon-card';
    weaponCard.innerHTML = `
      <img src="${weapon.image}" alt="${weapon.name}" class="weapon-image">
      <div class="weapon-info">
        <h3 class="weapon-name">${weapon.name}</h3>
        <p class="weapon-type">${weapon.type.toUpperCase()}</p>
      </div>
    `;
    
    weaponCard.addEventListener('click', () => {
      window.location.href = `weapon.html?id=${weapon.id}`;
    });
    
    weaponsList.appendChild(weaponCard);
  });
}

// Function to filter weapons
function filterWeapons(type) {
  if (type === 'all') {
    return weapons;
  }
  return weapons.filter(weapon => weapon.type === type);
}

// Function to search weapons
function searchWeapons(query) {
  return weapons.filter(weapon => 
    weapon.name.toLowerCase().includes(query.toLowerCase()) ||
    weapon.type.toLowerCase().includes(query.toLowerCase())
  );
}

// Function to check if we're in developer mode
function checkDeveloperMode() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('dev') === 'true';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Render all weapons initially
  renderWeapons(weapons);
  
  // Show add weapon button if in developer mode
  if (checkDeveloperMode()) {
    document.getElementById('add-weapon-btn').style.display = 'inline-block';
  }
  
  // Filter button functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterType = button.dataset.filter;
      const filteredWeapons = filterWeapons(filterType);
      renderWeapons(filteredWeapons);
    });
  });
  
  // Search functionality
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', () => {
    const query = searchBar.value;
    const filteredWeapons = searchWeapons(query);
    renderWeapons(filteredWeapons);
  });
});