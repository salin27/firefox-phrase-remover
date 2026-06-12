# Phrase Remover - Firefox Extension

A Firefox extension that removes specific phrases from websites with a simple toggle on/off functionality.

## Features

✨ **Easy Toggle** - Turn the extension on/off with a single click
✨ **Phrase Management** - Add and remove phrases you want to hide
✨ **Instant Updates** - Changes apply across all open tabs immediately
✨ **Case Insensitive** - Phrases are matched regardless of capitalization
✨ **Dynamic Content** - Works with dynamically loaded content on websites

## Installation

### Manual Installation (Development)

1. **Clone or download this repository**
2. **Open Firefox** and navigate to `about:debugging`
3. **Click "This Firefox"** in the left sidebar
4. **Click "Load Temporary Add-on"**
5. **Select the `manifest.json` file** from this extension folder
6. **The extension will load** and appear in your browser toolbar

### For Distribution

To package this for distribution:
```bash
zip -r phrase-remover.xpi * -x "*.git*" "*.md"
```

## Usage

1. **Click the extension icon** in your Firefox toolbar to open the popup
2. **Toggle the extension ON** by clicking the toggle switch
3. **Add phrases** you want to remove by:
   - Typing the phrase in the input field
   - Clicking "Add" or pressing Enter
4. **View all added phrases** in the list below
5. **Delete a phrase** by clicking the "Delete" button next to it
6. **Toggle OFF** to disable the extension temporarily

## How It Works

- The extension intercepts all text on webpages
- When enabled, it searches for your phrases and removes them
- Matching is case-insensitive
- It works on dynamically loaded content
- All settings are saved in your browser's local storage

## Examples

- Remove ads by phrase: "Advertisement", "Sponsored"
- Hide notifications: "Breaking News", "Alert"
- Clean up UI elements: "Subscribe", "Sign up for alerts"

## Technical Details

- **Manifest Version**: 3 (Modern Firefox)
- **Permissions**: 
  - `storage` - To save your phrases
  - `activeTab` & `scripting` - To run on webpages
  - `<all_urls>` - To work on any website

## Files

- `manifest.json` - Extension configuration
- `popup.html` - UI for the extension popup
- `popup.js` - Popup functionality
- `content.js` - Content script that removes phrases
- `background.js` - Background service worker
- `styles.css` - Styling for the popup

## Troubleshooting

### Changes not applying?
- Make sure the extension is toggled **ON**
- Try refreshing the webpage (Ctrl+R or Cmd+R)
- Close and reopen the popup

### Phrases not being removed?
- Check the exact spelling and capitalization you need
- Some phrases might be split across multiple elements
- Try a shorter phrase

### Extension not loading?
- Check that all files are in the same folder
- Ensure `manifest.json` is valid JSON
- Check Firefox console for errors (right-click → Inspect)

## Privacy

✅ All data is stored locally on your computer
✅ No information is sent to external servers
✅ Your phrase list only exists in your browser

## License

MIT - Feel free to modify and distribute!
