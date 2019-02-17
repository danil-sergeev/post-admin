import Router from 'koa-router';
import passport from 'koa-passport';

import { ensureIsAuthenticated } from '../middlewares';

export const router = new Router();

router.get('/oauth/vk/', passport.authenticate('vkontakte'), (ctx) => {});

router.get('/oauth/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/' }), (ctx) => {
	try {
		ctx.redirect('http://localhost:3000/');
		ctx.body = {
			user: ctx.state.user
		};
	} catch (err) {
		ctx.body = err;
	}
});

router.get('/logout', (ctx) => {
	try {
		ctx.logout();
		ctx.redirect('/');
	} catch (error) {
		ctx.body = error;
	}
});

export default router;
