/**
 * Shared utilities for the Bible Verse Website
 * @fileoverview Common functions used across multiple files
 */

// --- Constants ---
export const SETTINGS_KEY = "votd.settings";
export const DEFAULTS = {
  translation: "KJV",
  theme: "system",
  accent: "#0ea5e9",
  fontSize: 18,
  showRefFirst: true
};

// --- DOM Utilities ---
export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);

// --- Settings Management ---
/**
 * Load settings from localStorage with fallback to defaults
 * @returns {Object} Settings object
 */
export function loadSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return { ...DEFAULTS };
    
    const parsed = JSON.parse(stored);
    return { ...DEFAULTS, ...parsed };
  } catch (error) {
    console.warn('Failed to load settings, using defaults:', error);
    return { ...DEFAULTS };
  }
}

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings object to save
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
    showToast('Failed to save settings', 'error');
  }
}

// --- Theme Management ---
/**
 * Apply theme to document root
 * @param {string} theme - Theme name ('light', 'dark', or 'system')
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  
  // Remove existing theme attributes
  root.removeAttribute('data-theme');
  
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  }
  // 'system' theme uses CSS media queries, no attribute needed
}

/**
 * Apply accent color to CSS custom property
 * @param {string} color - Hex color value
 */
export function applyAccent(color) {
  if (!isValidColor(color)) {
    console.warn('Invalid color provided:', color);
    return;
  }
  
  document.documentElement.style.setProperty('--accent', color);
}

/**
 * Validate hex color format
 * @param {string} color - Color string to validate
 * @returns {boolean} True if valid hex color
 */
function isValidColor(color) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

// --- Date Utilities ---
/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatToday(date = new Date()) {
  return date.toLocaleDateString(undefined, { 
    weekday: "long", 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });
}

/**
 * Get deterministic day index for verse selection
 * @param {Date} date - Date to get index for
 * @returns {number} Day index
 */
export function dayIndex(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return Math.floor(d.getTime() / 86400000);
}

/**
 * Get array index for a given date
 * @param {Date} date - Date to get index for
 * @param {number} length - Array length
 * @returns {number} Array index
 */
export function idxForDate(date, length) {
  const base = dayIndex(date);
  return ((base % length) + length) % length;
}

// --- UI Utilities ---
/**
 * Show toast notification
 * @param {string} text - Message to display
 * @param {string} type - Toast type ('success', 'error', 'info')
 * @param {number} duration - Display duration in ms
 */
export function showToast(text, type = 'success', duration = 1400) {
  // Remove existing toasts
  $$('.toast').forEach(toast => toast.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = text;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// --- Validation Utilities ---
/**
 * Validate translation value
 * @param {string} translation - Translation to validate
 * @returns {boolean} True if valid
 */
export function isValidTranslation(translation) {
  return ['KJV', 'ASV', 'WEB'].includes(translation);
}

/**
 * Validate theme value
 * @param {string} theme - Theme to validate
 * @returns {boolean} True if valid
 */
export function isValidTheme(theme) {
  return ['light', 'dark', 'system'].includes(theme);
}

/**
 * Validate font size
 * @param {number} fontSize - Font size to validate
 * @returns {boolean} True if valid
 */
export function isValidFontSize(fontSize) {
  return Number.isInteger(fontSize) && fontSize >= 12 && fontSize <= 32;
}

// --- Accessibility Utilities ---
/**
 * Set focus to element with proper handling
 * @param {Element} element - Element to focus
 */
export function setFocus(element) {
  if (element && typeof element.focus === 'function') {
    element.focus();
  }
}

/**
 * Trap focus within a container
 * @param {Element} container - Container to trap focus in
 */
export function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// --- Performance Utilities ---
/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy load images or elements
 * @param {Element} element - Element to lazy load
 * @param {Function} callback - Callback when element comes into view
 */
export function lazyLoad(element, callback) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(element);
}
