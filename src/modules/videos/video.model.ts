import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/user.model';



export class Video {
    @prop()
    public title: string;

    @prop()
    public description: string;

    @prop({ enum: ['mp4', 'mov'] })
    public extension: string;

    @prop({ required: true, ref: () => User })
    public owner: Ref<User>

    @prop({ required: true, default: () => uuidv4() })
    public videoId: string

    @prop({ default: false })
    public published: boolean
}

export const VideoModel = getModelForClass(Video, {
    schemaOptions: {
        timestamps: true
    }
});