export const addedToCart = async (bookId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/cart/${bookId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getCartUser = async (token: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/cart/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log("Cart API error:", res.status, res.statusText);
      return { items: [] }; 
    }

    const text = await res.text();
    if (!text) return { items: [] }; // استجابة فارغة
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log(error);
    return { items: [] }; 
  }
};

export const deleteItemCart = async (bookId:string , token:string) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${bookId}`, {
            method: "DELETE",
            headers: {
               Authorization : `Bearer ${token}`   
            },
        });
         const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateQuantity = async (bookId:string , quantity:number , token:string) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${bookId}`, {
            method: "PUT",
            headers: {
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({quantity}),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAllCartItems = async (token:string) => {
  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "DELETE",
      headers: {
        Authorization : `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}