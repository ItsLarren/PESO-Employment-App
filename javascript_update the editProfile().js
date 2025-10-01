// Edit profile - FIXED VERSION
function editProfile() {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please log in to edit your profile');
        showSection('auth-section');
        return;
    }
    
    document.getElementById('edit-name').value = currentUser.name || '';
    document.getElementById('edit-email').value = currentUser.email || '';
    document.getElementById('edit-phone').value = currentUser.phone || '+63 912 345 6789';
    document.getElementById('edit-address').value = currentUser.address || '123 Main Street, San Fernando, Pampanga';
    document.getElementById('edit-location').value = currentUser.location || 'San Fernando, Pampanga';
    document.getElementById('edit-about').value = currentUser.about || 'Experienced customer service professional with 5 years in the industry. Looking for new opportunities to grow and develop my skills.';
    
    // Populate skills - ensure elements are created
    const skillsContainer = document.getElementById('edit-skills');
    skillsContainer.innerHTML = '';
    if (currentUser.skills && currentUser.skills.length > 0) {
        currentUser.skills.forEach(skill => {
            addSkillInput(skill);
        });
    } else {
        // Add at least one empty skill input
        addSkillInput();
    }
    
    // Populate education - ensure elements are created
    const educationContainer = document.getElementById('edit-education');
    educationContainer.innerHTML = '';
    if (currentUser.education && currentUser.education.length > 0) {
        currentUser.education.forEach(edu => {
            addEducationInput(edu);
        });
    } else {
        // Add at least one empty education input
        addEducationInput();
    }
    
    // Populate experience - ensure elements are created
    const experienceContainer = document.getElementById('edit-experience');
    experienceContainer.innerHTML = '';
    if (currentUser.experience && currentUser.experience.length > 0) {
        currentUser.experience.forEach(exp => {
            addExperienceInput(exp);
        });
    } else {
        // Add at least one empty experience input
        addExperienceInput();
    }
    
    // Update profile picture in edit view
    const editProfileAvatar = document.getElementById('edit-profile-avatar');
    if (currentUser.profilePicture) {
        editProfileAvatar.innerHTML = `<img src="${currentUser.profilePicture}" class="profile-picture">`;
    } else {
        editProfileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
    }
    
    showSection('edit-profile-view');
}