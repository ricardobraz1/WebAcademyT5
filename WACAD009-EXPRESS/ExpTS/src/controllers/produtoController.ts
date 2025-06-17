import { Request, Response } from 'express';
import axios from 'axios';

const apiURL = 'http://localhost:3355/produtos';

// Exibir todos os produtos
export const index = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(apiURL);
    const produtos = response.data;
    res.render('produtos', { produtos });
  } catch (error) {

    res.status(500).send(`Erro ao buscar produtos: ${error}}`);
  }
};

// Exibir formulário para criar produto
export const createForm = (req: Request, res: Response) => {
  res.render('produtoForm', { produto: {}, action: '/produto/create' });
};

// Criar um novo produto
export const create = async (req: Request, res: Response) => {
  const { nome, preco, estoque } = req.body;
  try {
    await axios.post(apiURL, { nome, preco: parseFloat(preco), estoque: parseInt(estoque) });
    res.redirect('/produto');
  } catch (error) {
    res.status(500).send(`Erro ao criar produto: ${error}}`);
  }
};

// Exibir formulário para editar produto
export const editForm = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${apiURL}/${req.params.id}`);
    const produto = response.data;
    res.render('produtoForm', { produto, action: `/produto/update/${produto.id}` });
  } catch (error) {
    res.status(500).send(`Erro ao buscar produto: ${error}}`);
  }
};

// Atualizar produto
export const update = async (req: Request, res: Response) => {
  const { nome, preco, estoque } = req.body;
  try {
    await axios.put(`${apiURL}/${req.params.id}`, { nome, preco: parseFloat(preco), estoque: parseInt(estoque) });
    res.redirect('/produto');
  } catch (error) {
    res.status(500).send(`Erro ao atualizar produto: ${error}}`);
  }
};

// Excluir produto
export const remove = async (req: Request, res: Response) => {
  try {
    await axios.delete(`${apiURL}/${req.params.id}`);
    res.redirect('/produto');
  } catch (error) {
    res.status(500).send(`Erro ao excluir produto: ${error}}`);
  }
};
