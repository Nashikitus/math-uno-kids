import type { Operation } from "./store";

export type MiniGameKind =
  | "count" // count emojis, addition/subtraction
  | "group" // multiplication as groups of emojis
  | "share" // division as sharing items into buckets
  | "compare" // <, >, =
  | "sequence" // what comes next
  | "quick-tap" // timed rapid fire
  | "catch" // falling number "flappy" style — tap correct answer
  | "memory" // match equation to answer
  | "boss"; // mixed rapid fire boss

export interface Phase {
  id: number;
  name: string;
  emoji: string;
  color: string; // fun-* token
  kind: MiniGameKind;
  op?: Operation;
  theme?: string; // e.g. "fruits", "animals", "stars"
  rounds: number;
  desc: string;
}

export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Contagem de frutas",
    emoji: "🍎",
    color: "fun-red",
    kind: "count",
    op: "addition",
    theme: "fruits",
    rounds: 5,
    desc: "Conte as frutas deliciosas!",
  },
  {
    id: 2,
    name: "Grupos de animais",
    emoji: "🐶",
    color: "fun-orange",
    kind: "group",
    op: "multiplication",
    theme: "animals",
    rounds: 5,
    desc: "Grupos de animais adoráveis!",
  },
  {
    id: 3,
    name: "Estoure os balões",
    emoji: "🎈",
    color: "fun-pink",
    kind: "count",
    op: "subtraction",
    theme: "balloons",
    rounds: 5,
    desc: "Quantos balões sobraram?",
  },
  {
    id: 4,
    name: "Divisão de biscoitos",
    emoji: "🍪",
    color: "fun-yellow",
    kind: "share",
    op: "division",
    theme: "cookies",
    rounds: 5,
    desc: "Divida os biscoitos igualmente!",
  },
  {
    id: 5,
    name: "Maior ou menor?",
    emoji: "🐘",
    color: "fun-green",
    kind: "compare",
    rounds: 6,
    desc: "Qual lado é maior?",
  },
  {
    id: 6,
    name: "Caminho dos números",
    emoji: "🐾",
    color: "fun-blue",
    kind: "sequence",
    rounds: 5,
    desc: "Qual é o próximo número?",
  },
  {
    id: 7,
    name: "Toque rápido!",
    emoji: "⚡",
    color: "fun-purple",
    kind: "quick-tap",
    rounds: 8,
    desc: "Vença o relógio — 30 segundos!",
  },
  {
    id: 8,
    name: "Capture os insetos",
    emoji: "🐞",
    color: "fun-green",
    kind: "catch",
    op: "addition",
    rounds: 6,
    desc: "Capture as respostas corretas enquanto elas caem!",
  },
  {
    id: 9,
    name: "Jogo da memória",
    emoji: "🧠",
    color: "fun-orange",
    kind: "memory",
    rounds: 4,
    desc: "Combine as equações com as respostas!",
  },
  {
    id: 10,
    name: "Batalha final",
    emoji: "👑",
    color: "fun-red",
    kind: "boss",
    rounds: 10,
    desc: "Enfrente o Rei da Matemática — desafio rápido misto!",
  },
];

export const THEME_EMOJIS: Record<string, string[]> = {
  fruits: ["🍎", "🍌", "🍇", "🍓", "🍊", "🍉"],
  animals: ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼"],
  balloons: ["🎈"],
  cookies: ["🍪"],
  stars: ["⭐"],
};

export function pickThemeEmoji(theme?: string): string {
  const arr = THEME_EMOJIS[theme ?? ""] ?? ["⭐"];
  return arr[Math.floor(Math.random() * arr.length)];
}
