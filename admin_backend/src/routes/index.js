import Router from 'koa-router';

import authRouter from './auth';
import vkRouter from './vk';

const router = new Router({ prefix: '/api/v1' });

router.use('', authRouter.routes());
router.use('/vk', vkRouter.routes());


export default router;
