import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import all routes
import healthCheckRoutes from './routes/healthcheck.routes.js';
import linkRoutes from './routes/link.routes.js';
import statsRoutes from './routes/stats.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

app.use('/healthcheck', healthCheckRoutes);
app.use('/api/links', linkRoutes);
app.use('/', statsRoutes); 
app.use('/', redirectRoutes);

app.use(errorHandler);

export default app;