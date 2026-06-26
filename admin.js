const ADMIN_FILTERS_STORAGE_KEY = 'vstech_admin_filtros';
const ADMIN_CATEGORIAS_OCULTAS_FILTRO = new Set([
    'armazenamento',
    'adaptador wifi',
    'placa wifi',
    'placa de wifi',
    'memoria',
    'memorias',
    'memoria ram',
    'fonte',
    'fontes',
    'pasta termica',
    'pecas reposicao',
    'toner',
    'cartucho',
    'impressora',
    'impressoras',
    'tinta',
    'papel',
    'bandeja saida',
    'pc impressora'
]);

const ADMIN = {
    autenticado: sessionStorage.getItem('adminAutenticado') === 'true',
    imagensDisponiveis: [],
    produtoEditando: null,
    selecaoTemporaria: new Set(),
    filtros: {
        busca: '',
        codigoFabricante: '',
        categoria: '',
        ordenacao: 'default'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const senhaInput = document.getElementById('adminPassword');
    if (senhaInput) {
        senhaInput.addEventListener('keypress', event => {
            if (event.key === 'Enter') autenticarAdmin();
        });
    }

    configurarFiltrosAdmin();
    setTimeout(() => {
        inicializarAdmin();
    }, 1000);
});

async function inicializarAdmin() {
    if (!ADMIN.autenticado) {
        const notice = document.querySelector('.admin-notice');
        if (notice) notice.style.display = 'none';
        return;
    }

    const authSection = document.getElementById('authSection');
    const adminTools = document.getElementById('adminTools');
    if (authSection) authSection.style.display = 'none';
    if (adminTools) adminTools.style.display = 'grid';

    await carregarImagensDisponiveis();
    renderizarCategoriasAdmin();
    aplicarFiltrosAdminSalvos();
    renderizarProdutosAdmin();
}

function autenticarAdmin() {
    const senhaInput = document.getElementById('adminPassword');

    if (senhaInput.value === '9933') {
        sessionStorage.setItem('adminAutenticado', 'true');
        location.reload();
    } else {
        alert('Senha incorreta');
        senhaInput.value = '';
        senhaInput.focus();
    }
}

function fazerLogoutAdmin() {
    const confirmacao = confirm('Deseja fazer logout?');
    if (confirmacao) {
        sessionStorage.removeItem('adminAutenticado');
        location.reload();
    }
}

function configurarFiltrosAdmin() {
    const searchInput = document.getElementById('adminSearchInput');
    const manufacturerCodeFilter = document.getElementById('adminManufacturerCodeFilter');
    const categoryFilter = document.getElementById('adminCategoryFilter');
    const sortFilter = document.getElementById('adminSortFilter');
    const modal = document.getElementById('adminImageModal');

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            ADMIN.filtros.busca = event.target.value;
            salvarFiltrosAdmin();
            renderizarProdutosAdmin();
        });
    }

    if (manufacturerCodeFilter) {
        manufacturerCodeFilter.addEventListener('input', event => {
            ADMIN.filtros.codigoFabricante = event.target.value;
            salvarFiltrosAdmin();
            renderizarProdutosAdmin();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', event => {
            ADMIN.filtros.categoria = event.target.value;
            salvarFiltrosAdmin();
            renderizarProdutosAdmin();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', event => {
            ADMIN.filtros.ordenacao = event.target.value;
            salvarFiltrosAdmin();
            renderizarProdutosAdmin();
        });
    }

    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target === modal) fecharSeletorImagens();
        });
    }
}

async function carregarImagensDisponiveis() {
    try {
        const response = await fetch('./imagens/index.json', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Erro ao carregar lista de imagens');
        }

        const imagens = await response.json();
        ADMIN.imagensDisponiveis = Array.isArray(imagens) ? imagens : [];
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        ADMIN.imagensDisponiveis = [];
    }
}

