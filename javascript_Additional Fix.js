// Form Input Functions
function addSkillInput(value = '') {
    const skillsContainer = document.getElementById('edit-skills');
    const skillInput = document.createElement('div');
    skillInput.className = 'form-group';
    skillInput.innerHTML = `
        <input type="text" class="skill-input" placeholder="Enter a skill" value="${value}">
        <button class="action-btn remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;
    skillsContainer.appendChild(skillInput);
}

function addEducationInput(education = {}) {
    const educationContainer = document.getElementById('edit-education');
    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    educationItem.innerHTML = `
        <div class="form-group">
            <label>Degree</label>
            <input type="text" class="education-degree" placeholder="e.g., Bachelor of Science in Business Administration" value="${education.degree || ''}">
        </div>
        <div class="form-group">
            <label>School</label>
            <input type="text" class="education-school" placeholder="e.g., University of the Philippines" value="${education.school || ''}">
        </div>
        <div class="form-group">
            <label>Year</label>
            <input type="text" class="education-year" placeholder="e.g., 2015-2019" value="${education.year || ''}">
        </div>
        <button class="action-btn remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;
    educationContainer.appendChild(educationItem);
}

function addExperienceInput(experience = {}) {
    const experienceContainer = document.getElementById('edit-experience');
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    experienceItem.innerHTML = `
        <div class="form-group">
            <label>Position</label>
            <input type="text" class="experience-position" placeholder="e.g., Customer Service Representative" value="${experience.position || ''}">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="experience-company" placeholder="e.g., ABC Company" value="${experience.company || ''}">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="experience-duration" placeholder="e.g., 2019-2021" value="${experience.duration || ''}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="experience-description" placeholder="Describe your responsibilities and achievements" rows="3">${experience.description || ''}</textarea>
        </div>
        <button class="action-btn remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;
    experienceContainer.appendChild(experienceItem);
}