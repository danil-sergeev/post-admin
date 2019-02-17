import VK from 'vk-io';

import { model, Schema } from 'mongoose';
import { Post } from './Post';

const groupSchema = new Schema({
	groupId: { type: String, unique: true, required: true },
	groupTitle: { type: String, unique: true, required: true },
	confirmation: { type: String, unique: true },
	admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ]
});

groupSchema.post('save', async function(next) {
	const { posts, admin } = this;

	try {
		if (!posts || !posts.length) {
			const vk = new VK({ token: admin.accessToken });
			const lastPosts = await vk.api.wall.get({
				owner_id: `-${this.groupId}`,
				count: 100,
				offset: 0
			});

			lastPosts.items.forEach(async (post) => {
				const { id, owner_id } = post;

				const postStats = await vk.api.stats.getPostReach({
					owner_id: owner_id,
					post_id: id
				});

				const { reach_subscribers, reach_total, reach_viral, to_group, report } = postStats[0];

				let newPost = new Post({
					postId: id,
					reachSubs: reach_subscribers,
					reachTotal: reach_total,
					reachViral: reach_viral,
					toGroup: to_group,
					reports: report,
					group: this
				});

				await newPost.save();
			});

			next();
		}
	} catch (error) {
		console.error(error);
		return Promise.resolve(error);
	}
});

export const Group = model('Group', groupSchema);
