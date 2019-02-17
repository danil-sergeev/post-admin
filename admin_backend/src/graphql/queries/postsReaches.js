import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { PostReachType } from '../types';
import { PostReach, Group } from '../../models';


export default {
    name : 'reachPosts',
    type: new GraphQLNonNull(new GraphQLList(PostReachType)),
    args: {
        groupId: {type: GraphQLString}
    },
    resolve: async(parent, args) => {
        try {
            const group = await Group.findOne({groupId: args.groupId});
            return Promise.resolve(PostReach.find({group: group}));
        } catch (error) {
            throw new Error(error);
            return Promise.reject(error);
        }   
    }
}

