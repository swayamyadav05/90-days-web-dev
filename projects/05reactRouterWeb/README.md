# React Router Web Application

A comprehensive React application demonstrating React Router DOM concepts and best practices.

[Live Demo](https://90-days-web-dev-router-dom.vercel.app/)

## 🚀 Features

- **React Router DOM** implementation with multiple routing patterns
- **Optimized data fetching** using React Router loaders
- **Dynamic routing** with URL parameters
- **NavLink** with active state styling
- **Error boundary** for graceful error handling
- **Responsive design** with Tailwind CSS

## 📁 Project Structure

```
src/
├── components/
│   ├── About/
│   ├── Contact/
│   ├── ErrorPage/
│   ├── Footer/
│   ├── Github/
│   ├── Header/
│   ├── Home/
│   └── User/
├── loaders/
│   └── githubLoader.js
├── Layout.jsx
└── main.jsx
```

## 🎯 Learning Concepts Implemented

### 1. React Router Setup

- RouterProvider configuration
- createBrowserRouter with createRoutesFromElements
- Layout component with Outlet

### 2. Navigation Components

- **Link**: Basic navigation without page refresh
- **NavLink**: Navigation with active state styling

### 3. Dynamic Routing

- URL parameters with `useParams`
- User profile pages with dynamic IDs

### 4. Data Loading Optimization

- **Loader functions**: Pre-fetch data before component renders
- **useLoaderData**: Access loaded data efficiently
- **Caching**: Automatic data caching by React Router

### 5. Error Handling

- Error boundaries with `errorElement`
- Graceful error pages with `useRouteError`

## 🛠️ Technologies Used

- React 19.1.0
- React Router DOM 6.x
- Tailwind CSS 4.x
- Vite (Build tool)
- ESLint (Code quality)

## 📖 Key Code Examples

### Router Configuration

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="user/:userId" element={<User />} />
      <Route loader={githubInfo} path="github" element={<Github />} />
    </Route>
  )
);
```

### Data Loader Function

```jsx
export const githubInfo = async () => {
  const response = await fetch(
    "https://api.github.com/users/swayamyadav05"
  );
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status}`);
  }
  return response.json();
};
```

### Using Loaded Data

```jsx
const Github = () => {
  const data = useLoaderData();
  return (
    <div>
      <p>Followers: {data.followers}</p>
      <p>Public Repos: {data.public_repos}</p>
    </div>
  );
};
```

## 🎨 Styling

The project uses Tailwind CSS for responsive design with:

- Dark theme (gray-900 background)
- Responsive text sizing
- Interactive hover states
- Active navigation indicators

## 📚 Learning Notes

### React Router Benefits

1. **SPA Navigation**: No page refreshes, faster user experience
2. **SEO Friendly**: Proper URL structure for better SEO
3. **Data Loading**: Optimized API calls with built-in caching
4. **Code Splitting**: Lazy loading capabilities for performance

### Best Practices Implemented

- Separation of concerns (loaders in separate files)
- Error boundaries for resilient UX
- Responsive design principles
- Clean component architecture
- Type-safe parameter handling

## 🔄 Router Patterns

Two ways to create routers:

### Object Pattern

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
```

### JSX Pattern (More Readable)

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home /> />
      <Route path="about" element={<About />} />
    </Route>
  )
);
```

## 🌟 Advanced Features

- **Loader Functions**: Pre-fetch data for optimal performance
- **Error Boundaries**: Graceful error handling
- **Dynamic Parameters**: URL-based data fetching
- **Active Navigation**: Visual feedback for current page

---

Built with ❤️ as part of learning React Router DOM fundamentals.
