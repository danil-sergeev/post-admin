import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';


export const PostReachType = new GraphQLObjectType({
    name: 'PostReach',
    fields: () => ({
        id: {type: GraphQLString},
        postId: {type: GraphQLInt}, 
        reachTotal: {type: GraphQLInt}
    })
});

