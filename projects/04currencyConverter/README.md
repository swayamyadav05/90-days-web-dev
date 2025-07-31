# 💱 Currency Converter React App

A modern, responsive currency converter built with React, featuring real-time exchange rates, bidirectional conversion, and an elegant user interface.

![Currency Converter Preview](https://img.shields.io/badge/React-18+-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-646CFF) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4)

## ✨ Features

- 🔄 **Bidirectional Conversion**: Convert amounts in both directions with smart state management
- 🌍 **Real-time Exchange Rates**: Fetches live currency data from reliable API
- 💫 **Currency Swap**: One-click currency swap with proper amount recalculation
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations
- 🔧 **Error Handling**: Graceful error handling with fallback to cached rates
- 🕒 **Rate Freshness Indicator**: Shows when rates were last updated
- 🎯 **Accessibility**: Proper labels and keyboard navigation

## 🚀 Demo

[Live Demo](#) <!-- Add your deployed link here -->

## 🛠️ Technologies Used

- **React 19.1.0** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **@uidotdev/usehooks** - Additional React hooks
- **Currency API** - Real-time exchange rate data

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputBox.jsx      # Reusable currency input component
│   └── index.js          # Component exports
├── hooks/
│   └── useCurrencyInfo.js # Custom hook for currency data
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## 💡 Key Learning Outcomes

### 1. Custom Hooks Development

- Created `useCurrencyInfo` hook for API data management
- Implemented loading states, error handling, and data freshness tracking
- Learned separation of concerns and reusable logic patterns

### 2. Advanced State Management

- Managed complex state interactions between multiple inputs
- Implemented bidirectional conversion logic
- Used `useEffect` for reactive state updates based on dependencies

### 3. Real-world API Integration

- Fetched data from external currency API
- Implemented proper error handling and fallback strategies
- Added rate freshness indicators for better UX

### 4. Component Architecture

- Built reusable `InputBox` component with multiple props
- Implemented proper component composition patterns
- Used React best practices for prop handling and event management

### 5. User Experience Design

- Created intuitive swap functionality with proper state transitions
- Implemented responsive design patterns
- Added loading states and error feedback

### 6. Modern Development Practices

- Used Vite for fast development and optimized builds
- Implemented ESLint for code quality
- Structured project for maintainability and scalability

## 🎯 Key Features Deep Dive

### Smart Conversion Logic

The app tracks which input was last edited and performs conversions accordingly:

- Edit "From" amount → Calculate "To" amount
- Edit "To" amount → Calculate "From" amount
- Swap currencies → Recalculate based on last edited field

### Custom Currency Hook

```javascript
const { data, loading, error, lastUpdated, isDataFresh } =
  useCurrencyInfo(currency);
```

Returns comprehensive currency data with loading states and error handling.

### Responsive Input Component

```javascript
<InputBox
  label="From"
  amount={amount}
  onAmountChange={handleFromAmountChange}
  currencyOptions={options}
  selectCurrency={from}
/>
```

## 🧪 Technical Challenges Solved

1. **Bidirectional State Sync**: Solved complex state synchronization between two inputs
2. **Rate Calculation**: Implemented proper mathematical conversion with rounding
3. **API Error Handling**: Added graceful degradation when API calls fail
4. **Performance Optimization**: Minimized unnecessary re-renders with proper dependency arrays

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Currency API by [fawazahmed0](https://github.com/fawazahmed0/currency-api)
- React and Vite teams for excellent developer experience
- TailwindCSS for beautiful utility classes

---

**Built with interest while learning React and modern web development**
