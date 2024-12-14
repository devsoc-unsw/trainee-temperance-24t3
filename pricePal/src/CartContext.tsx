import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  itemName: string;
  itemImage: string;
  price: number;
  storeName: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Function to retrieve cart from local storage
const getCartFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    try {
      return JSON.parse(cart);
    } catch (error) {
      console.error('Error parsing cart from localStorage', error);
      return []; // Return an empty array if JSON parsing fails
    }
  }
  return []; // Return an empty array if no cart data exists
};

// Function to save cart to local storage
const saveCartToLocalStorage = (cart: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getCartFromLocalStorage);

  const addItemToCart = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.itemName === item.itemName && cartItem.storeName === item.storeName);
    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem.itemName === item.itemName
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      console.log(cartItems);
      console.log('add old');
    } else {
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
      console.log(cartItems);
      console.log('add new');
    }

    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeItemFromCart = (item: CartItem) => {
    const updatedCart = cartItems
      .map((cartItem) => {
        if (cartItem.itemName === item.itemName && cartItem.storeName === item.storeName) {
          if (cartItem.quantity > 1) {
            console.log(cartItems);
            console.log('remove old');
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            console.log(cartItems);
            console.log('remove new');
            return null; // Mark for removal
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem !== null); // Remove null values

    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
