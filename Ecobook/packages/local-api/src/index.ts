import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';
import path from 'path';
export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent',
    }))
  } else {
    const pathPackage = require.resolve('@eco-note/local-client/build/index.html');
    app.use(express.static(path.dirname(pathPackage)));
  }
  
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  })
}