//Admin Dashboard Enhancements
//I'll add the requested features to the admin dashboard to track user registrations, hired applicants, and active users.

//Updated JavaScript Code
//Add these functions to your script.js file:

// Add these functions to track user registrations and active users

function updateAdminStats() {
    // Count applicants and employers
    const applicants = userAccounts.filter(user => user.type === 'applicant').length;
    const employers = userAccounts.filter(user => user.type === 'employee').length;
    
    // Count hired applicants from PESO reports
    const pesoReports = JSON.parse(localStorage.getItem('pesoReports')) || [];
    const hiredApplicants = pesoReports.length;
    
    // Count pending accreditations (employers that need approval)
    const pendingAccreditations = userAccounts.filter(user => 
        user.type === 'employee' && !user.accredited
    ).length;
    
    // Update the UI
    document.getElementById('total-applications').textContent = applicants;
    document.getElementById('pending-applications').textContent = employers;
    document.getElementById('approved-applications').textContent = hiredApplicants;
    document.getElementById('rejected-applications').textContent = pendingAccreditations;
    
    // Update active users count
    document.getElementById('active-users').textContent = activeUsers.length;
}

function trackActiveUser() {
    if (currentUser) {
        const userIndex = activeUsers.findIndex(user => user.email === currentUser.email);
        const userData = {
            email: currentUser.email,
            name: currentUser.name,
            type: currentUser.type,
            lastActive: new Date().toISOString()
        };
        
        if (userIndex !== -1) {
            activeUsers[userIndex] = userData;
        } else {
            activeUsers.push(userData);
        }
        
        // Remove users inactive for more than 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        activeUsers = activeUsers.filter(user => new Date(user.lastActive) > thirtyMinutesAgo);
        
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
        
        if (isAdminLoggedIn) {
            updateAdminStats();
        }
    }
}

// Track active users every minute
setInterval(trackActiveUser, 60000);

// Update the signup function to notify admin
function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (name && email && password && confirm) {
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address (e.g., name@gmail.com)');
            return;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }
        
        if (userAccounts.some(acc => acc.email === email)) {
            alert('Email already registered');
            return;
        }
        
        const newUser = {
            name: name,
            email: email,
            password: password,
            type: null,
            phone: '',
            address: '',
            location: '',
            about: '',
            skills: [],
            education: [],
            experience: [],
            profilePicture: null,
            accredited: false,
            registrationDate: new Date().toISOString()
        };
        
        userAccounts.push(newUser);
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
        
        currentUser = newUser;
        showSection('user-type-section');
        
        document.getElementById('login-tab').click();
        alert('Account created successfully! Please select your role and then login.');
        
        // Notify admin about new registration
        createNotification(
            'admin@employmentcorner.com',
            'New User Registration',
            `${name} (${email}) has registered on the platform.`
        );
    } else {
        alert('Please fill in all fields');
    }
}

// Update the selectUserType function to notify admin about role selection
function selectUserType(type) {
    if (currentUser) {
        currentUser.type = type;
        currentUserType = type;
        
        const userIndex = userAccounts.findIndex(acc => acc.email === currentUser.email);
        if (userIndex !== -1) {
            userAccounts[userIndex].type = type;
            localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
        }
        
        updateProfileInfo();
        
        showSection('auth-section');
        document.getElementById('login-tab').click();
        
        // Notify admin about role selection
        createNotification(
            'admin@employmentcorner.com',
            'User Role Selected',
            `${currentUser.name} (${currentUser.email}) has selected role: ${type}`
        );
    }
}

// Update the submitPesoReport function to track hired applicants
function submitPesoReport() {
    const company = document.getElementById('peso-company').value;
    const position = document.getElementById('peso-position').value;
    const startDate = document.getElementById('peso-start-date').value;
    const employmentType = document.getElementById('peso-employment-type').value;
    const salary = document.getElementById('peso-salary').value;
    
    if (!company || !position || !startDate || !employmentType) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create the PESO report
    const pesoReport = {
        id: 'peso-' + Date.now(),
        userId: currentUser.email,
        userName: currentUser.name,
        company: company,
        position: position,
        startDate: startDate,
        employmentType: employmentType,
        salary: salary,
        reportDate: new Date().toISOString(),
        status: 'reported'
    };
    
    // Save to localStorage
    let pesoReports = JSON.parse(localStorage.getItem('pesoReports')) || [];
    pesoReports.push(pesoReport);
    localStorage.setItem('pesoReports', JSON.stringify(pesoReports));
    
    // Update admin stats for hired applicants count
    updateHiredApplicantsCount();
    
    // Notify employers
    notifyEmployers(pesoReport);
    
    // Show success message
    alert('Thank you for reporting your employment status! Employers have been notified.');
    
    // Redirect back to edit profile
    showSection('edit-profile-view');
}

function updateHiredApplicantsCount() {
    // Update the admin dashboard count
    let pesoReports = JSON.parse(localStorage.getItem('pesoReports')) || [];
    const hiredCount = pesoReports.length;
    
    // Update the admin dashboard stat
    const hiredApplicantsElement = document.getElementById('approved-applications');
    if (hiredApplicantsElement) {
        hiredApplicantsElement.textContent = hiredCount;
    }
    
    // Also update in localStorage for admin
    localStorage.setItem('totalHiredApplicants', hiredCount.toString());
    
    // Update the admin stats display
    updateAdminStats();
}

// Add active users tracking to the init function
function init() {
    // ... existing init code ...
    
    // Initialize active users tracking
    trackActiveUser();
    
    // ... rest of init code ...
}