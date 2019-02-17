import { GraphQLString } from 'graphql';

import { PostType } from '../types';
import { Post } from '../../models';

export default {
	name: 'post',
	type: PostType,
	args: { postId: { type: GraphQLString } },
	resolve: async(parent, args) => {
		try {
			const post = await Post.find({ postId: args.postId });
			return Promise.resolve(post);
		} catch(error) {
			return Promise.reject(error);
		};
	}
};
