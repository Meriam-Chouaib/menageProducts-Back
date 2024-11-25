declare const getUsers: () => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    username: string;
    password: string;
    image: string;
    phone: string | null;
    isLogged: boolean;
    statut: import(".prisma/client").$Enums.user_statut;
    role: import(".prisma/client").$Enums.user_role;
    isActive: boolean;
}[]>;
export { getUsers };
