import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
    const app = express();

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
        limit: '100kb',
    }));

    app.use(cors());

    app.use(cookieParser());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(router);

    app.use("/uploads", express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

    app.use("*", notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};
