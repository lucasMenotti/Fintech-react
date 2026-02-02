# fintech-react-final
# FinupX

FinupX é uma aplicação de gestão financeira completa, permitindo controle de receitas, despesas, investimentos e metas financeiras, com dashboard interativo e responsivo.

---

## Funcionalidades Principais
- **Dashboard Interativo:** Visão geral completa das finanças com gráficos dinâmicos.  
- **Gestão de Receitas:** Cadastro, edição e exclusão de receitas.  
- **Controle de Despesas:** Registro detalhado de gastos, análise por categoria e por período.  
- **Gerenciamento de Investimentos:** Registro e acompanhamento de aplicações financeiras.  
- **Metas Financeiras:** Definição de objetivos com progresso visual e prazo.  
- **Responsivo:** Compatível com desktop, tablet e mobile.  
- **Autenticação:** Sistema de login seguro.  

---

## Tecnologias Utilizadas

**Backend:** Java 17, Spring Boot 3.x, Spring Data JPA, Oracle Database, Maven  
**Frontend:** React 19.2.0, React Router DOM, Context API, Recharts, Lucide React, CSS  

---

## Estrutura do Projeto

### Frontend
```frontend/
frontend/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Modal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TotalCard.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionFormInvestimento.jsx
│   │   ├── TransactionList.jsx
│   │   └── TransactionsPage.jsx
│   │
│   ├── contexts/
│   │   ├── AuthContext.js          ← Autenticação
│   │   ├── FinanceContext.js        ← Transações (Receitas/Despesas/Investimentos)
│   │   └── MetasContext.js          ← Metas Financeiras
│   │
│   ├── pages/
│   │   ├── HomePage.jsx             ← Dashboard
│   │   ├── DespesasPage.jsx
│   │   ├── ReceitasPage.jsx
│   │   ├── InvestimentosPage.jsx
│   │   ├── MetasFinanceiras.jsx
│   │   ├── LoginPage.jsx
│   │   └── ErrorPage.jsx
│   │
│   ├── utils/
│   │   └── badgeMap.js              ← Mapeamento de cores de categorias
│   │
│   ├── styles/
│   │    └── global.css
│   │
│   ├── App.js                        ← Rotas principais
│   └── index.js                      ← Entry point
│
├── package.json
└── package-lock.json
```


### BACKEND (Spring Boot)
```
backend/
├── src/
│   ├── main/
│   │   ├── java/br/com/fiap/Fintech/
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CategoriasController.java
│   │   │   │   ├── ContasBancariasController.java
│   │   │   │   ├── DespesasController.java
│   │   │   │   ├── InvestimentosController.java
│   │   │   │   ├── MetasFinanceirasController.java
│   │   │   │   ├── ReceitasController.java
│   │   │   │   └── UsuariosController.java
│   │   │   │
│   │   │   ├── model/
│   │   │   │   ├── Categorias.java
│   │   │   │   ├── ContasBancarias.java
│   │   │   │   ├── Despesas.java
│   │   │   │   ├── Investimentos.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── MetasFinanceiras.java
│   │   │   │   ├── Receitas.java
│   │   │   │   └── Usuarios.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── CategoriasRepository.java
│   │   │   │   ├── ContasBancariasRepository.java
│   │   │   │   ├── DespesasRepository.java
│   │   │   │   ├── InvestimentosRepository.java
│   │   │   │   ├── MetasFinanceirasRepository.java
│   │   │   │   ├── ReceitasRepository.java
│   │   │   │   └── UsuariosRepository.java
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── CategoriasService.java
│   │   │   │   ├── ContasBancariasService.java
│   │   │   │   ├── DespesasService.java
│   │   │   │   ├── InvestimentosService.java
│   │   │   │   ├── MetasFinanceirasService.java
│   │   │   │   ├── ReceitasService.java
│   │   │   │   └── UsuariosService.java
│   │   │   │
│   │   │   └── FintechApplication.java  ← Main
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│       └── java/
│
├── pom.xml
└── mvnw / mvnw.cmd
```



---

## Entidades do Sistema
- **Usuário:** Informações de autenticação e perfil.  
- **Receita:** Entradas financeiras, categorização e data de recebimento.  
- **Despesa:** Gastos detalhados, categorização e análise por período.  
- **Investimento:** Registro e acompanhamento de aplicações.  
- **Meta Financeira:** Objetivos financeiros com progresso e prazo.  
- **Categoria:** Classificação de transações (Receita, Despesa, Investimento).  

---

## Instalação e Configuração

### Pré-requisitos
- Java JDK 17  
- Node.js 10+ e npm  
- Maven 3.8+  
- Acesso à instância Oracle da FIAP  
- IDE de sua preferência  

### Backend
```
git clone https://github.com/nataliak-kikuti/fintech-react-final
cd fintech/backend
mvn clean install
mvn spring-boot:run
```


## Frontend
```
cd ../frontend
npm install
npm start
```
Endpoints da API

Autenticação:
POST /api/auth/login

Receitas, Despesas, Investimentos, Metas:
CRUD completo (GET, POST, PUT, DELETE)

Adicionar valor à Meta:
POST /api/metas/{id}/adicionar-valor

Categorias:
GET /api/categorias / GET /api/categorias/tipo/{tipo}

Modelos de Dados

Receita:
```
{
  "descricao": "Salário Mensal",
  "valor": 5000.00,
  "categoria": { "id": 1 },
  "dataRecebimento": "2024-11-01",
  "usuario": { "id": 1 },
  "type": "receita"
}
```

Meta Financeira:
```

{
  "nomeMeta": "Viagem de Férias",
  "valorAlvo": 10000.00,
  "valorAtual": 3500.00,
  "dataAlvo": "2025-12-31",
  "usuario": { "id": 1 }
}
```
## Testes

** Inicie backend e frontend conforme instruções.**
Acesse http://localhost:3000.

Faça login com usuário de teste.
Navegue pelas páginas e teste funcionalidades (adicionar receita, despesa, metas, etc.).
Solução de Problemas
Erro de conexão com o banco: Verifique credenciais e firewall.
Erro CORS: Configure @CrossOrigin(origins = "http://localhost:3000") no backend.
Porta em uso: Altere server.port no backend ou defina PORT=3001 no frontend.

Scripts Úteis

Backend
# Compilar
mvn clean compile

# Executar testes
mvn test

Frontend
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm start



