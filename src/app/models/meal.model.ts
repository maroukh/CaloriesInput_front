import { User } from "./user.model";

export class Meal {
    id?: any;
    title?: string;
    description?: string;
    calories?: number;
    dateTimeOfMeal?:Date;
    file?: File;
    fileUrl?: any;
    user?: User;
}
