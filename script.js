const XLS_URL = './dados/produtos.xls';
const CSV_URL = './dados/produtos.csv';
const IMAGENS_PATH = './imagens/';
const IMAGENS_MAP_URL = './imagens/produtos.json';
const WHATSAPP_NUMBER = '556993419933';
const SITE_PUBLIC_URL = 'https://leticiasilva273.github.io/SITEVSTECH/';
const STORAGE_KEY = 'vstech_imagens_produtos';
const FILTERS_STORAGE_KEY = 'vstech_catalogo_filtros';
const CODIGO_COLUNAS = ['codigo', 'cod', 'cod.', 'cod produto', 'codigo produto', 'referencia', 'referencia produto', 'sku'];
const CODIGO_FABRICANTE_COLUNAS = ['codigo fabricante', 'codigo do fabricante', 'cod fabricante', 'cod. fabricante', 'cod fab', 'codigo fab', 'numero fabricante', 'numero do fabricante', 'num fabricante', 'n fabricante', 'nº fabricante', 'n° fabricante', 'no fabricante', 'referencia fabricante', 'referencia do fabricante', 'part number', 'pn', 'p/n', 'mpn'];
const MARCA_COLUNAS = ['marca', 'fabricante', 'brand'];
const CARREGADOR_NOTEBOOK_TERMS = [
    'carregador notebook',
    'carregador para notebook',
    'fonte notebook',
    'fonte para notebook',
    'fonte p notebook',
    'fonte p/ notebook',
    'fontes nb'
];
const NOTEBOOK_INCLUDE_TERMS = [
    'notebook',
    'laptop',
    'ultrabook',
    'netbook',
    'tela',
    'display',
    'lcd',
    'led',
    'touch',
    'touchscreen',
    'carcaca',
    'carcacas',
    'base',
    'tampa',
    'dobradica',
    'dobradicas',
    'flat',
    'flats',
    'flet',
    'cabo flat',
    'cabo flex',
    'cabo flexivel',
    'flex cable',
    'lvds',
    'edp',
    'bateria',
    'carregador',
    'fonte notebook',
    'fonte para notebook',
    'teclado notebook',
    'dc jack',
    'jack',
    'conector dc',
    'power jack',
    'cooler notebook',
    'fan notebook',
    'alto falante',
    'speaker',
    'webcam',
    'touchpad',
    'palmrest',
    'moldura',
    'bezel',
    'placa mae notebook',
    'placa-mae notebook',
    'placa notebook',
    'inspiron',
    'latitude',
    'vostro',
    'ideapad',
    'thinkpad',
    'vivobook',
    'zenbook',
    'aspire',
    'nitro',
    'pavilion',
    'probook',
    'elitebook',
    'macbook',
    'chromebook',
    'compaq',
    'positivo',
    'samsung',
    'samsung book',
    'lenovo',
    'dell',
    'acer',
    'asus',
    'hp'
];
const NOTEBOOK_EXCLUDE_TERMS = [
    'ARMAZENAMENTO',
    'ADAPTADOR WIFI',
    'mouse',
    'teclado gamer',
    'teclado mecanico',
    'adaptador wifi',
    'adaptador wireless',
    'adaptador usb',
    'adaptador vga',
    'adaptador hdmi',
    'adaptador tipo c',
    'adapt conversor',
    'caixa de som',
    'fone',
    'headset',
    'microfone',
    'webcam usb',
    'pendrive',
    'pen drive',
    'cabo hdmi',
    'cabo vga',
    'cabo usb',
    'cabo de rede',
    'roteador',
    'switch',
    'monitor',
    'desktop',
    'pc gamer',
    'gabinete',
    'case atx',
    'placa mae h',
    'placa-mae h',
    'placa mae desktop',
    'processador',
    'fonte atx',
    'fonte 500w',
    'fonte real',
    'cooler cpu',
    'memoria ram',
    'pç impressora',
    'peca impressora',
    'toner',
    'cartucho',
    'papel',
    'bandeja saida',
    'rolete',
    'fusor',
    'laserjet',
    'deskjet',
    'officejet',
    'epson',
    'canon',
    'brother',
    'lexmark',
    'ricoh',
    'xerox',
    'hp m',
    'hp p',
    'hp desk'
];
const CATEGORY_FILTER_EXCLUDE_TERMS = [
    'ARMAZENAMENTO',
    'ADAPTADOR WIFI',
    'placa wifi',
    'placa de wifi',
    'memoria',
    'memorias',
    'memoria ram',
    'periferico',
    'perifericos',
    'desktop',
    'pç impressora',
    'peca impressora',
    'processador',
    'monitores',
    'monitor',
    'pecas reposicao',
    'toner',
    'cartucho',
    'impressora',
    'impressoras',
    'tinta',
    'papel',
    'bandeja saida'
];

const NOTEBOOK_PART_HINT_TERMS = [
    'flat',
    'flats',
    'flet',
    'flex',
    'cabo flex',
    'cabo flexivel',
    'lvds',
    'edp',
    'tela',
    'display',
    'lcd',
    'led'
];

const NOTEBOOK_BRAND_TERMS = [
    'samsung',
    'lenovo',
    'dell',
    'acer',
    'asus',
    'hp',
    'positivo',
    'compaq',
    'sony',
    'lg',
    'apple',
    'macbook'
];

