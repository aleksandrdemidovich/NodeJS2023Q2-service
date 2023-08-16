import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService()

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body, query } = req;
    const reqDate = new Date().toISOString();
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const contentLength = res.get('content-length');
      const logRequestMessage = `${reqDate} [HTTP-REQUEST] ${method}  ${originalUrl} ${JSON.stringify(
        query,
      )} ${JSON.stringify(body)} ${contentLength}B - ${userAgent} ${ip}`;

      if (res.statusCode >= 500) {
        this.logger.error('[ERROR] ' + logRequestMessage);
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn('[WARN] ' + logRequestMessage);
      } else {
        this.logger.log('[LOG] ' + logRequestMessage);
      }
    });

    let send = res.send;
    res.send = (exitData) => {
      if (
        res?.getHeader('content-type')?.toString().includes('application/json')
      ) {
        const resDate = new Date().toISOString();
        const logResponseMessage = `${resDate} [HTTP-RESPONSE] ${method}  ${originalUrl} ${
          res.statusCode
        } ${exitData.toString().substring(0, 1000)}`;

        if (res.statusCode >= 500) {
          this.logger.error('[ERROR] ' + logResponseMessage);
        } else if (res.statusCode >= 400 && res.statusCode < 500) {
          this.logger.warn('[WARN] ' + logResponseMessage);
        } else {
          this.logger.log('[LOG] ' + logResponseMessage);
        }
      }
      res.send = send;
      return res.send(exitData);
    };
    next();
  }
}
