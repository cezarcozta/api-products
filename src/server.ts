import express from 'express';

import products from './data/testProducts.json';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {

  res.status(200).json(products);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const product = products.filter(p => p.id === Number(id));

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/', (req, res) => {
  const { id, name, price } = req.body;

  const product = { id, name, price };

  try {
    products.push(product);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    products.splice(
      products.findIndex(p => p.id === Number(id))
      ,
      1
    );

    res.status(204).json({});
  } catch (error) {
    res.send(400).json({ message: error.message });
  }
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = products.find(p => p.id === Number(id));

    if (product === undefined) {
      res.json('Product not found!');
    } else {
      product.name = name || product.name;

      product.price = price || product.price;
    }

    res.status(204).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

app.listen(3333, () => {
  console.log("Server Started");
});