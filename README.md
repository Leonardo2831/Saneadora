# Saneadora - Certidão de Situação Jurídica

## 📄 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de otimizar e facilitar  em meu trabalho, no cartório de registro de imóveis. A ferramenta "Saneadora" automotiza e organiza a criação de **Certidões de Situação Jurídica**, garantindo maior agilidade, padronização e redução de erros no processo de análise de matrículas, sendo um processo mais prático e eficiente.

O sistema permite o cadastro estruturado de informações da matrícula (proprietários, ônus, números cadastrais, estremações, etc.) e gera automaticamente o texto final da certidão com base nos dados inseridos.

## 🚀 Funcionalidades Principais

-   **Cadastro de Matrícula:** Interface intuitiva para inserção de dados da matrícula.
-   **Gestão de Proprietários:** Adição e controle de proprietários e seus respectivos atos.
-   **Controle de Ônus e Gravames:** Registro detalhado de hipotecas, penhoras, servidões, etc.
-   **Cálculos Automáticos:** Soma de áreas e porcentagens para validação dos registros.
-   **Geração de Texto:** Criação automática do texto da certidão formatado para uso.
-   **Persistência de Dados:** Salvamento local das certidões para consultas futuras.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** HTML5, CSS3 (Com Tailwind CSS V4.1)
-   **Linguagem:** TypeScript (JavaScript)
-   **Editor de Texto:** Quill.js (Para formatação do texto inicial da matrícula)

## 📚 O que Aprendi

Nesta seção, compartilho os principais desafios e conhecimentos adquiridos durante o desenvolvimento deste projeto:

-   **Criação de Design com IA:** O design iniciamente usado para projeto foi feito com a *IA stitch* da *Google* e posteriormente repassado ao figma para detalhes finais.
-   **Manipulação do DOM:** Aprendi a manipular o DOM para criar e atualizar a interface do usuário principalmente no uso de salvar dados em JSON.
-   **TypeScript Avançado:** Aprendi a usar interfaces, tipos genéricos, etc. Sendo um grande início no *TypeScript*.
-   **Arquitetura de Projetos:** Utilizei uma nova arquitetura, usando a pasta public para a interface e a pasta src para o código back-end que será adicionado no futuro.
-   **Integração com Bibliotecas:** Aprendi a integrar a biblioteca *Quill.js* e utilizar várias funções relacionadas a ele.
-   **Gerenciamento de Estados:** Aprendi o conceito de UseState sem utilizar *React*, trazendo uma classe que salva os estados das seções parq quando haver alguma alteração, seja possível utilizar um *ctrl + z* para desfazer alterações feitas. Infelizmente não ficou vigente por agora no projeto, já que preciso de mais conhecimentos para trazer melhorias para ele.

## 📸 Screenshots do Projeto

### Design inicial utilizando IA para criação 
![Imagens Referente ao Design do Projeto](<img width="875" height="549" alt="image" src="https://github.com/user-attachments/assets/7d3b9abb-5dfc-4cd1-bcbe-1eb8f9309c44" />
)
(<img width="958" height="756" alt="image" src="https://github.com/user-attachments/assets/123d5bd4-0f8e-4d02-9878-e351463cd592" />
)

### Tela Inicial / Cadastro

![Tela de Cadastro](<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/e3da264f-0767-4a9f-815f-12e108a7b734" />
)

### Modal de Criação de Valores

![Modal Novo Valor](<img width="1905" height="919" alt="image" src="https://github.com/user-attachments/assets/1438e09c-8519-413e-ad85-6f22ffdbb527" />
)

### Texto Gerado

![Texto Gerado](<img width="1904" height="918" alt="image" src="https://github.com/user-attachments/assets/775503da-a2c2-4a02-a613-39c829659207" />
)

## 🔧 Como Executar o Projeto

1.  Clone este repositório:
    ```bash
    git clone https://github.com/seu-usuario/projeto-saneadora.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run server
    ```
4.  Caso necessário, Compile o TypeScript (em outro terminal):
    ```bash
    npm run ts
    ```
5.  Caso necessário, Compile o Tailwind (em outro terminal):
    ```bash
    npm run tailwind
    ```

## 📝 Autor

Desenvolvido por **[Leonardo Reis Ferraz](https://github.com/Leonardo2831)**.

---

_Projeto desenvolvido para fins de estudo e aplicação prática em meu estágio no cartório de registro de imóveis em cenários reais._
