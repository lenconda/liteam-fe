import request from '@/utils/request';

export async function getAllMessages(): Promise<any> {
  return request.get('/api/messages');
}

export async function flushMessages(from: number, to: number) {
  return request.post('/api/flush');
}
