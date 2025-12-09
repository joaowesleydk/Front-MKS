import React from 'react';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';

function App() {
 
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppRoutes/>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
