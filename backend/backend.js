// backend/backend.js

/* 
importando todas as bibliotecas que vou usar.
o axios sinceramente so estou usando pois foi recomendação
 */
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

/* 
  inicializando a aplicação do express
 */
const app = express()
// definindo o json
app.use(express.json())

// definindo a porta
const PORT = 3000;

//percebi que sem definir um header para o axios, o site da amazon não abri e gera erro antes de pegar os produtos
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
};

//geralmente todos acessam a rota principal da aplicação, por isso uma breve mensagem explicando dentro da aplicação qual a rota correta
app.get("/", (req, res) => {
  return res.json({
    message: "seja bem vindo ao backend, use a rota /api/scrape para pegar dados da amazon e passe a palavra chave como query",
  }).status(200)
})

app.get('/api/scrape', async (req, res) => {
  try {
    //poderia usar o query do red ou simplesmente uma rota para passar a palavra chave
    const keyword = req.query.keyword;
    const url = `https://www.amazon.com/s?k=${keyword}`;

    // Usando o axios para fazer a requisição
    const response = await axios.get(url, { headers });
    //carrengando o html
    const html = response.data;

    // convertendo para o cheerio
    const $ = cheerio.load(html);

    // Extraindo os detalhes dos produtos para uma lista
    const products = [];
    $('.s-result-item').each((index, element) => {
      const title = $(element).find('.a-text-normal').text().trim();
      const rating = $(element).find('.a-icon-star-small').text().trim();
      const numReviews = $(element).find('.a-size-small .a-link-normal').text().trim();
      const imageURL = $(element).find('.s-image').attr('src');

      products.push({
        title,
        rating,
        numReviews,
        imageURL
      });
    });

    return res.json(products).status(200);
  } catch (error) {
    console.error('Error scraping data:', error);
    return res.status(500).json({ error: 'Failed to scrape data from Amazon' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀  Server is running on port ${PORT}`);
});