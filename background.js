// Service worker for background tasks

// Initialize default settings
browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.get(['extensionEnabled', 'phrases'], (result) => {
        if (!result.extensionEnabled) {
            browser.storage.local.set({
                extensionEnabled: false,
                phrases: []
            });
        }
    });
});