function renderizarCategoriasAdmin() {
    const categoryFilter = document.getElementById('adminCategoryFilter');
    if (!categoryFilter || !window.APP?.categoriasUnicas) return;

    categoryFilter.innerHTML = '<option value="">TODAS</option>';

    const categoriasVisiveis = new Set(
        window.APP.produtos
            .filter(produto => !window.produtoTemEstoque || window.produtoTemEstoque(produto))
            .map(produto => produto.categoria)
            .filter(categoria => categoria && (!window.categoriaTemRotuloVisivel || window.categoriaTemRotuloVisivel(categoria)) && !ADMIN_CATEGORIAS_OCULTAS_FILTRO.has(normalizarTexto(categoria)))
    );

    Array.from(categoriasVisiveis).sort().forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = formatarTextoAdmin(categoria);
        categoryFilter.appendChild(option);
    });
}

function aplicarFiltrosAdminSalvos() {
    try {
        const filtrosSalvos = JSON.parse(localStorage.getItem(ADMIN_FILTERS_STORAGE_KEY)) || {};
        const searchInput = document.getElementById('adminSearchInput');
        const manufacturerCodeFilter = document.getElementById('adminManufacturerCodeFilter');
        const categoryFilter = document.getElementById('adminCategoryFilter');
        const sortFilter = document.getElementById('adminSortFilter');

        const categoriaExiste = !filtrosSalvos.categoria || Array.from(categoryFilter?.options || []).some(option => option.value === filtrosSalvos.categoria);
        const ordenacaoExiste = !filtrosSalvos.ordenacao || Array.from(sortFilter?.options || []).some(option => option.value === filtrosSalvos.ordenacao);

        ADMIN.filtros.busca = String(filtrosSalvos.busca || '');
        ADMIN.filtros.codigoFabricante = String(filtrosSalvos.codigoFabricante || '');
        ADMIN.filtros.categoria = categoriaExiste ? String(filtrosSalvos.categoria || '') : '';
        ADMIN.filtros.ordenacao = ordenacaoExiste ? String(filtrosSalvos.ordenacao || 'default') : 'default';

        if (searchInput) searchInput.value = ADMIN.filtros.busca;
        if (manufacturerCodeFilter) manufacturerCodeFilter.value = ADMIN.filtros.codigoFabricante;
        if (categoryFilter) categoryFilter.value = ADMIN.filtros.categoria;
        if (sortFilter) sortFilter.value = ADMIN.filtros.ordenacao;
    } catch (error) {
        console.warn('Nao foi possivel restaurar filtros do admin:', error);
        ADMIN.filtros = {
            busca: '',
            codigoFabricante: '',
            categoria: '',
            ordenacao: 'default'
        };
    }
}

function salvarFiltrosAdmin() {
    localStorage.setItem(ADMIN_FILTERS_STORAGE_KEY, JSON.stringify(ADMIN.filtros));
}

function renderizarProdutosAdmin() {
    const grid = document.getElementById('adminProductsGrid');
    const loading = document.getElementById('adminLoading');
    const resultsCount = document.getElementById('adminResultsCount');

    if (!ADMIN.autenticado || !grid || !loading) return;

    loading.style.display = 'block';
    grid.style.display = 'none';

    if (!window.APP || !window.APP.produtos || window.APP.produtos.length === 0) {
        setTimeout(renderizarProdutosAdmin, 500);
        return;
    }

    const categoryFilter = document.getElementById('adminCategoryFilter');
    if (categoryFilter && categoryFilter.options.length <= 1) {
        renderizarCategoriasAdmin();
    }

    const produtos = filtrarProdutosAdmin();

    loading.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = '';

    produtos.forEach(produto => {
        grid.appendChild(criarCardProdutoAdmin(produto));
    });

    if (resultsCount) {
        resultsCount.textContent = `${produtos.length} de ${window.APP.produtos.length} produtos`;
    }
}

