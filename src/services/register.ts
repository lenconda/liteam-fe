import request from '@/utils/request';

export interface RegisterParamsType {
  account: string;
  password: string;
  name: string;
}

export async function register(params: RegisterParamsType) {
  return request.post('/api/user/register', params);
}
