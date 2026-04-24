// HealthWise Healthcare Web Application - JavaScript

// Disease Database with symptoms, descriptions, and recommendations
const diseaseDatabase = {
    'Common Cold': {
        symptoms: ['cough', 'sore_throat', 'congestion', 'fever', 'fatigue'],
        description: 'A viral infection of the upper respiratory tract that causes inflammation of the nasal passages and throat.',
        recommendation: 'Rest, stay hydrated, and use over-the-counter cold medications. Consult a doctor if symptoms persist beyond 10 days.',
        severity: 'low'
    },
    'Flu (Influenza)': {
        symptoms: ['fever', 'fatigue', 'body_ache', 'headache', 'cough'],
        description: 'A contagious respiratory illness caused by influenza viruses that can cause mild to severe illness.',
        recommendation: 'Rest, fluids, and antiviral medications within 48 hours. Seek medical attention if symptoms worsen.',
        severity: 'medium'
    },
    'Pneumonia': {
        symptoms: ['fever', 'cough', 'shortness_breath', 'chest_pain', 'fatigue'],
        description: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.',
        recommendation: 'Seek medical attention immediately. May require antibiotics and rest. Severe cases need hospitalization.',
        severity: 'high'
    },
    'Bronchitis': {
        symptoms: ['cough', 'shortness_breath', 'fatigue', 'fever', 'chills'],
        description: 'Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs.',
        recommendation: 'Rest, fluids, and possibly bronchodilators. See a doctor if cough persists more than 3 weeks.',
        severity: 'medium'
    },
    'Migraine': {
        symptoms: ['headache', 'nausea', 'vision_changes', 'dizziness'],
        description: 'A neurological condition causing intense headaches, often accompanied by nausea and sensitivity to light.',
        recommendation: 'Rest in a quiet, dark room. Over-the-counter pain relievers may help. Consult a neurologist for chronic cases.',
        severity: 'medium'
    },
    'Tension Headache': {
        symptoms: ['headache', 'fatigue', 'dizziness'],
        description: 'The most common type of headache, often associated with stress and muscle tension.',
        recommendation: 'Over-the-counter pain relievers, stress management, and regular exercise. Consult a doctor if frequent.',
        severity: 'low'
    },
    'Gastroenteritis': {
        symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
        description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infections.',
        recommendation: 'Stay hydrated with electrolyte solutions, rest, and bland diet. Seek medical care for severe dehydration.',
        severity: 'medium'
    },
    'Food Poisoning': {
        symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
        description: 'Illness caused by consuming contaminated food or beverages.',
        recommendation: 'Rest, hydrate, and avoid solid food until vomiting stops. Seek medical attention if symptoms are severe.',
        severity: 'medium'
    },
    'Appendicitis': {
        symptoms: ['abdominal_pain', 'nausea', 'vomiting', 'fever', 'loss_of_appetite'],
        description: 'Inflammation of the appendix that typically requires surgical removal.',
        recommendation: 'Seek immediate medical attention. Do not eat or drink anything before seeing a doctor.',
        severity: 'critical'
    },
    'Heart Disease': {
        symptoms: ['chest_pain', 'shortness_breath', 'palpitations', 'dizziness', 'fatigue'],
        description: 'Various conditions affecting the heart, including coronary artery disease and heart rhythm problems.',
        recommendation: 'Seek immediate medical attention. This is a serious condition that requires professional diagnosis.',
        severity: 'critical'
    },
    'Asthma': {
        symptoms: ['shortness_breath', 'wheezing', 'cough', 'chest_pain'],
        description: 'A chronic condition where the airways narrow and produce extra mucus, making breathing difficult.',
        recommendation: 'Use prescribed inhalers. Avoid triggers and see a pulmonologist for proper management.',
        severity: 'medium'
    },
    'Allergic Rhinitis': {
        symptoms: ['congestion', 'sore_throat', 'headache', 'itching'],
        description: 'An allergic reaction causing inflammation of the nasal passages.',
        recommendation: 'Avoid allergens, use antihistamines, and consult an allergist for long-term management.',
        severity: 'low'
    },
    'Skin Infection': {
        symptoms: ['rash', 'itching', 'skin_discoloration', 'fever'],
        description: 'Bacterial or fungal infection of the skin that causes redness, swelling, and discomfort.',
        recommendation: 'Keep the area clean and dry. Topical antibiotics may be needed. See a dermatologist.',
        severity: 'medium'
    },
    'Anxiety Disorder': {
        symptoms: ['fatigue', 'headache', 'dizziness', 'confusion'],
        description: 'A mental health condition characterized by excessive worry and fear.',
        recommendation: 'Consult a mental health professional. Therapy and medication can help manage symptoms.',
        severity: 'medium'
    },
    'Dehydration': {
        symptoms: ['fatigue', 'dizziness', 'headache', 'dryness'],
        description: 'Condition resulting from not having enough water in the body.',
        recommendation: 'Drink plenty of fluids. Seek medical attention if symptoms are severe or persistent.',
        severity: 'medium'
    }
};

