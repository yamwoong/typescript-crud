import mongoose, {Schema, Document} from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema<IPost>(
    {
        title: {type: String, required: true, trim: true},
        content: {type: String, required: true},
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false
        }
      }, {timestamps: true}
);

const Post = mongoose.model<IPost>('Post', postSchema);
export default Post;