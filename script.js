/**
 * Global Architecture Variables for Dating Services Routing
 */
let currentUserSex = "";
let targetOTP = "";
let vipTimerSeconds = 600; // 10-Minute Temporary VIP Free Trial Pass
let vipInterval;

/**
 * Screen Control Manager Switch
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0,0);
}

function handleLogin() {
    showScreen('screen-register');
}

/**
 * Step 1: Process Form Input with Natural Simulated Latency Sequences
 */
function processRegistrationData() {
    currentUserSex = document.getElementById('reg-sex').value;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;

    if(!currentUserSex || !name || !email) { 
        alert("Please accomplish all registration configuration metrics fields."); 
        return; 
    }
    
    // Natural Loading phase 1
    document.getElementById('loading-text').innerText = "Validating Client Structural Integrity...";
    showScreen('screen-loading');
    
    setTimeout(() => {
        // Natural Loading phase 2
        document.getElementById('loading-text').innerText = "Generating Randomized Session Loop Handshake Token...";
        
        setTimeout(() => {
            // Generate Randomized 4-Digit OTP Code
            targetOTP = Math.floor(1000 + Math.random() * 9000).toString();
            document.getElementById('generated-otp-display').innerText = targetOTP;
            showScreen('screen-otp');
        }, 1500);
    }, 1500);
}

/**
 * Step 2: Validate Generated 4-Digit OTP Machine Code
 */
function verifyOTPCode() {
    let userIn = document.getElementById('user-otp-input').value;
    if(userIn === targetOTP) {
        document.getElementById('upload-instruction').innerText = 
            `Warning: System biometric gender match rule enforced. Ang pinili mong kasarian ay [${currentUserSex}]. Dapat ay katugmang larawan ng [${currentUserSex}] ang i-upload para mag-success ang processing filter matrix.`;
        showScreen('screen-upload');
    } else {
        alert("Security handshake code token mismatch. Enter the exact data displayed.");
    }
}

/**
 * Step 3: Trigger 1-Minute Processing Hold for Encrypted Photo Upload
 */
function startPhotoUploadTimer() {
    let fileInput = document.getElementById('photo-file');
    if(fileInput.files.length === 0) { 
        alert("Please attach your verification image biometric proof asset."); 
        return; 
    }
    
    // Forced 1-Minute Server Verification delay execution
    document.getElementById('loading-text').innerText = "Analyzing Biometric Properties... (1-Minute Pipeline Security Hold Enforced)";
    showScreen('screen-loading');
    
    setTimeout(() => {
        startVIPTrialCountdown();
        showScreen('screen-lobby');
    }, 60000); // 60,000 milliseconds = Exact 1 Minute natural hold delay
}

/**
 * Step 4: Core 10-Minute Free VIP Countdown Frame Tracker
 */
function startVIPTrialCountdown() {
    document.getElementById('vip-timer-display').style.display = 'block';
    vipInterval = setInterval(() => {
        let mins = Math.floor(vipTimerSeconds / 60);
        let secs = vipTimerSeconds % 60;
        
        document.getElementById('vip-timer-display').innerText = 
            `FREE VIP: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            
        if(vipTimerSeconds <= 0) {
            clearInterval(vipInterval);
            document.getElementById('vip-timer-display').style.display = 'none';
            showScreen('screen-plans'); // Enforce paywall options once trial hits zero
        }
        vipTimerSeconds--;
    }, 1000);
}

function enterChannel(channelName) {
    alert(`Entering Core Network Pipeline: [${channelName} Channel]. Access approved via temporary 10-Minute Premium Token.`);
}

/**
 * Step 5: Gateway Route Redirect to Dating Services Escrow Node
 */
function connectToLiveAgent(planName) {
    document.getElementById('selected-plan-notice').innerText = `Selected Framework Area: ${planName}`;
    document.getElementById('agent-token').innerText = `REF-TOKEN: DS-${Math.floor(1000 + Math.random() * 9000)}X`;
    showScreen('screen-agent');
}
let currentUserSex = "";
let targetOTP = "";
let vipTimerSeconds = 600; // 10 Minutes Free Trial Pass
let vipInterval;
let isVIPActive = true;
let generatedPartners = [];

// Configuration Arrays para sa Pag-generate ng 500 Users
const channelsList = ["Africa", "North America", "South America", "Antarctica", "Australia / Oceania", "ASIAN", "EUROPE"];
const fNames = ["Sophia", "Emma", "Olivia", "Ava", "Mia", "Isabella", "Zoe", "Lily", "Chloe", "Elena", "Yuki", "Mei"];
const mNames = ["John", "Robert", "William", "David", "Richard", "Thomas", "Charles", "Michael", "Hans", "Klaus"];
const lNames = ["Smith", "Johnson", "Müller", "Tanaka", "Ivanov", "Garcia", "Kim", "Lin", "Dupont", "Davis"];

/**
 * 1. AUTOMATIC PROFILE MATRIX ENGINE (500 Accounts Creator)
 * Patatakbuhin kaagad ito pagka-load ng page
 */
function initProfilesDatabase() {
    const total = 500;
    const femaleCount = Math.floor(total * 0.80); // 400 Profiles
    const maleCount = total - femaleCount;        // 100 Profiles

    // Gumawa ng 400 na Babae (Edad: 21 - 30)
    for (let i = 0; i < femaleCount; i++) {
        let age = Math.floor(Math.random() * (30 - 21 + 1)) + 21;
        let randomPicId = Math.floor(Math.random() * 95) + 1;
        generatedPartners.push({
            name: fNames[Math.floor(Math.random() * fNames.length)] + " " + lNames[Math.floor(Math.random() * lNames.length)],
            gender: "Female",
            age: age,
            channel: channelsList[Math.floor(Math.random() * channelsList.length)],
            photo: `https://randomuser.me{randomPicId}.jpg`
        });
    }

    // Gumawa ng 100 na Lalaki (Edad: 45 - 60)
    for (let i = 0; i < maleCount; i++) {
        let age = Math.floor(Math.random() * (60 - 45 + 1)) + 45;
        let randomPicId = Math.floor(Math.random() * 95) + 1;
        generatedPartners.push({
            name: mNames[Math.floor(Math.random() * mNames.length)] + " " + lNames[Math.floor(Math.random() * lNames.length)],
            gender: "Male",
            age: age,
            channel: channelsList[Math.floor(Math.random() * channelsList.length)],
            photo: `https://randomuser.me{randomPicId}.jpg`
        });
    }

    // Balasahin (Shuffle) ang database array para random ang pagkakasunod-sunod
    generatedPartners.sort(() => Math.random() - 0.5);
}

