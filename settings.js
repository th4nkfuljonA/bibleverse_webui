// --- Import Shared Utilities ---
import { 
  loadSettings, saveSettings, 
  applyTheme, applyAccent,
  showToast, debounce,
  isValidTranslation, isValidTheme, isValidFontSize,
  setFocus, trapFocus
} from './utils.js';

/**
 * Initialize settings page with enhanced validation and error handling
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("settingsForm");
  const resetBtn = document.getElementById("resetBtn");

  if (!form || !resetBtn) {
    console.error('Required form elements not found');
    showToast('Settings page failed to load', 'error');
    return;
  }

  try {
    const settings = loadSettings();

    // Prefill form with validation
    form.translation.value = isValidTranslation(settings.translation) ? settings.translation : 'KJV';
    form.theme.value = isValidTheme(settings.theme) ? settings.theme : 'system';
    form.accent.value = settings.accent || '#0ea5e9';
    form.fontSize.value = isValidFontSize(settings.fontSize) ? settings.fontSize : 18;
    form.showRefFirst.checked = Boolean(settings.showRefFirst);

    // Live preview with debouncing
    const debouncedAccent = debounce((color) => {
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        applyAccent(color);
      }
    }, 100);

    const debouncedTheme = debounce((theme) => {
      if (isValidTheme(theme)) {
        applyTheme(theme);
      }
    }, 100);

    // Apply initial theme and accent
    applyTheme(settings.theme);
    applyAccent(settings.accent);

    // Live preview listeners
    form.accent.addEventListener("input", (e) => {
      const color = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        debouncedAccent(color);
      }
    });

    form.theme.addEventListener("change", (e) => {
      const theme = e.target.value;
      if (isValidTheme(theme)) {
        debouncedTheme(theme);
      }
    });

    // Font size live preview with value display
    const fontSizeValue = document.getElementById('fontSizeValue');
    form.fontSize.addEventListener("input", (e) => {
      const fontSize = Number(e.target.value);
      if (isValidFontSize(fontSize)) {
        // Update value display
        if (fontSizeValue) {
          fontSizeValue.textContent = fontSize;
        }
        
        // Update preview if we can find the verse text element
        const verseText = document.querySelector('#verseText');
        if (verseText) {
          verseText.style.fontSize = `${fontSize}px`;
        }
      }
    });

    // Form submission with validation
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      try {
        const formData = new FormData(form);
        const updated = {
          translation: formData.get('translation'),
          theme: formData.get('theme'),
          accent: formData.get('accent'),
          fontSize: Number(formData.get('fontSize')),
          showRefFirst: formData.has('showRefFirst')
        };

        // Validate all fields
        if (!isValidTranslation(updated.translation)) {
          showToast('Invalid translation selected', 'error');
          return;
        }

        if (!isValidTheme(updated.theme)) {
          showToast('Invalid theme selected', 'error');
          return;
        }

        if (!/^#[0-9A-F]{6}$/i.test(updated.accent)) {
          showToast('Invalid accent color', 'error');
          return;
        }

        if (!isValidFontSize(updated.fontSize)) {
          showToast('Font size must be between 12 and 32', 'error');
          return;
        }

        // Save settings
        saveSettings(updated);
        showToast('Settings saved successfully!', 'success');
        
        // Apply settings immediately
        applyTheme(updated.theme);
        applyAccent(updated.accent);

      } catch (error) {
        console.error('Failed to save settings:', error);
        showToast('Failed to save settings', 'error');
      }
    });

    // Reset button with confirmation
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      if (confirm('Are you sure you want to reset all settings to defaults?')) {
        try {
          const defaults = {
            translation: "KJV",
            theme: "system",
            accent: "#0ea5e9",
            fontSize: 18,
            showRefFirst: true
          };
          
          saveSettings(defaults);
          
          // Update form
          form.translation.value = defaults.translation;
          form.theme.value = defaults.theme;
          form.accent.value = defaults.accent;
          form.fontSize.value = defaults.fontSize;
          form.showRefFirst.checked = defaults.showRefFirst;
          
          // Apply defaults
          applyTheme(defaults.theme);
          applyAccent(defaults.accent);
          
          showToast('Settings reset to defaults', 'success');
          
        } catch (error) {
          console.error('Failed to reset settings:', error);
          showToast('Failed to reset settings', 'error');
        }
      }
    });

    // Add keyboard navigation
    trapFocus(form);

  } catch (error) {
    console.error('Settings initialization failed:', error);
    showToast('Settings page failed to load', 'error');
  }
});
