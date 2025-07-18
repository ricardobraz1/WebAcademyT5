import { Product , PrismaClient} from "@prisma/client";
import { CreateProductDto } from "./types";

const prisma = new PrismaClient();

// Função para listar produtos
export const getAllProducts = (): Promise<Product[]> => {
   return prisma.product.findMany();
}

// Função para criar um produto por ID
export async function createProduct(
    product: CreateProductDto
   ): Promise<Product> {
    return prisma.product.create({ data: product });
   }

// Função para ler um produto por ID
export const readProductById = async (id: string): Promise<Product | null> => {
    return prisma.product.findUnique({ where: { id } });
};

// Função para atualizar um produto
export const updateProduct = async (id: string, data: CreateProductDto): Promise<Product | null> => {
    return prisma.product.update({
        where: { id },
        data
    });
};

// Função para remover um produto
export const deleteProduct = async (id: string): Promise<Product | null> => {
    return prisma.product.delete({ where: { id } });
};