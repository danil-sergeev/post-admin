import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { PostType } from '../types';
import { Post, Group } from '../../models';

export default {
	name: 'allPosts',
	type: new GraphQLNonNull(new GraphQLList(PostType)),
	args: {
		groupId: { type: GraphQLString }
	},
	resolve: async (parent, args) => {
		try {
			const group = await Group.findOne({ groupId: args.groupId });
			return Promise.resolve(Post.find({ group: group }));
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