const ABREVIACOES_AMIGAVEIS = {
    'nb': 'Notebook',
    'pç': 'Peça',
    'pc': 'PC',
    'hd': 'HD',
    'ssd': 'SSD',
    'ram': 'RAM',
    'cpu': 'CPU',
    'gpu': 'GPU',
    'wifi': 'WiFi',
    'usb': 'USB',
    'hdmi': 'HDMI',
    'vga': 'VGA',
    'sata': 'SATA',
    'pcie': 'PCIe',
    'ddram': 'DDR',
    'ddr': 'DDR'
};

const CATEGORIAS_AMIGAVEIS = {
    'ALTO-FALANTE': 'ALTO-FALANTES PARA NOTEBOOK',
    'BATERIAS NOTEBOOK': 'BATERIAS PARA NOTEBOOK',
    'CABO ADAPTADOR': 'CABOS E ADAPTADORES',
    'CARCAÇAS': 'CARCAÇAS PARA NOTEBOOK',
    'DC JACK': 'CONECTORES DE ENERGIA (DC JACK)',
    'DOBRADIÇAS': 'DOBRADIÇAS PARA NOTEBOOK',
    'FAN/DISSIPADOR': 'COOLERS E DISSIPADORES',
    'FLAT': 'FLETS SATA NOTEBOOK',
    'FLAT TELA': 'CABOS FLAT PARA TELA',
    'FONTES NB': 'CARREGADORES PARA NOTEBOOK',
    'NB TECLADO PÇ': 'TECLADOS PARA NOTEBOOK',
    
    'PLACA AUXILIAR': 'PLACAS AUXILIARES',
    'PLACA POWER': 'PLACAS POWER E BOTÃO LIGA/DESLIGA',
    'TELAS NOTEBOOK': 'TELAS PARA NOTEBOOK',
    'TINTAS': 'TINTAS PARA IMPRESSORA',
    'TONER': 'TONER PARA IMPRESSORA',
    'TOUCHPAD': 'TOUCHPAD PARA NOTEBOOK'
};
const APP = {
    produtos: [],
    categoriasUnicas: new Set(),
    imagensPorProduto: {},
    produtoAtual: null,
    carousel: {
        imagens: [],
        indice: 0
    },
    filtros: {
        busca: '',
        categoria: ''
    }
};

window.APP = APP;
window.IMAGENS_PATH = IMAGENS_PATH;

function obterClasseMarca(marca) {
    const texto = normalizarTexto(marca);
    if (!texto) return '';

    const tokens = texto.split(/\s+/);
    if (tokens.includes('bbdi')) return 'brand-bbdi';
    if (tokens.includes('bringit')) return 'brand-bringit';
    if (tokens.includes('ml')) return 'brand-ml';
    return '';
}

