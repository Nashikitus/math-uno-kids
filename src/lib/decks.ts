import cardMathUno from "@/assets/card-math-uno.jpg";
import cardFifa from "@/assets/card-fifa.jpg";
import cardPaperBonecas from "@/assets/card-paper-dolls.jpg";

export type ProdutoId = "complete" | "fifa" | "paper-dolls";

export interface ProdutoFile {
  label: string;
  description: string;
  pages: number;
  url: string;
  filename: string;
}

export interface Produto {
  id: ProdutoId;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  accent: string; // tailwind bg-* token
  gradient: string;
  cartas: number;
  operations: string;
  /** Main PDF (used by Ver / Baixar buttons) */
  url: string;
  filename: string;
  card: string;
  cover: string;
  sample: string;
  files: ProdutoFile[];
  print: string[];
  play: string[];
  hasScoreboard: boolean;
}

export const PRODUCTS: Produto[] = [
  {
    id: "complete",
    name: "UNO Matemático — Baralho completo",
    shortName: "UNO Matemático",
    tagline: "192 cartas · As quatro operações em um só baralho",
    badge: "Baralho principal",
    accent: "bg-fun-green",
    gradient: "from-fun-red via-fun-yellow to-fun-green",
    cartas: 192,
    operations: "Adição · Subtração · Multiplicação · Divisão",
    url: "/pdfs/math-uno-complete-deck.pdf",
    filename: "math-uno-complete-deck.pdf",
    card: cardMathUno,
    cover: cardMathUno,
    sample: cardMathUno,
    files: [
      {
        label: "Baralho completo — 192 cartas",
        description:
          "As quatro operações, versos das cartas e modelo de caixa para guardar o baralho.",
        pages: 96,
        url: "/pdfs/math-uno-complete-deck.pdf",
        filename: "math-uno-complete-deck.pdf",
      },
    ],
    print: [
      "Cartolina branca de 200–250 g/m² para cartas resistentes.",
      "A4 ou Carta em escala de 100% — desative “Ajustar à página”.",
      "Imprima colorido; frente única funciona muito bem.",
      "Recorte ao longo das linhas tracejadas com um adulto.",
      "Dobre o modelo de caixa incluído para guardar o baralho.",
    ],
    play: [
      "2–6 jogadores, a partir de 4 anos. Embaralhe e distribua 7 cartas para cada jogador.",
      "Vire uma carta para começar a pilha de descarte.",
      "Na sua vez: combine a COR ou o VALOR MATEMÁTICO.",
      "Example: “1+1” can be played on “2” or on “0+2”.",
      "Não tem uma carta? Compre uma e passe a vez.",
      "Ficou com uma carta? Grite “UNO!”",
      "O primeiro jogador a ficar sem cartas vence a rodada.",
    ],
    hasScoreboard: true,
  },
  {
    id: "fifa",
    name: "UNO Matemático — FIFA Copa do Mundo 2026",
    shortName: "Copa do Mundo 2026",
    tagline: "96 cartas · Edição premium exclusiva",
    badge: "⭐ Edição premium",
    accent: "bg-fun-blue",
    gradient: "from-fun-blue via-fun-purple to-fun-red",
    cartas: 96,
    operations: "Adição + Subtração · Tema Copa do Mundo 2026",
    url: "/pdfs/math-uno-fifa-world-cup-2026.pdf",
    filename: "math-uno-fifa-world-cup-2026.pdf",
    card: cardFifa,
    cover: cardFifa,
    sample: cardFifa,
    files: [
      {
        label: "Copa do Mundo 2026 Deck — 96 cartas",
        description:
          "Cartas de adição e subtração, cartas coringa de times e modelo de caixa temático.",
        pages: 48,
        url: "/pdfs/math-uno-fifa-world-cup-2026.pdf",
        filename: "math-uno-fifa-world-cup-2026.pdf",
      },
    ],
    print: [
      "Cartolina branca de 250 g/m² dá um acabamento premium.",
      "A4 or US Letter at 100% scale — no scaling, no fit-to-page.",
      "Imprima em alta qualidade ou modo foto para destacar as cores dos times.",
      "Recorte ao longo das linhas tracejadas; arredonde os cantos se quiser.",
      "Dobre o modelo de caixa da Copa do Mundo para guardar o baralho.",
    ],
    play: [
      "2–6 jogadores, a partir de 4 anos. Distribua 7 cartas para cada jogador.",
      "Adição + Subtração only — perfect for younger kids.",
      "Combine a COR ou o VALOR MATEMÁTICO da carta do topo.",
      "As cartas de time funcionam como coringas: escolha a próxima cor.",
      "Não tem uma carta? Compre uma e passe a vez.",
      "Ficou com uma carta? Grite “UNO!” — se esquecer, compre 2.",
      "O vencedor da rodada marca os pontos restantes nas mãos dos outros jogadores.",
    ],
    hasScoreboard: true,
  },
  {
    id: "paper-dolls",
    name: "Kit de bonecas de papel",
    shortName: "Bonecas de papel",
    tagline: "+250 bonecas de papel para imprimir, recortar e brincar",
    badge: "🎀 Novidade",
    accent: "bg-fun-pink",
    gradient: "from-fun-pink via-fun-purple to-fun-red",
    cartas: 250,
    operations: "Bonecas · Roupas · Acessórios · Casa de bonecas",
    url: "/pdfs/paper-dolls-complete-bundle.pdf",
    filename: "paper-dolls-complete-bundle.pdf",
    card: cardPaperBonecas,
    cover: cardPaperBonecas,
    sample: cardPaperBonecas,
    files: [
      {
        label: "Pacote completo — 20 folhas",
        description:
          "Bonecas com cabelos, vestidos, sapatos e acessórios em todos os temas de cores.",
        pages: 20,
        url: "/pdfs/paper-dolls-complete-bundle.pdf",
        filename: "paper-dolls-complete-bundle.pdf",
      },
      {
        label: "Bônus: conjunto Rumi",
        description: "7 folhas extras com uma coleção completa de roupas.",
        pages: 7,
        url: "/pdfs/paper-dolls-rumi.pdf",
        filename: "paper-dolls-rumi.pdf",
      },
      {
        label: "Bônus: conjunto extra de bonecas",
        description: "6 folhas extras de bonecas e peças de guarda-roupa.",
        pages: 6,
        url: "/pdfs/paper-dolls-extra-set.pdf",
        filename: "paper-dolls-extra-set.pdf",
      },
      {
        label: "Bônus: pele escura · cabelos castanhos",
        description: "8 folhas para que toda criança encontre uma boneca parecida com ela.",
        pages: 8,
        url: "/pdfs/paper-dolls-dark-skin-brown-hair.pdf",
        filename: "paper-dolls-dark-skin-brown-hair.pdf",
      },
      {
        label: "Bônus: celular de papel",
        description: "5 folhas para montar um celular de papel fofo para as bonecas.",
        pages: 5,
        url: "/pdfs/paper-dolls-iphone-craft.pdf",
        filename: "paper-dolls-iphone-craft.pdf",
      },
    ],
    print: [
      "Cartolina branca de 180–250 g/m² mantém as bonecas firmes.",
      "A4 ou Carta em escala de 100% — desative “Ajustar à página”.",
      "Imprima colorido, usando o modo de alta qualidade para tons pastel suaves.",
      "Recorte os contornos com um adulto — tesouras pequenas ajudam.",
      "Não plastifique as bonecas: as abas precisam dobrar para segurar as roupas.",
    ],
    play: [
      "Imprima primeiro as folhas das bonecas e depois as folhas das roupas.",
      "Recorte cada boneca e dobre a pequena aba da base para que ela fique em pé.",
      "Recorte os vestidos mantendo as abas brancas — elas dobram sobre os ombros.",
      "Combine cabelos, vestidos, sapatos e acessórios para criar novos visuais.",
      "Monte as páginas da casa de bonecas e organize os cômodos para brincar.",
      "Guarde tudo em um envelope ou saco com fecho entre as brincadeiras.",
    ],
    hasScoreboard: false,
  },
];

export function getProduto(id: string): Produto | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function downloadUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadProduto(product: Produto) {
  downloadUrl(product.url, product.filename);
}
