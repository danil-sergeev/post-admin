import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';

export default new GraphQLSchema({
	
	query: new GraphQLObjectType({
		name: 'Query',
		fields: queries
	}),

	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: mutations
	}),

	subscription: new GraphQLObjectType({
		name: 'Subscription',
		fields: subscriptions
	})
});
