const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = twilio(accountSid, authToken);


app.post('/whatsapp', (req, res) => {
    console.log(`entrou aqui`);
    const message = req.body.Body;
    const sender = req.body.To;
  
    // Define a mensagem de resposta da assistente virtual
    const response = 'Olá! Essa é uma mensagem virtual via API twilio (: .' + message;
  
    // Envia a mensagem de resposta para o remetente
    client.messages.create({
      from: 'whatsapp:+14155238886', // O número do Twilio Sandbox para WhatsApp
      to: sender,
      body: response,
    })
    .then(() => {
      res.send('Mensagem enviada!');
    })
    .catch((error) => {
      console.error(error);
      res.send('Ocorreu um erro ao enviar a mensagem.');
    });
  });
  
  // Inicia o servidor web
  app.listen(3000, () => {
    console.log('Servidor web iniciado na porta 3000!');
  });