// MOCK

export const resumo = {
  funcionariosAtivos: 7,
  ativosCadastrados: 10,
  episEmPosse: 7,
  lancamentosPendentes: 3,
}

export const ativosPorStatus = [
  { status: 'Disponível', qtd: 3 },
  { status: 'Em uso', qtd: 4 },
  { status: 'Manutenção', qtd: 2 },
  { status: 'Baixado', qtd: 1 },
]

export const financeiro = [
  { mes: 'mar/26', receita: 12500, despesa: 8200 },
  { mes: 'abr/26', receita: 14200, despesa: 9100 },
  { mes: 'mai/26', receita: 11800, despesa: 10400 },
  { mes: 'jun/26', receita: 15600, despesa: 8800 },
  { mes: 'jul/26', receita: 16100, despesa: 9300 },
  { mes: 'ago/26', receita: 13900, despesa: 7600 },
]

export const pendencias = [
  { id: 1, titulo: 'Ajuste de ponto do dia 06/08', origem: 'Meu Ponto', data: '07/08/2026' },
  { id: 2, titulo: 'Compra de luvas nitrílicas — R$ 620,00', origem: 'Financeiro', data: '02/08/2026' },
  { id: 3, titulo: 'Baixa da betoneira ATI-008', origem: 'Ativos', data: '01/08/2026' },
]

