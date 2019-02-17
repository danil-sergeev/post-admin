import koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from 'koa-cors';
import http from 'http';
import { graphiqlKoa, graphqlKoa } from 'graphql-server-koa';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscribe, execute } from 'graphql';

import rootSchema from './graphql/schema';
import { initDB } from './config/database';
import updateTask from './utils/postUpdatingCron';
import { configPassport } from './config/passport';
import router from './routes/index';

// setup mongodb database

initDB();

// create servers
const app = new koa();

if (!process.env.SESSION_SECRET) {
	throw new Error('Session secret is not provided as an environment variable');
}

app.keys = [ process.env.SESSION_SECRET ];

const server = http.createServer(app.callback());

// middlewares
configPassport(passport);

// cors

app.use(
	cors({
		origin: true,
		credentials: true,
		exposeHeaders: [ 'WWW-Authenticate', 'Server-Authorization' ],
		allowMethods: [ 'GET', 'POST', 'DELETE', 'OPTIONS' ]
	})
);

app.use(logger());

app.use(bodyParser());
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

// graphql setup

app.use(
	mount(
		'/graphql',
		graphqlKoa({
			schema: rootSchema
		})
	)
);

app.use(
	mount(
		'/graphiql',
		graphiqlKoa({
			endpointURL: 'graphql',
			subscriptionsEndpoint: `ws://localhost:${process.env.PORT}/subscriptions`
		})
	)
);

// use of index router
app.use(router.routes()).use(router.allowedMethods());

if (!process.env.PORT) {
	throw new Error('Port is not specified as an ENV variable');
}

server.listen(process.env.PORT, () => {
	console.log(router.stack.map((route) => route.path));

	console.log(`Server started on port ${process.env.PORT}`);

	new SubscriptionServer(
		{
			rootSchema,
			execute,
			subscribe,
			onConnect: () => console.log('Client connected')
		},
		{
			server,
			path: '/subscriptions'
		}
	);

	updateTask();
});
