import { Effect } from 'dva';
import { Reducer } from 'redux';

import { profile } from '@/services/user';

export interface IUserModelState {
  id?: number;
  username?: string;
  gender?: string;
  age?: number;
  avatar?: string;
}

export interface IUserModelType {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    fetchUserProfile: Effect;
  };
  reducers: {
    setUserProfile: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModelType = {
  namespace: 'user',

  state: {
    id: -1,
    username: '',
    gender: '',
    age: 0,
    avatar: '',
  },

  effects: {
    *fetchUserProfile(_, { call, put }) {
      const response = yield call(profile);
      yield put({
        type: 'setUserProfile',
        payload: response.data.data,
      });
    },
  },

  reducers: {
    setUserProfile(state, { payload }) {
      const { id, username, gender, age, avatar } = payload;
      return {
        ...state,
        id,
        username,
        gender,
        age,
        avatar,
      };
    },
  },
};

export default UserModel;
