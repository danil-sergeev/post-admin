import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { GroupType } from '../types';
import { Group, User } from '../../models';

export default {
    name: 'myGroups',
	type: new GraphQLNonNull(new GraphQLList(GroupType)),
	args: {
		vkId: { type: GraphQLString }
    },
    resolve : async (parent, args) => {
        try {
            const user = await User.findOne({vkId: args.vkId});
            const groups = await Group.find({admin: user});
    
            return Promise.resolve(
                groups
            );
        } catch (error) {
            return Promise.reject(error);
        };
    }
};
