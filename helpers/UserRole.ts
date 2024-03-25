import axios from 'axios';

export const fetchUserRole = async (login: string): Promise<string> => {
  try {
    const response = await axios.post(
      '/api/users',
      { login },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.userIdAndRole.user_role;
  } catch (error) {
    throw new Error('Сталася помилка під час отримання User Id');
  }
};
