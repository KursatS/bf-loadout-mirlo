// Function to load existing weapons
async function loadWeapons() {
  try {
    const response = await fetch('weapons.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading weapons data:', error);
    return { name: "Battlefield 6 Loadouts", weapons: [] };
  }
}

// Function to save weapons data
async function saveWeapons(data) {
  try {
    // In a real application, this would be a POST request to a server
    // For this demo, we'll just log the data to the console
    console.log('Weapons data to save:', JSON.stringify(data, null, 2));
    
    // Create a downloadable file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weapons.json';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error saving weapons data:', error);
    return false;
  }
}

// Function to add a new weapon
async function addNewWeapon(weapon) {
  try {
    const data = await loadWeapons();
    data.weapons.push(weapon);
    return await saveWeapons(data);
  } catch (error) {
    console.error('Error adding new weapon:', error);
    return false;
  }
}

// Add attachment field
function addAttachmentField() {
  const container = document.getElementById('attachments-container');
  const attachmentDiv = document.createElement('div');
  attachmentDiv.className = 'attachment-input';
  attachmentDiv.innerHTML = `
    <input type="text" class="attachment-field" placeholder="Attachment ${container.children.length + 1}">
    <button type="button" class="remove-attachment">Remove</button>
  `;
  container.appendChild(attachmentDiv);
  
  // Add event listener to remove button
  attachmentDiv.querySelector('.remove-attachment').addEventListener('click', function() {
    container.removeChild(attachmentDiv);
    // Update placeholders
    updateAttachmentPlaceholders();
  });
}

// Update attachment field placeholders
function updateAttachmentPlaceholders() {
  const attachmentFields = document.querySelectorAll('.attachment-field');
  attachmentFields.forEach((field, index) => {
    field.placeholder = `Attachment ${index + 1}`;
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Add attachment button
  document.getElementById('add-attachment').addEventListener('click', addAttachmentField);
  
  // Form submission
  document.getElementById('add-weapon-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const id = document.getElementById('weapon-id').value.trim();
    const name = document.getElementById('weapon-name').value.trim();
    const type = document.getElementById('weapon-type').value;
    const image = document.getElementById('weapon-image').value.trim();
    const description = document.getElementById('weapon-description').value.trim();
    
    // Get attachments
    const attachmentFields = document.querySelectorAll('.attachment-field');
    const attachments = Array.from(attachmentFields)
      .map(field => field.value.trim())
      .filter(value => value.length > 0);
    
    // Validate required fields
    if (!id || !name || !type || !image || !description) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Create weapon object
    const newWeapon = {
      id,
      name,
      type,
      image,
      attachments,
      description
    };
    
    // Add weapon
    const success = await addNewWeapon(newWeapon);
    
    if (success) {
      // Show success message
      document.getElementById('add-weapon-form').style.display = 'none';
      document.getElementById('success-message').style.display = 'block';
    } else {
      alert('Error adding weapon. Please check the console for details.');
    }
  });
  
  // Add another weapon button
  document.getElementById('add-another').addEventListener('click', function() {
    // Reset form
    document.getElementById('add-weapon-form').reset();
    document.getElementById('add-weapon-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
    
    // Reset attachments container to initial state
    const container = document.getElementById('attachments-container');
    container.innerHTML = `
      <div class="attachment-input">
        <input type="text" class="attachment-field" placeholder="Attachment 1 (e.g., 'Muzzle: Suppressor')">
      </div>
    `;
  });
});