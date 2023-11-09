import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRET } from 'src/common-module/constants/constants';
import * as jwt from 'jsonwebtoken';

const HTTP_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    if (!req.headers['auth-user']) {
      console.log('oups');
      throw new UnauthorizedException('not autherized');
    }

    try {
      const token = req.headers['auth-user'];
      const verify = jwt.verify(token, JWT_SECRET);
      console.log(req.method);
      if (HTTP_METHODS.includes(req.method)) {
        req.body['userId'] = verify['userId'];
        // console.log(req.body);
        // throw new Error();
      }
      // req.headers['userId'] = verify['userId'];
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }
    next();
  }
}
