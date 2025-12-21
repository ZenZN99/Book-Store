export const getAllBooks = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/book/books");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (bookId: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/book/${bookId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createBook = async (
  title: string,
  description: string,
  price: string,
  stock: string,
  category: string,
  image: File,
  token: string
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("category", category);
  formData.append("image", image);
  try {
    const res = await fetch("http://localhost:5000/api/book", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (
  title: string,
  description: string,
  price: string,
  stock: string,
  category: string,
  bookId: string,
  token: string
) => {
  try {
    const res = await fetch(`http://localhost:5000/api/book/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, price, stock, category }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (bookId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/book/${bookId}`, {
      method: "DELETE",
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

export const getBookUser = async (token: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/book/user/books", {
      method: "GET",
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
