import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
import OfflineBanner from './components/OfflineBanner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
 
  return (
    <ErrorBoundary>
      <OfflineBanner />
      <AuthProvider>
        <CartProvider>
          <AppRoutes/>
          <Toaster 
            position="top-right" 
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: 'red',
                  secondary: 'black',
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