function filtrarProdutosAdmin() {
    const busca = normalizarTexto(ADMIN.filtros.busca);
    const codigoFabricante = normalizarTexto(ADMIN.filtros.codigoFabricante);
    const categoria = ADMIN.filtros.categoria;

    const produtos = window.APP.produtos.filter(produto => {
        const textoProduto = normalizarTexto([
            produto.codigo,
            produto.codigoFabricante,
            produto.nome,
            produto.marca,
            produto.categoria,
            produto.descricao
        ].join(' '));

        const correspondeBusca = !busca || textoProduto.includes(busca);
        const correspondeCodigoFabricante = !codigoFabricante || normalizarTexto(produto.codigoFabricante).includes(codigoFabricante);
        const correspondeCategoria = !categoria || produto.categoria === categoria;

        const apareceNoAdmin = !window.produtoTemEstoque || window.produtoTemEstoque(produto);
        const categoriaPermitida = !ADMIN_CATEGORIAS_OCULTAS_FILTRO.has(normalizarTexto(produto.categoria));

        return apareceNoAdmin && categoriaPermitida && correspondeBusca && correspondeCodigoFabricante && correspondeCategoria;
    });

    return ordenarProdutosAdmin(produtos);
}

function ordenarProdutosAdmin(produtos) {
    if (ADMIN.filtros.ordenacao === 'default') {
        return produtos;
    }

    return [...produtos].sort((a, b) => {
        const fotosA = window.obterImagensProduto(a.codigo).length;
        const fotosB = window.obterImagensProduto(b.codigo).length;

        if (ADMIN.filtros.ordenacao === 'without-images') {
            return fotosA - fotosB;
        }

        return fotosB - fotosA;
    });
}

function criarCardProdutoAdmin(produto) {
    const card = document.createElement('div');
    card.className = 'admin-product-card';
    card.setAttribute('data-codigo', produto.codigo);

    const imagens = window.obterImagensProduto(produto.codigo);
    const categoriaInfo = (!window.categoriaTemRotuloVisivel || window.categoriaTemRotuloVisivel(produto.categoria)) ? `
        <div class="admin-product-info">
            <strong>Categoria:</strong> ${escapeHtml(formatarTextoAdmin(produto.categoria))}
        </div>
        ` : '';

    card.innerHTML = `
        <div class="admin-card-header">
            <div>
                <div class="admin-product-code">${escapeHtml(formatarTextoAdmin(produto.codigo))}</div>
                <h3 class="admin-product-name">${escapeHtml(formatarTextoAdmin(produto.nome))}</h3>
            </div>
        </div>

        ${produto.marca ? `
        <div class="admin-product-info">
            <strong>Marca:</strong> ${escapeHtml(formatarTextoAdmin(produto.marca))}
        </div>
        ` : ''}
        ${produto.codigoFabricante ? `
        <div class="admin-product-info">
            <strong>Número fabricante:</strong> ${escapeHtml(produto.codigoFabricante)}
        </div>
        ` : ''}
        ${categoriaInfo}
        <div class="admin-product-info">
            <strong>Valor:</strong> ${escapeHtml(produto.valor)}
        </div>

        <div class="image-preview-section">
            <div class="image-preview" id="preview_${escapeAttr(produto.codigo)}">
                ${renderizarPreviewSelecionadas(produto.codigo)}
            </div>
        </div>

        <div class="image-selector">
            <span class="image-summary" id="summary_${escapeAttr(produto.codigo)}">${imagens.length} foto(s) selecionada(s)</span>
            <button type="button" class="btn-pick-images" onclick="abrirSeletorImagens('${escapeJs(produto.codigo)}')">
                ESCOLHER FOTOS
            </button>
            ${ADMIN.imagensDisponiveis.length === 0 ? '<small style="color: var(--cor-alerta); display: block; margin-top: 8px;">NENHUMA IMAGEM ENCONTRADA. COLOQUE IMAGENS NA PASTA /IMAGENS/ E RODE ATUALIZAR-IMAGENS.BAT.</small>' : ''}
        </div>

        <div id="status_${escapeAttr(produto.codigo)}"></div>

        <div class="admin-card-actions" style="margin-top: 15px;">
            <button class="btn-remove" onclick="removerImagemProduto('${escapeJs(produto.codigo)}')">
                REMOVER FOTOS
            </button>
        </div>
    `;

    return card;
}

