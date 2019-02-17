import {GraphQLString, GraphQLNonNull} from 'graphql';

import {GroupType} from '../types';
import {Group} from '../../models';


export default {
    name: "group",
    type: new GraphQLNonNull(GroupType),
    args: {
        groupId: {type: GraphQLString}
    },
    resolve: async(parent, args) => {
        try {
            const group = await Group.findOne({groupId: args.groupId});
            return Promise.resolve(group);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};