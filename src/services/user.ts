import request from '@/utils/request';

export async function profile(): Promise<any> {
  return request.get('/api/user');
}

export async function findUserById(id: number): Promise<any> {
  return request.get(`/api/user/${id}`);
}
