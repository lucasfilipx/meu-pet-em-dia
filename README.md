📚 Projeto Integrador - Meu Pet em Dia 🐶 

Este repositório contém o código-fonte, a documentação e a prova de conceito do sistema Meu Pet em Dia, desenvolvido para solucionar a desorganização e a sobrecarga mental dos tutores de animais de estimação.

A entrega foca na validação técnica de uma Aplicação Web Progressiva responsiva, com integração real a banco de dados em nuvem e funcionalidades de gestão de saúde e bem-estar animal.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
👥 Integrantes do Grupo

Lucas Filipe Ferreira Rodrigues

João Paulo Vieira Ferreira

João Pedro Thomazini Miranda


---------------------------------------------------------------------------------------------------------------------------------------------------------------------
🧭 Sobre o Sistema

O Meu Pet em Dia é uma plataforma centralizada de gestão pet, desenhada para resolver dores como o esquecimento de vacinas, a falta de controle sobre a rotina diária e a dificuldade em gerenciar suprimentos. O sistema opera sob uma arquitetura responsiva que se adapta a desktops (visualização dashboard) e dispositivos móveis (visualização app).

O sistema permite que o tutor realize:

Gestão Clínica: Controle rigoroso de vacinas e exames.

Controle de Rotina: Checklist diário de atividades (passeios, remédios, higiene).

Gestão de Nutrição: Monitoramento visual de níveis de ração e água, com cálculo preditivo de estoque.

Marketplace Integrado: Sugestão e compra de produtos essenciais com carrinho de compras funcional.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
📂 Estrutura do Repositório:

/src

  ├── App.jsx            # Código-fonte principal (Lógica + UI)
  
  ├── App.css            # Estilização Global (Clean UI / Design System)
  
  └── main.jsx           # Ponto de entrada da aplicação React
  
/public                  

README.md                # Documentação do projeto

package.json             # Dependências e scripts

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
🎯 Funcionalidades e Casos de Uso
O protótipo funcional cobre os seguintes fluxos críticos da jornada do usuário:

✔ Caso 01 – Prontuário Médico Digital
Objetivo: Eliminar a perda de carteirinhas de vacinação físicas.

Cadastro de novas vacinas e exames com data prevista.
Visualização de status: Pendente (Amarelo) vs Realizada (Verde).
Atualização de status em tempo real no banco de dados.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
✔ Caso 02 – Gestão de Rotina Diária
Objetivo: Criar consistência nos cuidados do animal.

Criação de tarefas recorrentes (ex: "Dar remédio 14h").
Checklist interativo para marcar atividades como concluídas.
Persistência de dados para acompanhamento histórico.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
✔ Caso 03 – Painel de Nutrição Inteligente
Objetivo: Evitar que a ração acabe inesperadamente.

Monitoramento de Potes: Sliders visuais para indicar nível atual de água e comida.
Cálculo de Estoque: Algoritmo que cruza o peso do pacote (kg) com o consumo diário do pet para projetar quantas semanas de comida restam.
Alertas Visuais: Gráficos circulares e avisos de reposição.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
✔ Caso 04 – Marketplace & Carrinho
Objetivo: Facilitar a reposição de itens essenciais.

Catálogo de produtos curados (Ração, Brinquedos, Higiene).
Adição de itens ao carrinho de compras.
Visualização de total e simulação de checkout.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
🛠 Tecnologias Utilizadas
O projeto foi desenvolvido utilizando uma stack moderna e "Serverless" para garantir agilidade e performance:

Frontend: React.js + Vite (Alta performance e componentização).

Backend & Database: Supabase (PostgreSQL as a Service para persistência de dados em tempo real).

Estilização: CSS3 Moderno (Design System próprio, responsividade via Flexbox/Grid e variáveis CSS).

Ícones: Emojis nativos e SVG para performance leve.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
🖼 Interface do Usuário (UI/UX)
O design segue o conceito "Clean Medical", priorizando a legibilidade e a confiança:

Paleta de Cores: Fundo Slate-50 para conforto visual, com acentos em Indigo (Ação) e Emerald (Sucesso).

Responsividade Híbrida.

Desktop: Menu lateral fixo e layout em Grid Dashboard.

Mobile: Menu de navegação inferior (Bottom Bar) e layout em lista (Stack).

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
📄 Como executar o projeto
Para rodar este projeto localmente ou em ambiente de desenvolvimento:

Clone o repositório:

git clone https://github.com/SEU_USUARIO/clean-pet-poc.git


Instale as dependências:

npm install

Configure as Variáveis de Ambiente: Crie um arquivo .env e adicione suas chaves do Supabase:


Snippet de código:

VITE_SUPABASE_URL=sua_url_aqui

VITE_SUPABASE_ANON_KEY=sua_chave_aqui


Execute o servidor local:

npm run dev

Acesse: http://localhost:5173

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
📜 Licença
Uso acadêmico — Projeto Integrador SENAC.
