# ✈️ Travel.com

**Planeje sua próxima viagem com praticidade e estilo!**

O Travel.com é uma aplicação web desenvolvida com React, TypeScript e Tailwind CSS, com a proposta de oferecer uma experiência simples, moderna e intuitiva para o planejamento de viagens.

O projeto faz parte dos meus estudos de desenvolvimento front-end, com foco na construção de interfaces responsivas, gerenciamento de estados no React, navegação entre páginas e criação de animações utilizando CSS.

---

## 📌 Sobre o projeto

O Travel.com tem como objetivo permitir que o usuário informe sua localização de origem, seu destino e a data de ida para iniciar o planejamento de uma viagem.

A interface apresenta um formulário de pesquisa integrado a uma experiência visual temática, com uma animação de decolagem do avião ao iniciar o planejamento.

### Funcionalidades implementadas

- **Informação de origem:** campo para informar a cidade ou local de partida.
- **Definição do destino:** campo para informar o destino desejado.
- **Seleção de data:** campo de calendário para selecionar a data de ida, com restrição para datas anteriores ao dia atual.
- **Validação dos campos:** impede o envio do formulário quando as informações obrigatórias não foram preenchidas.
- **Navegação com parâmetros:** envia origem, destino e data para a página de passagens por meio da URL.
- **Animação de decolagem:** animação do ícone de avião ao clicar em "Planejar viagem".
- **Prevenção de cliques repetidos:** desabilita os campos e o botão durante a animação.
- **Interface responsiva:** adaptação do formulário para diferentes tamanhos de tela.
- **Identidade visual personalizada:** fundo temático, tipografia Inter, cores e efeitos visuais com Tailwind CSS.

