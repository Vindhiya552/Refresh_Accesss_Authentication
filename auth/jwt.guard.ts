import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.refresh_token;

    if (!token) return false;

    try {
      const decoded = this.jwt.verify(token);
      request.user = decoded;
      return true;
    } catch (e) {
      return false;
    }
  }
}
