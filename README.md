---

# WhatsApp Backup Service

Este projeto é uma aplicação que coleta periodicamente os últimos pedidos enviados pelo WhatsApp. A aplicação utiliza a biblioteca `whatsapp-web.js` para se comunicar com a API do WhatsApp Web e `node-cron` para agendar backups periódicos das mensagens. Os dados coletados podem ser usados para melhorar modelos de atendimento automático, como chatbots para restaurantes e outras áreas.

## Objetivo do Projeto

A ideia principal deste projeto é criar uma solução automatizada para coletar e armazenar mensagens de pedidos enviadas pelo WhatsApp. Esses dados serão utilizados para:

- Melhorar os prompts dos modelos de atendimento automático.
- Aplicar técnicas de fine-tuning em modelos de processamento de linguagem natural.
- Desenvolver insights sobre o comportamento dos usuários e suas preferências.

## Tecnologias Utilizadas

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js): Biblioteca para interagir com a API do WhatsApp Web.
- [node-cron](https://github.com/node-cron/node-cron): Biblioteca para agendar tarefas periódicas no Node.js.
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal): Biblioteca para gerar QR codes no terminal.
- [puppeteer-core](https://github.com/puppeteer/puppeteer): Biblioteca para controle do navegador Chromium.

## Funcionalidades

- **Backup periódico**: Agendamento de backups a cada 5 minutos utilizando `node-cron`.
- **Registro de usuários**: Armazena informações dos usuários que enviam mensagens.


### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/whatsapp-backup-service.git
    cd whatsapp-backup-service
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o caminho para o Chromium no arquivo principal (se necessário).

### Executando a Aplicação

1. Inicie a aplicação:
    ```bash
    node index.js
    ```

2. Escaneie o QR code exibido no terminal com o seu WhatsApp para autenticar.

3. A aplicação irá automaticamente iniciar o processo de backup a cada 5 minutos.


## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias ou correções.

---
