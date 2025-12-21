
export interface CartItems {
  bookId: string;
  quantity: number;
  totalPrice: number;
  _id: string
}

export interface CartStore {
  items: CartItems[];
  loading: boolean;

  fetchCart: (token: string) => Promise<void>;
  addToCart: (bookId: string, token: string) => Promise<void>;
  removeItem: (bookId: string, token: string) => Promise<void>;
  changeQuantity: (
    bookId: string,
    quantity: number,
    token: string
  ) => Promise<void>;
}


export interface ICart {
  userId: string;
  items: CartItems[];
}