function renderizarPreviewSelecionadas(codigo) {
    const imagens = window.obterImagensProduto(codigo);

    if (imagens.length === 0) {
        return '<div class="image-placeholder">SEM FOTO</div>';
    }

    const miniaturas = imagens.slice(0, 8).map(imagem => `
        <div class="selected-image-thumb">
            <img src="${IMAGENS_PATH}${encodeURI(imagem)}" alt="">
        </div>
    `).join('');

    return `<div class="selected-images-grid">${miniaturas}</div>`;
}

function abrirSeletorImagens(codigo) {
    const produto = window.APP.produtos.find(item => item.codigo === codigo);
    const modal = document.getElementById('adminImageModal');
    const title = document.getElementById('adminImageModalTitle');

    ADMIN.produtoEditando = codigo;
    ADMIN.selecaoTemporaria = new Set(window.obterImagensProduto(codigo));

    if (title) {
        title.textContent = produto ? `FOTOS DE ${formatarTextoAdmin(produto.codigo)} - ${formatarTextoAdmin(produto.nome)}` : 'SELECIONAR FOTOS';
    }

    renderizarGaleriaImagens();
    if (modal) {
        modal.classList.remove('modal-closing');
        modal.style.display = 'flex';
    }
}

function fecharSeletorImagens() {
    const modal = document.getElementById('adminImageModal');
    if (!modal || modal.style.display === 'none') {
        ADMIN.produtoEditando = null;
        ADMIN.selecaoTemporaria.clear();
        return;
    }

    modal.classList.add('modal-closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
        ADMIN.produtoEditando = null;
        ADMIN.selecaoTemporaria.clear();
    }, 180);
}

function renderizarGaleriaImagens() {
    const gallery = document.getElementById('adminImageGallery');
    if (!gallery) return;

    const imagensDisponiveisParaProduto = ADMIN.imagensDisponiveis.filter(imagem => {
        return ADMIN.selecaoTemporaria.has(imagem) || !imagemJaVinculadaEmOutroProduto(imagem);
    });

    if (imagensDisponiveisParaProduto.length === 0) {
        gallery.innerHTML = '<p>NENHUMA IMAGEM LIVRE ENCONTRADA. COLOQUE NOVAS IMAGENS NA PASTA IMAGENS E RODE ATUALIZAR-IMAGENS.BAT.</p>';
        atualizarContadorSelecao();
        return;
    }

    gallery.innerHTML = imagensDisponiveisParaProduto.map(imagem => {
        const selected = ADMIN.selecaoTemporaria.has(imagem) ? 'selected' : '';
        return `
            <button type="button" class="image-choice ${selected}" onclick="alternarImagemSelecionada('${escapeJs(imagem)}')" title="${escapeAttr(imagem)}">
                <img src="${IMAGENS_PATH}${encodeURI(imagem)}" alt="${escapeAttr(imagem)}">
                <span class="image-choice-check">✓</span>
            </button>
        `;
    }).join('');

    atualizarContadorSelecao();
}

function imagemJaVinculadaEmOutroProduto(imagem) {
    return Object.entries(window.APP.imagensPorProduto).some(([codigo, imagens]) => {
        if (codigo === ADMIN.produtoEditando) return false;
        const lista = Array.isArray(imagens) ? imagens : [imagens].filter(Boolean);
        return lista.includes(imagem);
    });
}

function alternarImagemSelecionada(imagem) {
    if (ADMIN.selecaoTemporaria.has(imagem)) {
        ADMIN.selecaoTemporaria.delete(imagem);
    } else {
        ADMIN.selecaoTemporaria.add(imagem);
    }

    renderizarGaleriaImagens();
}

function atualizarContadorSelecao() {
    const count = document.getElementById('adminImageSelectionCount');
    if (count) count.textContent = `${ADMIN.selecaoTemporaria.size} FOTO(S) SELECIONADA(S)`;
}

function salvarSelecaoImagens() {
    const codigo = ADMIN.produtoEditando;
    if (!codigo) return;

    window.APP.imagensPorProduto[codigo] = Array.from(ADMIN.selecaoTemporaria);
    window.salvarImagensNoLocalStorage();

    atualizarCardProduto(codigo);
    mostrarStatus(codigo, 'FOTOS SALVAS COM SUCESSO!', 'status-saved');
    fecharSeletorImagens();
}

