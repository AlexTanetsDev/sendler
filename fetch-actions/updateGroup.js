// 'use server';

import axios from 'axios';
import toast from 'react-hot-toast';

export default async function updateGroup(clients, groupId) {
  try {
    const res = await axios.put(`api/sending-groups/${groupId}`, {
      clients: clients,
      cache: 'no-store',
    });
    toast.success(res.data.message, {
      duration: 3000,
      position: 'bottom-center',
      className: 'toast_success',
      style: {
        backgroundColor: '#0F3952',
        color: 'lightgreen',
        fontSize: '24px',
        borderColor: 'green',
        marginBottom: '20%',
      },
    });
  } catch (error) {
    toast.error(error.message + ' | ' + error.response.data.error, {
      position: 'bottom-center',
      className: 'toast_error',
      style: {
        backgroundColor: '#0F3952',
        color: '#fa9c9c',
        fontSize: '24px',
        marginBottom: '20%',
      },
    });
  }
}
