import {Schema, model, Document, Types} from 'mongoose';

export interface PostDocument extends Document<Types.ObjectId> {
    title: string;
    content: string;
    createdBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema<PostDocument>(
    {
        title: {type: String, required: true, trim: true},
        content: {type: String, required: true},
        createdBy: {
            type: Types.ObjectId,
            ref: 'User',
            required: false
        }
      }, {timestamps: true}
);

export default model<PostDocument>('Post', postSchema);