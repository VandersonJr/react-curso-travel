# ✈️ Travel.com

> Planeje sua próxima viagem com praticidade, descubra destinos e explore opções de passagens e hospedagens em uma única interface.

O **Travel.com** é uma aplicação web de planejamento de viagens desenvolvida com **React, TypeScript, Vite e Tailwind CSS v4**. O projeto começou como prática de desenvolvimento front-end e evoluiu para uma interface com páginas independentes, navegação entre rotas, formulários de pesquisa, cards de resultados, filtros e telas de autenticação.

🔗 **Repositório:** [VandersonJr/react-curso-travel](https://github.com/VandersonJr/react-curso-travel)

---

## 📑 Índice

- [Visão geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Rotas da aplicação](#-rotas-da-aplicação)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Executar localmente](#-executar-localmente)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Detalhes de implementação](#-detalhes-de-implementação)
- [Limitações atuais](#-limitações-atuais)
- [Possíveis evoluções](#-possíveis-evoluções)
- [Autor](#-autor)

## 🌎 Visão geral

O Travel.com apresenta uma experiência visual voltada ao planejamento de viagens. A interface utiliza um tema escuro, detalhes em verde-lima, tipografia Inter, imagens temáticas, painéis com efeito de vidro e componentes adaptáveis a diferentes tamanhos de tela.

A aplicação está organizada em páginas e componentes reutilizáveis. As pesquisas mantêm seus parâmetros na URL, permitindo que os dados informados sejam representados no endereço da página e recuperados quando a tela é carregada.

## ✨ Funcionalidades

### Página inicial
- Formulário para informar origem, destino e data de ida.
- Validação dos campos obrigatórios e restrição da data para não selecionar dias anteriores ao atual.
- Animação de decolagem no ícone de avião ao iniciar o planejamento.
- Bloqueio temporário dos controles durante a animação, evitando envios repetidos.
- Navegação para a página de passagens com os dados da pesquisa na URL.
- Cards com sugestões de viagens.

### Passagens aéreas
- Formulário de pesquisa com origem, destino e datas.
- Suporte visual para modalidades de viagem, passageiros e classe de cabine.
- Exibição de resultados em cards com informações de voo.
- Filtros por companhia aérea, quantidade de paradas e faixa de preço.
- Ordenação dos resultados por critérios disponíveis na interface, como preço, duração e horário.
- Modal com detalhes do voo selecionado.
- Cards de destinos sugeridos.
- Possibilidade de limpar a pesquisa e os parâmetros da URL.

### Hospedagem
- Pesquisa por destino, datas de check-in e check-out e quantidade de hóspedes.
- Validação dos campos obrigatórios.
- Exibição de opções de hospedagem em componentes de resultados.
- Visualização de detalhes da opção selecionada.
- Limpeza dos campos de pesquisa e dos parâmetros da URL.

### Destinos
- Página dedicada à descoberta de destinos.
- Campo de pesquisa por destino.
- Exibição de resultados e detalhes do destino selecionado.
- Cards com imagens e informações de destinos.

### Novidades
- Página com conteúdo relacionado a viagens.
- Pesquisa de conteúdo por termo.
- Exibição de resultados em componentes próprios.
- Visualização de detalhes de um artigo ou conteúdo selecionado.

### Login e cadastro
- Páginas de login e cadastro.
- Formulário de login com e-mail e senha.
- Formulário de cadastro com nome, e-mail, senha, confirmação de senha e aceite dos termos.
- Validação de campos obrigatórios e da confirmação de senha.
- Fluxo de interface para exibição do usuário após a conclusão simulada do formulário.

### Interface e experiência de uso
- Layout responsivo para diferentes tamanhos de tela.
- Componentes reutilizáveis para cabeçalho, rodapé, formulários, cards e resultados.
- Navegação com React Router DOM.
- Ícones da biblioteca Lucide React.
- Tema escuro com cores e estilos compartilhados.
- Animações e efeitos visuais definidos em CSS.
- Suporte à preferência do sistema por redução de movimento.

## 🧰 Tecnologias

| Tecnologia | Utilização |
|---|---|
| [React](https://react.dev/) | Construção da interface com componentes e estado. |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem de dados, propriedades e estados. |
| [Vite](https://vite.dev/) | Servidor de desenvolvimento e build da aplicação. |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária e tokens de tema definidos em CSS. |
| [React Router DOM](https://reactrouter.com/) | Configuração das rotas e navegação entre páginas. |
| [Lucide React](https://lucide.dev/) | Ícones da interface. |
| [ESLint](https://eslint.org/) | Análise estática e padronização do código. |
| [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) | Tipografia da aplicação. |

## 🧭 Rotas da aplicação

As rotas são configuradas em `src/App.tsx`.

| Caminho | Página |
|---|---|
| `/` | Página inicial e planejamento de viagem |
| `/passagens` | Pesquisa e resultados de passagens aéreas |
| `/hospedagem` | Pesquisa e resultados de hospedagem |
| `/destinos` | Exploração e pesquisa de destinos |
| `/novidades` | Conteúdos e novidades sobre viagens |
| `/login` | Acesso à conta |
| `/cadastro` | Criação de conta |

Algumas páginas utilizam parâmetros de consulta na URL. Exemplos:

```text
/passagens?origem=São%20Paulo&destino=Rio%20de%20Janeiro&dataIda=2026-11-15
/hospedagem?destino=Rio%20de%20Janeiro&checkIn=2026-11-15&checkOut=2026-11-20&hospedes=2
/destinos?pesquisa=Salvador
/novidades?pesquisa=praias
```

Os parâmetros acima são exemplos ilustrativos; os valores dependem das informações preenchidas pelo usuário.

## 📁 Estrutura do projeto

A estrutura abaixo corresponde aos principais arquivos e diretórios existentes no repositório:

```text
react-curso-travel/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── download.svg
│   │   ├── fundo2.png
│   │   ├── hero.png
│   │   ├── images.jpg
│   │   ├── paisagem.png
│   │   ├── travel.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── destinos/
│   │   │   └── HasSearchedDestinos.tsx
│   │   ├── footer/
│   │   │   └── Footer.tsx
│   │   ├── header/
│   │   │   └── Header.tsx
│   │   ├── hospedagem/
│   │   │   └── HasSearchedHospedagem.tsx
│   │   ├── novidades/
│   │   │   └── HasSearchedNovidades.tsx
│   │   ├── passagens/
│   │   │   ├── DestinationCard.tsx
│   │   │   ├── FlightCard.tsx
│   │   │   ├── FlightFilters.tsx
│   │   │   ├── FlightSearch.tsx
│   │   │   └── HasSearched.tsx
│   │   └── sugestoes/
│   │       └── SugestoesViagem.tsx
│   ├── data/
│   │   └── Flights.ts
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Cadastro.tsx
│   │   │   └── Login.tsx
│   │   ├── destinos/
│   │   │   └── Destinos.tsx
│   │   ├── home/
│   │   │   └── Home.tsx
│   │   ├── hospedagem/
│   │   │   └── Hospedagem.tsx
│   │   ├── novidades/
│   │   │   └── Novidades.tsx
│   │   └── passagens/
│   │       └── Passagens.tsx
│   ├── types/
│   │   └── Travel.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

### Responsabilidade dos principais diretórios

- `src/pages/`: páginas completas acessadas pelas rotas.
- `src/components/`: elementos reutilizáveis, formulários e componentes de resultados.
- `src/data/Flights.ts`: dados de demonstração de voos e destinos e função de formatação de moeda.
- `src/types/Travel.ts`: tipos TypeScript relacionados a viagens, voos, destinos, passageiros e filtros.
- `src/assets/`: imagens e recursos visuais importados pela aplicação.
- `src/index.css`: estilos globais, tema Tailwind, cores, imagens de fundo, animações e ajustes de acessibilidade.
- `src/App.tsx`: composição geral da aplicação, incluindo cabeçalho, rotas e rodapé.
- `src/main.tsx`: ponto de entrada que inicializa a aplicação React.

## ⚙️ Executar localmente

### Pré-requisitos

Instale as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão compatível com o Vite e as dependências do projeto).
- npm, incluído na instalação do Node.js.
- [Git](https://git-scm.com/) para clonar o repositório.
- Um editor de código, como [Visual Studio Code](https://code.visualstudio.com/).

### 1. Clone o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/VandersonJr/react-curso-travel.git
```

Entre na pasta do projeto — é importante executar os comandos npm dentro do diretório que contém o `package.json`:

```bash
cd react-curso-travel
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Abra esse endereço no navegador.

### 4. Gere a versão de produção

```bash
npm run build
```

Esse comando executa a verificação de tipos do TypeScript e gera os arquivos otimizados da aplicação.

Para visualizar localmente a versão de produção:

```bash
npm run preview
```

## 📜 Scripts disponíveis

Os comandos abaixo estão definidos no `package.json`:

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Verifica os projetos TypeScript e gera o build de produção. |
| `npm run lint` | Executa o ESLint para analisar o código. |
| `npm run preview` | Serve localmente o build de produção para conferência. |

## 🧩 Detalhes de implementação

### Tailwind CSS v4 e tema visual

A configuração do Tailwind CSS utiliza a abordagem CSS-first no arquivo `src/index.css`, com `@import "tailwindcss"` e `@theme`. Entre os tokens definidos estão:

- Fonte `Inter`.
- Imagens de fundo para a página inicial e páginas internas.
- Cores de marca em verde-lima, fundo escuro, cards, bordas e campos de entrada.
- Animação personalizada `decolar`, utilizada pelo ícone de avião.

A interface também utiliza classes utilitárias para responsividade, estados de interação, contraste, espaçamento e organização dos componentes.

### Formulários e estado

As páginas usam o estado do React para acompanhar os valores dos campos, controlar a exibição dos resultados e gerenciar itens selecionados. As pesquisas são validadas antes de serem processadas e os valores relevantes podem ser registrados nos parâmetros da URL.

### Dados de demonstração

Os dados de voos e destinos estão organizados em `src/data/Flights.ts`, enquanto os tipos compartilhados ficam em `src/types/Travel.ts`. Essa separação ajuda a manter os componentes de interface independentes dos dados que exibem.

### Componentização

As telas foram divididas em componentes específicos, por exemplo:

- `FlightSearch`: formulário de pesquisa de passagens.
- `FlightFilters`: controles de filtro dos resultados.
- `FlightCard`: apresentação de um voo.
- `DestinationCard`: apresentação de um destino.
- `HasSearched`: área de resultados de passagens após a pesquisa.
- `LoginForm` e `RegisterForm`: formulários de autenticação.
- `Header` e `Footer`: elementos compartilhados entre as páginas.

Essa organização facilita a manutenção e permite evoluir partes da aplicação sem concentrar toda a lógica em um único arquivo.

## ⚠️ Limitações atuais

O projeto está em desenvolvimento e prioriza, neste momento, a interface e os fluxos front-end. É importante considerar que:

- **Voos, destinos, hospedagens e conteúdos exibidos são demonstrativos** e não representam necessariamente disponibilidade, preços ou condições em tempo real.
- **Não há integração configurada com uma API real de companhias aéreas, hotéis ou reservas** no código atual.
- **Os formulários de login e cadastro simulam o fluxo no front-end**; não existe autenticação segura com servidor, banco de dados ou persistência de contas implementada nesta versão.
- O preenchimento e a alteração de parâmetros na URL ajudam a representar a pesquisa, mas não substituem a integração com um serviço de dados real.
- O projeto não conclui compras, reservas ou pagamentos.

Não utilize os resultados demonstrativos como informações comerciais reais.

## 🚀 Possíveis evoluções

- [ ] Integrar APIs de voos, hospedagem, destinos e notícias.
- [ ] Implementar autenticação real, validação no servidor e persistência segura de usuários.
- [ ] Salvar pesquisas e viagens favoritas.
- [ ] Criar fluxo de reserva e acompanhar seus estados, quando houver integração com provedores.
- [ ] Aprimorar testes automatizados para componentes e formulários.
- [ ] Melhorar feedbacks de erro, carregamento e estados vazios.
- [ ] Realizar auditorias de acessibilidade e desempenho.
- [ ] Configurar publicação contínua e hospedagem de produção.

## 👨‍💻 Autor

**Vanderson Junior**

Projeto desenvolvido para estudo e prática de desenvolvimento front-end com React, TypeScript e Tailwind CSS.

- **GitHub:** [VandersonJr](https://github.com/VandersonJr)
- **LinkedIn:** [Vanderson Junior](https://www.linkedin.com/in/vandersonsjr)
- **Portfólio:** [vandersonjrdev.com.br](https://www.vandersonjrdev.com.br/)

---

## 📄 Licença

Este repositório não declara uma licença de distribuição específica no momento. Antes de reutilizar ou redistribuir o código, verifique as condições aplicáveis ao repositório.