> **Status do projeto:** em desenvolvimento. A interface e o fluxo inicial de planejamento estão sendo construídos. A pesquisa de passagens reais, incluindo preços, horários e disponibilidade, depende de uma futura integração com uma API ou serviço externo.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [React](https://react.dev/) | Construção da interface com componentes reutilizáveis. |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e maior segurança no desenvolvimento. |
| [Vite](https://vite.dev/) | Ferramenta de desenvolvimento e build da aplicação. |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização da interface com classes utilitárias e configuração CSS-first. |
| [React Router DOM](https://reactrouter.com/) | Navegação entre páginas e envio de parâmetros pela URL. |
| [Lucide React](https://lucide.dev/) | Ícones utilizados na interface. |
| CSS Animations | Criação da animação personalizada de decolagem do avião. |
| Google Fonts — Inter | Tipografia da aplicação. |

---

## 📂 Estrutura do projeto

```text
react-curso-travel/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── paisagem.png
│   │   ├── react.svg
│   │   ├── travel.png
│   │   └── vite.svg
│   ├── components/
│   │   ├── footer/
│   │   └── header/
│   │       └── Header.tsx
│   ├── pages/
│   │   ├── auth/
│   │   └── home/
│   │       └── Home.tsx
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

**Observação:** a estrutura acima representa a organização registrada durante o desenvolvimento. A página de passagens deverá ser adicionada à pasta `src/pages` quando implementada, caso ainda não exista.

### Organização das pastas

- `public/`: arquivos públicos, como ícones e recursos estáticos.
- `src/assets/`: imagens e recursos visuais utilizados na interface.
- `src/components/`: componentes reutilizáveis, como cabeçalho e rodapé.
- `src/pages/`: páginas da aplicação, organizadas por funcionalidade.
- `src/pages/auth/`: espaço destinado às páginas de autenticação, como login e cadastro.
- `src/pages/home/Home.tsx`: página inicial e formulário de planejamento.
- `src/App.tsx`: componente principal da aplicação.
- `src/index.css`: estilos globais, configuração do Tailwind CSS, fonte, imagem de fundo e animações.
- `src/main.tsx`: ponto de entrada da aplicação React.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/) — versão compatível com as dependências instaladas.
- npm, normalmente instalado junto com o Node.js.
- Um editor de código, como o [Visual Studio Code](https://code.visualstudio.com/).
- Git, caso queira versionar o projeto.

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

Caso o projeto esteja disponível em um repositório Git:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd react-curso-travel
```

Substitua `URL_DO_REPOSITORIO` pelo endereço real do repositório.

Se o projeto já estiver em seu computador, basta abrir a pasta correspondente no terminal.

### 2. Instalar as dependências

```bash
npm install
```

Esse comando instala as dependências declaradas no `package.json`.

### 3. Executar em ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, geralmente:

```text
http://localhost:5173
```

### 4. Gerar a versão de produção

```bash
npm run build
```

O comando gera a versão otimizada da aplicação para produção.

Para verificar a versão gerada localmente, caso o script esteja disponível no `package.json`:

```bash
npm run preview
```

---

## 🎨 Configuração do Tailwind CSS v4

O projeto utiliza a abordagem CSS-first do Tailwind CSS v4. As configurações de fonte, imagem de fundo e animação são declaradas no arquivo `src/index.css`.

Exemplo da configuração utilizada:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

@import "tailwindcss";

@theme {
  --font-inter: "Inter", sans-serif;
  --background-image-fundo: url("/src/assets/paisagem.png");
  --animate-decolar: decolar 1s ease-in forwards;
}
```

A variável `--font-inter` permite utilizar a classe `font-inter`, enquanto `--background-image-fundo` disponibiliza a classe `bg-fundo`.

A variável `--animate-decolar` registra a animação personalizada para utilização pela classe `animate-decolar`.

### Animação do avião

A animação é definida com CSS:

```css
@keyframes decolar {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }

  30% {
    transform: translate(15px, -10px) rotate(-10deg);
    opacity: 1;
  }

  100% {
    transform: translate(120px, -100px) rotate(-25deg);
    opacity: 0;
  }
}
```

O efeito desloca o ícone diagonalmente para cima e para a direita, altera sua rotação e reduz sua opacidade até desaparecer.

---

## 🧭 Fluxo de planejamento de viagem

A página inicial utiliza campos controlados pelo React com o hook `useState`.

O fluxo funciona da seguinte maneira:

1. O usuário informa a origem.
2. Seleciona ou informa o destino.
3. Escolhe a data de ida.
4. Clica em **Planejar viagem**.
5. A aplicação valida os campos obrigatórios.
6. O ícone do avião inicia a animação de decolagem.
7. Após a animação, a aplicação navega para a página de passagens, levando os parâmetros informados na URL.

Exemplo de URL:

```text
/passagens?origem=Potim&destino=Salvador&dataIda=2026-11-20
```

Os parâmetros são construídos utilizando `URLSearchParams`, que codifica os valores de forma apropriada para a URL.

### Recuperando os parâmetros

Na página de passagens, o React Router permite recuperar as informações enviadas:

```tsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();

const origem = searchParams.get("origem") ?? "";
const destino = searchParams.get("destino") ?? "";
const dataIda = searchParams.get("dataIda") ?? "";
```

Esses valores podem ser utilizados para apresentar o trajeto selecionado e preparar uma futura consulta de voos.

**Importante:** a navegação por parâmetros não realiza, por si só, uma pesquisa de passagens aéreas. Para consultar voos reais, será necessário integrar uma API ou um serviço de pesquisa de viagens.

---

## 🧩 Conceitos de desenvolvimento aplicados

Durante o desenvolvimento do Travel.com, são praticados conceitos importantes do ecossistema React:

- **Componentização:** organização da interface em componentes.
- **Hooks:** gerenciamento de estado com `useState` e navegação com `useNavigate`.
- **Formulários controlados:** sincronização dos campos com o estado da aplicação.
- **Validação:** verificação de informações obrigatórias antes do envio.
- **Roteamento:** navegação entre páginas com React Router DOM.
- **Manipulação de URLs:** transmissão de informações por meio de parâmetros de consulta.
- **Animações CSS:** utilização de `@keyframes`, transformações e opacidade.
- **Design responsivo:** adaptação da interface com breakpoints do Tailwind CSS.
- **Estilização CSS-first:** configuração de tokens e animações com o Tailwind CSS v4.
- **TypeScript:** utilização de tipos para apoiar a manutenção e a confiabilidade do código.

---

## 🔮 Próximas melhorias

As funcionalidades abaixo representam possibilidades de evolução do projeto:

- [ ] Implementar a página de resultados de passagens.
- [ ] Integrar uma API de voos para consultar preços, horários e disponibilidade.
- [ ] Exibir resultados com informações sobre companhias aéreas, duração e escalas.
- [ ] Permitir selecionar a quantidade de passageiros.
- [ ] Adicionar a opção de data de volta.
- [ ] Criar filtros e ordenação dos resultados.
- [ ] Desenvolver páginas de login e cadastro.
- [ ] Implementar o compartilhamento de viagens com amigos.
- [ ] Criar uma área para consultar e gerenciar viagens planejadas.
- [ ] Aprimorar a experiência em dispositivos móveis.
- [ ] Adicionar testes para os componentes e fluxos principais.
- [ ] Preparar o projeto para publicação em um serviço de hospedagem.

Essas melhorias dependem das necessidades definidas para as próximas etapas do desenvolvimento.

---

## 👨‍💻 Autor

**Vanderson Junior**

Projeto desenvolvido como parte dos estudos em desenvolvimento front-end, com foco em React, TypeScript e Tailwind CSS.

- GitHub: [(https://github.com/VandersonJr)]
- LinkedIn: [(https://www.linkedin.com/in/vandersonsjr)]
- Portfólio: [(https://www.vandersonjrdev.com.br/)]

---

## 📄 Licença

Este projeto possui finalidade educacional e de aprendizado. Uma licença específica poderá ser definida conforme a intenção de distribuição e reutilização do código.

