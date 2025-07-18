import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const checkAlreadyExists = async (name: string): Promise<boolean> => {
    return !!(await prisma.product.findUnique({where: {name}}));
}