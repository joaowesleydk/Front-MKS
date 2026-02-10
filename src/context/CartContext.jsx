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
    try {
      return localStorage.getItem('token') && localStorage.getItem('user');
    } catch (error) {
      console.error('Erro ao verificar login:', error);
      return false;
    }
  };

  // Carregar sacola do localStorage
  useEffect(() => {
    try {
      if (isLoggedIn()) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setItems(Array.isArray(parsedCart) ? parsedCart : []);
        }
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      setItems([]);
    }
  }, []);

  // Salvar sacola no localStorage
  useEffect(() => {
    try {
      if (isLoggedIn() && Array.isArray(items)) {
        localStorage.setItem('cart', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
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
    try {
      return items.reduce((total, item) => {
        const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
        return total + (preco * item.quantidade);
      }, 0);
    } catch (error) {
      console.error('Erro ao calcular total:', error);
      return 0;
    }
  };

  const getItemCount = () => {
    try {
      if (!isLoggedIn()) {
        return 0;
      }
      return Array.isArray(items) ? items.reduce((count, item) => count + item.quantidade, 0) : 0;
    } catch (error) {
      console.error('Erro ao contar itens:', error);
      return 0;
    }
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