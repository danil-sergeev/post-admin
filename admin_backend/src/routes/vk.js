import VK from 'vk-io';
import Router from 'koa-router';

import { User, Post, Group } from '../models';
import socket from '../graphql/socket';
import { POST_CREATED, POST_DELETED } from '../graphql/constants';

const router = new Router();

router.post('/vk-callback', async (ctx) => {
	try {
		const { type, group_id } = ctx.request.body;
		const group = await Group.findOne({ groupId: group_id });

		switch (type) {
			case 'confirmation':
				return group.confirmation;

			case 'wall_post_new':
				const { id, from_id, owner_id } = ctx.request.body;
				const user = await User.findOne({ vkId: from_id });

				if (!user) {
					throw new Error('no such user exists');
				}
				const vk = new VK({ token: user.accessToken });
				const postStats = await vk.api.stats.getPostReach({
					owner_id: `-${owner_id}`,
					post_id: id
				});
				const { reach_total, reach_viral, to_group, report, reach_subscribers } = postStats;

				let newPost = new Post({
					postId: id,
					reachSubs: reach_subscribers,
					reachTotal: reach_total,
					reachViral: reach_viral,
					toGroup: to_group,
					reports: report,
					group: group
				});
				const elderPost = await Post.find({ group: group }).sort('-created_at')[0];

				elderPost.remove().then((deletedPost) => socket.publish(POST_DELETED, { postDeleted: deletedPost }));
				newPost.save().then((savedPost) => socket.publish(POST_CREATED, { postCreated: savedPost }));
				return 'ok';
			default:
				break;
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;
