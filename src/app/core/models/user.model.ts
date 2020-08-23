export interface User {
    id: string;
    fullname: string;
    email: string;
    location: {
        latitude: number,
        longitude: number
    };
    createdAt: Date;
}
