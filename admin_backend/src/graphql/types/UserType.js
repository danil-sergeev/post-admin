import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt} from 'graphql';


export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        screenName: {type: GraphQLString},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        vkId: {type: GraphQLInt},
        accessToken: {type: GraphQLString},
        isAllowed: {type: GraphQLBoolean},
    })
});