import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { PHASES, type Phase } from "@/lib/roadmap";
import {
  getRoadmap,
  saveRoadmapStars,
  awardBadge,
  recordAnswer,
  type RoadmapProgress,
} from "@/lib/store";
import { playWin } from "@/lib/sounds";
import { BottomNav } from "@/components/BottomNav";
import { useRequireProfile } from "@/hooks/use-require-profile";
import { MiniGameRunner } from "@/components/MiniGames";
import { ProfileRedirectFallback } from "@/components/ProfileRedirectFallback";
import { FlappyMath } from "@/components/games/FlappyMath";
import { MathRacer } from "@/components/games/MathRacer";
import { ArcheryMath } from "@/components/games/ArcheryMath";
import { DragDropMatch } from "@/components/games/DragDropMatch";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Jogos — UNO Matemático Kids" },
      {
        name: "description",
        content:
          "Jogue minijogos de matemática: Estrada da Matemática, Matemática Flappy, Corrida Matemática, Arco e Flecha Matemático e Arraste e Solte!",
      },
    ],
  }),
  component: Play,
});

type Screen =
  | "hub"
  | "road"
  | "road-playing"
  | "road-done"
  | "flappy"
  | "racer"
  | "archery"
  | "dnd";

function computeEstrelas(correct: number, total: number): number {
  const pct = correct / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.65) return 2;
  if (pct >= 0.35) return 1;
  return 0;
}

interface GameCard {
  id: Screen;
  name: string;
  emoji: string;
  color: string;
  tag: string;
  desc: string;
}

const GAMES: GameCard[] = [
  {
    id: "road",
    name: "Estrada da Matemática",
    emoji: "🗺️",
    color: "fun-purple",
    tag: "Aventura",
    desc: "10 fases · Batalha final",
  },
  {
    id: "flappy",
    name: "Matemática Flappy",
    emoji: "🐤",
    color: "fun-yellow",
    tag: "Arcade",
    desc: "Voe até a resposta certa",
  },
  {
    id: "racer",
    name: "Corrida Matemática",
    emoji: "🏎️",
    color: "fun-red",
    tag: "Velocidade",
    desc: "Entre na faixa correta",
  },
  {
    id: "archery",
    name: "Arco e Flecha Matemático",
    emoji: "🏹",
    color: "fun-green",
    tag: "Mira",
    desc: "Segure, mire e atire nos balões",
  },
  {
    id: "dnd",
    name: "Arraste e Solte",
    emoji: "🧩",
    color: "fun-blue",
    tag: "Quebra-cabeça",
    desc: "Combine as equações com as respostas",
  },
];

