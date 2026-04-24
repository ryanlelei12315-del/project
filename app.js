/* ====== MultiverseCare — Main Application Script ====== */
document.addEventListener('DOMContentLoaded', () => {

  // ====== NAVBAR SCROLL EFFECT ======
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ====== MOBILE NAV TOGGLE ======
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
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
                <i class="fas fa-search"></i>
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
                    <i class="fas fa-info-circle"></i> ${condition.recommendation}
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
                <i class="fas fa-stethoscope"></i>
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
                        <i class="fas fa-user-md"></i>
                        <span class="suggestion-doctor-name">${suggestion.doctorName}</span>
                    </div>
                    <span class="suggestion-date">${suggestion.date}</span>
                </div>
                <h4 class="suggestion-condition">${suggestion.condition}</h4>
                <p class="suggestion-treatment"><strong>Treatment:</strong> ${suggestion.treatment}</p>
                <div class="suggestion-notes">
                    <i class="fas fa-quote-left"></i> ${suggestion.notes}
                </div>
                <span class="suggestion-severity ${suggestion.severity}">${suggestion.severity.toUpperCase()} - ${getSeverityText(suggestion.severity)}</span>
            </div>
        `;
    });

    suggestionsContainer.innerHTML = html;
  }

function getSeverityText(severity) {
    switch (severity) {
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

    const icon = type === 'success' ? 'fa-check-circle' :
      type === 'error' ? 'fa-exclamation-circle' :
        type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

// Add click handler for toast removal
document.addEventListener('click', function (e) {
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

});