import request from '@/utils/request';

export async function getAllMessages(): Promise<any> {
  return request.get('/api/messages');
}
