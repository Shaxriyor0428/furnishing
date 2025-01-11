import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new ForbiddenException('Authorization header is missing');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!payload.is_creator) {
      throw new ForbiddenException('Access denied: Not a creator');
    }

    request.user = payload;
    return true;
  }
}
