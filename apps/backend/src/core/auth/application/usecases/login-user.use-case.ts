import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { UserRepository } from '../../../../infrastructure/persistence/repositories/user.repository';

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar: string | null;
    active: boolean;
    lastLogin: string | null;
    roleId: string | null;
  };
}

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.users.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.passwordHash !== input.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLogin = new Date();
    await this.users.save(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        active: user.active,
        lastLogin: user.lastLogin?.toISOString() ?? null,
        roleId: user.roleId,
      },
    };
  }
}
