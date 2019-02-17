import VK from 'vk-io';
import { fetchPostsByTime } from '../utils/procedureVKScript';

export const fetchPostsIds = async (token, ownerId, fromTime, toTime) => {
	const vk = new VK({ token: token });

	try {
		let code = fetchPostsByTime(ownerId, 0);
		const postsExecute = await vk.api.execute({ code });
		console.log(postsExecute);

		// convert frontend time to unix
		const toUnix = toTime.getTime() / 1000;
		const fromUnix = fromTime.getTime() / 1000;
		const resultPosts = [];

		postsExecute.response.map(async (chunk) => {
			for (let i = 0; i < chunk.chunk_size; i++) {
				const date = chunk.dates[i];
				const id = chunk.ids[i];
				if (date < toUnix && date > fromUnix) {
					resultPosts.push(id);
				}
			}
		});

		return Promise.resolve({
			posts: resultPosts
		});
	} catch (error) {
		return Promise.reject({
			error
		});
	}
};


