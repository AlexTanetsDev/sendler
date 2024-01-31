import axios from "axios";

type FetchUserIdResponse = {
    userId: string;
  };
  
  export const fetchUserId = async (login: string): Promise<string> => {
    try {
      const response = await axios.post("/api/users", { login }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data.userId;
    } catch (error) {
      throw new Error("Сталася помилка під час отримання User Id");
    }
  };