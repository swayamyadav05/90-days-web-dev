# Todo Manager 📝

A modern, feature-rich todo application built with React, Context API, and local storage persistence. Organize your tasks with style and never lose your progress!

![Todo Manager](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### Core Functionality

- ✅ **Add Todos** - Create new tasks with a clean, intuitive interface
- ✅ **Edit Todos** - Edit tasks in-place with keyboard shortcuts (Enter to save, Escape to cancel)
- ✅ **Delete Todos** - Remove tasks with confirmation dialog
- ✅ **Toggle Completion** - Mark tasks as complete/incomplete with checkboxes
- ✅ **Local Storage** - Your todos persist between browser sessions

### Advanced Features

- 📊 **Progress Statistics** - Real-time stats showing total, completed, pending tasks and completion percentage
- 🌓 **Dark/Light Theme** - Toggle between themes with system preference detection
- 🎯 **Smart UX** - Disabled editing for completed tasks, empty state messaging
- ⌨️ **Keyboard Shortcuts** - Enter to save, Escape to cancel editing
- 📱 **Responsive Design** - Works beautifully on desktop and mobile

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Add new todos
│   ├── TodoItem.jsx      # Individual todo item with edit/delete
│   ├── TodoStats.jsx     # Progress statistics display
│   └── index.js          # Component exports
├── contexts/
│   └── TodoContext.js    # React Context for state management
├── utils/
│   └── theme.js          # Theme switching utilities
├── App.jsx               # Main application component
├── App.css               # Application styles
└── main.jsx              # Application entry point
```

## 🛠️ Built With

- **React 19.1.0** - Modern React with hooks
- **Vite 7.0.4** - Fast build tool and dev server
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **Context API** - For state management
- **Local Storage API** - For data persistence

## 💡 Key Implementation Details

### State Management

- Uses React Context API for centralized todo state management
- Custom `useTodo` hook for easy context consumption
- Functional state updates for immutability

### Data Persistence

- Automatic saving to localStorage on every todo change
- Initial state restoration from localStorage on app load
- Graceful fallback to empty array if no saved data

### Theme System

- Detects system color scheme preference
- Saves user theme choice to localStorage
- CSS custom properties for consistent theming

## 🎯 Usage Examples

### Adding a Todo

1. Type your task in the input field
2. Click "Add Todo" or press Enter
3. Your todo appears in the list instantly

### Editing a Todo

1. Click the "Edit" button on any incomplete todo
2. Modify the text in-place
3. Press Enter to save or Escape to cancel

### Tracking Progress

- View real-time statistics at the top
- See your completion percentage with a visual progress bar
- Monitor total, completed, and pending tasks

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of learning React Context API
- Inspired by modern todo app designs
- Thanks to the React and Vite communities

---

**Happy Task Managing! 🎉**
