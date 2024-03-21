import axios from 'axios';

export const fetchGetAllUsers = async () => {
  try {
    const response = await axios.get('api/users');
    return response.data;
  } catch (error) {
    console.error('Error while fetching users:', error);
    throw error;
  }
};
