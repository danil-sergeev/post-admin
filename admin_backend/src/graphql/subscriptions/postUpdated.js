import { PostType } from '../types';
import socket from '../socket';
import { POST_UPDATED } from '../constants';

export default {
	type: PostType,
	subscribe: () => socket.asyncIterator(POST_UPDATED)
};
