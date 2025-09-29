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
    } else if (sectionId === ('profile-view')) {
        document.querySelector('.nav-btn:nth-child(4)').classList.add('active');
    }

    if (sectionId === 'my-application-view') {
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

function  goBack() {
    if (previousSection) {
        showSection(previousSection);
    } else {
        showSection('applicant-view')
    }
}

function login() {
    const email = document.getElementById('login-email').value;
    const  
}