// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}

// Function to load weapon data
async function loadWeaponData() {
  try {
    console.log('Attempting to fetch weapons.json');
    const response = await fetch('weapons.json');
    console.log('Fetch response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Loaded weapons data:', data);
    return data.weapons;
  } catch (error) {
    console.error('Error loading weapon data:', error);
    return [];
  }
}

// Function to display weapon details
function displayWeaponDetails(weapon) {
  console.log('Displaying weapon details:', weapon);
  if (!weapon) {
    console.error('No weapon data to display');
    return;
  }
  
  document.getElementById('weapon-name').textContent = weapon.name;
  document.getElementById('weapon-type').textContent = weapon.type.toUpperCase();
  document.getElementById('weapon-image').src = weapon.image;
  document.getElementById('weapon-image').alt = weapon.name;
  document.getElementById('weapon-description').textContent = weapon.description;
  
  const attachmentsList = document.getElementById('attachments-list');
  attachmentsList.innerHTML = '';
  
  weapon.attachments.forEach(attachment => {
    const listItem = document.createElement('li');
    listItem.textContent = attachment;
    attachmentsList.appendChild(listItem);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Page loaded, URL:', window.location.href);
  const weaponId = getUrlParameter('id');
  console.log('Extracted weapon ID:', weaponId);
  
  if (!weaponId) {
    document.body.innerHTML = '<h1>Weapon not found</h1>';
    return;
  }
  
  const weapons = await loadWeaponData();
  console.log('Available weapons:', weapons);
  const weapon = weapons.find(w => w.id === weaponId);
  console.log('Found weapon:', weapon);
  
  if (!weapon) {
    document.body.innerHTML = '<h1>Weapon not found</h1>';
    return;
  }
  
  displayWeaponDetails(weapon);
});