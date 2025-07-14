const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html')); 
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    const htmlResposta = `
    <html>
        <head>
            <title>Recebemos sua sugestão!</title>
            <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body class="sugestao">
            <section>
                <h1>Obrigado, ${nome}!</h1>
                <p>Ingredientes: ${ingredientes}</p>
                <a href="/">Voltar</a>
            </section>
        </body>
    </html>
    `;

    res.status(200).send(htmlResposta);
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    const htmlResposta = `
    <html>
        <head>
            <title>Mensagem Recebida</title>
            <link rel="stylesheet" href="/css/style.css" />
        </head>
        <body class="contato">
            <section>
                <h1>Mensagem Recebida com Sucesso!</h1>
                <div>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                </div>
                <a href="/">Voltar para a página inicial</a>
            </section>
        </body>
    </html>
    `;

    res.status(200).send(htmlResposta);
});

app.get('/api/lanches', (req, res) => {
    const lanches = require(path.join(__dirname, 'public', 'data', 'lanches.json'));
    
    // Estética da exibição do JSON 
    const jsonFormatado = JSON.stringify(lanches, null, 3);
    res.type('application/json');
    res.send(jsonFormatado);
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