function gerarCoresMarca(marca) {
    const texto = normalizarTexto(marca);
    if (!texto) return '';

    const tokens = texto.split(/\s+/);
    if (tokens.includes('bbdi')) {
        return 'color: #bbf7d0; border-color: rgba(34, 197, 94, 0.46); background: rgba(34, 197, 94, 0.16);';
    }
    if (tokens.includes('bringit')) {
        return 'color: #bfdbfe; border-color: rgba(59, 130, 246, 0.50); background: rgba(59, 130, 246, 0.16);';
    }
    if (tokens.includes('ml')) {
        return 'color: #fef3c7; border-color: rgba(245, 158, 11, 0.56); background: rgba(245, 158, 11, 0.18);';
    }

    let hash = 0;
    for (let i = 0; i < texto.length; i++) {
        hash = texto.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = ((hash % 360) + 360) % 360;
    const color = `hsl(${hue}, 95%, 93%)`;
    const borderColor = `hsla(${hue}, 85%, 62%, 0.55)`;
    const background = `hsla(${hue}, 85%, 15%, 0.16)`;

    return `color: ${color}; border-color: ${borderColor}; background: ${background};`;
}

function criarMetaProduto(rotulo, valor, classe) {
    if (!valor) return '';
    const valorVisivel = formatarTextoVisivel(valor);
    if (classe !== 'product-brand') {
        return `<div class="${classe}"><span>${escapeHtml(rotulo)}:</span> ${escapeHtml(valorVisivel)}</div>`;
    }

    const classeMarca = obterClasseMarca(valor);
    const estiloMarca = classeMarca ? '' : gerarCoresMarca(valor);
    return `<div class="${classe}${classeMarca ? ` ${classeMarca}` : ''}"${estiloMarca ? ` style="${estiloMarca}"` : ''}><span>${escapeHtml(rotulo)}:</span> ${escapeHtml(valorVisivel)}</div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
    configurarMenuLateral();
    await carregarImagens();
    configurarEventos();
    configurarLupaImagem();
    carregarProdutos();
});

async function carregarProdutos() {
    const loadingMsg = document.getElementById('loadingMessage');
    const errorMsg = document.getElementById('errorMessage');

    try {
        APP.produtos = await carregarProdutosDaPlanilha();
        // remover categorias indesejadas: fontes e pasta térmica
        APP.produtos = APP.produtos.filter(produto => {
            const cat = normalizarTexto(produto.categoria || '');
            return !(cat.includes('fonte') || cat.includes('pasta termic') || cat.includes('pastatermic'));
        });
        APP.categoriasUnicas = new Set(APP.produtos.map(produto => produto.categoria).filter(Boolean));

        if (loadingMsg) loadingMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';

        renderizarCategorias();
        aplicarFiltrosSalvos();
        renderizarProdutos();
        abrirProdutoPeloLink();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        if (loadingMsg) loadingMsg.style.display = 'none';
        if (errorMsg) {
            errorMsg.textContent = `Erro ao carregar produtos: ${error.message}. Confira se dados/produtos.xls foi enviado junto com o site.`;
            errorMsg.style.display = 'block';
        }
    }
}

async function carregarProdutosDaPlanilha() {
    if (typeof XLSX !== 'undefined') {
        try {
            const response = await fetch(XLS_URL, { cache: 'no-store' });

            if (response.ok) {
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, {
                    type: 'array',
                    cellDates: true
                });

                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                if (!worksheet) {
                    throw new Error('nenhuma aba encontrada na planilha');
                }

                const linhas = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: '',
                    raw: false
                });

                return converterLinhasEmProdutos(linhas);
            }
        } catch (error) {
            console.warn('Nao foi possivel carregar XLS, tentando CSV:', error);
        }
    }

    return carregarProdutosDoCsv();
}

async function carregarProdutosDoCsv() {
    const response = await fetch(CSV_URL, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`nao foi possivel carregar ${CSV_URL}. Status: ${response.status}`);
    }

    const csv = await response.text();
    return converterCsvEmProdutos(csv);
}

function converterLinhasEmProdutos(linhas) {
    const indiceCabecalho = encontrarIndiceCabecalho(linhas);

    if (indiceCabecalho === -1) {
        throw new Error('cabecalho da planilha nao encontrado');
    }

    const cabecalhos = linhas[indiceCabecalho].map(normalizarTexto);

    return linhas.slice(indiceCabecalho + 1)
        .map((linha, index) => criarProdutoDaLinha(linha, cabecalhos, index))
        .filter(Boolean);
}

function encontrarIndiceCabecalho(linhas) {
    return linhas.findIndex(linha => {
        const colunas = linha.map(normalizarTexto);
        const temCodigo = colunas.some(valor => CODIGO_COLUNAS.includes(valor));
        const temDescricao = colunas.some(valor => valor.includes('descricao') || valor === 'nome' || valor.includes('produto'));
        const temValor = colunas.some(valor => valor.includes('venda') || valor.includes('valor') || valor.includes('preco'));

        return temCodigo && (temDescricao || temValor);
    });
}

function criarProdutoDaLinha(linha, cabecalhos, index) {
    const codigo = obterCampo(linha, cabecalhos, CODIGO_COLUNAS);
    const codigoFabricante = obterCampo(linha, cabecalhos, CODIGO_FABRICANTE_COLUNAS);
    const nome = obterCampo(linha, cabecalhos, ['descricao', 'nome', 'produto']);
    const marca = obterCampo(linha, cabecalhos, MARCA_COLUNAS);
    const categoria = obterCampo(linha, cabecalhos, ['grupo', 'categoria', 'secao']) || 'Sem categoria';
    const quantidade = Number(String(obterCampo(linha, cabecalhos, ['disponivel', 'estoque', 'quantidade', 'qtd']) || '0').replace(',', '.')) || 0;
    const valorBruto = obterCampo(linha, cabecalhos, ['venda', 'valor', 'preco', 'preco venda']);
    const codigoFinal = String(codigo || `ITEM-${index + 1}`).trim();

    if (!codigo && !nome) return null;

    return {
        codigo: codigoFinal,
        codigoFabricante: String(codigoFabricante || '').trim(),
        nome: String(nome || 'Produto sem nome').trim(),
        marca: String(marca || '').trim(),
        categoria: String(categoria || 'Sem categoria').trim(),
        descricao: String(nome || 'Sem descricao').trim(),
        valor: formatarValorComDesconto(valorBruto, { nome, categoria }),
        estoque: quantidade > 0 ? `Disponível: ${quantidade}` : 'Indisponível',
        quantidade,
        localizacao: obterCampo(linha, cabecalhos, ['localizacao', 'local']),
        gaveta: obterCampo(linha, cabecalhos, ['gaveta']),
        imagens: obterImagensProduto(codigoFinal)
    };
}

function obterCampo(linha, cabecalhos, nomes) {
    const nomesNormalizados = nomes.map(normalizarTexto);
    let index = cabecalhos.findIndex(cabecalho => nomesNormalizados.includes(cabecalho));

    if (index === -1) {
        index = cabecalhos.findIndex(cabecalho => nomesNormalizados.some(nome => cabecalho.includes(nome)));
    }

    return index >= 0 ? linha[index] : '';
}

function converterCsvEmProdutos(csv) {
    const linhas = csv
        .split(/\r?\n/)
        .map(linha => linha.trim())
        .filter(Boolean);

    const cabecalhos = parseCsvLine(linhas[0] || '').map(normalizarTexto);
    const indiceCodigo = encontrarIndiceCampo(cabecalhos, CODIGO_COLUNAS, 0);
    const indiceCodigoFabricante = encontrarIndiceCampo(cabecalhos, CODIGO_FABRICANTE_COLUNAS, -1);
    const indiceNome = encontrarIndiceCampo(cabecalhos, ['descricao', 'nome', 'produto'], 1);
    const indiceMarca = encontrarIndiceCampo(cabecalhos, MARCA_COLUNAS, -1);
    const indiceCategoria = encontrarIndiceCampo(cabecalhos, ['grupo', 'categoria', 'secao'], 2);
    const indiceDescricao = encontrarIndiceCampo(cabecalhos, ['descricao completa', 'detalhes'], 3);
    const indiceEstoque = encontrarIndiceCampo(cabecalhos, ['estoque', 'disponivel', 'quantidade', 'qtd'], -1);
    const indiceValor = encontrarIndiceCampo(cabecalhos, ['venda', 'valor', 'preco', 'preco venda'], -1);

    return linhas.slice(1).map((linha, index) => {
        const colunas = parseCsvLine(linha);
        const codigo = String(colunas[indiceCodigo] || '').trim();
        const codigoFabricante = indiceCodigoFabricante >= 0 ? String(colunas[indiceCodigoFabricante] || '').trim() : '';
        const nome = String(colunas[indiceNome] || '').trim();
        const marca = indiceMarca >= 0 ? String(colunas[indiceMarca] || '').trim() : '';
        const categoria = String(colunas[indiceCategoria] || 'Sem categoria').trim();
        const descricao = String(colunas[indiceDescricao] || nome || 'Sem descricao').trim();
        const estoque = String(colunas[indiceEstoque >= 0 ? indiceEstoque : colunas.length - 1] || 'Indisponivel').trim();
        const valor = indiceValor >= 0 ? String(colunas[indiceValor] || '').trim() : colunas.slice(4, -1).join(',').trim();

        return {
            codigo: codigo || `ITEM-${index + 1}`,
            codigoFabricante,
            nome: nome || 'Produto sem nome',
            marca,
            categoria,
            descricao,
            valor: formatarValorComDesconto(valor, { nome, categoria, descricao }),
            estoque,
            quantidade: obterQuantidadeEstoque(estoque),
            imagens: obterImagensProduto(codigo)
        };
    }).filter(produto => produto.nome !== 'Produto sem nome');
}

function encontrarIndiceCampo(cabecalhos, nomes, indicePadrao) {
    const nomesNormalizados = nomes.map(normalizarTexto);
    let index = cabecalhos.findIndex(cabecalho => nomesNormalizados.includes(cabecalho));

    if (index === -1) {
        index = cabecalhos.findIndex(cabecalho => nomesNormalizados.some(nome => cabecalho.includes(nome)));
    }

    return index >= 0 ? index : indicePadrao;
}

function parseCsvLine(linha) {
    const valores = [];
    let atual = '';
    let dentroDeAspas = false;

    for (let i = 0; i < linha.length; i += 1) {
        const char = linha[i];
        const proximo = linha[i + 1];

        if (char === '"' && proximo === '"') {
            atual += '"';
            i += 1;
        } else if (char === '"') {
            dentroDeAspas = !dentroDeAspas;
        } else if (char === ',' && !dentroDeAspas) {
            valores.push(atual);
            atual = '';
        } else {
            atual += char;
        }
    }

    valores.push(atual);
    return valores;
}

function obterQuantidadeEstoque(estoque) {
    const numero = String(estoque).match(/\d+/);
    if (numero) return Number(numero[0]);
    return normalizarTexto(estoque).includes('indisponivel') ? 0 : 1;
}

function formatarValor(valor) {
    if (valor === null || valor === undefined || valor === '') return 'Consulte';

    const texto = String(valor).trim();
    if (texto.includes('R$')) return texto;

    const numero = obterValorNumerico(valor);
    if (Number.isFinite(numero)) {
        return numero.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    return texto || 'Consulte';
}

function formatarValorComDesconto(valor, produto) {
    const numero = obterValorNumerico(valor);
    if (!Number.isFinite(numero)) return formatarValor(valor);

    const percentual = produtoEhCarregadorNotebook(produto) ? 15 : 10;
    const valorComDesconto = numero * (1 - percentual / 100);

    return valorComDesconto.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function obterValorNumerico(valor) {
    if (typeof valor === 'number') {
        return normalizarValorSemSeparador(valor);
    }

    const texto = String(valor || '')
        .replace(/[^\d,.-]/g, '')
        .trim();

    if (!texto) return NaN;

    if (/^-?\d+$/.test(texto)) {
        return normalizarValorSemSeparador(Number(texto));
    }

    const ultimaVirgula = texto.lastIndexOf(',');
    const ultimoPonto = texto.lastIndexOf('.');
    const separadorDecimal = Math.max(ultimaVirgula, ultimoPonto);
    const temApenasUmSeparador = (texto.match(/[.,]/g) || []).length === 1;
    const casasDepoisDoSeparador = separadorDecimal >= 0 ? texto.length - separadorDecimal - 1 : 0;

    if (temApenasUmSeparador && casasDepoisDoSeparador === 3 && texto[separadorDecimal] === '.') {
        return Number(texto.replace(/[.,]/g, ''));
    }

    const inteiro = texto.slice(0, separadorDecimal).replace(/[.,]/g, '');
    const decimal = separadorDecimal >= 0 ? texto.slice(separadorDecimal + 1).replace(/[.,]/g, '') : '';

    if (separadorDecimal >= 0 && Number(decimal) === 0 && inteiro.length >= 5) {
        return normalizarValorSemSeparador(Number(inteiro));
    }

    const numeroNormalizado = separadorDecimal >= 0 ? `${inteiro}.${decimal}` : texto.replace(/[.,]/g, '');

    return Number(numeroNormalizado);
}

function normalizarValorSemSeparador(valor) {
    if (!Number.isFinite(valor)) return NaN;
    if (!Number.isInteger(valor)) return valor;

    const absoluto = Math.abs(valor);
    if (absoluto >= 100000) return valor / 1000;
    if (absoluto >= 10000) return valor / 100;
    return valor;
}

function produtoEhCarregadorNotebook(produto) {
    const texto = normalizarTexto([
        produto?.nome,
        produto?.categoria,
        produto?.descricao
    ].filter(Boolean).join(' '));

    return CARREGADOR_NOTEBOOK_TERMS.some(termo => texto.includes(termo));
}

function configurarEventos() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const clearFilters = document.getElementById('clearFilters');
    const modal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            APP.filtros.busca = event.target.value;
            salvarFiltrosCatalogo();
            renderizarProdutos();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', event => {
            APP.filtros.categoria = event.target.value;
            salvarFiltrosCatalogo();
            renderizarProdutos();
        });
    }

    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            APP.filtros.busca = '';
            APP.filtros.categoria = '';
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = '';
            salvarFiltrosCatalogo();
            renderizarProdutos();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', fecharModal);
    }

    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target === modal) fecharModal();
        });
    }

    const openContactModalBtn = document.getElementById('openContactModal');
    const contactModal = document.getElementById('contactModal');
    const contactModalClose = document.querySelector('#contactModal .modal-close');
    const contactCloseBtn = document.getElementById('contactCloseBtn');

    if (openContactModalBtn) {
        openContactModalBtn.addEventListener('click', abrirContactModal);
    }

    if (contactModalClose) {
        contactModalClose.addEventListener('click', fecharContactModal);
    }

    if (contactCloseBtn) {
        contactCloseBtn.addEventListener('click', fecharContactModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', event => {
            if (event.target === contactModal) fecharContactModal();
        });
    }

    window.addEventListener('hashchange', () => {
        if (hashEhDeProduto()) {
            abrirProdutoPeloLink();
            return;
        }

        if (APP.produtoAtual) {
            fecharModal({ atualizarUrl: false });
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') fecharModal();
    });
}

function configurarMenuLateral() {
    const sidebar = document.getElementById('siteSidebar');
    const logoButton = document.querySelector('.logo');
    const closeButton = document.querySelector('.sidebar-close');
    const links = document.querySelectorAll('.site-sidebar a');

    if (!sidebar || !logoButton) return;

    const abrirMenu = () => {
        sidebar.classList.add('is-open');
        sidebar.setAttribute('aria-hidden', 'false');
        logoButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('sidebar-open');
    };

    const fecharMenu = () => {
        sidebar.classList.remove('is-open');
        sidebar.setAttribute('aria-hidden', 'true');
        logoButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('sidebar-open');
    };

    logoButton.addEventListener('click', abrirMenu);
    closeButton?.addEventListener('click', fecharMenu);

    sidebar.addEventListener('click', event => {
        if (event.target === sidebar) fecharMenu();
    });

    links.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') fecharMenu();
    });
}

function renderizarCategorias() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;

    categoryFilter.innerHTML = '<option value="">TODAS AS CATEGORIAS</option>';

    // Apenas categorias que possuem ao menos um produto visível no catálogo
    const categoriasVisiveis = new Set(
        APP.produtos
            .filter(produto => produtoVisivelNoCatalogo(produto))
            .map(produto => produto.categoria)
            .filter(categoria => categoria && categoriaTemRotuloVisivel(categoria) && categoriaEhPermitidaNoFiltro(categoria))
    );

    Array.from(categoriasVisiveis).sort().forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = formatarTextoVisivel(categoria);
        categoryFilter.appendChild(option);
    });
}

function aplicarFiltrosSalvos() {
    try {
        const filtrosSalvos = JSON.parse(localStorage.getItem(FILTERS_STORAGE_KEY)) || {};
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const categoriaExiste = !filtrosSalvos.categoria || Array.from(categoryFilter?.options || []).some(option => option.value === filtrosSalvos.categoria);

        APP.filtros.busca = String(filtrosSalvos.busca || '');
        APP.filtros.categoria = categoriaExiste ? String(filtrosSalvos.categoria || '') : '';

        if (searchInput) searchInput.value = APP.filtros.busca;
        if (categoryFilter) categoryFilter.value = APP.filtros.categoria;
    } catch (error) {
        console.warn('Nao foi possivel restaurar filtros salvos:', error);
        APP.filtros.busca = '';
        APP.filtros.categoria = '';
    }
}

function salvarFiltrosCatalogo() {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(APP.filtros));
}

function renderizarProdutos() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;

    const produtosFiltrados = filtrarProdutos();
    grid.innerHTML = '';

    produtosFiltrados.forEach(produto => {
        grid.appendChild(criarCardProduto(produto));
    });

    if (noResults) {
        noResults.style.display = produtosFiltrados.length === 0 ? 'block' : 'none';
    }

    atualizarNotaCarcaca();
}

function filtrarProdutos() {
    const busca = normalizarTexto(APP.filtros.busca);
    const categoria = APP.filtros.categoria;

    return APP.produtos.filter(produto => {
        const textoProduto = normalizarTexto([
            produto.codigo,
            produto.nome,
            produto.marca,
            produto.categoria,
            produto.descricao
        ].join(' '));

        const correspondeBusca = !busca || textoProduto.includes(busca);
        const correspondeCategoria = !categoria || produto.categoria === categoria;

        return produtoVisivelNoCatalogo(produto) && correspondeBusca && correspondeCategoria;
    });
}

function produtoVisivelNoCatalogo(produto) {
    return produtoTemEstoque(produto) && categoriaEhPermitidaNoFiltro(produto.categoria);
}

function produtoTemEstoque(produto) {
    return produto.quantidade > 0;
}

function produtoEhPecaNotebook(produto) {
    const texto = normalizarTexto([
        produto.codigo,
        produto.nome,
        produto.marca,
        produto.categoria,
        produto.descricao
    ].join(' '));

    const possuiTermoNotebook = NOTEBOOK_INCLUDE_TERMS.some(termo => texto.includes(normalizarTexto(termo)));
    const parecePecaDeNotebookPorMarca = NOTEBOOK_PART_HINT_TERMS.some(termo => texto.includes(normalizarTexto(termo)))
        && NOTEBOOK_BRAND_TERMS.some(termo => texto.includes(normalizarTexto(termo)));
    const possuiTermoExcluido = NOTEBOOK_EXCLUDE_TERMS.some(termo => texto.includes(normalizarTexto(termo)));

    return (possuiTermoNotebook || parecePecaDeNotebookPorMarca) && !possuiTermoExcluido;
}

function produtoEhCarcaca(produto) {
    const texto = normalizarTexto([
        produto.codigo,
        produto.nome,
        produto.marca,
        produto.categoria,
        produto.descricao
    ].join(' '));

    return ['carcaca', 'carcacas', 'carcaça', 'carcaças'].some(termo => texto.includes(normalizarTexto(termo)));
}

function produtoTemImagem(produto) {
    return obterImagensProduto(produto.codigo).length > 0;
}

function produtoVisivelNoCatalogo(produto) {
    const visivelPorEstoque = produtoTemEstoque(produto);
    const visivelPorCarcaca = !produtoEhCarcaca(produto) || produtoTemImagem(produto);

    return visivelPorEstoque && categoriaEhPermitidaNoFiltro(produto.categoria) && visivelPorCarcaca;
}

function categoriaEhPermitidaNoFiltro(categoria) {
    const texto = normalizarTexto(categoria);
    return !CATEGORY_FILTER_EXCLUDE_TERMS.some(termo => texto.includes(normalizarTexto(termo)));
}

function atualizarNotaCarcaca() {
    const note = document.getElementById('catalogCarcacaNote');
    if (!note) return;

    const categoriaSelecionada = normalizarTexto(APP.filtros.categoria || '');
    const mostrarNota = categoriaSelecionada.includes('carcaca');
    note.style.display = mostrarNota ? 'grid' : 'none';
}

function categoriaTemRotuloVisivel(categoria) {
    return normalizarTexto(categoria) !== 'sem categoria';
}

function formatarTextoVisivel(valor) {
    const textoOriginal = String(valor || '').trim();
    const chave = textoOriginal.toLocaleUpperCase('pt-BR');

    if (CATEGORIAS_AMIGAVEIS[chave]) {
        return String(CATEGORIAS_AMIGAVEIS[chave] || '').toLocaleUpperCase('pt-BR');
    }

    let texto = textoOriginal;

    Object.entries(ABREVIACOES_AMIGAVEIS).forEach(([abrev, nome]) => {
        const regex = new RegExp(`\\b${abrev}\\b`, 'gi');
        texto = texto.replace(regex, nome);
    });

    return String(texto || '').toLocaleUpperCase('pt-BR');
}

function criarCardProduto(produto) {
    const card = document.createElement('article');
    card.className = `product-card${produtoEhCarcaca(produto) ? ' product-card--carcaca' : ''}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver detalhes de ${produto.nome}`);

    const statusClasse = obterClasseEstoque(produto.estoque);
    const categoriaBadge = categoriaTemRotuloVisivel(produto.categoria)
        ? `<span class="product-category-badge">${escapeHtml(formatarTextoVisivel(produto.categoria))}</span>`
        : '';

    card.innerHTML = `
        <div class="product-image-container">
            ${criarImagemProduto(produto)}
            ${criarContadorImagens(produto)}
            ${categoriaBadge}
        </div>
        <div class="product-content">
            <div class="product-meta-row">
                ${criarMetaProduto('Codigo', produto.codigo, 'product-code')}
                ${criarMetaProduto('Marca', produto.marca, 'product-brand')}
            </div>
            <h2 class="product-name">${escapeHtml(formatarTextoVisivel(produto.nome))}</h2>
            <p class="product-description">${escapeHtml(formatarTextoVisivel(produto.descricao))}</p>
            <div class="product-price">${escapeHtml(produto.valor)}</div>
            <div class="product-stock ${statusClasse}">${escapeHtml(formatarTextoVisivel(produto.estoque))}</div>
            <button type="button" class="btn-interest">TENHO INTERESSE</button>
        </div>
    `;

    card.addEventListener('click', () => abrirModal(produto));
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            abrirModal(produto);
        }
    });

    const interestBtn = card.querySelector('.btn-interest');
    interestBtn.addEventListener('click', event => {
        event.stopPropagation();
        abrirWhatsApp(produto);
    });

    return card;
}

function criarImagemProduto(produto) {
    const primeiraImagem = obterImagensProduto(produto.codigo)[0];

    if (!primeiraImagem) {
        return '<div class="product-placeholder" aria-hidden="true">SEM FOTO</div>';
    }

    return `<img class="product-image" src="${IMAGENS_PATH}${encodeURI(primeiraImagem)}" alt="${escapeHtml(produto.nome)}" onerror="this.outerHTML='<div class=&quot;product-placeholder&quot; aria-hidden=&quot;true&quot;>SEM FOTO</div>'">`;
}

function criarContadorImagens(produto) {
    const total = obterImagensProduto(produto.codigo).length;
    if (total <= 1) return '';
    return `<span class="product-image-count">${total} fotos</span>`;
}

function abrirModal(produto, opcoes = {}) {
    const { atualizarUrl = true } = opcoes;
    const modal = document.getElementById('productModal');
    if (!modal) return;

    APP.produtoAtual = produto;
    modal.classList.remove('modal-closing');
    APP.carousel.imagens = obterImagensProduto(produto.codigo);
    APP.carousel.indice = 0;

    document.getElementById('modalName').textContent = formatarTextoVisivel(produto.nome);
    document.getElementById('modalCode').textContent = formatarTextoVisivel(produto.codigo);
    const modalBrand = document.getElementById('modalBrand');
    if (modalBrand) {
        const classeMarca = obterClasseMarca(produto.marca);
        modalBrand.textContent = formatarTextoVisivel(produto.marca || 'Nao informada');
        modalBrand.className = classeMarca;
        modalBrand.style.cssText = `display:inline-flex; width:fit-content; padding:3px 8px; border:1px solid; border-radius:999px; font-weight:900; ${classeMarca ? '' : gerarCoresMarca(produto.marca)}`;
    }
    const modalCategory = document.getElementById('modalCategory');
    const modalCategoryRow = modalCategory?.closest('.modal-info');
    if (modalCategory && modalCategoryRow) {
        const deveMostrarCategoria = categoriaTemRotuloVisivel(produto.categoria);
        modalCategoryRow.style.display = deveMostrarCategoria ? '' : 'none';
        modalCategory.textContent = deveMostrarCategoria ? formatarTextoVisivel(produto.categoria) : '';
    }
    document.getElementById('modalDescription').textContent = formatarTextoVisivel(produto.descricao);
    document.getElementById('modalPrice').textContent = produto.valor;
    document.getElementById('modalStock').textContent = formatarTextoVisivel(produto.estoque);

    atualizarCarouselModal(produto.nome);

    const modalInterestBtn = document.getElementById('modalInterestBtn');
    modalInterestBtn.onclick = () => abrirWhatsApp(produto);

    const copyProductBtn = document.getElementById('copyProductBtn');
    if (copyProductBtn) {
        copyProductBtn.textContent = 'Compartilhar produto';
        copyProductBtn.onclick = () => compartilharProduto(produto);
    }

    modal.style.display = 'block';

    if (atualizarUrl) {
        atualizarLinkProduto(produto);
    }
}

function atualizarCarouselModal(nomeProduto) {
    const modalImage = document.getElementById('modalImage');
    const zoomLens = document.getElementById('imageZoomLens');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const counter = document.getElementById('carouselCounter');
    const emptyState = document.getElementById('carouselEmpty');
    const imagens = APP.carousel.imagens;
    const temImagens = imagens.length > 0;

    if (modalImage) {
        if (temImagens) {
            const imagemAtual = imagens[APP.carousel.indice];
            modalImage.src = `${IMAGENS_PATH}${encodeURI(imagemAtual)}`;
            modalImage.alt = nomeProduto;
            modalImage.style.display = 'block';
            if (zoomLens) zoomLens.style.display = 'none';
        } else {
            modalImage.removeAttribute('src');
            modalImage.alt = '';
            modalImage.style.display = 'none';
            if (zoomLens) zoomLens.style.display = 'none';
        }
    }

    if (emptyState) emptyState.style.display = temImagens ? 'none' : 'flex';
    if (counter) counter.textContent = temImagens ? `${APP.carousel.indice + 1} / ${imagens.length}` : '';

    const mostrarControles = imagens.length > 1;
    if (prevBtn) prevBtn.style.display = mostrarControles ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = mostrarControles ? 'flex' : 'none';
}

function configurarLupaImagem() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const carousel = document.querySelector('.modal-carousel');
    const imagem = document.getElementById('modalImage');
    const lupa = document.getElementById('imageZoomLens');
    if (!carousel || !imagem || !lupa) return;

    imagem.addEventListener('mousemove', event => {
        if (!imagem.src || imagem.style.display === 'none') return;

        const imagemRect = imagem.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - imagemRect.left, imagemRect.width));
        const y = Math.max(0, Math.min(event.clientY - imagemRect.top, imagemRect.height));
        const metadeLupa = lupa.offsetWidth / 2;
        const esquerda = Math.max(metadeLupa, Math.min(event.clientX - carouselRect.left, carouselRect.width - metadeLupa));
        const topo = Math.max(metadeLupa, Math.min(event.clientY - carouselRect.top, carouselRect.height - metadeLupa));

        lupa.style.left = `${esquerda}px`;
        lupa.style.top = `${topo}px`;
        lupa.style.backgroundImage = `url("${imagem.currentSrc || imagem.src}")`;
        lupa.style.backgroundPosition = `${(x / imagemRect.width) * 100}% ${(y / imagemRect.height) * 100}%`;
        lupa.style.display = 'block';
    });

    imagem.addEventListener('mouseleave', () => {
        lupa.style.display = 'none';
    });
}

function trocarImagemModal(direcao) {
    const imagens = APP.carousel.imagens;
    if (imagens.length <= 1) return;

    APP.carousel.indice = (APP.carousel.indice + direcao + imagens.length) % imagens.length;
    const nomeProduto = document.getElementById('modalName')?.textContent || 'Produto';
    atualizarCarouselModal(nomeProduto);
}

function fecharModal(opcoes = {}) {
    const { atualizarUrl = true } = opcoes;
    const modal = document.getElementById('productModal');
    if (!modal || modal.style.display === 'none') return;

    APP.produtoAtual = null;
    modal.classList.add('modal-closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-closing');
    }, 180);

    if (atualizarUrl && hashEhDeProduto()) {
        history.pushState(null, '', obterUrlSemHash());
    }
}

function abrirProdutoPeloLink() {
    const id = obterIdProdutoDoHash();
    if (!id || !APP.produtos.length) return;

    const produto = APP.produtos.find(item => produtoVisivelNoCatalogo(item) && produtoCorrespondeAoId(item, id));
    if (produto) {
        abrirModal(produto, { atualizarUrl: false });
    }
}

function atualizarLinkProduto(produto) {
    const url = obterLinkProdutoAtual(produto);
    if (window.location.href !== url) {
        history.pushState(null, '', url);
    }
}

async function compartilharProduto(produto) {
    const url = obterLinkProdutoPublico(produto);
    const texto = `Confira este produto da VSTECH: ${produto.nome}`;
    const copyProductBtn = document.getElementById('copyProductBtn');

    try {
        if (navigator.share) {
            await navigator.share({ title: produto.nome, text: texto, url });
        } else if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
            mostrarStatusCompartilhamento(copyProductBtn, 'Link copiado');
        } else {
            window.prompt('Copie o link do produto:', url);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            window.prompt('Copie o link do produto:', url);
        }
    }
}

function mostrarStatusCompartilhamento(botao, texto) {
    if (!botao) return;

    const textoOriginal = botao.textContent;
    botao.textContent = texto;
    setTimeout(() => {
        botao.textContent = textoOriginal;
    }, 1800);
}

function obterLinkProdutoAtual(produto) {
    const id = criarIdProduto(produto);
    return `${obterUrlSemHash()}#produto=${encodeURIComponent(id)}`;
}

function obterLinkProdutoPublico(produto) {
    const id = criarIdProduto(produto);
    return `${SITE_PUBLIC_URL}#produto=${encodeURIComponent(id)}`;
}

function obterUrlSemHash() {
    return window.location.href.split('#')[0];
}

function hashEhDeProduto() {
    return Boolean(obterIdProdutoDoHash());
}

function obterIdProdutoDoHash() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash.startsWith('produto=')) return '';

    return decodeURIComponent(hash.slice('produto='.length));
}

