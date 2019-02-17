import { Schema, model } from 'mongoose';
import { Group } from './Group';

import {fetchAdminGroups} from '../controllers/groups';

import VK from 'vk-io';

const userSchema = new Schema(
	{
		screenName: { type: String, unique: true, required: true },
		firstName: { type: String, unique: true, required: false },
		lastName: { type: String, unique: true, required: false },
		vkId: { type: Number, unique: true, required: true },
		accessToken: { type: String, unique: true, required: true },
		isAllowed: { type: Boolean, default: false },
		lastVisit: Date,
		groups: [ { type: Schema.Types.ObjectId, ref: 'Group' } ]

	},
	{ timestamps: true }
);

userSchema.post('save', async function (next) {
	console.log(this);	
	try {
		if (!this.groups || !this.groups.length) {
			console.log('Creating groups...')
			// idk why this code doesn't work, it's es8 features... mby cuz babel doesn't support this yet.
	
			// for await (const group of fetchAdminGroups(this.accessToken)) {
			// 	console.log(...group);
			// 	const {name, id} = group;
			// 	const newGroup = new Group({
			// 		admin: this,
			// 		groupId: id,
			// 		groupTitle: name
			// 	});
			// 	await newGroup.save()
			// }
	
			// const vk = new VK({ token: this.accessToken });
			const {groups} = await fetchAdminGroups(this.accessToken);
			console.log(groups);
			groups.forEach(async (group) => {
				try {
					console.log(group.members_count);
					if (group.members_count > 5000) {
						const { name, id } = group;
						// const { code } = await vk.api.groups.getCallbackConfirmationCode({
						// 	group_id: id
						// });
						// console.log(code);
						let newGroup = new Group({
							admin: this,
							groupId: id,
							groupTitle: name,
							// confirmation: code
						});
						await newGroup.save();
					}
				} catch (error) {
					throw new Error(error);
				};
			});
		}
		next();
	} catch(error) {
		throw new Error(error);
	};
});

export const User = model('User', userSchema);
