import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  
  const isLoggedIn = () => {
    return localStorage.getItem('token') && localStorage.getItem('user');
  };

  // Carregar sacola do localStorage
  useEffect(() => {
    if (isLoggedIn()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } else {
      setItems([]);
    }
  }, []);

  // Salvar sacola no localStorage
  useEffect(() => {
    if (isLoggedIn()) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (produto) => {
    if (!isLoggedIn()) {
      return false;
    }
    setItems(prev => {
      const existingItem = prev.find(item => item.id === produto.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
    return true;
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantidade) => {
    if (quantidade <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
      return total + (preco * item.quantidade);
    }, 0);
  };

  const getItemCount = () => {
    if (!isLoggedIn()) {
      return 0;
    }
    return items.reduce((count, item) => count + item.quantidade, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};