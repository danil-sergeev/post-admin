import cron from 'node-cron';
import VK from 'vk-io';

import { Post, Group } from '../models';
import socket from '../graphql/socket';
import { POST_UPDATED } from '../graphql/constants';

export default function() {
	cron.schedule('*/5 * * * *', async () => {
		try {
			const groups = await Group.find({}).populate('posts').populate('admin', 'accessToken');
			for (let group of groups) {
				const { admin, posts } = group;
				const vk = new VK({ token: admin.accessToken });
				posts.forEach(async (post) => {
					try {
						const postLastStats = await vk.api.stats.getPostReach({
							owner_id: `-${group.groupId}`,
							post_id: post.postId
						});
						const { reach_subscribers, reach_total, reach_viral, to_group, report } = postLastStats;
						const updatedPost = await Post.findOneAndUpdate(
							{ postId: post.postId },
							{
								reachSubs: reach_subscribers,
								reachTotal: reach_total,
								reachViral: reach_viral,
								toGroup: to_group,
								reports: report
							},
							{ new: true }
						);

						if (updatedPost) {
							socket.publish(POST_UPDATED, {
								postUpdated: updatedPost
							});
						}
					} catch (error) {
						console.error(error);
					}
				});
			}
		} catch (error) {}
	});
}
