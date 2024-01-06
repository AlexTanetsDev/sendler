
type FetchUserIdResponse = {
    userId: string;
  };
  
  export const fetchUserId = async (login: string): Promise<string> => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ login }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data: FetchUserIdResponse = await response.json();
  
      return data.userId;
    } catch (error) {
      throw new Error("Сталася помилка під час отримання User Id");
    }
  };