// Doctor suggestions database (simulated)
const doctorSuggestions = [
    {
        doctorName: 'Dr. Sarah Johnson',
        date: '2026-04-23',
        condition: 'Common Cold',
        treatment: 'Rest, warm fluids, and OTC cold medication. Take vitamin C supplements.',
        notes: 'Monitor temperature. If fever exceeds 101°F for more than 3 days, please return for follow-up.',
        severity: 'low'
    },
    {
        doctorName: 'Dr. Michael Chen',
        date: '2026-04-22',
        condition: 'Seasonal Allergies',
        treatment: 'Cetirizine 10mg once daily. Avoid known allergens. Use saline nasal spray for congestion.',
        notes: 'Consider allergy testing for long-term management. Keep windows closed during high pollen counts.',
        severity: 'low'
    },
    {
        doctorName: 'Dr. Emily Williams',
        date: '2026-04-21',
        condition: 'Gastroenteritis',
        treatment: 'Bland diet (BRAT), plenty of fluids, ORS solution. Rest for 24-48 hours.',
        notes: 'Gradually reintroduce solid foods. Seek immediate care if you notice blood in stool or severe dehydration.',
        severity: 'medium'
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Analyze symptoms button
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeSymptoms);
    }

    // Doctor login form
    const doctorLoginForm = document.getElementById('doctorLoginForm');
    if (doctorLoginForm) {
        doctorLoginForm.addEventListener('submit', handleDoctorLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Dashboard tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Diagnosis form submission
    const diagnosisForm = document.getElementById('diagnosisForm');
    if (diagnosisForm) {
        diagnosisForm.addEventListener('submit', handleDiagnosisSubmit);
    }

    // Load initial doctor suggestions
    loadDoctorSuggestions();
}

// Analyze Symptoms Function
function analyzeSymptoms() {
    const selectedSymptoms = [];
    document.querySelectorAll('input[name="symptom"]:checked').forEach(checkbox => {
        selectedSymptoms.push(checkbox.value);
    });

    if (selectedSymptoms.length === 0) {
        showToast('Please select at least one symptom', 'warning');
        return;
    }

    // Show loading state
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;

    // Simulate analysis delay
    setTimeout(() => {
        const possibleConditions = findPossibleConditions(selectedSymptoms);
        displayResults(possibleConditions);
        loadDoctorSuggestions();
    }, 1000);
}

// Find possible conditions based on symptoms
function findPossibleConditions(selectedSymptoms) {
    const results = [];

    for (const [disease, data] of Object.entries(diseaseDatabase)) {
        const matchingSymptoms = data.symptoms.filter(s => selectedSymptoms.includes(s));
        const matchPercentage = (matchingSymptoms.length / data.symptoms.length) * 100;
        
        if (matchingSymptoms.length > 0) {
            results.push({
                name: disease,
                matchPercentage: Math.min(matchPercentage * 3, 95), // Boost percentage
                matchingSymptoms: matchingSymptoms,
                ...data
            });
        }
    }

    // Sort by match percentage
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // Return top 5 results
    return results.slice(0, 5);
}

// Display results
function displayResults(conditions) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (conditions.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <span class="icon-search"></span>
                <p>No matching conditions found. Please consult a healthcare professional.</p>
            </div>
        `;
        return;
    }

    let html = '';
    conditions.forEach(condition => {
        const severityClass = condition.severity === 'critical' ? 'high-severity' : 
                             condition.severity === 'high' ? 'high-severity' : 
                             condition.severity === 'medium' ? 'medium-severity' : 'low-severity';
        
        html += `
            <div class="condition-card ${severityClass}">
                <div class="condition-header">
                    <span class="condition-name">${condition.name}</span>
                    <span class="condition-confidence">${Math.round(condition.matchPercentage)}% match</span>
                </div>
                <p class="condition-description">${condition.description}</p>
                <p class="condition-symptoms"><strong>Matching Symptoms:</strong> ${condition.matchingSymptoms.join(', ').replace(/_/g, ' ')}</p>
                <div class="condition-recommendation">
                    <span class="icon-info-circle"></span> ${condition.recommendation}
                </div>
            </div>
        `;
    });

    resultsContainer.innerHTML = html;
}

// Load Doctor Suggestions
function loadDoctorSuggestions() {
    const suggestionsContainer = document.getElementById('doctorSuggestions');
    
    if (doctorSuggestions.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="no-suggestions">
                <span class="icon-stethoscope"></span>
                <p>Doctor recommendations will appear here after analysis</p>
            </div>
        `;
        return;
    }

    let html = '';
    doctorSuggestions.forEach(suggestion => {
        html += `
            <div class="suggestion-card">
                <div class="suggestion-header">
                    <div class="suggestion-doctor">
                        <span class="icon-user-md"></span>
                        <span class="suggestion-doctor-name">${suggestion.doctorName}</span>
                    </div>
                    <span class="suggestion-date">${suggestion.date}</span>
                </div>
                <h4 class="suggestion-condition">${suggestion.condition}</h4>
                <p class="suggestion-treatment"><strong>Treatment:</strong> ${suggestion.treatment}</p>
                    <div class="suggestion-notes">
                        <span class="icon-quote-left"></span> ${suggestion.notes}
                    </div>
                <span class="suggestion-severity ${suggestion.severity}">${suggestion.severity.toUpperCase()} - ${getSeverityText(suggestion.severity)}</span>
            </div>
        `;
    });

    suggestionsContainer.innerHTML = html;
}

