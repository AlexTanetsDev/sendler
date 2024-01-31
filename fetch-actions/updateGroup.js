import { axiosInstance } from '@/helpers/AxiosInstance';

const api = axiosInstance;

export default async function updateGroup(clients, groupId) {
  try {
    await api.put(`api/sending-groups/${groupId}`, {
      clients: clients,
      cache: 'no-store',
    });
  } catch (error) {}
}
