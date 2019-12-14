import { delay } from 'roadhog-api-doc';
// import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const server = {
  'POST /api/user/login': {
    code: '200',
    msg: '登录成功',
    data: null,
  },

  'POST /api/user/register': {
    code: '200',
    msg: '成功',
    data: {
        id: 8,
        username: 'username',
        password: '$2a$10$r9/qx18oJthOIKrB5qEw8eOIEO9N3IOqX8Js7q2ENNx6GitQvIiMO',
        gender: null,
        age: null,
        avatar: null,
    },
  },

  // 'GET /api/verificationCode': (req: Request, res: Response) => {
  //   res.send('https://marketplace-res-cbc-cn.obs.myhwclouds.com/app/logo/20181009/98dea972-8855-4348-9ef4-92bafb247ea4/1810091217084675.jpg')
  // },
  'GET /api/verificationCode': {
    code: '200',
    msg: '获取成功',
    data: 'https://marketplace-res-cbc-cn.obs.myhwclouds.com/app/logo/20181009/98dea972-8855-4348-9ef4-92bafb247ea4/1810091217084675.jpg',
  },

  'GET /api/user/logout': {
    code: '100',
    msg: '退出成功',
    data: null,
  },
};

export default delay(server, 3000);
