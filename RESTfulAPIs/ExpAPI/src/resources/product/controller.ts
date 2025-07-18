import {Request,Response} from 'express'
import { ReasonPhrases, StatusCodes  } from 'http-status-codes';
import {getAllProducts ,createProduct, readProductById, updateProduct, deleteProduct} from './service';
import { checkAlreadyExists } from './helper';
import { CreateProductDto } from './types';


const products: any = [];

const index = async (req:Request, res:Response)=> {
   try{
    const products = await getAllProducts();
    res.json(products);
   }catch(err){
    res.status(500).json({message: "erro", erro:err});
   }
};

const create = async (req:Request, res:Response)=> {
    try{
        const product: CreateProductDto = req.body;
        if(!(await checkAlreadyExists(product.name))){
            const newProduct = await createProduct(product);
            res.json(newProduct);
        } else{
            res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);   
        }  
    } catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const read = async (req:Request, res:Response)=> {
    try {
        const productId = req.params.id; 
        const product = await readProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const update = async (req:Request, res:Response)=> {
    try {
        const productId = req.params.id; 
        const productData: CreateProductDto = req.body;
        const updatedProduct = await updateProduct(productId, productData);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const remove = async (req:Request, res:Response)=> {
    try {
        const productId = req.params.id; 
        const deletedProduct = await deleteProduct(productId);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

export default {index, create, read, update, remove}

