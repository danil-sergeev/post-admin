import { GraphQLString, GraphQLNonNull } from 'graphql';

import { UserType } from '../types';
import { User } from '../../models';

export default {
	name: 'me',
	type: UserType,
	args: {
		vkId: { type: GraphQLString }
	},
	resolve: async (parent, args) => {
		try {
			const user = await User.findOne({ vkId: args.vkId }).select('firstName lastName vkId accessToken');
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