// Patakbuhin ang generator sa pagsisimula
initProfilesDatabase();

/**
 * SCREEN ROUTING AND ANIMATIONS
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0,0);
}

function handleLogin() {
    showScreen('screen-register');
}

function processRegistrationData() {
    currentUserSex = document.getElementById('reg-sex').value;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;

    if(!currentUserSex || !name || !email) { 
        alert("Please accomplish all registration configuration metrics fields."); 
        return; 
    }
    
    document.getElementById('loading-text').innerText = "Validating Client Structural Integrity...";
    showScreen('screen-loading');
    
    setTimeout(() => {
        document.getElementById('loading-text').innerText = "Generating Randomized Session Loop Handshake Token...";
        setTimeout(() => {
            targetOTP = Math.floor(1000 + Math.random() * 9000).toString();
            document.getElementById('generated-otp-display').innerText = targetOTP;
            showScreen('screen-otp');
        }, 1500);
    }, 1500);
}

function verifyOTPCode() {
    let userIn = document.getElementById('user-otp-input').value;
    if(userIn === targetOTP) {
        document.getElementById('upload-instruction').innerText = 
            `Warning: System biometric gender match rule enforced. Ang pinili mong kasarian ay [${currentUserSex}]. Dapat ay katugmang larawan ng [${currentUserSex}] ang i-upload para mag-success ang processing filter matrix.`;
        showScreen('screen-upload');
    } else {
        alert("Security handshake code token mismatch. Enter the exact data displayed.");
    }
}

function startPhotoUploadTimer() {
    let fileInput = document.getElementById('photo-file');
    if(fileInput.files.length === 0) { 
        alert("Please attach your verification image biometric proof asset."); 
        return; 
    }
    
    document.getElementById('loading-text').innerText = "Analyzing Biometric Properties... (1-Minute Pipeline Security Hold Enforced)";
    showScreen('screen-loading');
    
    setTimeout(() => {
        startVIPTrialCountdown();
        showScreen('screen-lobby');
    }, 60000); // Exact 1 Minute Hold Latency
}

/**
 * COUNTDOWN TIME FRAME FOR FREE VIP PASS
 */
function startVIPTrialCountdown() {
    document.getElementById('vip-timer-display').style.display = 'block';
    vipInterval = setInterval(() => {
        let mins = Math.floor(vipTimerSeconds / 60);
        let secs = vipTimerSeconds % 60;
        
        document.getElementById('vip-timer-display').innerText = `FREE VIP: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            
        if(vipTimerSeconds <= 0) {
            clearInterval(vipInterval);
            isVIPActive = false; // Tapos na ang trial frame
            document.getElementById('vip-timer-display').style.display = 'none';
            showScreen('screen-plans');
        }
        vipTimerSeconds--;
    }, 1000);
}

/**
 * 2. ENTER CHANNEL AND RENDER ASSIGNED PARTNERS
 * Dito kinukuha ang mga profiles na tumutugma sa bansang pinili
 */
function enterChannel(channelName) {
    document.getElementById('current-channel-title').innerText = `${channelName} Regional Channel`;
    const container = document.getElementById('profiles-display-grid');
    container.innerHTML = ""; // Linisin ang lumang listahan

    // I-filter ang 500 partners na pasok sa piniling channel region
    const filtered = generatedPartners.filter(p => p.channel.toLowerCase() === channelName.toLowerCase() || (channelName === 'ASIAN' && p.channel === 'ASIAN') || (channelName === 'EUROPE' && p.channel === 'EUROPE'));

    if(filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#aaa;">No active connections routing through this channel currently.</p>`;
    } else {
        filtered.forEach(profile => {
            const card = document.createElement('div');
            // Kung expired na ang VIP at normal account nalang, malalabo (blurred) ang mga litrato
            card.className = `profile-card ${!isVIPActive ? 'blurred' : ''}`;
            
            card.innerHTML = `
                <img src="${profile.photo}" alt="Partner Photo">
                <h4>${profile.name}</h4>
                <p>Age: ${profile.age} | ${profile.gender}</p>
                <button onclick="interactWithPartner('${profile.name}')" style="margin:0; padding:8px; font-size:13px;">Select Partner</button>
            `;
            container.appendChild(card);
        });
    }
    showScreen('screen-channel-view');
}

function interactWithPartner(partnerName) {
    if(!isVIPActive) {
        showScreen('screen-plans');
    } else {
        alert(`Initializing match connection synchronization layer for ${partnerName}. Private room setup processed by Live Agent.`);
        connectToLiveAgent('Direct Partner Meetup Sync');
    }
}

function connectToLiveAgent(planName) {
    document.getElementById('selected-plan-notice').innerText = `Selected Framework Area: ${planName}`;
    document.getElementById('agent-token').innerText = `REF-TOKEN: DS-${Math.floor(1000 + Math.random() * 9000)}X`;
    showScreen('screen-agent');
}

