import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const server = {
  'GET /api/user/:id': (req: Request, res: Response) => {
    res.send({
      code: '200',
      msg: '成功',
      data: {
        username: 'iscyf',
        id: req.params.id,
        age: 3,
        gender: '女',
        impressions: [
          'lorem', 'ipsum',
        ],
        avatar: 'http://q2ayul341.bkt.clouddn.com/avatar3.png',
      },
    });
  },

  'GET /api/user': (req: Request, res: Response) => {
    res.send({
      code: '200',
      msg: '成功',
      data: {
        username: 'iscyf',
        id: req.params.id,
        age: 3,
        gender: '女',
        avatar: 'http://q2ayul341.bkt.clouddn.com/avatar3.png',
      },
    });
  },

  'POST /api/user/avatar': {
    code: '200',
    msg: '成功',
    data: 'https://avatars0.githubusercontent.com/u/9963587?s=460&v=4',
  },

  'GET /api/impressions': {
    code: '200',
    msg: '成功',
    data: [
        {
            id: 6,
            uid: 3,
            impression: '测试数据2',
        },
        {
            id: 9,
            uid: 3,
            impression: '测试数据3',
        },
    ],
  },

  'DELETE /api/impressions': {
    code: '200',
    msg: '成功',
    data: [
        {
            id: 9,
            uid: 3,
            impression: '测试数据3',
        },
    ],
  },

  'POST /api/impressions': {
    code: '200',
    msg: '成功',
    data: {
        id: 9,
        uid: 3,
        impression: '测试数据3',
    },
  },

  'POST /api/user/update': {
    code: '200',
    msg: '成功',
    data: {
        id: 3,
        username: 'iscyf',
        password: '$2a$10$eI4OHsl1UCv69voApU7pQekE4ROlKkvX3p9yv4tLkymJpByoRKsIO',
        gender: '女',
        age: 21,
        avatar: 'http://q2ayul341.bkt.clouddn.com/avatar3.png',
    },
  },
};

export default delay(server, 3000);
