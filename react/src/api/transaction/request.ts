export const transferBalance = async (token: string, receiverId: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/transaction/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const rechargeBalance = async (token: string, amount: number) => {
  try {
    const res = await fetch("http://localhost:5000/api/transaction/recharge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
