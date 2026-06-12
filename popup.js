// Get DOM elements
const toggleCheckbox = document.getElementById('toggleExtension');
const toggleText = document.getElementById('toggleText');
const phraseInput = document.getElementById('phraseInput');
const addBtn = document.getElementById('addBtn');
const phraseList = document.getElementById('phraseList');

// Load saved state on popup open
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderPhrases();
});

// Toggle extension on/off
toggleCheckbox.addEventListener('change', () => {
    const isEnabled = toggleCheckbox.checked;
    toggleText.textContent = isEnabled ? 'Extension: ON' : 'Extension: OFF';
    browser.storage.local.set({ extensionEnabled: isEnabled });
    notifyContentScripts();
});

// Add phrase on button click
addBtn.addEventListener('click', addPhrase);

// Add phrase on Enter key
phraseInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPhrase();
    }
});

// Load saved state
function loadState() {
    browser.storage.local.get(['extensionEnabled', 'phrases'], (result) => {
        toggleCheckbox.checked = result.extensionEnabled || false;
        toggleText.textContent = toggleCheckbox.checked ? 'Extension: ON' : 'Extension: OFF';
    });
}

// Add new phrase
function addPhrase() {
    const phrase = phraseInput.value.trim();
    
    if (!phrase) {
        alert('Please enter a phrase');
        return;
    }
    
    browser.storage.local.get(['phrases'], (result) => {
        let phrases = result.phrases || [];
        
        if (phrases.includes(phrase)) {
            alert('This phrase is already in the list');
            return;
        }
        
        phrases.push(phrase);
        browser.storage.local.set({ phrases });
        phraseInput.value = '';
        renderPhrases();
        notifyContentScripts();
    });
}

// Delete phrase
function deletePhrase(phrase) {
    browser.storage.local.get(['phrases'], (result) => {
        let phrases = result.phrases || [];
        phrases = phrases.filter(p => p !== phrase);
        browser.storage.local.set({ phrases });
        renderPhrases();
        notifyContentScripts();
    });
}

// Render phrases list
function renderPhrases() {
    browser.storage.local.get(['phrases'], (result) => {
        const phrases = result.phrases || [];
        phraseList.innerHTML = '';
        
        if (phrases.length === 0) {
            phraseList.innerHTML = '<div class="empty-state">No phrases added yet</div>';
            return;
        }
        
        phrases.forEach(phrase => {
            const div = document.createElement('div');
            div.className = 'phrase-item';
            
            const textSpan = document.createElement('span');
            textSpan.className = 'phrase-text';
            textSpan.textContent = phrase;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'phrase-delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deletePhrase(phrase));
            
            div.appendChild(textSpan);
            div.appendChild(deleteBtn);
            phraseList.appendChild(div);
        });
    });
}

// Notify content scripts of changes
function notifyContentScripts() {
    browser.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            browser.tabs.sendMessage(tab.id, { action: 'update' }).catch(() => {
                // Tab might not have content script loaded, ignore error
            });
        });
    });
}
