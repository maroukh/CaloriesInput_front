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
    constructor(id?: string,
        username?: string,
        email?: string,
        password?: string,
        issocial?: Number,
        expectedcalories?: Number,
        roles?: any[],
        file?: File,
        fileUrl?: any){
            this.id=id;
            this.username=username;
            this.email=email;
            this.password=password;
            this.issocial=issocial;
            this.expectedcalories=expectedcalories;
            this.roles=roles;
            this.file=file;
            this.fileUrl=fileUrl;
    }

    public getUserStatus(): string{
        if(this.roles.map(role=>role.name).includes("admin")) return "admin";
        else if(this.roles.map(role=>role.name).includes("manager")) return "manager";
        else return "user";
    }
}