export const paginas = [
  {
    rota: 'meu-ponto',
    titulo: 'Meu Ponto',
    subtitulo: 'Seus registros de ponto mais recentes.',
    colunas: ['Data', 'Entrada', 'Saída', 'Horas', 'Status'],
    linhas: [
      ['12/08/2026', '08:01', '17:32', '8h 31min', 'Pendente'],
      ['11/08/2026', '07:58', '17:05', '8h 07min', 'Aprovado'],
      ['08/08/2026', '08:12', '18:02', '8h 50min', 'Pendente'],
      ['07/08/2026', '08:00', '17:31', '8h 31min', 'Aprovado'],
      ['06/08/2026', '—', '—', '—', 'Ausência'],
    ],
  },
  {
    rota: 'meus-epis',
    titulo: 'Meus EPIs',
    subtitulo: 'Equipamentos entregues a você.',
    colunas: ['EPI', 'CA', 'Entrega', 'Validade', 'Status'],
    linhas: [
      ['Capacete de Segurança', 'CA 31469', '10/01/2026', '10/01/2027', 'Válido'],
      ['Botina de Segurança nº 42', 'CA 28512', '02/03/2026', '02/09/2026', 'Válido'],
      ['Luva Nitrílica', 'CA 32000', '15/06/2026', '15/08/2026', 'Vencendo'],
      ['Protetor Auricular', 'CA 5674', '20/02/2026', '20/05/2026', 'Vencido'],
    ],
  },
  {
    rota: 'funcionarios',
    titulo: 'Funcionários',
    subtitulo: 'Todos os funcionários cadastrados.',
    colunas: ['Nome', 'Cargo', 'Setor', 'Admissão', 'Status'],
    linhas: [
      ['Ana Souza', 'Técnica de Segurança', 'SESMT', '12/01/2023', 'Ativo'],
      ['Carlos Lima', 'Operador de Empilhadeira', 'Logística', '03/08/2022', 'Ativo'],
      ['Juliana Prado', 'Analista de RH', 'Recursos Humanos', '20/05/2024', 'Ativo'],
      ['Marcos Vieira', 'Eletricista', 'Manutenção', '15/03/2021', 'Férias'],
      ['Patrícia Nunes', 'Auxiliar de Produção', 'Produção', '02/10/2024', 'Ativo'],
      ['Rafael Torres', 'Mecânico', 'Manutenção', '11/07/2023', 'Ativo'],
      ['Beatriz Campos', 'Supervisora de Produção', 'Produção', '28/02/2022', 'Ativo'],
      ['Otávio Ramos', 'Soldador', 'Produção', '17/04/2023', 'Ativo'],
    ],
  },
  {
    rota: 'ativos',
    titulo: 'Ativos',
    subtitulo: 'Patrimônio e equipamentos da empresa.',
    colunas: ['Código', 'Nome', 'Categoria', 'Responsável', 'Status'],
    linhas: [
      ['ATI-001', 'Empilhadeira Toyota 2,5t', 'Veículos', 'Carlos Lima', 'Em uso'],
      ['ATI-002', 'Compressor de Ar 250L', 'Máquinas', '—', 'Disponível'],
      ['ATI-003', 'Furadeira de Banco', 'Ferramentas', 'Marcos Vieira', 'Manutenção'],
      ['ATI-004', 'Notebook Dell Latitude', 'Informática', 'Juliana Prado', 'Em uso'],
      ['ATI-005', 'Transpaleteira Manual', 'Veículos', '—', 'Disponível'],
      ['ATI-006', 'Máquina de Solda MIG 250A', 'Máquinas', 'Otávio Ramos', 'Em uso'],
      ['ATI-007', 'Escada Extensiva 10m', 'Equipamentos', '—', 'Disponível'],
      ['ATI-008', 'Betoneira 400L', 'Máquinas', '—', 'Baixado'],
      ['ATI-009', 'Monitor LG 27"', 'Informática', 'Ana Souza', 'Em uso'],
      ['ATI-010', 'Gerador 8kVA', 'Máquinas', '—', 'Manutenção'],
    ],
  },
  {
    rota: 'epis',
    titulo: 'EPIs',
    subtitulo: 'Estoque de equipamentos de proteção.',
    colunas: ['EPI', 'CA', 'Estoque', 'Em uso', 'Status'],
    linhas: [
      ['Capacete de Segurança', 'CA 31469', 42, 3, 'Em estoque'],
      ['Luva Nitrílica', 'CA 32000', 15, 2, 'Estoque baixo'],
      ['Botina de Segurança', 'CA 28512', 8, 1, 'Em estoque'],
      ['Protetor Auricular', 'CA 5674', 120, 0, 'Em estoque'],
      ['Óculos de Proteção', 'CA 26871', 0, 1, 'Esgotado'],
      ['Cinto Paraquedista', 'CA 35520', 4, 0, 'Em estoque'],
    ],
  },
  {
    rota: 'financeiro',
    titulo: 'Financeiro',
    subtitulo: 'Receitas e despesas lançadas.',
    colunas: ['Data', 'Descrição', 'Tipo', 'Valor'],
    linhas: [
      ['05/08/2026', 'Venda de sucata metálica', 'Receita', 'R$ 1.850,00'],
      ['02/08/2026', 'Compra de luvas nitrílicas', 'Despesa', 'R$ 620,00'],
      ['28/07/2026', 'Manutenção da empilhadeira', 'Despesa', 'R$ 1.480,00'],
      ['21/07/2026', 'Serviço prestado — Cliente Alfa', 'Receita', 'R$ 7.300,00'],
      ['15/07/2026', 'Energia elétrica', 'Despesa', 'R$ 2.140,00'],
      ['10/07/2026', 'Venda da betoneira ATI-008', 'Receita', 'R$ 900,00'],
    ],
  },
  {
    rota: 'usuarios',
    titulo: 'Usuários',
    subtitulo: 'Acessos ao sistema.',
    colunas: ['Nome', 'E-mail', 'Perfil', 'Último acesso', 'Status'],
    linhas: [
      ['Ana Souza', 'ana.souza@empresa.com', 'Administrador', '13/08/2026 09:12', 'Ativo'],
      ['Carlos Lima', 'carlos.lima@empresa.com', 'Operacional', '12/08/2026 17:45', 'Ativo'],
      ['Juliana Prado', 'juliana.prado@empresa.com', 'RH', '11/08/2026 14:20', 'Ativo'],
      ['Marcos Vieira', 'marcos.vieira@empresa.com', 'Operacional', '05/08/2026 08:03', 'Inativo'],
    ],
  },
]