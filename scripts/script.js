
        let currentUser = null;
        let currentUserType = null;
        let currentSection = 'auth-section';
        let previousSection = null;
        let currentCategory = 'all';
        let currentApplicantFilter = 'all';
        let userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
        let currentResumeFile = null;
        let currentApplicationResumeFile = null;
        let submittedApplications = JSON.parse(localStorage.getItem('submittedApplications')) || {};

        const authSection = document.getElementById('auth-section');
        const userTypeSection = document.getElementById('user-type-section');
        const applicantView = document.getElementById('applicant-view');
        const employeeView = document.getElementById('employee-view');
        const myApplicationsView = document.getElementById('my-applications-view');
        const savedJobsView = document.getElementById('saved-jobs-view');
        const profileView = document.getElementById('profile-view');
        const editProfileView = document.getElementById('edit-profile-view');
        const jobDetailsView = document.getElementById('job-details-view');
        const applicationFormView = document.getElementById('application-form-view');
        const interviewSchedulingView = document.getElementById('interview-scheduling-view');
        const applicationDetailsView = document.getElementById('application-details-view');
        const notificationPanel = document.getElementById('notification-panel');
        const searchPanel = document.getElementById('search-panel');
        const jobCardsContainer = document.getElementById('job-cards-container');
        const applicantsContainer = document.getElementById('applicants-container');
        const homeNavBtn = document.getElementById('home-nav-btn');
        const integrationStatus = document.getElementById('integration-status');
        
        const jobData = {
            all: [
                {
                    id: 'customer-service',
                    title: "CUSTOMER SERVICE REPRESENTATIVE",
                    company: "ALORICA",
                    location: "Clark",
                    salary: "₱18,000 - ₱22,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/3b82f6/white?text=ALORICA"
                },
                {
                    id: 'marketing-specialist',
                    title: "MARKETING SPECIALIST",
                    company: "FAVERTON GROUP INC.",
                    location: "San Fernando",
                    salary: "₱20,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/10b981/white?text=FAVERTON"
                },
                {
                    id: 'sales-associate',
                    title: "SALES ASSOCIATE",
                    company: "RC COLA",
                    location: "Pampanga",
                    salary: "₱12,000 - ₱15,000",
                    type: "Part Time",
                    image: "https://placehold.co/600x400/f59e0b/white?text=RC+COLA"
                }
            ],
            tech: [
                {
                    id: 'software-developer',
                    title: "SOFTWARE DEVELOPER",
                    company: "TECH SOLUTIONS INC.",
                    location: "Angeles City",
                    salary: "₱25,000 - ₱40,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/3b82f6/white?text=TECH"
                },
                {
                    id: 'it-support',
                    title: "IT SUPPORT SPECIALIST",
                    company: "DATA SYSTEMS CORP",
                    location: "San Fernando",
                    salary: "₱18,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/10b981/white?text=IT"
                }
            ],
            marketing: [
                {
                    id: 'digital-marketing',
                    title: "DIGITAL MARKETING SPECIALIST",
                    company: "CREATIVE AGENCY",
                    location: "Mexico",
                    salary: "₱20,000 - ₱30,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/ef4444/white?text=MARKETING"
                },
                {
                    id: 'social-media',
                    title: "SOCIAL MEDIA MANAGER",
                    company: "BRAND BUILDERS INC",
                    location: "Angeles City",
                    salary: "₱18,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/f59e0b/white?text=SOCIAL+MEDIA"
                }
            ],
            sales: [
                {
                    id: 'sales-rep',
                    title: "SALES REPRESENTATIVE",
                    company: "SALES PROS INC",
                    location: "San Fernando",
                    salary: "₱15,000 - ₱25,000 + Commission",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/3b82f6/white?text=SALES"
                }
            ],
            finance: [
                {
                    id: 'accounting-assistant',
                    title: "ACCOUNTING ASSISTANT",
                    company: "FINANCE GROUP",
                    location: "Angeles City",
                    salary: "₱18,000 - ₱22,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/10b981/white?text=FINANCE"
                }
            ]
        };
        
        const applicantData = {
            all: [
                {
                    name: "Maria Santos",
                    position: "Customer Service Representative",
                    experience: "3 years in customer service",
                    skills: ["Communication", "Problem Solving", "MS Office"],
                    status: "pending",
                    phone: "+63 912 345 6789",
                    email: "maria.santos@example.com",
                    appliedDate: "2023-03-15"
                },
                {
                    name: "John Doe",
                    position: "Customer Service Representative", 
                    experience: "5 years in call center",
                    skills: ["Customer Support", "Phone Etiquette", "CRM"],
                    status: "approved",
                    phone: "+63 923 456 7890",
                    email: "john.doe@example.com",
                    appliedDate: "2023-03-10"
                },
                {
                    name: "Anna Reyes",
                    position: "Marketing Specialist",
                    experience: "4 years in marketing",
                    skills: ["Digital Marketing", "Social Media", "Content Creation"],
                    status: "rejected",
                    phone: "+63 934 567 8901",
                    email: "anna.reyes@example.com",
                    appliedDate: "2023-03-05"
                },
                {
                    name: "Michael Tan",
                    position: "Sales Associate",
                    experience: "2 years in retail sales",
                    skills: ["Sales", "Negotiation", "Customer Relations"],
                    status: "pending",
                    phone: "+63 945 678 9012",
                    email: "michael.tan@example.com",
                    appliedDate: "2023-03-12"
                }
            ],
            pending: [
                {
                    name: "Maria Santos",
                    position: "Customer Service Representative",
                    experience: "3 years in customer service",
                    skills: ["Communication", "Problem Solving", "MS Office"],
                    status: "pending",
                    phone: "+63 912 345 6789",
                    email: "maria.santos@example.com",
                    appliedDate: "2023-03-15"
                },
                {
                    name: "Michael Tan",
                    position: "Sales Associate",
                    experience: "2 years in retail sales",
                    skills: ["Sales", "Negotiation", "Customer Relations"],
                    status: "pending",
                    phone: "+63 945 678 9012",
                    email: "michael.tan@example.com",
                    appliedDate: "2023-03-12"
                }
            ],
            approved: [
                {
                    name: "John Doe",
                    position: "Customer Service Representative", 
                    experience: "5 years in call center",
                    skills: ["Customer Support", "Phone Etiquette", "CRM"],
                    status: "approved",
                    phone: "+63 923 456 7890",
                    email: "john.doe@example.com",
                    appliedDate: "2023-03-10"
                }
            ],
            rejected: [
                {
                    name: "Anna Reyes",
                    position: "Marketing Specialist",
                    experience: "4 years in marketing",
                    skills: ["Digital Marketing", "Social Media", "Content Creation"],
                    status: "rejected",
                    phone: "+63 934 567 8901",
                    email: "anna.reyes@example.com",
                    appliedDate: "2023-03-05"
                }
            ]
        };
        
        function init() {
            showSection('auth-section');
            populateJobCards('all');
            populateApplicantCards('all');
            
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                currentUserType = currentUser.type;
                showHomeSection();
                updateProfileInfo();
            }
            
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('interview-date').valueAsDate = tomorrow;
            
            updateSmsPreview();
        }
        
        function showHomeSection() {
            if (currentUserType === 'applicant') {
                showSection('applicant-view');
            } else {
                showSection('employee-view');
            }
            homeNavBtn.classList.add('active');
        }
        
        function showSection(sectionId) {
            authSection.classList.add('hidden');
            userTypeSection.classList.add('hidden');
            applicantView.classList.add('hidden');
            employeeView.classList.add('hidden');
            myApplicationsView.classList.add('hidden');
            savedJobsView.classList.add('hidden');
            profileView.classList.add('hidden');
            editProfileView.classList.add('hidden');
            jobDetailsView.classList.add('hidden');
            applicationFormView.classList.add('hidden');
            interviewSchedulingView.classList.add('hidden');
            applicationDetailsView.classList.add('hidden');
            
            notificationPanel.style.display = 'none';
            searchPanel.style.display = 'none';
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.remove('hidden');
            
            if (sectionId === 'applicant-view' || sectionId === 'employee-view') {
                homeNavBtn.classList.add('active');
            } else if (sectionId === 'my-applications-view') {
                document.querySelector('.nav-btn:nth-child(2)').classList.add('active');
            } else if (sectionId === 'saved-jobs-view') {
                document.querySelector('.nav-btn:nth-child(3)').classList.add('active');
                
                if (currentUserType === 'applicant') {
                    document.getElementById('applicant-saved-jobs').classList.remove('hidden');
                    document.getElementById('employee-saved-applicants').classList.add('hidden');
                } else {
                    document.getElementById('applicant-saved-jobs').classList.add('hidden');
                    document.getElementById('employee-saved-applicants').classList.remove('hidden');
                }
            } else if (sectionId === 'profile-view') {
                document.querySelector('.nav-btn:nth-child(4)').classList.add('active');
            }
            
            previousSection = currentSection;
            currentSection = sectionId;
        }
        
        function goBack() {
            if (previousSection) {
                showSection(previousSection);
            } else {
                showHomeSection();
            }
        }
        
        function login() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                const user = userAccounts.find(acc => acc.email === email && acc.password === password);
                
                if (user) {
                    currentUser = user;
                    currentUserType = user.type;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    updateProfileInfo();
                    
                    showHomeSection();
                } else {
                    alert('Invalid email or password');
                }
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
                    about: ''
                };
                
                userAccounts.push(newUser);
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
                
                currentUser = newUser;
                showSection('user-type-section');
                
                document.getElementById('login-tab').click();
                alert('Account created successfully! Please select your role and then login.');
            } else {
                alert('Please fill in all fields');
            }
        }
        
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
            }
        }
        
        function updateProfileInfo() {
            if (currentUser) {
                document.getElementById('profile-name').textContent = currentUser.name;
                document.getElementById('profile-email').textContent = currentUser.email;
                document.getElementById('profile-phone').textContent = currentUser.phone || '+63 912 345 6789';
                document.getElementById('profile-address').textContent = currentUser.address || '123 Main Street, San Fernando, Pampanga';
                document.getElementById('profile-location').textContent = currentUser.location || 'San Fernando, Pampanga';
                document.getElementById('profile-about').textContent = currentUser.about || 'Experienced customer service professional with 5 years in the industry. Looking for new opportunities to grow and develop my skills.';
                document.getElementById('profile-role').textContent = currentUserType === 'applicant' ? 'Applicant' : 'Employee';
                
                document.getElementById('application-name').value = currentUser.name;
                document.getElementById('application-email').value = currentUser.email;
                document.getElementById('application-phone').value = currentUser.phone || '+63 912 345 6789';
                document.getElementById('application-address').value = currentUser.address || '123 Main Street, San Fernando, Pampanga';
            }
        }
        
        function changeCategory(category) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            
            currentCategory = category;
            populateJobCards(category);
        }
        
        function changeApplicantFilter(filter) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
            
            currentApplicantFilter = filter;
            populateApplicantCards(filter);
        }
        
        function populateJobCards(category) {
            jobCardsContainer.innerHTML = '';
            
            const jobs = jobData[category] || [];
            
            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                    <div class="job-image" style="background-image: url('${job.image}');">
                        <div class="job-type">${job.type}</div>
                    </div>
                    <div class="job-content">
                        <div class="job-title">${job.title}</div>
                        <div class="company">${job.company}</div>
                        <div class="job-details">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                        </div>
                        <button class="view-btn" onclick="showJobDetails('${job.id}')">View Job</button>
                    </div>
                `;
                jobCardsContainer.appendChild(jobCard);
            });
        }
        
        function populateApplicantCards(filter) {
            applicantsContainer.innerHTML = '';
            
            const applicants = applicantData[filter] || [];
            
            applicants.forEach(applicant => {
                const applicantCard = document.createElement('div');
                applicantCard.className = 'applicant-card';
                
                let statusClass = '';
                let statusText = '';
                
                switch(applicant.status) {
                    case 'pending':
                        statusClass = 'status-pending';
                        statusText = 'Pending Review';
                        break;
                    case 'approved':
                        statusClass = 'status-approved';
                        statusText = 'Approved';
                        break;
                    case 'rejected':
                        statusClass = 'status-rejected';
                        statusText = 'Rejected';
                        break;
                }
                
                applicantCard.innerHTML = `
                    <div class="applicant-header">
                        <div class="applicant-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="applicant-main-info">
                            <h3>${applicant.name}</h3>
                            <p>${applicant.position}</p>
                            <div class="application-status ${statusClass}">${statusText}</div>
                        </div>
                    </div>
                    <div class="applicant-details">
                        <p><strong>Experience:</strong> ${applicant.experience}</p>
                        <p><strong>Phone:</strong> ${applicant.phone}</p>
                        <p><strong>Email:</strong> ${applicant.email}</p>
                        <p><strong>Applied:</strong> ${applicant.appliedDate}</p>
                    </div>
                    <div class="applicant-skills">
                        ${applicant.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    <div class="applicant-actions">
                        <button class="action-btn-small view-applicant-btn" onclick="viewApplicantDetails('${applicant.name}')">View Details</button>
                        <button class="action-btn-small save-applicant-btn" onclick="saveApplicant(this, '${applicant.name}')">Save</button>
                    </div>
                `;
                applicantsContainer.appendChild(applicantCard);
            });
        }
        
        function viewApplicantDetails(applicantName) {
            const applicant = applicantData.all.find(a => a.name === applicantName);
            if (applicant) {
                alert(`Viewing details for ${applicantName}\n\nPosition: ${applicant.position}\nExperience: ${applicant.experience}\nPhone: ${applicant.phone}\nEmail: ${applicant.email}\nApplied: ${applicant.appliedDate}\nSkills: ${applicant.skills.join(', ')}`);
            }
        }
        
        function showJobDetails(jobId) {
            const job = Object.values(jobData).flat().find(j => j.id === jobId);
            if (job) {
                showSection('job-details-view');
            }
        }
        
        function showApplicationForm() {
            showSection('application-form-view');
        }
        
        function submitApplication() {
            const name = document.getElementById('application-name').value;
            const email = document.getElementById('application-email').value;
            const phone = document.getElementById('application-phone').value;
            const address = document.getElementById('application-address').value;
            const coverLetter = document.getElementById('application-cover-letter').value;
            const resumeName = document.getElementById('application-resume-name').textContent;
            
            const applicationId = 'app-' + Date.now();
            submittedApplications[applicationId] = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                coverLetter: coverLetter,
                resume: resumeName,
                position: "CUSTOMER SERVICE REPRESENTATIVE",
                company: "ALORICA",
                date: new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
                status: "pending"
            };
            
            localStorage.setItem('submittedApplications', JSON.stringify(submittedApplications));
            
            alert('Application submitted successfully!');
            showHomeSection();
        }
        
        function showApplicationDetails(jobId) {
            const job = Object.values(jobData).flat().find(j => j.id === jobId);
            if (job) {
                const application = Object.values(submittedApplications).find(app => 
                    app.position === job.title && app.company === job.company
                ) || {
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone || '+63 912 345 6789',
                    address: currentUser.address || '123 Main Street, San Fernando, Pampanga',
                    coverLetter: "Dear Hiring Manager,\n\nI am excited to apply for the " + job.title + " position at " + job.company + ". With 5 years of experience in customer service, I am confident in my ability to provide exceptional support to your customers.\n\nThank you for considering my application.\n\nSincerely,\n" + currentUser.name,
                    resume: "Juan_Dela_Cruz_Resume.pdf",
                    position: job.title,
                    company: job.company,
                    date: jobId === 'customer-service' ? 'March 15, 2023' : 
                          jobId === 'marketing-specialist' ? 'March 10, 2023' : 'March 5, 2023',
                    status: jobId === 'customer-service' ? 'pending' : 
                           jobId === 'marketing-specialist' ? 'approved' : 'rejected'
                };
                
                document.getElementById('detail-position').textContent = application.position;
                document.getElementById('detail-company').textContent = application.company;
                document.getElementById('detail-date').textContent = application.date;
                document.getElementById('detail-name').textContent = application.name;
                document.getElementById('detail-email').textContent = application.email;
                document.getElementById('detail-phone').textContent = application.phone;
                document.getElementById('detail-address').textContent = application.address;
                document.getElementById('detail-resume').textContent = application.resume;
                document.getElementById('detail-cover-letter').textContent = application.coverLetter;
                
                const statusElement = document.getElementById('detail-status');
                statusElement.textContent = application.status === 'pending' ? 'Pending Review' : 
                                           application.status === 'approved' ? 'Approved' : 'Rejected';
                statusElement.className = 'application-status ' + 
                    (application.status === 'pending' ? 'status-pending' : 
                     application.status === 'approved' ? 'status-approved' : 'status-rejected');
                
                showSection('application-details-view');
            }
        }
        
        function editProfile() {
            document.getElementById('edit-name').value = currentUser.name || '';
            document.getElementById('edit-email').value = currentUser.email || '';
            document.getElementById('edit-phone').value = currentUser.phone || '+63 912 345 6789';
            document.getElementById('edit-address').value = currentUser.address || '123 Main Street, San Fernando, Pampanga';
            document.getElementById('edit-location').value = currentUser.location || 'San Fernando, Pampanga';
            document.getElementById('edit-about').value = currentUser.about || 'Experienced customer service professional with 5 years in the industry. Looking for new opportunities to grow and develop my skills.';
            
            showSection('edit-profile-view');
        }
        
        function saveProfile() {
            currentUser.name = document.getElementById('edit-name').value;
            currentUser.phone = document.getElementById('edit-phone').value;
            currentUser.address = document.getElementById('edit-address').value;
            currentUser.location = document.getElementById('edit-location').value;
            currentUser.about = document.getElementById('edit-about').value;
            
            const userIndex = userAccounts.findIndex(acc => acc.email === currentUser.email);
            if (userIndex !== -1) {
                userAccounts[userIndex] = currentUser;
                localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            
            updateProfileInfo();
            
            alert('Profile updated successfully!');
            showSection('profile-view');
        }
        
        function handleResumeUpload(input) {
            if (input.files && input.files[0]) {
                currentResumeFile = input.files[0];
                document.getElementById('resume-file-name').textContent = currentResumeFile.name;
                alert('Resume uploaded successfully!');
            }
        }
        
        function handleApplicationResumeUpload(input) {
            if (input.files && input.files[0]) {
                currentApplicationResumeFile = input.files[0];
                document.getElementById('application-resume-name').textContent = currentApplicationResumeFile.name;
                alert('Resume updated successfully!');
            }
        }
        
        function changeApplicationResume() {
            document.getElementById('application-resume-upload').click();
        }
        
        function removeResume() {
            if (confirm('Are you sure you want to remove your resume?')) {
                currentResumeFile = null;
                document.getElementById('resume-file-name').textContent = 'No resume uploaded';
                alert('Resume removed successfully');
            }
        }
        
        function approveApplication(button, applicantName, phoneNumber) {
            const statusElement = button.closest('.applicant-info').querySelector('.application-status');
            statusElement.textContent = 'Approved';
            statusElement.className = 'application-status status-approved';
            
            sendNotificationToApplicant(applicantName, phoneNumber, 'approved');
            alert('Application approved! Notification sent to applicant.');
        }
        
        function rejectApplication(button, applicantName, phoneNumber) {
            const statusElement = button.closest('.applicant-info').querySelector('.application-status');
            statusElement.textContent = 'Rejected';
            statusElement.className = 'application-status status-rejected';
            
            sendNotificationToApplicant(applicantName, phoneNumber, 'rejected');
            alert('Application rejected! Notification sent to applicant.');
        }
        
        function saveApplicant(button, applicantName) {
            alert(`Applicant ${applicantName} saved for interviews!`);
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
        
        function showScheduleInterview(applicantName, phoneNumber) {
            const applicant = applicantData.all.find(a => a.name === applicantName);
            if (applicant) {
                document.getElementById('interview-applicant').value = applicantName;
                document.getElementById('interview-phone').value = phoneNumber;
                document.getElementById('interview-email').value = applicant.email;
                
                updateSmsPreview();
                
                showSection('interview-scheduling-view');
            }
        }
        
        function updateSmsPreview() {
            const applicantName = document.getElementById('interview-applicant').value;
            const date = document.getElementById('interview-date').value;
            const time = document.getElementById('interview-time').value;
            const location = document.getElementById('interview-location').value;
            const interviewType = document.getElementById('interview-type').value;
            const details = document.getElementById('interview-details').value;
            
            const formattedDate = new Date(date).toLocaleDateString('en-PH', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            let smsContent = `Hello ${applicantName}, you have been scheduled for a ${interviewType} interview on ${formattedDate} at ${time}.`;
            
            if (location) {
                smsContent += ` Location: ${location}.`;
            }
            
            if (details) {
                smsContent += ` Additional details: ${details}`;
            }
            
            smsContent += " Please confirm your attendance. Thank you!";
            
            document.getElementById('sms-content').textContent = smsContent;
        }
        
        function sendInterviewInvitation() {
            const applicantName = document.getElementById('interview-applicant').value;
            const phoneNumber = document.getElementById('interview-phone').value;
            const email = document.getElementById('interview-email').value;
            const date = document.getElementById('interview-date').value;
            const time = document.getElementById('interview-time').value;
            const location = document.getElementById('interview-location').value;
            const interviewType = document.getElementById('interview-type').value;
            const details = document.getElementById('interview-details').value;
            
            if (!date || !time || !location) {
                alert('Please fill in all required fields: date, time, and location.');
                return;
            }
            
            integrationStatus.innerHTML = '<div class="integration-status integration-loading">Sending invitation...</div>';
            
            setTimeout(() => {
                const phoneRegex = /^\+?[\d\s-()]+$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!phoneRegex.test(phoneNumber)) {
                    integrationStatus.innerHTML = '<div class="integration-status integration-error">Invalid phone number format. Please check and try again.</div>';
                    return;
                }
                
                if (!emailRegex.test(email)) {
                    integrationStatus.innerHTML = '<div class="integration-status integration-error">Invalid email format. Please check and try again.</div>';
                    return;
                }
                
                integrationStatus.innerHTML = '<div class="integration-status integration-success">Interview invitation sent successfully to ' + phoneNumber + ' and ' + email + '!</div>';
                
                console.log('SMS sent to:', phoneNumber);
                console.log('Email sent to:', email);
                console.log('Message:', document.getElementById('sms-content').textContent);
                
                alert(`Interview invitation sent to ${applicantName}!\n\nSMS: ${phoneNumber}\nEmail: ${email}`);
                
                setTimeout(() => {
                    showSection('saved-jobs-view');
                }, 2000);
            }, 1500);
        }
        
        function sendNotificationToApplicant(applicantName, phoneNumber, type, details = {}) {
            let message = '';
            
            switch(type) {
                case 'approved':
                    message = `Hello ${applicantName}, your application has been approved! We will contact you soon for the next steps.`;
                    break;
                case 'rejected':
                    message = `Hello ${applicantName}, thank you for your application. Unfortunately, we have decided to move forward with other candidates at this time.`;
                    break;
                case 'interview':
                    const formattedDate = new Date(details.date).toLocaleDateString('en-PH', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    message = `Hello ${applicantName}, you have been scheduled for a ${details.type} interview on ${formattedDate} at ${details.time}. Location: ${details.location}. ${details.details}`;
                    break;
            }
            
            console.log(`SMS to ${phoneNumber}: ${message}`);
        }
        
        function performSearch() {
            const searchTerm = document.querySelector('.search-input').value;
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
            }
        }
        
        function logout() {
            currentUser = null;
            currentUserType = null;
            localStorage.removeItem('currentUser');
            showSection('auth-section');
        }
        
        function loginWithGoogle() {
            currentUser = {
                name: 'Juan Dela Cruz',
                email: 'juan.delacruz@example.com',
                type: 'applicant',
                phone: '+63 912 345 6789',
                address: '123 Main Street, San Fernando, Pampanga',
                location: 'San Fernando, Pampanga',
                about: 'Experienced customer service professional with 5 years in the industry. Looking for new opportunities to grow and develop my skills.'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            currentUserType = 'applicant';
            updateProfileInfo();
            showHomeSection();
        }
        
        function signupWithGoogle() {
            showSection('user-type-section');
        }
        
        document.getElementById('interview-date').addEventListener('change', updateSmsPreview);
        document.getElementById('interview-time').addEventListener('change', updateSmsPreview);
        document.getElementById('interview-location').addEventListener('input', updateSmsPreview);
        document.getElementById('interview-type').addEventListener('change', updateSmsPreview);
        document.getElementById('interview-details').addEventListener('input', updateSmsPreview);
        document.getElementById('interview-phone').addEventListener('input', updateSmsPreview);
        
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
        
        init();