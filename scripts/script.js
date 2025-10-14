        let currentUser = null;
        let currentUserType = null;
        let currentSection = 'auth-section';
        let previousSection = null;
        let currentCategory = 'all';
        let currentApplicantFilter = 'all';
        let userAccounts = JSON.parse(localStorage.getItem('userAccounts')) || [];
        let currentResumeFile = null;
        let currentApplicationResumeFile = null;
        let savedApplicants = JSON.parse(localStorage.getItem('savedApplicants')) || [];
        let scheduledInterviews = JSON.parse(localStorage.getItem('scheduledInterviews')) || [];
        let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};
        let currentChatWith = null;
        let submittedApplications = JSON.parse(localStorage.getItem('submittedApplications')) || {};
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        let uploadedJobs = JSON.parse(localStorage.getItem('uploadedJobs')) || [];

        const adminCredentials = {
            username: "admin",
            password: "admin123"
        };
        let isAdminLoggedIn = false;
        let adminApplications = JSON.parse(localStorage.getItem('adminApplications')) || [];
        
        const authSection = document.getElementById('auth-section');
        const userTypeSection = document.getElementById('user-type-section');
        const applicantView = document.getElementById('applicant-view');
        const employeeView = document.getElementById('employee-view');
        const adminDashboardView = document.getElementById('admin-dashboard-view');
        const myApplicationsView = document.getElementById('my-applications-view');
        const savedJobsView = document.getElementById('saved-jobs-view');
        const profileView = document.getElementById('profile-view');
        const editProfileView = document.getElementById('edit-profile-view');
        const jobDetailsView = document.getElementById('job-details-view');
        const applicationFormView = document.getElementById('application-form-view');
        const interviewSchedulingView = document.getElementById('interview-scheduling-view');
        const applicationDetailsView = document.getElementById('application-details-view');
        const applicantDetailsView = document.getElementById('applicant-details-view');
        const uploadDataView = document.getElementById('upload-data-view');
        const notificationPanel = document.getElementById('notification-panel');
        const searchPanel = document.getElementById('search-panel');
        const jobCardsContainer = document.getElementById('job-cards-container');
        const applicantsContainer = document.getElementById('applicants-container');
        const homeNavBtn = document.getElementById('home-nav-btn');
        const integrationStatus = document.getElementById('integration-status');
        const uploadJobView = document.getElementById('upload-job-view');
        const searchInput = document.getElementById('searchInput');
        const jobTypeFilter = document.getElementById('jobTypeFilter');
        const locationFilter = document.getElementById('locationFilter');
        const searchResultsCount = document.getElementById('searchResultsCount');
        const searchResults = document.getElementById('search-results');        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const uploadStatus = document.getElementById('uploadStatus');
        const adminLoginBtn = document.getElementById('admin-login-btn');
        const adminLoginContainer = document.getElementById('admin-login-container');
        const adminLoginButton = document.getElementById('admin-login-button');
        const adminLogoutBtn = document.getElementById('admin-logout-btn');
        const exportExcelBtn = document.getElementById('export-excel-btn');
        const adminApplicationsList = document.getElementById('admin-applications-list');
        const adminSearchInput = document.getElementById('admin-search-input');
        const statusFilter = document.getElementById('status-filter');
        const jobFilter = document.getElementById('job-filter');
        const totalApplications = document.getElementById('total-applications');
        const pendingApplications = document.getElementById('pending-applications');
        const approvedApplications = document.getElementById('approved-applications');
        const rejectedApplications = document.getElementById('rejected-applications');
        const floatingChatBtn = document.getElementById('floating-chat-btn');
        const chatContainer = document.getElementById('chat-container');
        const chatClose = document.getElementById('chat-close');
        const chatMessagesEl = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const cameraModal = document.getElementById('camera-modal');
        const cameraPreview = document.getElementById('camera-preview');
        let cameraStream = null;

        function showUploadDataView() {
            showSection('upload-data-view');
        }

        function initUploadFunctionality() {
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');
            const uploadBtn = document.getElementById('uploadBtn');
            const uploadStatus = document.getElementById('uploadStatus');
            
            const bulkUploadArea = document.getElementById('bulkUploadArea');
            const bulkFileInput = document.getElementById('bulkFileInput');
            const bulkUploadBtn = document.getElementById('bulkUploadBtn');
            
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.style.borderColor = '#ff2222';
                uploadArea.style.backgroundColor = '#f9f9f9';
            });
            
            uploadArea.addEventListener('dragleave', function() {
                uploadArea.style.borderColor = '#ddd';
                uploadArea.style.backgroundColor = 'transparent';
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.style.borderColor = '#ddd';
                uploadArea.style.backgroundColor = 'transparent';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    handleFileSelection(files[0]);
                }
            });
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    handleFileSelection(this.files[0]);
                }
            });
            
            uploadBtn.addEventListener('click', handleSingleUpload);
            
            bulkUploadArea.addEventListener('click', function() {
                bulkFileInput.click();
            });
            
            bulkUploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                bulkUploadArea.style.borderColor = '#28a745';
                bulkUploadArea.style.backgroundColor = '#f9f9f9';
            });
            
            bulkUploadArea.addEventListener('dragleave', function() {
                bulkUploadArea.style.borderColor = '#ddd';
                bulkUploadArea.style.backgroundColor = 'transparent';
            });
            
            bulkUploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                bulkUploadArea.style.borderColor = '#ddd';
                bulkUploadArea.style.backgroundColor = 'transparent';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    bulkFileInput.files = files;
                    handleBulkFileSelection(files[0]);
                }
            });
            
            bulkFileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    handleBulkFileSelection(this.files[0]);
                }
            });
            
            bulkUploadBtn.addEventListener('click', handleBulkUpload);
        }

        function handleFileSelection(file) {
            const uploadArea = document.getElementById('uploadArea');
            const fileName = file.name;
            uploadArea.querySelector('p').textContent = `Selected: ${fileName}`;
            uploadArea.querySelector('span').textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;
        }

        function handleBulkFileSelection(file) {
            const bulkUploadArea = document.getElementById('bulkUploadArea');
            const fileName = file.name;
            bulkUploadArea.querySelector('p').textContent = `Selected: ${fileName}`;
            bulkUploadArea.querySelector('span').textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;
        }

        function handleSingleUpload() {
            const file = document.getElementById('fileInput').files[0];
            const jobTitle = document.getElementById('uploadJobTitle').value;
            const company = document.getElementById('uploadCompany').value;
            const location = document.getElementById('uploadLocation').value;
            const salary = document.getElementById('uploadSalary').value;
            const jobType = document.getElementById('uploadType').value;
            const category = document.getElementById('uploadCategory').value;
            const description = document.getElementById('uploadDescription').value;
            const requirements = document.getElementById('uploadRequirements').value;
            
            const uploadStatus = document.getElementById('uploadStatus');
            
            if (!jobTitle || !company || !location || !jobType || !category) {
                uploadStatus.textContent = 'Please fill in all required fields';
                uploadStatus.className = 'upload-status upload-error';
                uploadStatus.style.display = 'block';
                return;
            }
            
            uploadStatus.textContent = 'Uploading job...';
            uploadStatus.className = 'upload-status upload-loading';
            uploadStatus.style.display = 'block';
            
            setTimeout(() => {
                const jobId = 'uploaded-' + Date.now();
                const newJob = {
                    id: jobId,
                    title: jobTitle.toUpperCase(),
                    company: company.toUpperCase(),
                    location: location,
                    salary: salary,
                    type: jobType,
                    category: category,
                    description: description,
                    requirements: requirements,
                    image: `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(company.substring(0, 10))}`,
                    datePosted: new Date().toISOString(),
                    uploaded: true
                };
                
                uploadedJobs.push(newJob);
                localStorage.setItem('uploadedJobs', JSON.stringify(uploadedJobs));
                
                if (!jobData[category]) {
                    jobData[category] = [];
                }
                jobData[category].push(newJob);
                jobData.all.push(newJob);
                
                uploadStatus.textContent = 'Job uploaded successfully!';
                uploadStatus.className = 'upload-status upload-success';
                
                resetUploadForm();
                
                if (currentUserType === 'applicant') {
                    populateJobCards(currentCategory);
                }
                
                createNotification(
                    currentUser.email,
                    'Job Uploaded Successfully',
                    `Your job "${jobTitle}" has been uploaded and is now visible to applicants.`
                );
                
            }, 1500);
        }

        function handleBulkUpload() {
            const file = document.getElementById('bulkFileInput').files[0];
            const uploadStatus = document.getElementById('uploadStatus');
            
            if (!file) {
                uploadStatus.textContent = 'Please select a file first';
                uploadStatus.className = 'upload-status upload-error';
                uploadStatus.style.display = 'block';
                return;
            }
            
            const validTypes = ['.xlsx', '.xls', '.csv'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!validTypes.includes(fileExtension)) {
                uploadStatus.textContent = 'Please select an Excel or CSV file';
                uploadStatus.className = 'upload-status upload-error';
                uploadStatus.style.display = 'block';
                return;
            }
            
            uploadStatus.textContent = 'Processing bulk upload...';
            uploadStatus.className = 'upload-status upload-loading';
            uploadStatus.style.display = 'block';
            
            setTimeout(() => {
                const sampleBulkJobs = [
                    {
                        id: 'bulk-' + Date.now() + '-1',
                        title: "SENIOR DEVELOPER",
                        company: "TECH CORP",
                        location: "Manila",
                        salary: "₱40,000 - ₱60,000",
                        type: "Full Time",
                        category: "tech",
                        description: "Senior developer position with leadership responsibilities.",
                        requirements: "5+ years experience, team leadership",
                        image: "https://placehold.co/600x400/3b82f6/white?text=TECH+CORP",
                        datePosted: new Date().toISOString(),
                        uploaded: true
                    },
                    {
                        id: 'bulk-' + Date.now() + '-2',
                        title: "DIGITAL MARKETER",
                        company: "MARKETING PROS",
                        location: "Cebu",
                        salary: "₱25,000 - ₱35,000",
                        type: "Full Time",
                        category: "marketing",
                        description: "Digital marketing specialist for online campaigns.",
                        requirements: "SEO, SEM, Social Media experience",
                        image: "https://placehold.co/600x400/10b981/white?text=MARKETING",
                        datePosted: new Date().toISOString(),
                        uploaded: true
                    }
                ];
                
                sampleBulkJobs.forEach(job => {
                    uploadedJobs.push(job);
                    
                    if (!jobData[job.category]) {
                        jobData[job.category] = [];
                    }
                    jobData[job.category].push(job);
                    jobData.all.push(job);
                });
                
                localStorage.setItem('uploadedJobs', JSON.stringify(uploadedJobs));
                
                uploadStatus.textContent = `Bulk upload successful! ${sampleBulkJobs.length} jobs added.`;
                uploadStatus.className = 'upload-status upload-success';
                
                document.getElementById('bulkFileInput').value = '';
                document.getElementById('bulkUploadArea').querySelector('p').textContent = 'Drag & drop your Excel/CSV file for bulk upload';
                document.getElementById('bulkUploadArea').querySelector('span').textContent = 'Supports .xlsx, .xls, .csv formats';
                
                if (currentUserType === 'applicant') {
                    populateJobCards(currentCategory);
                }
                
                createNotification(
                    currentUser.email,
                    'Bulk Upload Completed',
                    `Successfully uploaded ${sampleBulkJobs.length} jobs from your file.`
                );
                
            }, 2000);
        }

        function resetUploadForm() {
            document.getElementById('uploadJobTitle').value = '';
            document.getElementById('uploadCompany').value = '';
            document.getElementById('uploadLocation').value = '';
            document.getElementById('uploadSalary').value = '';
            document.getElementById('uploadType').value = '';
            document.getElementById('uploadCategory').value = '';
            document.getElementById('uploadDescription').value = '';
            document.getElementById('uploadRequirements').value = '';
            document.getElementById('fileInput').value = '';
            
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.querySelector('p').textContent = 'Drag & drop your Excel/CSV file here';
            uploadArea.querySelector('span').textContent = 'or click to browse';
        }
        
        const jobData = {
            all: [
                {
                    id: 'customer-service',
                    title: "CUSTOMER SERVICE REPRESENTATIVE",
                    company: "ALORICA",
                    location: "Clark",
                    salary: "₱18,000 - ₱22,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/3b82f6/white?text=ALORICA",
                    description: "We are looking for a Customer Service Representative to join our team. You will be responsible for handling customer inquiries, providing information about our products and services, and resolving any issues that arise.",
                    requirements: "High school diploma or equivalent, Excellent communication skills, Ability to work in a fast-paced environment, Customer service experience preferred"
                },
                {
                    id: 'marketing-specialist',
                    title: "MARKETING SPECIALIST",
                    company: "FAVERTON GROUP INC.",
                    location: "San Fernando",
                    salary: "₱20,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/10b981/white?text=FAVERTON",
                    description: "We need a creative Marketing Specialist to develop and implement marketing strategies. You will be responsible for brand management and market research.",
                    requirements: "Bachelor's degree in Marketing or related field, 3+ years of marketing experience, excellent communication skills"
                },
                {
                    id: 'sales-associate',
                    title: "SALES ASSOCIATE",
                    company: "RC COLA",
                    location: "Pampanga",
                    salary: "₱12,000 - ₱15,000",
                    type: "Part Time",
                    image: "https://placehold.co/600x400/f59e0b/white?text=RC+COLA",
                    description: "Join our sales team as a Sales Associate. You will be responsible for assisting customers, processing sales, and maintaining product displays.",
                    requirements: "High school diploma, sales experience preferred, strong communication skills"
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
                    image: "https://placehold.co/600x400/3b82f6/white?text=TECH",
                    description: "We are looking for a Software Developer to build and maintain software applications. The ideal candidate should have experience with JavaScript, React, and Node.js.",
                    requirements: "Bachelor's degree in Computer Science or related field, 2+ years of experience in software development, proficiency in JavaScript and React"
                },
                {
                    id: 'it-support',
                    title: "IT SUPPORT SPECIALIST",
                    company: "DATA SYSTEMS CORP",
                    location: "San Fernando",
                    salary: "₱18,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/10b981/white?text=IT",
                    description: "Join our IT team as a Support Specialist. You will be responsible for providing technical assistance to our employees and maintaining our systems.",
                    requirements: "Associate's degree in IT or related field, 1+ years of IT support experience, knowledge of Windows and macOS"
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
                    image: "https://placehold.co/600x400/ef4444/white?text=MARKETING",
                    description: "We are seeking a Digital Marketing Specialist to develop and implement digital marketing campaigns across various channels.",
                    requirements: "Bachelor's degree in Marketing or related field, 2+ years of digital marketing experience, knowledge of SEO and social media marketing"
                },
                {
                    id: 'social-media',
                    title: "SOCIAL MEDIA MANAGER",
                    company: "BRAND BUILDERS INC",
                    location: "Angeles City",
                    salary: "₱18,000 - ₱25,000",
                    type: "Full Time",
                    image: "https://placehold.co/600x400/f59e0b/white?text=SOCIAL+MEDIA",
                    description: "Join our team as a Social Media Manager. You will be responsible for managing our social media presence and creating engaging content.",
                    requirements: "Bachelor's degree in Marketing or related field, 2+ years of social media management experience, excellent writing skills"
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
                    image: "https://placehold.co/600x400/3b82f6/white?text=SALES",
                    description: "We are hiring a Sales Representative to help us expand our clientele. You will be responsible for discovering and pursuing new sales prospects.",
                    requirements: "Proven sales experience, ability to communicate and negotiate, customer-focused approach"
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
                    image: "https://placehold.co/600x400/10b981/white?text=FINANCE",
                    description: "Join our finance team as an Accounting Assistant. You will be responsible for assisting with bookkeeping and financial reporting.",
                    requirements: "Bachelor's degree in Accounting or related field, 1+ years of accounting experience, knowledge of accounting software"
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
            
            uploadedJobs.forEach(job => {
                if (!jobData[job.category]) {
                    jobData[job.category] = [];
                }
                jobData[job.category].push(job);
                
                if (!jobData.all.some(j => j.id === job.id)) {
                    jobData.all.push(job);
                }
            });

            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                currentUserType = currentUser.type;
                showHomeSection();
                updateProfileInfo();
            }
            
            const savedAdmin = localStorage.getItem('isAdminLoggedIn');
            if (savedAdmin === 'true') {
                isAdminLoggedIn = true;
                showAdminDashboard();
            }
            
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('interview-date').valueAsDate = tomorrow;
            
            
            updateSmsPreview();
            
            loadNotifications();
            
            initChat();
            
            document.getElementById('interview-date').addEventListener('change', updateSmsPreview);
            document.getElementById('interview-time').addEventListener('change', updateSmsPreview);
            document.getElementById('interview-location').addEventListener('input', updateSmsPreview);
            document.getElementById('interview-type').addEventListener('change', updateSmsPreview);
            document.getElementById('interview-details').addEventListener('input', updateSmsPreview);
            document.getElementById('interview-phone').addEventListener('input', updateSmsPreview);
            
            document.getElementById('searchIcon').addEventListener('click', function() {
                searchPanel.style.display = searchPanel.style.display === 'block' ? 'none' : 'block';
                notificationPanel.style.display = 'none';
            });
            
            document.getElementById('notificationIcon').addEventListener('click', function() {
                notificationPanel.style.display = notificationPanel.style.display === 'block' ? 'none' : 'block';
                searchPanel.style.display = 'none';
            });
            
            document.getElementById('login-tab').addEventListener('click', function() {
                document.getElementById('login-tab').classList.add('active');
                document.getElementById('signup-tab').classList.remove('active');
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('signup-form').classList.add('hidden');
                adminLoginContainer.classList.add('hidden');
            });
            
            document.getElementById('signup-tab').addEventListener('click', function() {
                document.getElementById('signup-tab').classList.add('active');
                document.getElementById('login-tab').classList.remove('active');
                document.getElementById('signup-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
                adminLoginContainer.classList.add('hidden');
            });

            searchInput.addEventListener('input', performSearch);
            jobTypeFilter.addEventListener('change', performSearch);
            locationFilter.addEventListener('change', performSearch);
            
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    uploadArea.querySelector('p').textContent = `Selected: ${fileName}`;
                }
            });
            
            uploadBtn.addEventListener('click', handleFileUpload);
            
            function showUploadJobForm() {
                document.getElementById('job-title').value = '';
                document.getElementById('job-company').value = '';
                document.getElementById('job-location').value = '';
                document.getElementById('job-salary').value = '';
                document.getElementById('job-type').value = '';
                document.getElementById('job-category').value = '';
                document.getElementById('job-description').value = '';
                document.getElementById('job-requirements').value = '';
                document.getElementById('job-benefits').value = '';
                
                showSection('upload-job-view');
            }

            document.getElementById('admin-login-btn').addEventListener('click', function() {
                const adminContainer = document.getElementById('admin-login-container');
                const loginForm = document.getElementById('login-form');
                const signupForm = document.getElementById('signup-form');
                const authTabs = document.querySelector('.auth-tabs');
                
                adminContainer.classList.toggle('hidden');
                
                if (!adminContainer.classList.contains('hidden')) {
                    loginForm.classList.add('hidden');
                    signupForm.classList.add('hidden');
                    authTabs.classList.add('hidden');
                } else {
                    loginForm.classList.remove('hidden');
                    authTabs.classList.remove('hidden');
                    document.getElementById('login-tab').classList.add('active');
                    document.getElementById('signup-tab').classList.remove('active');
                }
            });
            
            document.getElementById('admin-login-button').addEventListener('click', function() {
                const username = document.getElementById('admin-username').value;
                const password = document.getElementById('admin-password').value;
                
                if (username === adminCredentials.username && password === adminCredentials.password) {
                    isAdminLoggedIn = true;
                    localStorage.setItem('isAdminLoggedIn', 'true');
                    showAdminDashboard();
                    
                    document.getElementById('admin-username').value = '';
                    document.getElementById('admin-password').value = '';
                    document.getElementById('admin-login-container').classList.add('hidden');
                } else {
                    alert('Invalid admin credentials!');
                }
            });

            document.getElementById('login-tab').addEventListener('click', function() {
                document.getElementById('login-tab').classList.add('active');
                document.getElementById('signup-tab').classList.remove('active');
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('signup-form').classList.add('hidden');
                document.getElementById('admin-login-container').classList.add('hidden');
                document.querySelector('.auth-tabs').classList.remove('hidden');
            });

            document.getElementById('signup-tab').addEventListener('click', function() {
                document.getElementById('signup-tab').classList.add('active');
                document.getElementById('login-tab').classList.remove('active');
                document.getElementById('signup-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('admin-login-container').classList.add('hidden');
                document.querySelector('.auth-tabs').classList.remove('hidden');
            });
            
            function uploadJob() {
                const title = document.getElementById('job-title').value;
                const company = document.getElementById('job-company').value;
                const location = document.getElementById('job-location').value;
                const salary = document.getElementById('job-salary').value;
                const type = document.getElementById('job-type').value;
                const category = document.getElementById('job-category').value;
                const description = document.getElementById('job-description').value;
                const requirements = document.getElementById('job-requirements').value;
                const benefits = document.getElementById('job-benefits').value;
                
                if (!title || !company || !location || !salary || !type || !category || !description) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                const jobId = 'job-' + Date.now();
                const newJob = {
                    id: jobId,
                    title: title.toUpperCase(),
                    company: company.toUpperCase(),
                    location: location,
                    salary: salary,
                    type: type,
                    category: category,
                    description: description,
                    requirements: requirements,
                    benefits: benefits,
                    image: `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(company.substring(0, 10))}`,
                    datePosted: new Date().toISOString()
                };
                
                uploadedJobs.push(newJob);
                localStorage.setItem('uploadedJobs', JSON.stringify(uploadedJobs));
                
                if (!jobData[category]) {
                    jobData[category] = [];
                }
                jobData[category].push(newJob);
                jobData.all.push(newJob);
                
                alert('Job posted successfully!');
                showSection('employee-view');
                
                if (currentUserType === 'applicant') {
                    populateJobCards(currentCategory);
                }
            }
            
            function handleFileUpload() {
                const file = fileInput.files[0];
                if (!file) {
                    alert('Please select a file first');
                    return;
                }
                
                const validTypes = ['.xlsx', '.xls', '.csv'];
                const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                
                if (!validTypes.includes(fileExtension)) {
                    alert('Please select an Excel or CSV file');
                    return;
                }
                
                uploadStatus.textContent = 'Uploading...';
                uploadStatus.className = 'upload-status upload-loading';
                uploadStatus.style.display = 'block';
                
                setTimeout(() => {
                    uploadStatus.textContent = 'File uploaded successfully!';
                    uploadStatus.className = 'upload-status upload-success';
                    
                    fileInput.value = '';
                    uploadArea.querySelector('p').textContent = 'Drag & drop your Excel/CSV file here';
                }, 2000);
            }
            
            function performSearch() {
                const query = searchInput.value.toLowerCase();
                const jobType = jobTypeFilter.value;
                const location = locationFilter.value;
                
                if (!query && !jobType && !location) {
                    searchResults.innerHTML = '';
                    searchResultsCount.textContent = '';
                    return;
                }
                
                const allJobs = Object.values(jobData).flat();
                const filteredJobs = allJobs.filter(job => {
                    const matchesQuery = !query || 
                        job.title.toLowerCase().includes(query) ||
                        job.company.toLowerCase().includes(query) ||
                        job.description.toLowerCase().includes(query) ||
                        job.requirements.toLowerCase().includes(query);
                    
                    const matchesJobType = !jobType || job.type === jobType;
                    const matchesLocation = !location || job.location === location;
                    
                    return matchesQuery && matchesJobType && matchesLocation;
                });
                
                displaySearchResults(filteredJobs);
            }
            
            function displaySearchResults(jobs) {
                searchResults.innerHTML = '';
                searchResultsCount.textContent = `${jobs.length} jobs found`;
                
                if (jobs.length === 0) {
                    searchResults.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-search"></i>
                            <p>No jobs found matching your criteria</p>
                        </div>
                    `;
                    return;
                }
                
                jobs.forEach(job => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    
                    let hasApplied = false;
                    if (currentUser && currentUser.email) {
                        hasApplied = Object.values(submittedApplications).some(app => 
                            app.position === job.title && app.company === job.company && app.email === currentUser.email
                        );
                    }
                    
                    let applicationStatus = '';
                    if (hasApplied) {
                        applicationStatus = `
                            <div class="application-status-badge status-applied">
                                <i class="fas fa-check-circle"></i> Applied
                            </div>
                        `;
                    }
                    
                    resultItem.innerHTML = `
                        <div class="job-title">${job.title}</div>
                        <div class="company">${job.company} • ${job.location}</div>
                        ${applicationStatus}
                        <div class="job-details">
                            <span>${job.type} • ${job.salary}</span>
                        </div>
                        <button class="view-btn" data-job-id="${job.id}">View Details</button>
                    `;
                    
                    searchResults.appendChild(resultItem);
                });
                
                searchResults.querySelectorAll('.view-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const jobId = this.getAttribute('data-job-id');
                        showJobDetails(jobId);
                        searchPanel.style.display = 'none';
                    });
                });
            }
            
            adminLogoutBtn.addEventListener('click', function() {
                isAdminLoggedIn = false;
                localStorage.setItem('isAdminLoggedIn', 'false');
                showSection('auth-section');
            });
            
            exportExcelBtn.addEventListener('click', exportToExcel);
            
            adminSearchInput.addEventListener('input', renderAdminApplications);
            statusFilter.addEventListener('change', renderAdminApplications);
            jobFilter.addEventListener('change', renderAdminApplications);
            
            document.addEventListener('click', function(event) {
                if (!event.target.closest('#notificationIcon') && !event.target.closest('#notification-panel')) {
                    notificationPanel.style.display = 'none';
                }
                
                if (!event.target.closest('#searchIcon') && !event.target.closest('#search-panel')) {
                    searchPanel.style.display = 'none';
                }
            });

            initUploadFunctionality();
        }
        
        function showHomeSection() {
            if (isAdminLoggedIn) {
                showAdminDashboard();
            } else if (currentUserType === 'applicant') {
                showSection('applicant-view');
            } else if (currentUserType === 'employee') {
                showSection('employee-view');
            } else {
                showSection('auth-section');
            }
            homeNavBtn.classList.add('active');
        }
        
        function showSection(sectionId) {
            authSection.classList.add('hidden');
            userTypeSection.classList.add('hidden');
            applicantView.classList.add('hidden');
            employeeView.classList.add('hidden');
            adminDashboardView.classList.add('hidden');
            myApplicationsView.classList.add('hidden');
            savedJobsView.classList.add('hidden');
            profileView.classList.add('hidden');
            editProfileView.classList.add('hidden');
            jobDetailsView.classList.add('hidden');
            applicationFormView.classList.add('hidden');
            interviewSchedulingView.classList.add('hidden');
            applicationDetailsView.classList.add('hidden');
            applicantDetailsView.classList.add('hidden');
            uploadJobView.classList.add('hidden');
            uploadDataView.classList.add('hidden');
            
            notificationPanel.style.display = 'none';
            searchPanel.style.display = 'none';
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.remove('hidden');
            
            if (sectionId === 'applicant-view' || sectionId === 'employee-view' || sectionId === 'admin-dashboard-view') {
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
            
            toggleNavigationElements();
        }
        
        function toggleNavigationElements() {
            const appContainer = document.getElementById('appContainer');
            const headerIcons = document.querySelector('.header-icons');
            const navContainer = document.querySelector('.nav-container');
            const bottomNav = document.querySelector('.bottom-nav');
            const floatingChatBtn = document.querySelector('.floating-chat-btn');
            const isAuthPage = currentSection === 'auth-section' || currentSection === 'user-type-section';
            
            if (isAuthPage) {
                appContainer.classList.add('auth-page');
                if (headerIcons) headerIcons.style.display = 'none';
                if (navContainer) navContainer.style.display = 'none';
                if (bottomNav) bottomNav.style.display = 'none';
                if (floatingChatBtn) floatingChatBtn.style.display = 'none';
            } else {
                appContainer.classList.remove('auth-page');
                if (headerIcons) headerIcons.style.display = 'flex';
                if (navContainer && (currentSection === 'applicant-view' || currentSection === 'employee-view')) {
                    navContainer.style.display = 'flex';
                } else if (navContainer) {
                    navContainer.style.display = 'none';
                }
                if (bottomNav) bottomNav.style.display = 'flex';
                if (floatingChatBtn) floatingChatBtn.style.display = 'flex';
            }
        }
        
        function showAdminDashboard() {
            showSection('admin-dashboard-view');
            updateAdminStats();
            renderAdminApplications();
        }
        
        function updateAdminStats() {
            const total = 3;
            const pending = 1;
            const approved = 1;
            const rejected = 1;
            
            totalApplications.textContent = total;
            pendingApplications.textContent = pending;
            approvedApplications.textContent = approved;
            rejectedApplications.textContent = rejected;
        }
        
        function renderAdminApplications() {
            const searchTerm = adminSearchInput.value.toLowerCase();
            const statusFilterValue = statusFilter.value;
            const jobFilterValue = jobFilter.value;
            const sampleApplications = [
                {
                    id: 1,
                    applicantName: "Juan Dela Cruz",
                    jobTitle: "Customer Service Representative",
                    company: "ALORICA",
                    email: "juan.delacruz@example.com",
                    phone: "09123456789",
                    status: "pending",
                    applicationDate: "2023-05-15"
                },
                {
                    id: 2,
                    applicantName: "Maria Santos",
                    jobTitle: "Marketing Specialist",
                    company: "FAVERTON GROUP INC.",
                    email: "maria.santos@example.com",
                    phone: "09198765432",
                    status: "approved",
                    applicationDate: "2023-05-10"
                },
                {
                    id: 3,
                    applicantName: "Pedro Reyes",
                    jobTitle: "Sales Associate",
                    company: "RC COLA",
                    email: "pedro.reyes@example.com",
                    phone: "09187654321",
                    status: "rejected",
                    applicationDate: "2023-05-05"
                }
            ];
            
            let filteredApplications = sampleApplications.filter(app => {
                const matchesSearch = 
                    app.applicantName.toLowerCase().includes(searchTerm) ||
                    app.jobTitle.toLowerCase().includes(searchTerm) ||
                    app.email.toLowerCase().includes(searchTerm);
                
                const matchesStatus = statusFilterValue === 'all' || app.status === statusFilterValue;
                
                return matchesSearch && matchesStatus;
            });
            
            adminApplicationsList.innerHTML = '';
            
            if (filteredApplications.length === 0) {
                adminApplicationsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-folder-open"></i>
                        <p>No applications found</p>
                    </div>
                `;
                return;
            }
            
            filteredApplications.forEach(app => {
                const applicationItem = document.createElement('div');
                applicationItem.className = 'admin-application-item';
                
                applicationItem.innerHTML = `
                    <div class="admin-application-header">
                        <div class="admin-application-name">${app.applicantName}</div>
                        <div class="admin-application-date">${app.applicationDate}</div>
                    </div>
                    <div class="admin-application-details">
                        <div class="admin-application-detail"><strong>Job:</strong> ${app.jobTitle}</div>
                        <div class="admin-application-detail"><strong>Company:</strong> ${app.company}</div>
                        <div class="admin-application-detail"><strong>Email:</strong> ${app.email}</div>
                        <div class="admin-application-detail"><strong>Phone:</strong> ${app.phone}</div>
                        <div class="admin-application-detail">
                            <strong>Status:</strong> 
                            <span class="application-status status-${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                        </div>
                    </div>
                    <div class="admin-application-actions">
                        <button class="admin-action-btn-small admin-view-btn" data-app-id="${app.id}">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="admin-action-btn-small admin-download-btn" data-app-id="${app.id}">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="admin-action-btn-small admin-delete-btn" data-app-id="${app.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;
                
                adminApplicationsList.appendChild(applicationItem);
            });
        }
        
        function exportToExcel() {
            const worksheetData = [
                ['Name', 'Email', 'Phone', 'Job Applied', 'Company', 'Status', 'Application Date']
            ];
            
            const sampleData = [
                ['Juan Dela Cruz', 'juan.delacruz@example.com', '09123456789', 'Customer Service Representative', 'ALORICA', 'Pending', '2023-05-15'],
                ['Maria Santos', 'maria.santos@example.com', '09198765432', 'Marketing Specialist', 'FAVERTON GROUP INC.', 'Approved', '2023-05-10'],
                ['Pedro Reyes', 'pedro.reyes@example.com', '09187654321', 'Sales Associate', 'RC COLA', 'Rejected', '2023-05-05']
            ];
            
            worksheetData.push(...sampleData);
            
            const ws = XLSX.utils.aoa_to_sheet(worksheetData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Applications');
            
            XLSX.writeFile(wb, 'employment_corner_applications.xlsx');
        }
        
        function initChat() {
            floatingChatBtn.addEventListener('click', toggleChat);
            chatClose.addEventListener('click', toggleChat);
            chatSend.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        function toggleChat() {
            if (chatContainer.style.display === 'flex') {
                chatContainer.style.display = 'none';
            } else {
                chatContainer.style.display = 'flex';
                loadChatMessages();
            }
        }
        
        function loadChatMessages() {
            chatMessagesEl.innerHTML = '';
            
            const sampleMessages = [
                { sender: 'employer', text: 'Hello, I saw your application and would like to schedule an interview.', time: '10:30 AM' },
                { sender: 'applicant', text: 'Thank you for considering my application! When would be a good time?', time: '10:32 AM' },
                { sender: 'employer', text: 'How about tomorrow at 2 PM?', time: '10:33 AM' }
            ];
            
            sampleMessages.forEach(msg => {
                const messageEl = document.createElement('div');
                messageEl.className = `message ${msg.sender === 'applicant' ? 'sent' : 'received'}`;
                messageEl.innerHTML = `
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                `;
                chatMessagesEl.appendChild(messageEl);
            });
            
            chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
        }
        
        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText) {
                const messageEl = document.createElement('div');
                messageEl.className = 'message sent';
                messageEl.innerHTML = `
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                `;
                chatMessagesEl.appendChild(messageEl);
                
                chatInput.value = '';
                
                chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
                
                
                setTimeout(() => {
                    const replies = [
                        "Thanks for your message. How can I assist you further?",
                        "I understand. Is there anything specific you'd like to know?",
                        "Our team will get back to you shortly with more information.",
                        "That's a great question! Let me check with our support team."
                    ];
                    
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message received';
                    botMessage.textContent = randomReply;
                    chatMessagesEl.appendChild(botMessage);
                    
                    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
                }, 1000);
            }
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
                    
                    populateJobCards(currentCategory);
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
                    profilePicture: null
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
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
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
                
                const skillsContainer = document.getElementById('profile-skills');
                skillsContainer.innerHTML = '';
                if (currentUser.skills && currentUser.skills.length > 0) {
                    currentUser.skills.forEach(skill => {
                        const skillTag = document.createElement('span');
                        skillTag.className = 'skill-tag';
                        skillTag.textContent = skill;
                        skillsContainer.appendChild(skillTag);
                    });
                } else {
                    skillsContainer.innerHTML = '<p>No skills added yet</p>';
                }

                const educationContainer = document.getElementById('profile-education');
                educationContainer.innerHTML = '';
                if (currentUser.education && currentUser.education.length > 0) {
                    currentUser.education.forEach(educations => {
                        const educationsTag = document.createElement('span');
                        educationsTag.className = 'educations-tag';
                        educationsTag.textContent = educations;
                        educationContainer.appendChild(educationsTag);
                    });
                } else {
                    educationContainer.innerHTML = '<p>No education added yet</p>';
                }

                const experienceContainer = document.getElementById('profile-experience');
                experienceContainer.innerHTML = '';
                if (currentUser.experience && currentUser.experience.length > 0) {
                    currentUser.experience.forEach(experiences => {
                        const experiencesTag = document.createElement('span');
                        experiencesTag.className = 'experience-tag';
                        experiencesTag.textContent = experiences;
                        experienceContainer.appendChild(experiencesTag);
                    });
                } else {
                    experienceContainer.innerHTML = '<p>No experience added yet</p>';
                }
                
                updateProfilePicture();
                
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
                
                let hasApplied = false;
                if (currentUser && currentUser.email) {
                    hasApplied = Object.values(submittedApplications).some(app => 
                        app.position === job.title && app.company === job.company && app.email === currentUser.email
                    );
                }
                
                let applicationStatus = '';
                if (hasApplied) {
                    applicationStatus = `
                        <div class="application-status-badge status-applied">
                            <i class="fas fa-check-circle"></i> Applied
                        </div>
                    `;
                }
                
                jobCard.innerHTML = `
                    <div class="job-image" style="background-image: url('${job.image}');">
                        <div class="job-type">${job.type}</div>
                    </div>
                    <div class="job-content">
                        <div class="job-title">${job.title}</div>
                        <div class="company">${job.company}</div>
                        ${applicationStatus}
                        <div class="job-details">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                        </div>
                        <button class="view-btn" onclick="showJobDetails('${job.id}')">
                            ${hasApplied ? 'Review Application' : 'View Job'}
                        </button>
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
                document.getElementById('applicant-detail-name').textContent = applicant.name;
                document.getElementById('applicant-detail-email').textContent = applicant.email;
                document.getElementById('applicant-detail-phone').textContent = applicant.phone;
                document.getElementById('applicant-detail-address').textContent = applicant.address || 'Not provided';
                document.getElementById('applicant-detail-resume').textContent = applicant.resume || 'Not provided';
                
                const skillsContainer = document.getElementById('applicant-detail-skills');
                skillsContainer.innerHTML = '';
                applicant.skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    skillsContainer.appendChild(skillTag);
                });

                const educationContainer = document.getElementById('applicant-detail-education');
                educationContainer.innerHTML = `
                    <div class="education-item">
                        <div class="applicant-detail-label">Bachelor of Science in Business Administration</div>
                        <div class="applicant-detail-value">University of the Philippines, 2015-2019</div>
                    </div>
                `;
                
                const experienceContainer = document.getElementById('applicant-detail-experience');
                experienceContainer.innerHTML = `
                    <div class="experience-item">
                        <div class="applicant-detail-label">Customer Service Representative</div>
                        <div class="applicant-detail-value">ABC Company, 2019-2021</div>
                        <div class="applicant-detail-value">Handled customer inquiries and resolved issues</div>
                    </div>
                    <div class="experience-item">
                        <div class="applicant-detail-label">Sales Associate</div>
                        <div class="applicant-detail-value">XYZ Retail, 2021-Present</div>
                        <div class="applicant-detail-value">Assisted customers and managed product displays</div>
                    </div>
                `;
                
                showSection('applicant-details-view');
            }
        }
        
        function showJobDetails(jobId) {
            const job = Object.values(jobData).flat().find(j => j.id === jobId);
            if (job) {
                let hasApplied = false;
                if (currentUser && currentUser.email) {
                    hasApplied = Object.values(submittedApplications).some(app => 
                        app.position === job.title && app.company === job.company && app.email === currentUser.email
                    );
                }
                
                const applyButton = document.querySelector('#job-details-view .view-btn');
                if (hasApplied) {
                    applyButton.textContent = 'Review Application';
                    applyButton.onclick = function() {
                        showApplicationDetails(jobId);
                    };
                } else {
                    applyButton.textContent = 'Apply Now';
                    applyButton.onclick = showApplicationForm;
                }
                
                showSection('job-details-view');
            }
        }
        
        function showApplicationForm() {
            showSection('application-form-view');
        }
        
        function showApplicationDetails(jobId) {
            const job = Object.values(jobData).flat().find(j => j.id === jobId);
            if (job) {
                let application;
                if (currentUser && currentUser.email) {
                    application = Object.values(submittedApplications).find(app => 
                        app.position === job.title && app.company === job.company && app.email === currentUser.email
                    );
                }
                
                if (!application) {
                    application = {
                        name: currentUser ? currentUser.name : 'User',
                        email: currentUser ? currentUser.email : 'user@example.com',
                        phone: currentUser ? (currentUser.phone || '+63 912 345 6789') : '+63 912 345 6789',
                        address: currentUser ? (currentUser.address || '123 Main Street, San Fernando, Pampanga') : '123 Main Street, San Fernando, Pampanga',
                        coverLetter: "Dear Hiring Manager,\n\nI am excited to apply for the " + job.title + " position at " + job.company + ". With 5 years of experience in customer service, I am confident in my ability to provide exceptional support to your customers.\n\nThank you for considering my application.\n\nSincerely,\n" + (currentUser ? currentUser.name : 'User'),
                        resume: "Resume.pdf",
                        position: job.title,
                        company: job.company,
                        date: jobId === 'customer-service' ? 'March 15, 2023' : 
                              jobId === 'marketing-specialist' ? 'March 10, 2023' : 'March 5, 2023',
                        status: jobId === 'customer-service' ? 'pending' : 
                               jobId === 'marketing-specialist' ? 'approved' : 'rejected'
                    };
                }
                
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
            
            const skillsContainer = document.getElementById('edit-skills');
            skillsContainer.innerHTML = '';
            if (currentUser.skills && currentUser.skills.length > 0) {
                currentUser.skills.forEach(skill => {
                    addSkillInput(skill);
                });
            } else {
                addSkillInput();
            }
            
            const educationContainer = document.getElementById('edit-education');
            educationContainer.innerHTML = '';
            if (currentUser.education && currentUser.education.length > 0) {
                currentUser.education.forEach(edu => {
                    addEducationInput(edu);
                });
            } else {
                addEducationInput();
            }
            
            const experienceContainer = document.getElementById('edit-experience');
            experienceContainer.innerHTML = '';
            if (currentUser.experience && currentUser.experience.length > 0) {
                currentUser.experience.forEach(exp => {
                    addExperienceInput(exp);
                });
            } else {
                addExperienceInput();
            }
            
            const editProfileAvatar = document.getElementById('edit-profile-avatar');
            if (currentUser.profilePicture) {
                editProfileAvatar.innerHTML = `<img src="${currentUser.profilePicture}" class="profile-picture">`;
            } else {
                editProfileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
            }
            
            showSection('edit-profile-view');
        }
        
        function saveProfile() {
            if (!currentUser) {
                alert('Please log in to save your profile');
                showSection('auth-section');
                return;
            }
            
            currentUser.name = document.getElementById('edit-name').value;
            currentUser.phone = document.getElementById('edit-phone').value;
            currentUser.address = document.getElementById('edit-address').value;
            currentUser.location = document.getElementById('edit-location').value;
            currentUser.about = document.getElementById('edit-about').value;
            
            currentUser.skills = [];
            const skillInputs = document.querySelectorAll('.skill-input');
            if (skillInputs.length > 0) {
                skillInputs.forEach(input => {
                    if (input && input.value && input.value.trim() !== '') {
                        currentUser.skills.push(input.value.trim());
                    }
                });
            }
            
            currentUser.education = [];
            const educationItems = document.querySelectorAll('.education-item');
            if (educationItems.length > 0) {
                educationItems.forEach(item => {
                    const degreeInput = item.querySelector('.education-degree');
                    const schoolInput = item.querySelector('.education-school');
                    const yearInput = item.querySelector('.education-year');
                    
                    if (degreeInput && schoolInput && 
                        degreeInput.value.trim() !== '' && schoolInput.value.trim() !== '') {
                        currentUser.education.push({
                            degree: degreeInput.value,
                            school: schoolInput.value,
                            year: yearInput ? yearInput.value : ''
                        });
                    }
                });
            }
            
            currentUser.experience = [];
            const experienceItems = document.querySelectorAll('.experience-item');
            if (experienceItems.length > 0) {
                experienceItems.forEach(item => {
                    const positionInput = item.querySelector('.experience-position');
                    const companyInput = item.querySelector('.experience-company');
                    const durationInput = item.querySelector('.experience-duration');
                    const descriptionInput = item.querySelector('.experience-description');
                    
                    if (positionInput && companyInput && 
                        positionInput.value.trim() !== '' && companyInput.value.trim() !== '') {
                        currentUser.experience.push({
                            position: positionInput.value,
                            company: companyInput.value,
                            duration: durationInput ? durationInput.value : '',
                            description: descriptionInput ? descriptionInput.value : ''
                        });
                    }
                });
            }
            
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
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const jobType = jobTypeFilter.value;
            const location = locationFilter.value;
            
            if (!searchTerm && !jobType && !location) {
                searchResults.innerHTML = '';
                searchResultsCount.textContent = '';
                return;
            }
            
            const allJobs = Object.values(jobData).flat();
            const filteredJobs = allJobs.filter(job => {
                const matchesQuery = !searchTerm || 
                    job.title.toLowerCase().includes(searchTerm) || 
                    job.company.toLowerCase().includes(searchTerm) ||
                    job.description.toLowerCase().includes(searchTerm) ||
                    job.requirements.toLowerCase().includes(searchTerm);
                
                const matchesJobType = !jobType || job.type === jobType;
                const matchesLocation = !location || job.location === location;
                
                return matchesQuery && matchesJobType && matchesLocation;
            });
            
            displaySearchResults(filteredJobs);
        }
        
        function displaySearchResults(jobs) {
            searchResults.innerHTML = '';
            searchResultsCount.textContent = `${jobs.length} jobs found`;
            
            if (jobs.length === 0) {
                searchResults.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <p>No jobs found matching your criteria</p>
                    </div>
                `;
                return;
            }
            
            jobs.forEach(job => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                let hasApplied = false;
                if (currentUser && currentUser.email) {
                    hasApplied = Object.values(submittedApplications).some(app => 
                        app.position === job.title && app.company === job.company && app.email === currentUser.email
                    );
                }
                
                let applicationStatus = '';
                if (hasApplied) {
                    applicationStatus = `
                        <div class="application-status-badge status-applied">
                            <i class="fas fa-check-circle"></i> Applied
                        </div>
                    `;
                }
                
                resultItem.innerHTML = `
                    <div class="job-title">${job.title}</div>
                    <div class="company">${job.company} • ${job.location}</div>
                    ${applicationStatus}
                    <div class="job-details">
                        <span>${job.type} • ${job.salary}</span>
                    </div>
                    <button class="view-btn" data-job-id="${job.id}">View Details</button>
                `;
                
                searchResults.appendChild(resultItem);
            });
            
            searchResults.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const jobId = this.getAttribute('data-job-id');
                    showJobDetails(jobId);
                    searchPanel.style.display = 'none';
                });
            });
        }
        
        
        function handleResumeUpload(input) {
            if (input.files && input.files[0]) {
                currentResumeFile = input.files[0];
                
                const resumePreviewContainer = document.getElementById('profile-resume-preview');
                resumePreviewContainer.innerHTML = `
                    <div class="resume-preview-file">
                        <div>
                            <i class="fas fa-file-pdf"></i>
                            <span>${currentResumeFile.name}</span>
                        </div>
                        <div class="resume-actions">
                            <button class="resume-action-btn view-resume-btn" onclick="viewResumePreview()">View</button>
                            <button class="resume-action-btn remove-resume-btn" onclick="removeResumePreview()">Remove</button>
                        </div>
                    </div>
                `;
                
                alert('Resume uploaded successfully! You can view it before saving.');
            }
        }
        
        function handleEditResumeUpload(input) {
            if (input.files && input.files[0]) {
                currentResumeFile = input.files[0];
                
                const resumePreviewContainer = document.getElementById('edit-resume-preview');
                resumePreviewContainer.innerHTML = `
                    <div class="resume-preview-file">
                        <div>
                            <i class="fas fa-file-pdf"></i>
                            <span>${currentResumeFile.name}</span>
                        </div>
                        <div class="resume-actions">
                            <button class="resume-action-btn view-resume-btn" onclick="viewResumePreview()">View</button>
                            <button class="resume-action-btn remove-resume-btn" onclick="removeEditResumePreview()">Remove</button>
                        </div>
                    </div>
                `;
                
                alert('Resume uploaded successfully! You can view it before saving.');
            }
        }
        
        function handleApplicationResumeUpload(input) {
            if (input.files && input.files[0]) {
                currentApplicationResumeFile = input.files[0];
                
                const resumePreviewContainer = document.getElementById('application-resume-preview');
                resumePreviewContainer.innerHTML = `
                    <div class="resume-preview-file">
                        <div>
                            <i class="fas fa-file-pdf"></i>
                            <span>${currentApplicationResumeFile.name}</span>
                        </div>
                        <div class="resume-actions">
                            <button class="resume-action-btn view-resume-btn" onclick="viewApplicationResumePreview()">View</button>
                            <button class="resume-action-btn remove-resume-btn" onclick="removeApplicationResumePreview()">Remove</button>
                        </div>
                    </div>
                `;
                
                alert('Resume updated successfully!');
            }
        }
        
        function viewResumePreview() {
            if (currentResumeFile) {
                alert(`Opening resume: ${currentResumeFile.name}`);
                
            }
        }
        
        function viewApplicationResumePreview() {
            if (currentApplicationResumeFile) {
                alert(`Opening resume: ${currentApplicationResumeFile.name}`);
            }
        }
        
        function removeResumePreview() {
            if (confirm('Are you sure you want to remove the resume?')) {
                currentResumeFile = null;
                document.getElementById('profile-resume-preview').innerHTML = `
                    <div class="file-upload" onclick="document.getElementById('resume-upload').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload your resume</p>
                    </div>
                `;
            }
        }
        
        function removeEditResumePreview() {
            if (confirm('Are you sure you want to remove the resume?')) {
                currentResumeFile = null;
                document.getElementById('edit-resume-preview').innerHTML = `
                    <div class="file-upload" onclick="document.getElementById('edit-resume-upload').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload your resume</p>
                    </div>
                `;
            }
        }
        
        function removeApplicationResumePreview() {
            if (confirm('Are you sure you want to remove the resume?')) {
                currentApplicationResumeFile = null;
                document.getElementById('application-resume-preview').innerHTML = `
                    <div class="file-upload" onclick="document.getElementById('application-resume-upload').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload your resume</p>
                    </div>
                `;
            }
        }
        
        function openCamera() {
            cameraModal.style.display = 'flex';
            
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    cameraStream = stream;
                    cameraPreview.srcObject = stream;
                })
                .catch(error => {
                    console.error('Error accessing camera:', error);
                    alert('Unable to access camera. Please check permissions.');
                });
        }
        
        function closeCamera() {
            cameraModal.style.display = 'none';
            
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null;
            }
        }
        
        function capturePhoto() {
            const canvas = document.createElement('canvas');
            canvas.width = cameraPreview.videoWidth;
            canvas.height = cameraPreview.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
            
            const dataURL = canvas.toDataURL('image/png');
            
            currentUser.profilePicture = dataURL;
            updateProfilePicture();
            
            closeCamera();
        }
        
        function handleProfilePictureUpload(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentUser.profilePicture = e.target.result;
                    updateProfilePicture();
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        function updateProfilePicture() {
            const profileAvatar = document.getElementById('profile-avatar');
            const editProfileAvatar = document.getElementById('edit-profile-avatar');
            
            if (currentUser.profilePicture) {
                profileAvatar.innerHTML = `<img src="${currentUser.profilePicture}" class="profile-picture">`;
                if (editProfileAvatar) {
                    editProfileAvatar.innerHTML = `<img src="${currentUser.profilePicture}" class="profile-picture">`;
                }
            } else {
                profileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
                if (editProfileAvatar) {
                    editProfileAvatar.innerHTML = `<i class="fas fa-user"></i>`;
                }
            }
        }
        
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
        
        function saveApplicant(button, applicantName) {
            const applicant = applicantData.all.find(a => a.name === applicantName);
            if (applicant) {
                if (!savedApplicants.some(a => a.name === applicantName)) {
                    savedApplicants.push(applicant);
                    localStorage.setItem('savedApplicants', JSON.stringify(savedApplicants));
                    
                    createNotification(
                        applicant.email,
                        'Your application has been saved for interview',
                        `Your application for ${applicant.position} has been saved for interview consideration.`
                    );
                    
                    alert(`Applicant ${applicantName} saved for interviews!`);
                } else {
                    alert(`Applicant ${applicantName} is already saved.`);
                }
            }
        }
        
        function saveApplicantForInterview() {
            const applicantName = document.getElementById('applicant-detail-name').textContent;
            saveApplicant(null, applicantName);
            showSection('saved-jobs-view');
        }
        
        function approveApplicant() {
            const applicantName = document.getElementById('applicant-detail-name').textContent;
            const applicant = applicantData.all.find(a => a.name === applicantName);
            if (applicant) {
                applicant.status = 'approved';
                
                createNotification(
                    applicant.email,
                    'Application Approved',
                    `Your application for ${applicant.position} has been approved! We will contact you soon for the next steps.`
                );
                
                alert(`Application for ${applicantName} approved!`);
                showSection('employee-view');
            }
        }
        
        function rejectApplicant() {
            const applicantName = document.getElementById('applicant-detail-name').textContent;
            const applicant = applicantData.all.find(a => a.name === applicantName);
            if (applicant) {
                applicant.status = 'rejected';
                
                createNotification(
                    applicant.email,
                    'Application Status Update',
                    `Thank you for your application for ${applicant.position}. Unfortunately, we have decided to move forward with other candidates at this time.`
                );
                
                alert(`Application for ${applicantName} rejected!`);
                showSection('employee-view');
            }
        }
        
        function removeSavedJob(button) {
            if (confirm('Are you sure you want to remove this saved job?')) {
                button.closest('.job-card').remove();
            }
        }
        
        function removeSavedApplicant(button) {
            if (confirm('Are you sure you want to remove this saved applicant?')) {
                const applicantName = button.closest('.applicant-info').querySelector('.applicant-name').textContent;
                savedApplicants = savedApplicants.filter(a => a.name !== applicantName);
                localStorage.setItem('savedApplicants', JSON.stringify(savedApplicants));
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
        
        function createNotification(userEmail, title, message) {
            const notification = {
                id: Date.now(),
                userEmail: userEmail,
                title: title,
                message: message,
                timestamp: new Date(),
                read: false
            };
            
            notifications.push(notification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
            
        }
        
        function loadNotifications() {
            if (!currentUser) return;
            
            const userNotifications = notifications.filter(n => n.userEmail === currentUser.email);
            const notificationList = document.getElementById('notification-list');
            notificationList.innerHTML = '';
            
            if (userNotifications.length > 0) {
                userNotifications.forEach(notification => {
                    const notificationItem = document.createElement('div');
                    notificationItem.className = 'notification-item';
                    if (!notification.read) {
                        notificationItem.classList.add('unread');
                    }
                    notificationItem.innerHTML = `
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${formatTime(notification.timestamp)}</div>
                    `;
                    notificationList.appendChild(notificationItem);
                });
            } else {
                notificationList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-bell-slash"></i>
                        <p>No notifications yet</p>
                    </div>
                `;
            }
        }
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const jobType = jobTypeFilter.value;
            const location = locationFilter.value;
            
            if (!searchTerm && !jobType && !location) {
                searchResults.innerHTML = '';
                searchResultsCount.textContent = '';
                return;
            }
            
            const allJobs = Object.values(jobData).flat();
            const filteredJobs = allJobs.filter(job => {
                const matchesQuery = !searchTerm || 
                    job.title.toLowerCase().includes(searchTerm) || 
                    job.company.toLowerCase().includes(searchTerm) ||
                    job.description.toLowerCase().includes(searchTerm) ||
                    job.requirements.toLowerCase().includes(searchTerm);
                
                const matchesJobType = !jobType || job.type === jobType;
                const matchesLocation = !location || job.location === location;
                
                return matchesQuery && matchesJobType && matchesLocation;
            });
            
            displaySearchResults(filteredJobs);
        }
        
        function displaySearchResults(jobs) {
            searchResults.innerHTML = '';
            searchResultsCount.textContent = `${jobs.length} jobs found`;
            
            if (jobs.length === 0) {
                searchResults.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <p>No jobs found matching your criteria</p>
                    </div>
                `;
                return;
            }
            
            jobs.forEach(job => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                let hasApplied = false;
                if (currentUser && currentUser.email) {
                    hasApplied = Object.values(submittedApplications).some(app => 
                        app.position === job.title && app.company === job.company && app.email === currentUser.email
                    );
                }
                
                let applicationStatus = '';
                if (hasApplied) {
                    applicationStatus = `
                        <div class="application-status-badge status-applied">
                            <i class="fas fa-check-circle"></i> Applied
                        </div>
                    `;
                }
                
                resultItem.innerHTML = `
                    <div class="job-title">${job.title}</div>
                    <div class="company">${job.company} • ${job.location}</div>
                    ${applicationStatus}
                    <div class="job-details">
                        <span>${job.type} • ${job.salary}</span>
                    </div>
                    <button class="view-btn" data-job-id="${job.id}">View Details</button>
                `;
                
                searchResults.appendChild(resultItem);
            });
            
            searchResults.querySelectorAll('.view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const jobId = this.getAttribute('data-job-id');
                    showJobDetails(jobId);
                    searchPanel.style.display = 'none';
                });
            });
        }
        
        function startChatWithApplicant() {
            const applicantName = document.getElementById('applicant-detail-name').textContent;
            currentChatWith = applicantName;
            document.querySelector('.chat-title').textContent = `Chat with ${applicantName}`;
            toggleChat();
        }
        
        function viewResume() {
            alert('Opening resume...\n\nIn a real application, this would display the resume file.');
            
        }
        
        function formatTime(date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
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
                about: 'Experienced customer service professional with 5 years in the industry. Looking for new opportunities to grow and develop my skills.',
                skills: ['Customer Service', 'Communication', 'Problem Solving'],
                education: [
                    { degree: 'Bachelor of Science in Business Administration', school: 'University of the Philippines', year: '2015-2019' }
                ],
                experience: [
                    { position: 'Customer Service Representative', company: 'ABC Company', duration: '2019-2021', description: 'Handled customer inquiries and resolved issues' }
                ],
                profilePicture: null
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            currentUserType = 'applicant';
            updateProfileInfo();
            showHomeSection();
        }
        
        function signupWithGoogle() {
            showSection('user-type-section');
        }
        
        async function sendInterviewInvitation() {
            integrationStatus.innerHTML = `
                <div class="integration-status integration-loading">
                    Sending interview invitation...
                </div>
            `;

            const applicantName = document.getElementById('interview-applicant').value;
            const phone = document.getElementById('interview-phone').value;
            const email = document.getElementById('interview-email').value;
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

            const interviewData = {
                applicant_name: applicantName,
                phone: phone,
                email: email,
                interview_date: formattedDate,
                interview_time: time,
                interview_location: location,
                interview_type: interviewType,
                additional_details: details,
                company_name: "EMPLOYMENT CORNER",
                sender_name: currentUser ? currentUser.name : "Hiring Manager"
            };

            try {
                await simulateEmailSending(interviewData);
                
                integrationStatus.innerHTML = `
                    <div class="integration-status integration-success">
                        <i class="fas fa-check-circle"></i>
                        Interview invitation sent successfully!
                    </div>
                `;

                scheduledInterviews.push({
                    ...interviewData,
                    id: 'int-' + Date.now(),
                    timestamp: new Date(),
                    email_sent: true
                });
                localStorage.setItem('scheduledInterviews', JSON.stringify(scheduledInterviews));

                createNotification(
                    email,
                    'Interview Scheduled',
                    `You have been scheduled for a ${interviewType} interview on ${formattedDate} at ${time}.`
                );

                alert(`Interview invitation sent to ${applicantName}!\n\nAn email has been sent to ${email}.`);

                setTimeout(() => {
                    showSection('employee-view');
                }, 2000);

            } catch (error) {
                console.error('Error sending email:', error);
                
                integrationStatus.innerHTML = `
                    <div class="integration-status integration-error">
                        <i class="fas fa-exclamation-circle"></i>
                        Email sending failed, but interview has been saved locally.
                    </div>
                `;

                scheduledInterviews.push({
                    ...interviewData,
                    id: 'int-' + Date.now(),
                    timestamp: new Date(),
                    email_sent: false
                });
                localStorage.setItem('scheduledInterviews', JSON.stringify(scheduledInterviews));

                alert(`Interview details saved, but there was an issue sending the email. You may need to contact ${applicantName} directly at ${phone}.`);

                setTimeout(() => {
                    showSection('employee-view');
                }, 3000);
            }
        }

        async function simulateEmailSending(interviewData) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Simulating email to:', interviewData.email);
                    resolve({
                        id: 'simulated_email_' + Date.now(),
                        status: 'sent'
                    });
                }, 1500);
            });
        }

        async function submitApplication() {
            const name = document.getElementById('application-name').value;
            const email = document.getElementById('application-email').value;
            const phone = document.getElementById('application-phone').value;
            const address = document.getElementById('application-address').value;
            const coverLetter = document.getElementById('application-cover-letter').value;

            if (!name || !email || !phone) {
                alert('Please fill in all required fields');
                return;
            }

            const applicationId = 'app-' + Date.now();
            submittedApplications[applicationId] = {
                id: applicationId,
                name: name,
                email: email,
                phone: phone,
                address: address,
                coverLetter: coverLetter,
                resume: currentApplicationResumeFile ? currentApplicationResumeFile.name : 'No resume uploaded',
                position: "CUSTOMER SERVICE REPRESENTATIVE",
                company: "ALORICA",
                date: new Date().toLocaleDateString(),
                status: 'pending'
            };

            localStorage.setItem('submittedApplications', JSON.stringify(submittedApplications));

            createNotification(
                'employer@alorica.com',
                'New Application Received',
                `${name} has applied for the Customer Service Representative position.`
            );

            alert('Application submitted successfully!');
            showHomeSection();
            populateJobCards(currentCategory);
        }
        
        init();