import type { OrderData } from "@/types/order";
import { defineStore } from "pinia";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartStoreType {
  items: CartItem[];
  orderDetails: OrderData;
}

export const useCartStore = defineStore("CartStore", {
  state: (): CartStoreType => {
    const savedCart = localStorage.getItem("cart");
    const savedOrder = localStorage.getItem("order");
    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      orderDetails: savedOrder ? JSON.parse(savedOrder) : {},
    };
  },
  getters: {
    cartItems(state): CartItem[] {
      return state.items;
    },

    itemCount(state): number {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    totalPrice(state): number {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    isInCart:
      (state) =>
      (itemId: string | number): boolean => {
        return state.items.some((item) => item.id === itemId);
      },

    getItemById:
      (state) =>
      (itemId: string | number): CartItem | undefined => {
        return state.items.find((item) => item.id === itemId);
      },

    getOrderDetails(state): OrderData {
      return state.orderDetails;
    },
  },
  actions: {
    saveOrderDetails(data: OrderData) {
      this.orderDetails = data;
      localStorage.setItem("order", JSON.stringify(this.orderDetails));
    },
    addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
      const existingItem = this.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        this.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      this.saveToLocalStorage();
    },

    removeItem(itemId: string | number) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index > -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    increaseQuantity(itemId: string | number) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity++;
        this.saveToLocalStorage();
      }
    },

    decreaseQuantity(itemId: string | number) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.removeItem(itemId);
        }
        this.saveToLocalStorage();
      }
    },

    updateQuantity(itemId: string | number, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(itemId);
        return;
      }

      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.items = JSON.parse(savedCart);
      }
    },
  },
});
