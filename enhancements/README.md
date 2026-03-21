Enhancements for ERP Guide
==========================

What this adds (non-invasive enhancements)
- A keyboard-accessible "Skip to content" link
- Responsive image handling (max-width: 100%)
- A floating "Back to top" button
- A Dark mode toggle (persisted in localStorage)
- Keyboard shortcuts: `d` toggles dark mode, `t` scrolls to top
- External links open in new tabs with `rel="noopener noreferrer"`
- Print-friendly behavior for injected UI

How to use
1. Install a userscript manager (Tampermonkey, Greasemonkey, or Violentmonkey).
2. In the extension, create a new script and paste the contents of `enhancements/enhancements.user.js`.
3. Allow the script to run on local files (Tampermonkey has a setting to allow `file://` access).
4. Open `index.html` from this workspace in your browser — the enhancements will run without changing the original file.

Fallback (bookmarklet)
If you prefer not to use a userscript manager, you can create a bookmarklet from the script contents. The userscript is self-contained and injects styles and UI at runtime.

Notes
- This intentionally does not modify any workspace files. It runs in the browser and enhances the page dynamically.
- If you want these features baked into `index.html`, I can update the file directly — tell me and I will modify it.
