# Análise Financeira Diária

Este é um aplicativo web React para realizar uma análise financeira diária simulada, incorporando dados de B3, criptomoedas e bolsa americana, além de considerar fatores políticos e geopolíticos. Ele também inclui uma integração com a API do Gemini para detalhamento de recomendações e respostas a perguntas financeiras.

## Funcionalidades

- **Análise Financeira Simulada:** Coleta e apresenta dados simulados da B3 (PETR4), Bitcoin e IBM (bolsa americana).
- **Análise Política e Geopolítica Simulada:** Incorpora um sentimento aleatório para cenários político-brasileiro e geopolítico global.
- **Recomendações de Investimento:** Gera recomendações básicas com base nas análises financeiras, políticas e geopolíticas.
- **Integração com Gemini API:** Permite detalhar as recomendações geradas e responder a perguntas financeiras gerais utilizando o modelo Gemini.

## Configuração e Execução Local

Para configurar e executar este projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o pnpm (ou npm/yarn) instalados em sua máquina.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
    cd <YOUR_REPOSITORY_NAME>
    ```
    *Substitua `<YOUR_GITHUB_USERNAME>` pelo seu nome de usuário do GitHub e `<YOUR_REPOSITORY_NAME>` pelo nome do seu repositório.*

2.  **Instale as dependências:**
    ```bash
    pnpm install
    # ou npm install
    # ou yarn install
    ```

### Configuração da Chave de API do Gemini

Para que a integração com a API do Gemini funcione, você precisará de uma chave de API válida. Esta chave **não deve ser exposta publicamente** no código-fonte. Recomenda-se usar variáveis de ambiente para gerenciá-la.

No código atual (`src/App.jsx`), a chave de API está definida como uma string vazia:

```javascript
const apiKey = ""; // A chave de API será fornecida pelo ambiente Canvas
```

Para uso local, você pode temporariamente inserir sua chave diretamente para testes, mas **NUNCA faça commit de chaves de API diretamente no Git**.

Para implantação em produção, você deve configurar a chave de API como uma variável de ambiente na plataforma de hospedagem (Vercel, Netlify, etc.).

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
pnpm run dev
# ou npm run dev
# ou yarn dev
```

O aplicativo estará disponível em `http://localhost:5173/` (ou outra porta, se 5173 estiver em uso).

## Implantação no GitHub Pages

Este projeto está configurado para ser facilmente implantado no GitHub Pages.

### 1. Configure a `homepage` no `package.json`

No arquivo `package.json`, certifique-se de que a propriedade `homepage` esteja configurada corretamente para o seu repositório GitHub Pages:

```json
"homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>",
```

### 2. Instale `gh-pages`

Certifique-se de que a dependência `gh-pages` esteja instalada:

```bash
pnpm install gh-pages --save-dev
# ou npm install gh-pages --save-dev
# ou yarn add gh-pages --dev
```

### 3. Adicione os scripts de deploy

No `package.json`, os scripts `predeploy` e `deploy` já foram adicionados:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},
```

### 4. Faça o deploy

Para fazer o deploy da sua aplicação para o GitHub Pages, execute o seguinte comando:

```bash
pnpm run deploy
# ou npm run deploy
# ou yarn deploy
```

Isso irá construir sua aplicação e enviá-la para a branch `gh-pages` do seu repositório. O site estará disponível no URL configurado na propriedade `homepage`.

## Estrutura do Projeto

-   `public/`: Arquivos estáticos.
-   `src/`: Código-fonte da aplicação React.
    -   `App.jsx`: Componente principal da aplicação, contendo a lógica de análise e a interface do usuário.
    -   `index.css`: Estilos globais, incluindo a importação do Tailwind CSS.
-   `vite.config.js`: Configuração do Vite (bundler).
-   `package.json`: Metadados do projeto e dependências.

## Limitações e Melhorias Futuras

-   Os dados financeiros, políticos e geopolíticos são simulados. Para uma análise real, seria necessário integrar APIs de dados financeiros e fontes de notícias/análise de sentimento.
-   O algoritmo de recomendação é simplificado e pode ser aprimorado com modelos mais sofisticados.
-   A chave de API do Gemini deve ser gerenciada de forma mais segura em um ambiente de produção (ex: variáveis de ambiente).

