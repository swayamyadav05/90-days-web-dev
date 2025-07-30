# 🔐 Advanced Password Generator

A modern, secure password generator built with React and Vite that helps you create strong passwords with enhanced security features including breach detection and strength analysis.

[Live Demo](https://90-days-web-dev-password-generator.vercel.app/)

## ✨ Features

### 🔒 **Security First**

- **Real-time password strength analysis** using the zxcvbn library
- **Breach detection** via HaveIBeenPwned API to check if passwords have been compromised
- **Secure password generation** with cryptographically random character selection

### 🎛️ **Customizable Options**

- **Adjustable length** (6-32 characters) with visual strength indicators
- **Include/exclude numbers** (0-9)
- **Include/exclude special characters** (!@#$%^&\* etc.)
- **Smart recommendations** based on password analysis

### 💫 **Modern User Experience**

- **Beautiful gradient UI** with dark theme
- **Responsive design** that works on all devices
- **One-click copying** with visual feedback
- **Real-time updates** as you adjust settings
- **Accessibility features** with proper ARIA labels

### 🛡️ **Privacy & Security**

- **No password storage** - everything runs locally in your browser
- **Secure API calls** using SHA-1 hashing for breach detection
- **No data tracking** or analytics

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 03passwordGenerator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🛠️ Built With

### Core Technologies

- **React 19** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### Security Libraries

- **zxcvbn** - Password strength estimation
- **crypto-js** - Cryptographic utilities for SHA-1 hashing
- **HaveIBeenPwned API** - Breach detection service

### Development Tools

- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Usage

1. **Generate Password**: Click "Regenerate" to create a new random password
2. **Adjust Length**: Use the slider to set password length (6-32 characters)
3. **Toggle Options**: Enable/disable numbers and special characters
4. **Check Security**:
   - View real-time strength analysis
   - Click "Check Breach" to verify against known data breaches
5. **Copy Password**: Click the "Copy" button to copy to clipboard

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 UI Components

### Password Display

- Monospace font for better readability
- Copy button with success feedback
- Responsive input field

### Strength Meter

- 5-level color-coded strength indicator
- Real-time feedback and suggestions
- Visual progress bar

### Configuration Panel

- Interactive length slider with live preview
- Toggle switches for character types
- Contextual strength labels

### Breach Detection

- Color-coded status indicators
- Clear warning messages
- Error handling for API failures

## 🔒 Security Features

### Password Generation

- Uses `Math.random()` for character selection
- Combines uppercase, lowercase, numbers, and special characters
- No predictable patterns or sequences

### Breach Detection

- Implements k-anonymity model via HaveIBeenPwned
- Only sends first 5 characters of SHA-1 hash
- Protects full password from being transmitted

### Privacy Protection

- No password logging or storage
- All processing happens client-side
- No external tracking or analytics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **zxcvbn** by Dropbox for password strength analysis
- **HaveIBeenPwned** by Troy Hunt for breach detection API
- **Tailwind CSS** team for the amazing utility framework
- **React team** for the powerful UI library

---

**⚡ Built with ❤️ using React, Vite, and modern web technologies**
