import {model, Schema, SchemaType} from 'mongoose';

const postReachSchema = new Schema({
    postId: {type: Number, required: true, unique: true},
    reachTotal: {type: Number},
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
});


export const PostReach = model('PostReach', postReachSchema);