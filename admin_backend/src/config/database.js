import mongoose from 'mongoose';

if (!process.env.MONGO_URL) {
	throw new Error('MongoDB URL is not provided as ENV variable');
}

const url = process.env.MONGO_URL;

const databaseOptions = {
	useNewUrlParser: true,
	autoIndex: false,
	reconnectTries: 100,
	reconnectInterval: 500,
	poolSize: 10,
	bufferMaxEntries: 0
};


export const initDB = () => {
	mongoose.Promise = Promise;
	mongoose.connect(url, databaseOptions);
	const db = mongoose.connection;

	db.on('error', (error) => {
		console.error(error);
	});

	db.once('open', () => {
		console.log('Database connected.');
	});
};
