// --- Import Shared Utilities ---
import { 
  $, $$, 
  loadSettings, saveSettings, 
  applyTheme, applyAccent, 
  formatToday, dayIndex, idxForDate,
  showToast, debounce, throttle,
  isValidTranslation, isValidTheme, isValidFontSize,
  setFocus, trapFocus
} from './utils.js';

// --- Render ---
/**
 * Render the verse of the day with enhanced error handling and validation
 * @param {Date} today - Date to render verse for
 * @param {Object} opts - Rendering options
 */
function renderVerse(today = new Date(), opts = loadSettings()) {
  const verses = window.VERSES || [];
  if (!verses.length) {
    console.error('No verses available');
    showToast('No verses available', 'error');
    return;
  }

  // Validate options
  if (!isValidTranslation(opts.translation)) {
    console.warn('Invalid translation, falling back to KJV');
    opts.translation = 'KJV';
  }
  
  if (!isValidFontSize(opts.fontSize)) {
    console.warn('Invalid font size, using default');
    opts.fontSize = 18;
  }

  try {
    // Determine today's verse
    let i = idxForDate(today, verses.length);
    // Allow "Shuffle" for testing: offset index when needed
    const offset = Number(sessionStorage.getItem("votd.shuffleOffset") || 0);
    i = (i + offset + verses.length) % verses.length;

    const v = verses[i];
    if (!v || !v.ref) {
      throw new Error('Invalid verse data');
    }

    const text = v[opts.translation] || v.KJV || 'Verse not available';
    if (!text) {
      throw new Error('No text available for selected translation');
    }

    // Elements with null checks
    const refEl = $("#reference");
    const txtEl = $("#verseText");
    const todayEl = $("#todayStr");
    const versionPill = $("#versionPill");

    if (!refEl || !txtEl || !todayEl || !versionPill) {
      throw new Error('Required DOM elements not found');
    }

    // Update content with animation
    refEl.style.opacity = '0';
    txtEl.style.opacity = '0';
    
    setTimeout(() => {
      refEl.innerHTML = v.ref;
      txtEl.innerHTML = text;
      todayEl.textContent = formatToday(today);
      versionPill.textContent = opts.translation;

      // Reference placement
      if (opts.showRefFirst) {
        refEl.style.order = 0;
        txtEl.style.order = 1;
      } else {
        refEl.style.order = 1;
        txtEl.style.order = 0;
      }

      // Font size with validation
      const fontSize = Math.max(12, Math.min(32, opts.fontSize));
      txtEl.style.fontSize = `${fontSize}px`;

      // Fade in
      refEl.style.opacity = '1';
      txtEl.style.opacity = '1';
    }, 100);

    // Tomorrow preview with error handling
    try {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const j = idxForDate(tomorrow, verses.length);
      const v2 = verses[j];
      
      const tomorrowRef = $("#tomorrowRef");
      const tomorrowVersion = $("#tomorrowVersion");
      
      if (tomorrowRef && tomorrowVersion && v2) {
        tomorrowRef.textContent = v2.ref;
        tomorrowVersion.textContent = `(${opts.translation})`;
      }
    } catch (error) {
      console.warn('Failed to load tomorrow preview:', error);
    }

    // Theme & accent with validation
    if (isValidTheme(opts.theme)) {
      applyTheme(opts.theme);
    }
    
    if (opts.accent && /^#[0-9A-F]{6}$/i.test(opts.accent)) {
      applyAccent(opts.accent);
    }

  } catch (error) {
    console.error('Error rendering verse:', error);
    showToast('Failed to load verse', 'error');
    
    // Fallback to first verse
    if (verses.length > 0) {
      const fallbackVerse = verses[0];
      const refEl = $("#reference");
      const txtEl = $("#verseText");
      
      if (refEl && txtEl) {
        refEl.innerHTML = fallbackVerse.ref || 'Unknown';
        txtEl.innerHTML = fallbackVerse.KJV || 'Verse not available';
      }
    }
  }
}

/**
 * Bind event listeners with enhanced error handling and accessibility
 */
