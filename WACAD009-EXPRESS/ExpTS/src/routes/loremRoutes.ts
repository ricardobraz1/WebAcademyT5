import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();
const lorem = new LoremIpsum();

// Rota para gerar parágrafos Lorem Ipsum
router.get('/lorem/:paragraphs', (req: Request, res:Response) => {
  const { paragraphs } = req.params;
  const numParagraphs = parseInt(paragraphs, 10);

  if (isNaN(numParagraphs) || numParagraphs <= 0) {
    return res.status(400).send('Número de parágrafos inválido.');
  }

  const generatedText = lorem.generateParagraphs(numParagraphs);

  res.send(`<p>${generatedText.replace(/\n/g, '</p><p>')}</p>`);
});

export default router;
