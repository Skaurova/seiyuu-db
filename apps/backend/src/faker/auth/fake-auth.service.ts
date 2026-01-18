import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FAKE_USER, FakeUser } from './fake-user';

@Injectable()
export class FakeAuthService {
  private readonly user: FakeUser = { ...FAKE_USER };

  async validateUser(email: string, pass: string): Promise<FakeUser> {
    if (email !== this.user.email || pass !== this.user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.user.lastLogin = new Date();
    return this.user;
  }
}
