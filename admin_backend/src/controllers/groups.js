import VK from 'vk-io';

export const fetchAdminGroups = async (token) => {
	const vk = new VK({ token: token });

	try {
		const groupIds = [];
		const response = await vk.api.groups.get({
			filter: 'editor',
			extended: 1
		});
		response.items.map(item => groupIds.push(item.id));
		const groups = await vk.api.groups.getById({
			group_ids: groupIds,
			fields: 'members_count'
		});
		return Promise.resolve({
			groups
		});
	} catch (error) {
		console.log(error);
		return Promise.reject({
			error
		});
	}
};


fetchAdminGroups('e9b4f44369bf3901dc6a0473d9ee7b10d945b3ec6a7113dea2f01570653f7f59c86674a99161749c6f8b7');
