export class User {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    issocial?: Number;
    expectedcalories?: Number;
    roles?: any[];
    file?: File;
    fileUrl?: any;

    public getUserStatus(): string{
        if(this.roles.map(role=>role.name).includes("admin")) return "admin";
        else if(this.roles.map(role=>role.name).includes("manager")) return "manager";
        else return "user";
    }
}
