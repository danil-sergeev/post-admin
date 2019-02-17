import { PostType } from '../types';
import socket from '../socket';
import { POST_CREATED } from '../constants';

export default {
	type: PostType,
	subscribe: () => socket.asyncIterator(POST_CREATED)
};