function Play() {
  const { profile, ready, needsProfile } = useRequireProfile();
  const [rm, setRm] = useState<RoadmapProgress>({ currentPhase: 1, stars: {} });
  const [screen, setScreen] = useState<Screen>("hub");
  const [phase, setPhase] = useState<Phase | null>(null);
  const [result, setResult] = useState<{ stars: number; correct: number; total: number } | null>(
    null,
  );

  useEffect(() => {
    setRm(getRoadmap());
  }, []);

  if (!ready && !needsProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center font-display text-2xl font-extrabold">
        Carregando... 🦊
      </div>
    );
  }

  if (needsProfile || !profile) return <ProfileRedirectFallback />;

  const openPhase = (p: Phase) => {
    if (p.id > rm.currentPhase) return;
    setPhase(p);
    setResult(null);
    setScreen("road-playing");
  };

  const handleRoadComplete = (correct: number, total: number) => {
    if (!phase) return;
    const stars = computeEstrelas(correct, total);
    if (phase.op) {
      for (let k = 0; k < correct; k++) recordAnswer(phase.op, true);
      for (let k = 0; k < total - correct; k++) recordAnswer(phase.op, false);
    }
    const next = saveRoadmapStars(phase.id, stars);
    setRm(next);
    setResult({ stars, correct, total });
    setScreen("road-done");
    if (stars >= 1) {
      playWin();
      void confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      awardBadge("explorer");
      if (phase.id === PHASES.length && stars >= 2) awardBadge("boss-slayer");
    }
  };

  const backToHub = () => {
    setScreen("hub");
    setPhase(null);
    setResult(null);
  };

  return (
    <div className="mx-auto min-h-screen w-full px-4 pb-28 pt-6">
      {screen === "hub" && <JogosHub name={profile.name} rm={rm} onOpen={(id) => setScreen(id)} />}

      {screen === "road" && (
        <div>
          <BackBtn onClick={backToHub} label="Jogos" />
          <RoadmapVer profile={profile.name} rm={rm} onOpen={openPhase} />
        </div>
      )}

      {screen === "road-playing" && phase && (
        <div>
          <BackBtn onClick={() => setScreen("road")} label="Mapa" />
          <div className={`shadow-pop mb-4 rounded-3xl bg-${phase.color} p-4 text-center`}>
            <span className="text-3xl">{phase.emoji}</span>
            <h2 className="font-display text-xl font-extrabold text-primary-foreground">
              Fase {phase.id}: {phase.name}
            </h2>
            <p className="text-sm font-bold text-primary-foreground/90">{phase.desc}</p>
          </div>
          <MiniGameRunner phase={phase} level={profile.level} onComplete={handleRoadComplete} />
        </div>
      )}

      {screen === "road-done" && phase && result && (
        <div className="text-center animate-pop-in">
          <BackBtn onClick={() => setScreen("road")} label="Mapa" />
          <span className="text-7xl">{result.stars > 0 ? "🏆" : "😅"}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold">
            {result.stars > 0 ? "Fase concluída!" : "Quase lá! Tente novamente!"}
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-5xl ${s <= result.stars ? "" : "opacity-25 grayscale"}`}
              >
                ⭐
              </span>
            ))}
          </div>
          <p className="mt-3 font-display text-xl font-extrabold text-primary">
            {result.correct} / {result.total} acertos
          </p>
          <div className="mt-8 space-y-3">
            <button
              onClick={() => openPhase(phase)}
              className="btn-bounce shadow-pop w-full rounded-3xl bg-primary px-6 py-4 font-display text-lg font-extrabold text-primary-foreground"
            >
              Jogar novamente 🔁
            </button>
            {result.stars > 0 && phase.id < PHASES.length && (
              <button
                onClick={() => {
                  const nxt = PHASES[phase.id];
                  if (nxt) openPhase(nxt);
                }}
                className="btn-bounce shadow-pop w-full rounded-3xl bg-fun-green px-6 py-4 font-display text-lg font-extrabold text-primary-foreground"
              >
                Próxima fase ➡️
              </button>
            )}
            <button
              onClick={() => setScreen("road")}
              className="btn-bounce shadow-pop w-full rounded-3xl border-4 border-border bg-card px-6 py-4 font-display text-lg font-extrabold"
            >
              🗺️ Voltar para Mapa
            </button>
            <Link
              to="/progress"
              className="block pt-2 text-center font-display text-sm font-bold text-fun-purple underline"
            >
              Ver meu progresso ⭐
            </Link>
          </div>
        </div>
      )}

      {screen === "flappy" && (
        <div>
          <BackBtn onClick={backToHub} label="Jogos" />
          <GameHeader emoji="🐤" name="Matemática Flappy" color="fun-yellow" />
          <FlappyMath level={profile.level} onExit={backToHub} />
        </div>
      )}

      {screen === "racer" && (
        <div>
          <BackBtn onClick={backToHub} label="Jogos" />
          <GameHeader emoji="🏎️" name="Corrida Matemática" color="fun-red" />
          <MathRacer level={profile.level} onExit={backToHub} />
        </div>
      )}

      {screen === "archery" && (
        <div>
          <BackBtn onClick={backToHub} label="Jogos" />
          <GameHeader emoji="🏹" name="Arco e Flecha Matemático" color="fun-green" />
          <ArcheryMath level={profile.level} onExit={backToHub} />
        </div>
      )}

      {screen === "dnd" && (
        <div>
          <BackBtn onClick={backToHub} label="Jogos" />
          <GameHeader emoji="🧩" name="Arraste e Solte Match" color="fun-blue" />
          <DragDropMatch level={profile.level} onExit={backToHub} />
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function BackBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="mb-3 font-display text-sm font-bold text-muted-foreground underline"
    >
      ← Voltar para {label}
    </button>
  );
}

function GameHeader({ emoji, name, color }: { emoji: string; name: string; color: string }) {
  return (
    <div className={`shadow-pop mb-4 rounded-3xl bg-${color} p-4 text-center`}>
      <span className="text-3xl">{emoji}</span>
      <h2 className="font-display text-xl font-extrabold text-primary-foreground">{name}</h2>
    </div>
  );
}

function JogosHub({
  name,
  rm,
  onOpen,
}: {
  name: string;
  rm: RoadmapProgress;
  onOpen: (id: Screen) => void;
}) {
  const totalEstrelas = useMemo(
    () => Object.values(rm.stars).reduce((s, n) => s + n, 0),
    [rm.stars],
  );
  return (
    <div>
      <div className="mb-5 text-center">
        <h1 className="font-display text-3xl font-extrabold text-primary">🎮 Jogos</h1>
        <p className="font-display text-sm font-bold text-muted-foreground">
          Olá, {name}! Você tem {totalEstrelas} ⭐ · Escolha um jogo para jogar!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((g, i) => (
          <button
            key={g.id}
            onClick={() => onOpen(g.id)}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`btn-bounce shadow-pop animate-float-up rounded-3xl border-4 border-border bg-${g.color} p-4 text-left text-primary-foreground`}
          >
            <div className="flex items-center gap-2">
              <span className="text-4xl">{g.emoji}</span>
              <span className="ml-auto rounded-full bg-card px-2 py-0.5 font-display text-[10px] font-extrabold text-foreground">
                {g.tag}
              </span>
            </div>
            <p className="mt-2 font-display text-lg font-extrabold leading-tight">{g.name}</p>
            <p className="text-xs font-bold opacity-90">{g.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function RoadmapVer({
  profile,
  rm,
  onOpen,
}: {
  profile: string;
  rm: RoadmapProgress;
  onOpen: (p: Phase) => void;
}) {
  const totalEstrelas = useMemo(
    () => Object.values(rm.stars).reduce((s, n) => s + n, 0),
    [rm.stars],
  );
  return (
    <div>
      <div className="mb-4 text-center">
        <h1 className="font-display text-3xl font-extrabold text-primary">
          🗺️ Estrada da Matemática
        </h1>
        <p className="font-display text-sm font-bold text-muted-foreground">
          {profile}, você tem {totalEstrelas} ⭐ · Chegue à batalha final na fase 10!
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-4 left-1/2 -z-0 w-1 -translate-x-1/2 rounded-full border-4 border-dashed border-border/70" />
        <ol className="relative space-y-4">
          {PHASES.map((p, idx) => {
            const unlocked = p.id <= rm.currentPhase;
            const stars = rm.stars[p.id] ?? 0;
            const side = idx % 2 === 0 ? "left" : "right";
            return (
              <li
                key={p.id}
                className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}
              >
                <button
                  disabled={!unlocked}
                  onClick={() => onOpen(p)}
                  className={`btn-bounce shadow-pop relative w-[85%] rounded-3xl border-4 p-4 text-left transition-all ${
                    unlocked
                      ? `border-border bg-${p.color} text-primary-foreground animate-float-up`
                      : "border-border bg-muted text-muted-foreground opacity-60"
                  }`}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-card text-3xl">
                      {unlocked ? p.emoji : "🔒"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xs font-extrabold uppercase opacity-80">
                        Fase {p.id}
                      </p>
                      <p className="font-display text-lg font-extrabold leading-tight">{p.name}</p>
                      <p className="text-xs font-bold opacity-90">{p.desc}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        className={`text-lg ${s <= stars ? "" : "opacity-30 grayscale"}`}
                      >
                        ⭐
                      </span>
                    ))}
                    {p.id === rm.currentPhase && unlocked && (
                      <span className="ml-auto rounded-full bg-card px-2 py-0.5 font-display text-[10px] font-extrabold text-foreground">
                        NEXT ▶
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