function criarIdProduto(produto) {
    return String(produto.codigo || produto.nome || '').trim();
}

function produtoCorrespondeAoId(produto, id) {
    const idNormalizado = normalizarIdProduto(id);
    return [
        produto.codigo,
        produto.nome,
        criarIdProduto(produto)
    ].some(valor => normalizarIdProduto(valor) === idNormalizado);
}

function normalizarIdProduto(valor) {
    return normalizarTexto(valor).replace(/\s+/g, ' ').trim();
}

function abrirWhatsApp(produto) {

    const mensagem = 
`OLÁ! 

TENHO INTERESSE NESTE PRODUTO:

 PRODUTO: ${produto.nome}
 CÓDIGO: ${produto.codigo}
 ${produto.marca ? `MARCA: ${produto.marca}\n ` : ''}VALOR: ${produto.valor}

PODERIA ME PASSAR MAIS INFORMAÇÕES?`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank', 'noopener');
}

function abrirContactModal() {
    const contactModal = document.getElementById('contactModal');
    const contactWhatsAppLink = document.getElementById('contactWhatsAppLink');
    if (!contactModal) return;

    const mensagem = 'Olá! Não encontrei o que precisava no catálogo. Poderiam fazer uma busca manual para mim, por favor?';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    if (contactWhatsAppLink) {
        contactWhatsAppLink.href = whatsappUrl;
    }

    contactModal.style.display = 'block';
}

function fecharContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (!contactModal || contactModal.style.display === 'none') return;

    contactModal.classList.add('modal-closing');
    setTimeout(() => {
        contactModal.style.display = 'none';
        contactModal.classList.remove('modal-closing');
    }, 180);
}

async function carregarImagens() {
    let imagensPublicadas = {};

    try {
        const response = await fetch(IMAGENS_MAP_URL, { cache: 'no-store' });
        if (response.ok) {
            imagensPublicadas = normalizarMapaImagens(await response.json());
        }
    } catch (error) {
        console.warn('Nao foi possivel carregar imagens publicadas:', error);
    }

    try {
        const imagensLocais = normalizarMapaImagens(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
        APP.imagensPorProduto = { ...imagensPublicadas, ...imagensLocais };
    } catch (error) {
        console.warn('Nao foi possivel ler imagens salvas:', error);
        APP.imagensPorProduto = imagensPublicadas;
    }
}

function salvarImagensNoLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(APP.imagensPorProduto));
}

function normalizarMapaImagens(mapa) {
    return Object.fromEntries(Object.entries(mapa).map(([codigo, valor]) => {
        if (Array.isArray(valor)) {
            return [codigo, valor.filter(Boolean)];
        }

        return [codigo, valor ? [valor] : []];
    }));
}

function obterImagensProduto(codigo) {
    const imagens = APP.imagensPorProduto[codigo];
    if (Array.isArray(imagens)) return imagens.filter(Boolean);
    if (imagens) return [imagens];
    return [];
}

function obterClasseEstoque(estoque) {
    const texto = normalizarTexto(estoque);
    if (texto.includes('indisponivel')) return 'indisponivel';
    if (texto.includes('limitado')) return 'limitado';
    return 'disponivel';
}

function normalizarTexto(texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
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

window.salvarImagensNoLocalStorage = salvarImagensNoLocalStorage;
window.renderizarProdutos = renderizarProdutos;
window.obterImagensProduto = obterImagensProduto;
window.trocarImagemModal = trocarImagemModal;
window.produtoVisivelNoCatalogo = produtoVisivelNoCatalogo;
window.produtoTemEstoque = produtoTemEstoque;
window.produtoEhPecaNotebook = produtoEhPecaNotebook;
window.categoriaEhPermitidaNoFiltro = categoriaEhPermitidaNoFiltro;
window.categoriaTemRotuloVisivel = categoriaTemRotuloVisivel;
window.formatarTextoVisivel = formatarTextoVisivel;
