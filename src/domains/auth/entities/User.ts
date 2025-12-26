import Role from "./Role";

export default class User {
    id: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    avatar: string | null;
    active: boolean;
    roleId: string | null;
    role: Role | null = null;
    lastLogin: Date | null;

    constructor({
        id = null,
        username = null,
        email = null,
        password = null,
        avatar = null,
        active = true,
        lastLogin = null,
        roleId = null,
        role = null,
    }: {
        id: string | null;
        username?: string | null;
        email?: string | null;
        password?: string |null;
        avatar?: string | null;
        active?: boolean;
        lastLogin?: string | Date | null;
        roleId?: string | null;
        role?: Role | null;
    }) {
        {
            this.id = id;
            this.username = username;
            this.email = email;
            this.password = password;
            this.avatar = avatar;
            this.active = active;
            this.lastLogin = lastLogin ? new Date(lastLogin) : null;
            this.roleId = roleId;

            if (role !== null && typeof role === 'object') {
                this.role = !(role instanceof Role) ? new Role(role) : role;
            } else {
                this.role = null;
            }
        }
    }

    getUsername(): string | null {
        return this.username;
    }

    getRole(): Role | null {
        return this.role;
    }
}