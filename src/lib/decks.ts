import completeAsset from "@/assets/math-uno-complete.pdf.asset.json";
import fifaAsset from "@/assets/math-uno-fifa-2026-v3.pdf.asset.json";
import dollsBundle from "@/assets/paper-dolls-complete-bundle.pdf.asset.json";
import dollsRumi from "@/assets/paper-dolls-rumi.pdf.asset.json";
import dollsExtra from "@/assets/paper-dolls-extra-set.pdf.asset.json";
import dollsDark from "@/assets/paper-dolls-dark-skin-brown-hair.pdf.asset.json";
import dollsPhone from "@/assets/paper-dolls-iphone-craft.pdf.asset.json";
import deckSample from "@/assets/deck-sample.jpg.asset.json";
import fifaSample from "@/assets/fifa-sample.jpg.asset.json";
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
    tagline: "192 cartas · All 4 operations in one deck",
    badge: "🃏 Baralho principal",
    accent: "bg-fun-green",
    gradient: "from-fun-red via-fun-yellow to-fun-green",
    cartas: 192,
    operations: "Adição · Subtração · Multiplicação · Divisão",
    url: completeAsset.url,
    filename: "math-uno-complete-deck.pdf",
    card: cardMathUno,
    cover: cardMathUno,
    sample: deckSample.url,
    files: [
      {
        label: "Baralho completo — 192 cartas",
        description: "As quatro operações, card backs and the storage box template.",
        pages: 96,
        url: completeAsset.url,
        filename: "math-uno-complete-deck.pdf",
      },
    ],
    print: [
      "White cartastock 200–250 gsm for durable cartas.",
      "A4 or US Letter at 100% scale — turn OFF “Fit to page”.",
      "Imprima colorido, single-sided works great.",
      "Recorte ao longo the dashed lines com um adulto.",
      "Fold the included box template to store the deck.",
    ],
    play: [
      "2–6 players, ages 4+. Shuffle and deal 7 cartas each.",
      "Flip one card to start the discard pile.",
      "On your turn: match the COLOR or match the MATH VALUE.",
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
    tagline: "96 cartas · Premium exclusive edition",
    badge: "⭐ Edição premium",
    accent: "bg-fun-blue",
    gradient: "from-fun-blue via-fun-purple to-fun-red",
    cartas: 96,
    operations: "Adição + Subtração · Copa do Mundo 2026 theme",
    url: fifaAsset.url,
    filename: "math-uno-fifa-world-cup-2026.pdf",
    card: cardFifa,
    cover: cardFifa,
    sample: fifaSample.url,
    files: [
      {
        label: "Copa do Mundo 2026 Deck — 96 cartas",
        description: "Adição + subtraction cartas, team wilds and the themed box template.",
        pages: 48,
        url: fifaAsset.url,
        filename: "math-uno-fifa-world-cup-2026.pdf",
      },
    ],
    print: [
      "White cartastock 250 gsm gives the premium feel.",
      "A4 or US Letter at 100% scale — no scaling, no fit-to-page.",
      "Imprima em alta qualidade ou modo foto para destacar as cores dos times.",
      "Recorte ao longo the dashed lines, round the corners if you like.",
      "Fold the Copa do Mundo box template to store the deck.",
    ],
    play: [
      "2–6 players, ages 4+. Deal 7 cartas to each player.",
      "Adição + Subtração only — perfect for younger kids.",
      "Match the COLOR or match the MATH VALUE of the top card.",
      "Team cartas act as wilds: call out the next color.",
      "Não tem uma carta? Compre uma e passe a vez.",
      "Ficou com uma carta? Grite “UNO!” — forget and draw 2.",
      "Round winner scores the points left in every other hand.",
    ],
    hasScoreboard: true,
  },
  {
    id: "paper-dolls",
    name: "Kit de bonecas de papel",
    shortName: "Paper Bonecas",
    tagline: "+250 paper dolls to print, cut & play",
    badge: "🎀 Novidade",
    accent: "bg-fun-pink",
    gradient: "from-fun-pink via-fun-purple to-fun-red",
    cartas: 250,
    operations: "Bonecas · Roupas · Acessórios · Casa de bonecas",
    url: dollsBundle.url,
    filename: "paper-dolls-complete-bundle.pdf",
    card: cardPaperBonecas,
    cover: cardPaperBonecas,
    sample: cardPaperBonecas,
    files: [
      {
        label: "Complete Bundle — 20 sheets",
        description: "Bonecas with hair, dresses, shoes and accessories in every color theme.",
        pages: 20,
        url: dollsBundle.url,
        filename: "paper-dolls-complete-bundle.pdf",
      },
      {
        label: "Bonus: Rumi Set",
        description: "7 extra sheets with a full outfit collection.",
        pages: 7,
        url: dollsRumi.url,
        filename: "paper-dolls-rumi.pdf",
      },
      {
        label: "Bonus: Extra Doll Set",
        description: "6 more sheets of dolls and wardrobe pieces.",
        pages: 6,
        url: dollsExtra.url,
        filename: "paper-dolls-extra-set.pdf",
      },
      {
        label: "Bonus: Dark Skin · Brown Hair Set",
        description: "8 sheets so every kid finds a doll that looks like her.",
        pages: 8,
        url: dollsDark.url,
        filename: "paper-dolls-dark-skin-brown-hair.pdf",
      },
      {
        label: "Bonus: Paper Phone Craft",
        description: "5 sheets to build a cute paper phone for the dolls.",
        pages: 5,
        url: dollsPhone.url,
        filename: "paper-dolls-iphone-craft.pdf",
      },
    ],
    print: [
      "White cartastock 180–250 gsm keeps the dolls sturdy.",
      "A4 or US Letter at 100% scale — turn OFF “Fit to page”.",
      "Imprima colorido, high quality mode for soft pastel tones.",
      "Cut around the outlines com um adulto — small scissors help.",
      "Do NOT laminate the dolls: tabs need to bend to hold outfits.",
    ],
    play: [
      "Imprima primeiro as folhas das bonecas e depois as folhas das roupas.",
      "Cut each doll and fold the little base tab so she stands up.",
      "Cut the dresses keeping the white tabs — they fold over the shoulders.",
      "Mix hair, dresses, shoes and accessories to create new looks.",
      "Build the dollhouse pages and set up rooms for playtime.",
      "Store everything in an envelope or zip bag between plays.",
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
