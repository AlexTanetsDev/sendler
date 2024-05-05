import axios from 'axios';

export const ActiveAlfaName = async (id:number) => {
  try {
    const response = await axios.patch('api/alfa-name', { "alfa_name_id": id });
    return response.data;
  } catch (error) {
    console.error('Error while fetching users:', error);
    throw error;
  }
};

export const CombinedAlfaNamesAndUser = async () => {
  try {
    const response = await axios.put('api/alfa-name' );
    return response.data;
  } catch (error) {
    console.error('Error while fetching users:', error);
    throw error;
  }
}

export const DeleteAlfaName = async (id: number) => {
  try {
    const response = await axios.delete('api/alfa-name', { data: { alfa_name_id: id } });
    return response.data;
  } catch (error) {
    console.error('Error while fetching users:', error);
    throw error;
  }
};

