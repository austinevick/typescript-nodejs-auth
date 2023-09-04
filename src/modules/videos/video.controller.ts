import busboy from 'busboy';
import fs from 'fs';
import { Request, Response } from 'express';
import { createVideo } from './video.service';
import { Video } from './video.model';

const MIME_TYPES = ['video/mp4', 'video/mov'];

const getPath = ({ videoId, extension }: {
    videoId: Video['videoId'],
    extension: Video['extension']
}) => {
    return `${process.cwd()}/videos/${videoId}.${extension}`
}

export const uploadVideohandler = async (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers });
    const user = res.locals.user;

    const video = await createVideo({ owner: user._id })
    bb.on('file', async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid file type'
            });
        }
        const extension = info.mimeType.split('/')[1];
        const filePath = getPath({
            videoId: video.videoId,
            extension: extension
        });
        video.extension = extension;
        await video.save();
        const stream = fs.createWriteStream(filePath);
        file.pipe(stream)
    });

    bb.on('close', () => {
        res.writeHead(201, {
            Connection: 'close',
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify(video));
        res.end();
    });
    return req.pipe(bb);
}