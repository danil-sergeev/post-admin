import { model, Schema } from 'mongoose';

const postSchema = new Schema(
	{
		postId: { type: Number, required: true, unique: true },
		reachSubs: { type: Number },
		reachTotal: { type: Number },
		reachViral: { type: Number },
		toGroup: { type: Number },
		reports: { type: Number },
		createdAt: Date,
		group: {
			type: Schema.Types.ObjectId,
			ref: 'Group',
			required: true
		}
	},
	{ timestamps: true }
);

export const Post = model('Post', postSchema);
