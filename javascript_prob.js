// Update skills
currentUser.skills = [];
document.querySelectorAll('.skill-input').forEach(input => {
    if (input.value.trim() !== '') {
        currentUser.skills.push(input.value.trim());
    }
});