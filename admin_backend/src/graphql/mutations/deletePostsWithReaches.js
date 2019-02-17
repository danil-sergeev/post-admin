import VK from 'vk-io';
import { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';

import { PostReach, Group } from '../../models';
import { PostReachType } from '../types';

export default {
	type: new GraphQLNonNull(new GraphQLList(PostReachType)),
	args: {
		token: { type: GraphQLString },
		ownerId: { type: GraphQLString },
		min: { type: GraphQLInt },
		max: { type: GraphQLInt }
	},
	resolve: async (parent, args) => {
		const { token, ownerId, posts, min, max } = args;
		const vk = new VK({ token: token });

		try {
			const group = await Group.findOne({ groupId: ownerId });
			const filteredPosts = await PostReach.find({
				group: group,
				reachTotal: { $ne: { $lt: max, $gt: min } }
			});

			if (filteredPosts) {
				filteredPosts.forEach(async (post) => {
					await post.remove();
					await vk.api.wall.delete({
						owner_id: `-${ownerId}`,
						post_id: post.postId
					});
				});
			}
			await PostReach.deleteMany({ postId: [ posts ] });
			return Promise.resolve({
				filteredPosts
			});
		} catch (error) {
			return Promise.reject({
				error
			});
		}
	}
};
