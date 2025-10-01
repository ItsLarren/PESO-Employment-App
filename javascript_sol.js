// Save profile - FIXED VERSION
function saveProfile() {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please log in to save your profile');
        showSection('auth-section');
        return;
    }
    
    // Update current user with basic info
    currentUser.name = document.getElementById('edit-name').value;
    currentUser.phone = document.getElementById('edit-phone').value;
    currentUser.address = document.getElementById('edit-address').value;
    currentUser.location = document.getElementById('edit-location').value;
    currentUser.about = document.getElementById('edit-about').value;
    
    // Safely update skills - check if elements exist first
    currentUser.skills = [];
    const skillInputs = document.querySelectorAll('.skill-input');
    if (skillInputs.length > 0) {
        skillInputs.forEach(input => {
            if (input.value.trim() !== '') {
                currentUser.skills.push(input.value.trim());
            }
        });
    }
    
    // Safely update education - check if elements exist first
    currentUser.education = [];
    const educationItems = document.querySelectorAll('.education-item');
    if (educationItems.length > 0) {
        educationItems.forEach(item => {
            const degree = item.querySelector('.education-degree') ? item.querySelector('.education-degree').value : '';
            const school = item.querySelector('.education-school') ? item.querySelector('.education-school').value : '';
            const year = item.querySelector('.education-year') ? item.querySelector('.education-year').value : '';
            
            if (degree.trim() !== '' && school.trim() !== '') {
                currentUser.education.push({
                    degree: degree,
                    school: school,
                    year: year
                });
            }
        });
    }
    
    // Safely update experience - check if elements exist first
    currentUser.experience = [];
    const experienceItems = document.querySelectorAll('.experience-item');
    if (experienceItems.length > 0) {
        experienceItems.forEach(item => {
            const position = item.querySelector('.experience-position') ? item.querySelector('.experience-position').value : '';
            const company = item.querySelector('.experience-company') ? item.querySelector('.experience-company').value : '';
            const duration = item.querySelector('.experience-duration') ? item.querySelector('.experience-duration').value : '';
            const description = item.querySelector('.experience-description') ? item.querySelector('.experience-description').value : '';
            
            if (position.trim() !== '' && company.trim() !== '') {
                currentUser.experience.push({
                    position: position,
                    company: company,
                    duration: duration,
                    description: description
                });
            }
        });
    }
    
    // Update in storage
    const userIndex = userAccounts.findIndex(acc => acc.email === currentUser.email);
    if (userIndex !== -1) {
        userAccounts[userIndex] = currentUser;
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // Update profile display
    updateProfileInfo();
    
    alert('Profile updated successfully!');
    showSection('profile-view');
}