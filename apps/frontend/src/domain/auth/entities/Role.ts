export default class Role {
    id: string | null;
    name: string | null;

    constructor({
        id = null,
        name = null,
    }: {
        id: string | null;
        name?: string | null;
    }) {
        {
            this.id = id;
            this.name = name;
        }
    }

    getRoleName(): string | null {
        return this.name || "No Role";
    }
}