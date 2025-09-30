let currentUser = null;
        let currentUserType = null;
        let currentSection = 'auth-section';
        let previousSection = null;
        
        const authSection = document.getElementById('auth-section');
        const userTypeSection = document.getElementById('user-type-section');
        const applicantView = document.getElementById('applicant-view');
        const myApplicationsView = document.getElementById('my-applications-view');
        const savedJobsView = document.getElementById('saved-jobs-view');
        const profileView = document.getElementById('profile-view');
        const editProfileView = document.getElementById('edit-profile-view');
        const jobDetailsView = document.getElementById('job-details-view');
        const applicationFormView = document.getElementById('application-form-view');
        
        const applicantApplications = document.getElementById('applicant-applications');
        const employeeApplications = document.getElementById('employee-applications');
        const applicantSavedJobs = document.getElementById('applicant-saved-jobs');
        const employeeSavedApplicants = document.getElementById('employee-saved-applicants');
        
        const notificationPanel = document.getElementById('notification-panel');
        const searchPanel = document.getElementById('search-panel');
        
        function showSection(sectionId) {
            authSection.classList.add('hidden');
            userTypeSection.classList.add('hidden');
            applicantView.classList.add('hidden');
            myApplicationsView.classList.add('hidden');
            savedJobsView.classList.add('hidden');
            profileView.classList.add('hidden');
            editProfileView.classList.add('hidden');
            jobDetailsView.classList.add('hidden');
            applicationFormView.classList.add('hidden');
            
            notificationPanel.style.display = 'none';
            searchPanel.style.display = 'none';
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.remove('hidden');
            
            if (sectionId === 'applicant-view') {
                document.querySelector('.nav-btn:nth-child(1)').classList.add('active');
            } else if (sectionId === 'my-applications-view') {
                document.querySelector('.nav-btn:nth-child(2)').classList.add('active');
            } else if (sectionId === 'saved-jobs-view') {
                document.querySelector('.nav-btn:nth-child(3)').classList.add('active');
            } else if (sectionId === 'profile-view') {
                document.querySelector('.nav-btn:nth-child(4)').classList.add('active');
            }
            
            if (sectionId === 'my-applications-view') {
                if (currentUserType === 'applicant') {
                    applicantApplications.classList.remove('hidden');
                    employeeApplications.classList.add('hidden');
                } else {
                    applicantApplications.classList.add('hidden');
                    employeeApplications.classList.remove('hidden');
                }
            }
            
            if (sectionId === 'saved-jobs-view') {
                if (currentUserType === 'applicant') {
                    applicantSavedJobs.classList.remove('hidden');
                    employeeSavedApplicants.classList.add('hidden');
                } else {
                    applicantSavedJobs.classList.add('hidden');
                    employeeSavedApplicants.classList.remove('hidden');
                }
            }
            
            previousSection = currentSection;
            currentSection = sectionId;
        }
        
        function goBack() {
            if (previousSection) {
                showSection(previousSection);
            } else {
                showSection('applicant-view');
            }
        }
        
        function login() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                currentUser = {
                    name: 'Juan Dela Cruz',
                    email: email,
                    type: 'applicant' 
                };
                
                showSection('user-type-section');
            } else {
                alert('Please enter both email and password');
            }
        }
        
        function signup() {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            if (name && email && password && confirm) {
                if (password !== confirm) {
                    alert('Passwords do not match');
                    return;
                }
                
                currentUser = {
                    name: name,
                    email: email,
                    type: 'applicant' 
                };
                
                showSection('user-type-section');
            } else {
                alert('Please fill in all fields');
            }
        }
        
        function loginWithGoogle() {
            currentUser = {
                name: 'Juan Dela Cruz',
                email: 'juan.delacruz@example.com',
                type: 'applicant'
            };
            
            showSection('user-type-section');
        }
        
        function signupWithGoogle() {
            currentUser = {
                name: 'Juan Dela Cruz',
                email: 'juan.delacruz@example.com',
                type: 'applicant'
            };
            
            showSection('user-type-section');
        }
        
        function selectUserType(type) {
            currentUserType = type;
            currentUser.type = type;
            
            if (type === 'applicant') {
                document.getElementById('profile-name').textContent = currentUser.name;
                document.getElementById('profile-role').textContent = 'Applicant';
            } else {
                document.getElementById('profile-name').textContent = currentUser.name;
                document.getElementById('profile-role').textContent = 'Employee';
            }
            
            showSection('applicant-view');
        }
        
        function logout() {
            currentUser = null;
            currentUserType = null;
            showSection('auth-section');
        }
        
        function changeCategory(category) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            
            alert(`Showing jobs in ${category} category`);
        }
        
        function showJobDetails() {
            showSection('job-details-view');
        }
        
        function showApplicationForm() {
            showSection('application-form-view');
        }
        
        function submitApplication() {
            alert('Application submitted successfully!');
            showSection('applicant-view');
        }
        
        function editProfile() {
            document.getElementById('edit-name').value = document.getElementById('profile-name').textContent;
            document.getElementById('edit-email').value = document.getElementById('profile-email').textContent;
            document.getElementById('edit-phone').value = document.getElementById('profile-phone').textContent;
            document.getElementById('edit-location').value = document.getElementById('profile-location').textContent;
            document.getElementById('edit-about').value = document.getElementById('profile-about').textContent;
            
            showSection('edit-profile-view');
        }
        
        function saveProfile() {
            document.getElementById('profile-name').textContent = document.getElementById('edit-name').value;
            document.getElementById('profile-email').textContent = document.getElementById('edit-email').value;
            document.getElementById('profile-phone').textContent = document.getElementById('edit-phone').value;
            document.getElementById('profile-location').textContent = document.getElementById('edit-location').value;
            document.getElementById('profile-about').textContent = document.getElementById('edit-about').value;
            
            alert('Profile updated successfully!');
            showSection('profile-view');
        }
        
        function removeResume() {
            if (confirm('Are you sure you want to remove your resume?')) {
                alert('Resume removed successfully');
            }
        }
        
        function changeResume() {
            document.getElementById('resume-upload').click();
        }
        
        function approveApplication(button) {
            const statusElement = button.closest('.applicant-info').querySelector('.application-status');
            statusElement.textContent = 'Approved';
            statusElement.className = 'application-status status-approved';
            alert('Application approved!');
        }
        
        function rejectApplication(button) {
            const statusElement = button.closest('.applicant-info').querySelector('.application-status');
            statusElement.textContent = 'Rejected';
            statusElement.className = 'application-status status-rejected';
            alert('Application rejected!');
        }
        
        function saveApplicant(button) {
            alert('Applicant saved for interviews!');
        }
        
        function removeApplicant(button) {
            if (confirm('Are you sure you want to remove this applicant?')) {
                button.closest('.applicant-info').remove();
            }
        }
        
        function removeSavedJob(button) {
            if (confirm('Are you sure you want to remove this saved job?')) {
                button.closest('.job-card').remove();
            }
        }
        
        function removeSavedApplicant(button) {
            if (confirm('Are you sure you want to remove this saved applicant?')) {
                button.closest('.applicant-info').remove();
            }
        }
        
        function scheduleInterview(button) {
            alert('Interview scheduling feature would open here');
        }
        
        document.getElementById('notification-icon').addEventListener('click', function() {
            notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
            searchPanel.style.display = 'none';
        });
        
        document.getElementById('search-icon').addEventListener('click', function() {
            searchPanel.style.display = searchPanel.style.display === 'block' ? 'none' : 'block';
            notificationPanel.style.display = 'none';
        });
        
        document.getElementById('login-tab').addEventListener('click', function() {
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('signup-tab').classList.remove('active');
            document.getElementById('login-form').classList.remove('hidden');
            document.getElementById('signup-form').classList.add('hidden');
        });
        
        document.getElementById('signup-tab').addEventListener('click', function() {
            document.getElementById('signup-tab').classList.add('active');
            document.getElementById('login-tab').classList.remove('active');
            document.getElementById('signup-form').classList.remove('hidden');
            document.getElementById('login-form').classList.add('hidden');
        });
        
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#notification-icon') && !event.target.closest('#notification-panel')) {
                notificationPanel.style.display = 'none';
            }
            
            if (!event.target.closest('#search-icon') && !event.target.closest('#search-panel')) {
                searchPanel.style.display = 'none';
            }
        });
        
        showSection('auth-section');