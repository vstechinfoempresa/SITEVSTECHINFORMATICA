# VSTECH - Catálogo de Produtos

Este projeto é uma loja/catálo de produtos simples, com visualização pública e área de administração para associar imagens aos produtos.

## O que o app faz

- `index.html`: exibe o catálogo com filtros de busca e categoria.
- `admin.html`: área de administração para escolher e salvar fotos para cada produto.
- `script.js`: lógica do catálogo, carregamento de produtos e comportamento do modal.
- `admin.js`: lógica da área administrativa, autenticação e associação de imagens.
- `style.css`: estilos gerais e estilos dos dois painéis.

## Como usar

1. Abra `index.html` no navegador para ver o catálogo público.
2. Abra `admin.html` para acessar a área administrativa.
3. No admin, use a senha: `9933`.
4. Coloque imagens na pasta `imagens/`.
5. Execute `atualizar-imagens.bat` ou `atualizar-imagens.ps1` para gerar/atualizar a lista de imagens.
6. No admin, escolha fotos para cada produto e clique em "Salvar associacoes no arquivo".

## Estrutura de arquivos

- `index.html`: catálogo público com modal de detalhes.
- `admin.html`: painel de administração para associar imagens.
- `script.js`: lógica do catálogo, filtros, modal e WhatsApp.
- `admin.js`: autenticação, filtros admin, seleção e associação de imagens.
- `style.css`: aparência do catálogo e admin.
- `dados/`: contém `produtos.xls`, `produtos.csv` e dados do catálogo.
- `imagens/`: pasta para imagens do produto e arquivo `produtos.json`.
- `GITHUB.md` e `TESTE.md`: arquivos de apoio.

## Dados e imagens

- Os produtos são carregados a partir de `dados/produtos.xls` ou `dados/produtos.csv`.
- Para que o catálogo mostre as imagens, coloque os arquivos correspondentes na pasta `imagens/`.
- O arquivo `imagens/produtos.json` lista as imagens disponíveis e é usado pelo admin.

## Admin

- A área administrativa só é liberada após autenticação com a senha `9933`.
- No admin, você pode filtrar produtos por nome, código, marca ou categoria.
- É possível ordenar os produtos por aqueles com ou sem imagens.
- Ao selecionar fotos para um produto, a associação é salva localmente no navegador.

## Cores de marca

- `bbdi` recebe destaque em verde.
- `bringit` recebe destaque em azul.
- `ml` recebe destaque em amarelo.
- Outras marcas podem receber cores automáticas padrão.

## Observações

- O site é uma aplicação front-end estática: não há back-end de servidor integrado.
- As associações de imagens são mantidas no armazenamento local do navegador.
- Para testar em produção, basta hospedar os arquivos em qualquer servidor estático ou abrir localmente.

## Contato

- WhatsApp de exemplo configurado em `script.js`:
  - `556993419933`.

---

# Como contribuir

- Atualize `dados/produtos.xls` com novos produtos.
- Adicione imagens à pasta `imagens/`.
- Use os scripts `atualizar-imagens.bat` ou `atualizar-imagens.ps1` para renovar a lista.
- Teste abrindo `index.html` e `admin.html`.
