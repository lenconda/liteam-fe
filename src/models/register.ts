import router from 'umi/router';
import { Effect } from 'dva';

import { register } from '@/services/register';

export interface IRegisterModelType {
  namespace: string;
  state: {};
  effects: {
    register: Effect;
  };
}

const Model: IRegisterModelType = {
  namespace: 'register',

  state: {},

  effects: {
    *register({ payload }, { call }) {
      const response = yield call(register, payload);

      if (response && response.data.msg === '成功') {
        router.push('/');
      }
    },
  },
};

export default Model;
