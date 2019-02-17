import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';


export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        postId: {type: GraphQLString},
        reachSubs: {type: GraphQLInt},
        reachTotal: {type: GraphQLInt},
        reachViral: {type: GraphQLInt},
        toGroup: {type: GraphQLInt},
        reports: {type: GraphQLInt}
    })
});

export default PostType;