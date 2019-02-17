import VK from 'vk-io';
import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';

import { PostReach } from '../../models';
import { PostReachType } from '../types';
import { fetchPostsIds } from '../../controllers';

export default {
	type: new GraphQLNonNull(new GraphQLList(PostReachType)),
	args: {
		token: { type: GraphQLString },
		ownerId: { type: GraphQLString },
		fromTime: { type: GraphQLDate },
		toTime: { type: GraphQLDate }
	},
	resolve: async (parent, args) => {
		const vk = new VK({ token: args.token });
		const { posts } = await fetchPostsIds(...args);
		resultPosts = [];

		posts.forEach(async (post) => {
			const postStats = await vk.api.stats.getPostReach({
				owner_id: `-${args.ownerId}`,
				post_id: post
			});

			let newPost = new PostReach({
				postId: post,
				reachTotal: postStats.reach_total
			});

			await newPost.save();
			resultPosts.push(newPost);
		});

		return resultPosts;
	}
};