function bindActions() {
  // Copy button with improved error handling
  const copyBtn = $("#copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        const ref = $("#reference")?.textContent || '';
        const verse = $("#verseText")?.textContent || '';
        const version = $("#versionPill")?.textContent || '';
        
        if (!ref || !verse) {
          showToast('No verse to copy', 'error');
          return;
        }
        
        const payload = `${ref} (${version}) — ${verse}`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(payload);
          showToast('Copied to clipboard!', 'success');
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = payload;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showToast('Copied to clipboard!', 'success');
        }
      } catch (error) {
        console.error('Copy failed:', error);
        showToast('Copy failed. Please try again.', 'error');
      }
    });
    
    // Add keyboard support
    copyBtn.addEventListener("keydown", (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyBtn.click();
      }
    });
  }

  // Share button with enhanced functionality
  const shareBtn = $("#shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      try {
        const ref = $("#reference")?.textContent || '';
        const verse = $("#verseText")?.textContent || '';
        const version = $("#versionPill")?.textContent || '';
        
        if (!ref || !verse) {
          showToast('No verse to share', 'error');
          return;
        }
        
        const payload = `${ref} (${version}) — ${verse}`;
        const shareData = {
          title: 'Verse of the Day',
          text: payload,
          url: window.location.href
        };
        
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback to clipboard
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(payload);
            showToast('Verse copied to clipboard', 'success');
          } else {
            showToast('Sharing not supported on this device', 'error');
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError') { // User cancelled
          console.error('Share failed:', error);
          showToast('Share failed. Please try again.', 'error');
        }
      }
    });
    
    // Add keyboard support
    shareBtn.addEventListener("keydown", (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        shareBtn.click();
      }
    });
  }

  // Shuffle button with better feedback
  const shuffleBtn = $("#shuffleBtn");
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      try {
        const cur = Number(sessionStorage.getItem("votd.shuffleOffset") || 0);
        const newOffset = cur + 1;
        sessionStorage.setItem("votd.shuffleOffset", String(newOffset));
        
        // Add visual feedback
        shuffleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          shuffleBtn.style.transform = '';
        }, 150);
        
        renderVerse(new Date());
        showToast('Showing different verse', 'info', 1000);
      } catch (error) {
        console.error('Shuffle failed:', error);
        showToast('Shuffle failed', 'error');
      }
    });
    
    // Add keyboard support
    shuffleBtn.addEventListener("keydown", (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        shuffleBtn.click();
      }
    });
  }

  // Search functionality
  const searchBtn = $("#searchBtn");
  const searchModal = $("#searchModal");
  const closeSearch = $("#closeSearch");
  const searchInput = $("#searchInput");
  const searchTranslation = $("#searchTranslation");
  const searchResults = $("#searchResults");

  if (searchBtn && searchModal) {
    // Open search modal
    searchBtn.addEventListener("click", () => {
      searchModal.classList.add("show");
      searchModal.setAttribute("aria-hidden", "false");
      setFocus(searchInput);
      trapFocus(searchModal);
    });

    // Close search modal
    const closeModal = () => {
      searchModal.classList.remove("show");
      searchModal.setAttribute("aria-hidden", "true");
      searchInput.value = "";
      searchResults.innerHTML = "";
    };

    closeSearch?.addEventListener("click", closeModal);
    
    // Close on backdrop click
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains("show")) {
        closeModal();
      }
    });

    // Search functionality
    const performSearch = debounce(() => {
      const query = searchInput.value.trim();
      const translation = searchTranslation.value;
      
      if (!query) {
        searchResults.innerHTML = "";
        return;
      }

      try {
        const results = window.searchVerses(query, translation);
        
        if (results.length === 0) {
          searchResults.innerHTML = `
            <div class="no-results">
              <h3>No verses found</h3>
              <p>Try searching with different keywords or check your spelling.</p>
            </div>
          `;
          return;
        }

        searchResults.innerHTML = results.map(verse => `
          <div class="search-result" data-ref="${verse.ref}">
            <h3>${verse.ref}</h3>
            <p>${verse[translation] || verse.KJV}</p>
            <div class="translation">${translation}</div>
          </div>
        `).join('');

        // Add click handlers to results
        searchResults.querySelectorAll('.search-result').forEach(result => {
          result.addEventListener('click', () => {
            const ref = result.dataset.ref;
            // Find and display the selected verse
            const verseIndex = window.VERSES.findIndex(v => v.ref === ref);
            if (verseIndex !== -1) {
              // Set shuffle offset to show this verse
              sessionStorage.setItem("votd.shuffleOffset", String(verseIndex));
              renderVerse(new Date());
              closeModal();
              showToast(`Showing ${ref}`, 'success');
            }
          });
        });

      } catch (error) {
        console.error('Search failed:', error);
        showToast('Search failed', 'error');
      }
    }, 300);

    searchInput.addEventListener("input", performSearch);
    searchTranslation.addEventListener("change", performSearch);
  }
}

/**
 * Install midnight refresh to automatically show new verse at midnight
 */
function installMidnightRefresh() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 50); // tiny buffer after midnight
  const ms = next - now;
  
  if (ms > 0 && ms < 86400000) { // Only if within 24 hours
    setTimeout(() => {
      try {
        sessionStorage.removeItem("votd.shuffleOffset");
        renderVerse(new Date());
        installMidnightRefresh(); // schedule next
        showToast('New verse for today!', 'success', 2000);
      } catch (error) {
        console.error('Midnight refresh failed:', error);
        // Retry in 1 hour
        setTimeout(installMidnightRefresh, 3600000);
      }
    }, ms);
  }
}

// --- Initialization ---
/**
 * Initialize the application with error handling and performance monitoring
 */
function initializeApp() {
  try {
    // Show loading state
    const verseCard = $("#verseCard");
    if (verseCard) {
      verseCard.style.opacity = '0.5';
    }
    
    // Load and render verse
    const settings = loadSettings();
    renderVerse(new Date(), settings);
    
    // Bind event listeners
    bindActions();
    
    // Install midnight refresh
    installMidnightRefresh();
    
    // Remove loading state
    if (verseCard) {
      verseCard.style.opacity = '1';
    }
    
    // Add performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }
      });
    }
    
  } catch (error) {
    console.error('App initialization failed:', error);
    showToast('Failed to initialize app', 'error');
    
    // Fallback initialization
    try {
      renderVerse(new Date());
      bindActions();
    } catch (fallbackError) {
      console.error('Fallback initialization failed:', fallbackError);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    // Page became visible, refresh verse if needed
    const lastRefresh = sessionStorage.getItem("votd.lastRefresh");
    const now = new Date().toDateString();
    
    if (lastRefresh !== now) {
      sessionStorage.setItem("votd.lastRefresh", now);
      renderVerse(new Date());
    }
  }
});
