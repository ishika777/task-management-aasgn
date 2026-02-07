export type Task = {
    _id: string;
    title: string;
    description: string;
    status: 'Pending' | 'In-Progress' | 'Completed';

    createdAt: string;
    updatedAt: string;
};


export type User = {
    _id: string;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}
