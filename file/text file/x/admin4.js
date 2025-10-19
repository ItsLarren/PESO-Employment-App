//Function to Display Recent Registrations
//Add this function to display recent user registrations in the admin dashboard:

function renderRecentRegistrations() {
    const registrationsList = document.getElementById('admin-registrations-list');
    registrationsList.innerHTML = '';
    
    // Get recent registrations (last 10)
    const recentRegistrations = userAccounts
        .sort((a, b) => new Date(b.registrationDate || 0) - new Date(a.registrationDate || 0))
        .slice(0, 10);
    
    if (recentRegistrations.length === 0) {
        registrationsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <p>No user registrations yet</p>
            </div>
        `;
        return;
    }
    
    recentRegistrations.forEach(user => {
        const registrationItem = document.createElement('div');
        registrationItem.className = 'admin-registration-item';
        
        const registrationDate = user.registrationDate ? 
            new Date(user.registrationDate).toLocaleDateString() : 'Unknown date';
        
        registrationItem.innerHTML = `
            <div class="registration-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="registration-info">
                <div class="registration-name">${user.name}</div>
                <div class="registration-details">
                    ${user.email} • ${user.type || 'No role selected'}
                </div>
                <div class="registration-time">Registered: ${registrationDate}</div>
            </div>
        `;
        
        registrationsList.appendChild(registrationItem);
    });
}

// Update the showAdminDashboard function to include recent registrations
function showAdminDashboard() {
    showSection('admin-dashboard-view');
    updateAdminStats();
    renderAdminApplications();
    renderRecentRegistrations();
}

//These enhancements will:
//Track and display the number of registered applicants and employers
//Count applicants who have reported being hired through the PESO system
//Track pending accreditations for employers
// Show the number of active users currently using the platform
//Display recent user registrations in the admin dashboard
//Send notifications to the admin when new users register or select roles
//The system will update these statistics in real-time as users interact with the platform.