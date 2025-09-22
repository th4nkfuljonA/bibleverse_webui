# 📖 Bible Verse Website - Perfected

A beautiful, accessible, and feature-rich Bible verse of the day website built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

### Core Functionality
- **Daily Verse Rotation**: Deterministic verse selection based on date
- **Multiple Translations**: KJV, ASV, and WEB (all public domain)
- **Automatic Midnight Refresh**: New verse appears without page reload
- **Tomorrow's Preview**: See what verse is coming next

### User Experience
- **Search Functionality**: Search through all verses by reference or text
- **Customizable Settings**: Theme, accent color, font size, and layout preferences
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Themes**: System preference detection with manual override
- **Smooth Animations**: Fade transitions and micro-interactions

### Accessibility
- **WCAG 2.1 Compliant**: Full keyboard navigation and screen reader support
- **ARIA Labels**: Comprehensive labeling for assistive technologies
- **Focus Management**: Proper focus trapping and management
- **High Contrast Support**: Enhanced visibility for users with visual impairments
- **Reduced Motion**: Respects user's motion preferences

### Technical Excellence
- **ES6 Modules**: Modern JavaScript with proper module structure
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Performance Optimized**: Debounced search, lazy loading, and efficient rendering
- **Input Validation**: Client-side validation with sanitization
- **Memory Management**: Proper cleanup and resource management

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6 module support
- No build tools or dependencies required

### Installation
1. Clone or download the repository
2. Open `index.html` in a web browser
3. That's it! No installation or build process needed

### File Structure
```
Bible_Verse_Website/
├── index.html          # Main page
├── settings.html       # Settings page
├── app.js             # Main application logic
├── settings.js        # Settings page logic
├── verses.js          # Bible verses database
├── utils.js           # Shared utilities
├── style.css          # Styles and themes
└── README.md          # This file
```

## 🎨 Customization

### Themes
- **System**: Follows device preference
- **Light**: Clean light theme
- **Dark**: Elegant dark theme

### Settings
- **Translation**: Choose between KJV, ASV, or WEB
- **Accent Color**: Customize the accent color
- **Font Size**: Adjust verse text size (12-32px)
- **Layout**: Choose reference placement (above/below verse)

### Adding New Verses
Edit `verses.js` to add new verses:
```javascript
{
  ref: "Your Reference",
  KJV: "King James Version text",
  ASV: "American Standard Version text", 
  WEB: "World English Bible text"
}
```

## 🔧 Technical Details

### Architecture
- **Modular Design**: Separated concerns with shared utilities
- **Event-Driven**: Clean event handling with proper cleanup
- **State Management**: localStorage for persistent settings
- **Error Boundaries**: Graceful error handling throughout

### Performance
- **Debounced Search**: 300ms delay for optimal performance
- **Lazy Loading**: Elements loaded as needed
- **Memory Efficient**: Proper cleanup and resource management
- **Optimized Rendering**: Minimal DOM manipulation

### Browser Support
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## 🎯 Usage

### Daily Verse
- Visit the homepage to see today's verse
- The verse changes automatically at midnight
- Use the shuffle button to see different verses

### Search
- Click the search button in the header
- Type to search by reference or verse text
- Select a translation to search in
- Click any result to display that verse

### Settings
- Click the settings button to customize your experience
- Changes are saved automatically
- Use the reset button to restore defaults

### Sharing
- Use the copy button to copy the verse to clipboard
- Use the share button for native sharing (mobile) or clipboard fallback
- Share includes reference, translation, and verse text

## 🛠️ Development

### Code Quality
- **JSDoc Comments**: Comprehensive documentation
- **ESLint Ready**: Clean, consistent code
- **Modular Structure**: Easy to maintain and extend
- **Type Safety**: Input validation and type checking

### Adding Features
1. Add new functions to `utils.js` for shared functionality
2. Update `app.js` for main page features
3. Update `settings.js` for settings page features
4. Add styles to `style.css`
5. Update HTML as needed

### Testing
- Test in multiple browsers
- Test with keyboard navigation
- Test with screen readers
- Test responsive design
- Test error scenarios

## 📱 Mobile Features

- **Touch Optimized**: Large touch targets and gestures
- **Native Sharing**: Uses Web Share API when available
- **Responsive Layout**: Adapts to all screen sizes
- **Performance**: Optimized for mobile devices

## 🔒 Security

- **Input Sanitization**: All user inputs are validated and sanitized
- **XSS Prevention**: No innerHTML with user content
- **CSP Ready**: Compatible with Content Security Policy
- **No External Dependencies**: All code is self-contained

## 🌟 Best Practices

### Accessibility
- Semantic HTML structure
- Proper ARIA labeling
- Keyboard navigation support
- Screen reader compatibility
- High contrast support

### Performance
- Minimal JavaScript bundle
- Efficient DOM manipulation
- Debounced user inputs
- Lazy loading where appropriate
- Optimized animations

### User Experience
- Intuitive interface design
- Clear visual feedback
- Smooth animations
- Error prevention and recovery
- Consistent behavior

## 📄 License

This project uses public domain Bible translations and is open source. Feel free to use, modify, and distribute.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify browser compatibility
3. Test with different settings
4. Check the README for solutions

---

**Made with ❤️ for believers to be encouraged daily.**
