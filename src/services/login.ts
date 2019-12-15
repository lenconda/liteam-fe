import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  'remember-me': boolean;
  code: string;
}

export async function login(params: LoginParamsType) {
  return request.post('/api/user/login', params);
}
