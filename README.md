**NatureLens** é uma aplicação que identifica espécies de plantas e animais a partir de imagens, utilizando IA e integração com APIs como Google Gemini Vision Pro e GBIF, promovendo a conscientização ambiental.

# FrontEnd do Projeto

![Captura de tela 2024-10-07 114232](https://github.com/user-attachments/assets/3dc01552-faf0-4a2c-9bdb-5a7609f22d22)
![Captura de tela 2024-10-07 113704](https://github.com/user-attachments/assets/aa7a6b69-9877-4ce2-b809-f4f0c0c2609a)
![Captura de tela 2024-10-07 115731](https://github.com/user-attachments/assets/e7c01703-7578-41aa-81ea-3a137c0590b6)

# BackEnd do Projeto

![Captura de tela 2024-10-07 111610](https://github.com/user-attachments/assets/38b5339e-0837-41f5-b968-a2af1daae8b0)

## Início Rápido

### Pré-requisitos

Para instalar o software: npm install naturelens.

### Instalação

Clone o repositório: git clone https://github.com/NatureLens/naturelens.git.

Instale as dependências: npm install.

Configure o banco de dados com as credenciais da API.

## Uso

Para enviar uma imagem para identificação, use: upload_image('imagem.jpg').

## Funcionalidades

- **Identificação de espécies:** O usuário faz upload de uma imagem, e o sistema identifica se é uma planta ou animal, retornando detalhes como nome científico e habitat.
- **Login via Google OAuth:** O sistema permite login via Google para uma experiência segura.
- **Interface de chat com IA:** O usuário pode interagir com a IA após o upload da imagem.


## Créditos

- **Nome do autor** João Paulo Nolasco e Ayrton Guimarães

## FAQ

**Pergunta 1:** Como funciona a identificação de espécies?  
**Resposta:** O NatureLens utiliza inteligência artificial, através do Google Gemini Vision Pro, para analisar a imagem enviada pelo usuário e identificar se é uma planta ou um animal, retornando informações detalhadas sobre a espécie.

**Pergunta 2:** O NatureLens coleta dados pessoais?

**Resposta:** Sim, a autenticação via Google OAuth pode coletar informações básicas do perfil do usuário, mas essas informações são utilizadas apenas para fins de personalização e não são compartilhadas com terceiros.

## Estado do Projeto

Este projeto está em desenvolvimento ativo. Você pode esperar mudanças frequentes e atualizações.