function getSeverityText(severity) {
    switch(severity) {
        case 'critical': return 'Emergency Care Required';
        case 'high': return 'Seek Immediate Care';
        case 'medium': return 'Requires Consultation';
        case 'low': return 'Manageable at Home';
        default: return 'Unknown';
    }
}

// Doctor Login Handler
function handleDoctorLogin(e) {
    e.preventDefault();
    
    const doctorId = document.getElementById('doctorId').value;
    const doctorPassword = document.getElementById('doctorPassword').value;

    // Demo credentials
    if (doctorId === 'DOC001' && doctorPassword === 'doctor123') {
        document.querySelector('.doctor-login').classList.add('hidden');
        document.getElementById('doctorDashboard').classList.remove('hidden');
        showToast('Welcome, Dr. Smith!', 'success');
    } else {
        showToast('Invalid credentials. Use DOC001 / doctor123', 'error');
    }
}

// Logout Handler
function handleLogout() {
    document.querySelector('.doctor-login').classList.remove('hidden');
    document.getElementById('doctorDashboard').classList.add('hidden');
    document.getElementById('doctorId').value = '';
    document.getElementById('doctorPassword').value = '';
    showToast('Logged out successfully', 'success');
}

// Tab Switcher
function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId + 'Cases' || tabId).classList.add('active');
}

// Open Diagnosis Form
function openDiagnosisForm(caseId) {
    switchTab('addDiagnosis');
    document.getElementById('caseIdInput').value = caseId;
}

