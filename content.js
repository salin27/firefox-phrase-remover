// Content script that runs on every webpage

let extensionEnabled = false;
let phrases = [];

// Load settings on page load
loadSettings();

// Listen for messages from popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'update') {
        loadSettings();
        removePhrases();
    }
});

// Listen for storage changes
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
        loadSettings();
        removePhrases();
    }
});

// Load settings from storage
function loadSettings() {
    browser.storage.local.get(['extensionEnabled', 'phrases'], (result) => {
        extensionEnabled = result.extensionEnabled || false;
        phrases = result.phrases || [];
    });
}

// Remove phrases from DOM
function removePhrases() {
    if (!extensionEnabled || phrases.length === 0) {
        return;
    }
    
    // Walk through all text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToProcess = [];
    let node;
    
    while (node = walker.nextNode()) {
        nodesToProcess.push(node);
    }
    
    nodesToProcess.forEach(textNode => {
        let content = textNode.nodeValue;
        let modified = false;
        
        phrases.forEach(phrase => {
            // Create regex with case-insensitive flag for all occurrences
            const regex = new RegExp(escapeRegExp(phrase), 'gi');
            if (regex.test(content)) {
                content = content.replace(regex, '');
                modified = true;
            }
        });
        
        if (modified) {
            textNode.nodeValue = content;
        }
    });
}

// Escape special regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run on page load
removePhrases();

// Also run when page content changes (for dynamic content)
const observer = new MutationObserver(() => {
    removePhrases();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});
