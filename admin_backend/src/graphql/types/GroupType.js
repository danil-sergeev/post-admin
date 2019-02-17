import {GraphQLObjectType, GraphQLString} from 'graphql';

export const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        groupId: {type: GraphQLString},
        groupTitle: {type: GraphQLString}
    })
});