// Handle Diagnosis Submit
function handleDiagnosisSubmit(e) {
    e.preventDefault();

    const caseId = document.getElementById('caseIdInput').value;
    const condition = document.getElementById('diagnosisCondition').value;
    const treatment = document.getElementById('diagnosisTreatment').value;
    const notes = document.getElementById('diagnosisNotes').value;
    const severity = document.getElementById('severityLevel').value;

    // Add to doctor suggestions
    doctorSuggestions.unshift({
        doctorName: 'Dr. Smith',
        date: new Date().toISOString().split('T')[0],
        condition: condition,
        treatment: treatment,
        notes: notes,
        severity: severity
    });

    // Clear form
    e.target.reset();

    // Show success message
    showToast('Diagnosis submitted successfully!', 'success');

    // Refresh suggestions
    loadDoctorSuggestions();

    // Switch to pending cases
    switchTab('pending');
}

// Toast Notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                  type === 'error' ? 'exclamation-circle' : 
                  type === 'warning' ? 'exclamation-triangle' : 'info-circle';
    
            toast.innerHTML = `<span class="icon-${icon}"></span> ${message}`;
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add click handler for toast removal
document.addEventListener('click', function(e) {
    if (e.target.closest('.toast')) {
        e.target.closest('.toast').remove();
    }
});

// Message Tab Switching
const msgTabBtns = document.querySelectorAll('.msg-tab-btn');
msgTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-msgtab');
        
        // Update buttons
        msgTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content
        document.querySelectorAll('.msg-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId + 'Msgs').classList.add('active');
    });
});

// Conversation Selection
const conversationItems = document.querySelectorAll('.conversation-item');
conversationItems.forEach(item => {
    item.addEventListener('click', () => {
        conversationItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const convId = item.getAttribute('data-conversation');
        loadConversation(convId);
    });
});

function loadConversation(convId) {
    const chatMessages = document.getElementById('patientChatMessages');
    const conversations = {
        patient1: [
            { type: 'received', text: 'Good morning, Doctor. I wanted to follow up on my diagnosis from last week.', time: '10:15 AM' },
            { type: 'sent', text: 'Good morning, John. How are you feeling today? Have you noticed any improvement with the medication?', time: '10:20 AM' },
            { type: 'received', text: 'Yes, the fever has gone down but I still have a mild cough. Should I continue the same dosage?', time: '10:25 AM' },
            { type: 'sent', text: 'Yes, continue the current dosage for another 5 days. If symptoms persist, please schedule a follow-up appointment.', time: '10:30 AM' }
        ],
        patient2: [
            { type: 'received', text: 'Doctor, when should I take the antibiotic? Before or after meals?', time: 'Yesterday 2:30 PM' },
            { type: 'sent', text: 'Take it with food to minimize stomach upset. Try to take it at the same time each day.', time: 'Yesterday 3:15 PM' },
            { type: 'received', text: 'Thank you. One more question - can I drink alcohol while on this medication?', time: 'Yesterday 3:45 PM' }
        ],
        patient3: [
            { type: 'received', text: 'Lab results received. All values are within normal range.', time: 'Apr 22 9:00 AM' },
            { type: 'sent', text: 'Excellent news! Your cholesterol levels have improved significantly. Keep up the good work with diet and exercise.', time: 'Apr 22 10:30 AM' }
        ]
    };
    
    const messages = conversations[convId] || [];
    let html = '';
    messages.forEach(msg => {
        html += `
            <div class="message ${msg.type}">
                <div class="message-content">
                    <p>${msg.text}</p>
                </div>
                <span class="message-time">${msg.time}</span>
            </div>
        `;
    });
    chatMessages.innerHTML = html;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Patient Message
function sendPatientMessage() {
    const input = document.getElementById('patientMessageInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('patientChatMessages');
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        const newMessage = `
            <div class="message sent">
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = '';
        
        showToast('Message sent successfully', 'success');
    }
}

// Enter key to send
document.getElementById('patientMessageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendPatientMessage();
    }
});

// Forum Functions
function openForumThread(postId) {
    showToast('Opening discussion thread...', 'info');
    // In a full implementation, this would open the full thread view
}

function openNewPostForm() {
    const title = prompt('Enter discussion title:');
    if (title) {
        const content = prompt('Enter your message:');
        if (content) {
            showToast('Post created successfully!', 'success');
            // In a full implementation, this would add to the forum
        }
    }
}