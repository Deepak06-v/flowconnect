// import React, { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './styles/index.css'
// import App from './App'
// import ErrorBoundary from './components/common/ErrorBoundary'
// import { ThemeProvider } from './context/ThemeContext'
// import { AuthProvider } from './context/AuthContext'
// import CursorGlow from './components/common/CursorGlow'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <AuthProvider>
//         <ErrorBoundary>
//             <CursorGlow />
//           <App />
//         </ErrorBoundary>
//       </AuthProvider>
//     </ThemeProvider>
//   </StrictMode>,
// )
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

// Providers / Core wrappers
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

// Global error handling
import ErrorBoundary from './components/common/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)