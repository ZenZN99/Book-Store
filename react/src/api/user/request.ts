export const register = async (
  fullname: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password, confirmPassword }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const me = async (token: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const profile = async (token: string, avatar: File, cover: File) => {
  const formData = new FormData();
  if (avatar) formData.append("avatar", avatar);
  if (cover) formData.append("cover", cover);
  try {
    const res = await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
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


export const getAllUsers = async (token:string) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/users", {
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
}

export const getUserById = async (token:string , id:string ) => {
  try {
    const res = await fetch(`http://localhost:5000/api/auth/${id}`, {
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
}

export const deleteUserById = async (token:string , id:string ) => {
  try {
     const res = await fetch(`http://localhost:5000/api/auth/${id}`, {
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
}