function removerImagemProduto(codigo) {
    const confirmacao = confirm('TEM CERTEZA QUE DESEJA REMOVER TODAS AS FOTOS DESTE PRODUTO?');
    if (!confirmacao) return;

    window.APP.imagensPorProduto[codigo] = [];
    window.salvarImagensNoLocalStorage();

    atualizarCardProduto(codigo);
    mostrarStatus(codigo, 'FOTOS REMOVIDAS', 'status-empty');
}

function atualizarCardProduto(codigo) {
    const preview = document.getElementById(`preview_${codigo}`);
    const summary = document.getElementById(`summary_${codigo}`);
    const imagens = window.obterImagensProduto(codigo);

    if (preview) preview.innerHTML = renderizarPreviewSelecionadas(codigo);
    if (summary) summary.textContent = `${imagens.length} FOTO(S) SELECIONADA(S)`;
}

function mostrarStatus(codigo, mensagem, classe) {
    const statusDiv = document.getElementById(`status_${codigo}`);
    if (!statusDiv) return;

    statusDiv.innerHTML = `<div class="status-message ${classe}">${escapeHtml(mensagem)}</div>`;
    setTimeout(() => {
        statusDiv.innerHTML = '';
    }, 3000);
}

function exibirEstatisticas() {
    console.log('=== ESTATISTICAS ===');
    console.log(`Total de produtos: ${window.APP.produtos.length}`);
    console.log(`Produtos com imagem: ${Object.values(window.APP.imagensPorProduto).filter(lista => Array.isArray(lista) && lista.length > 0).length}`);
    console.log(`Categorias unicas: ${Array.from(window.APP.categoriasUnicas).length}`);
    console.log('Imagens por produto:', window.APP.imagensPorProduto);
}

async function salvarAssociacoesImagens() {
    const conteudo = JSON.stringify(window.APP.imagensPorProduto, null, 2);

    if ('showSaveFilePicker' in window) {
        try {
            const arquivo = await window.showSaveFilePicker({
                suggestedName: 'produtos.json',
                types: [{
                    description: 'Arquivo de associacoes de imagens',
                    accept: { 'application/json': ['.json'] }
                }]
            });
            const gravador = await arquivo.createWritable();
            await gravador.write(conteudo);
            await gravador.close();

            alert('Associacoes salvas. Selecione/substitua imagens/produtos.json e depois publique no GitHub.');
            return;
        } catch (error) {
            if (error?.name === 'AbortError') return;
            console.warn('Nao foi possivel salvar direto no arquivo:', error);
        }
    }

    baixarAssociacoesImagens(conteudo);
}

function baixarAssociacoesImagens(conteudo) {
    const arquivo = new Blob([conteudo], { type: 'application/json' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(arquivo);
    link.download = 'produtos.json';
    link.click();
    URL.revokeObjectURL(link.href);

    alert('Seu navegador nao permitiu substituir direto. O arquivo produtos.json foi baixado; coloque-o dentro da pasta imagens e publique novamente no GitHub.');
}

function escapeHtml(valor) {
    return String(valor || '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[char]));
}

function escapeAttr(valor) {
    return escapeHtml(valor);
}

function escapeJs(valor) {
    return String(valor || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatarTextoAdmin(valor) {
    if (window.formatarTextoVisivel) return window.formatarTextoVisivel(valor);
    return String(valor || '').trim().toLocaleUpperCase('pt-BR');
}

window.abrirSeletorImagens = abrirSeletorImagens;
window.fecharSeletorImagens = fecharSeletorImagens;
window.alternarImagemSelecionada = alternarImagemSelecionada;
window.salvarSelecaoImagens = salvarSelecaoImagens;
window.removerImagemProduto = removerImagemProduto;
window.fazerLogoutAdmin = fazerLogoutAdmin;
window.autenticarAdmin = autenticarAdmin;
window.exibirEstatisticas = exibirEstatisticas;
window.salvarAssociacoesImagens = salvarAssociacoesImagens;
