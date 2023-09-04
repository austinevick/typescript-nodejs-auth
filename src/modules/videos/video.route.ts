import express from 'express';
import { requireUser } from '../../middleware/requireUser';
import { uploadVideohandler } from './video.controller';

const videoRoute = express.Router();

videoRoute.post('/', requireUser, uploadVideohandler)

export default videoRoute;