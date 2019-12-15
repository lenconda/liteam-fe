import request from '@/utils/request';

export async function profile(): Promise<any> {
  return request.get('/api/user');
}
