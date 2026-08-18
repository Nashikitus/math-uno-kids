import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  OPERATIONS,
  OP_META,
  getStats,
  getDayLog,
  getStreak,
  getBadges,
  getProfile,
  type Stats,
  type DayLog,
  type Operation,
  type Profile,
} from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";
import { ProfileSetup } from "@/components/ProfileSetup";
import { SettingsPanel } from "@/components/SettingsPanel";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Painel dos responsáveis — KidsMath Cards" },
      {
        name: "description",
        content:
          "Veja a precisão semanal em matemática, os pontos fortes e as áreas para praticar.",
      },
    ],
  }),
  component: Parents,
});

function lastNDaysKeys(n: number): string[] {
  const keys: string[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    keys.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
    d.setDate(d.getDate() - 1);
  }
  return keys;
}

function Parents() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checked, setChecked] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [days, setDays] = useState<DayLog>({});
  const [streak, setStreak] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [editing, setEditing] = useState(false);

  const refresh = () => {
    setProfile(getProfile());
    setStats(getStats());
    setDays(getDayLog());
    setStreak(getStreak());
    setBadgeCount(getBadges().length);
    setChecked(true);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center font-display text-2xl font-extrabold">
        Carregando...
      </div>
    );
  }

  if (!profile || editing) {
    return (
      <div className="mx-auto min-h-screen w-full px-4 pb-28 pt-6">
        <h1 className="mb-4 text-center font-display text-3xl font-extrabold text-primary">
          {profile ? "Editar perfil ✏️" : "Criar perfil da criança 🦊"}
        </h1>
        <p className="mb-4 text-center text-base font-bold text-muted-foreground">
          {profile
            ? "Atualize o nome, nível e tema favorito da criança."
            : "Crie um perfil para salvar o progresso e personalizar as histórias."}
        </p>
        <ProfileSetup
          showWelcome={!profile}
          doneLabel="Voltar para dashboard →"
          onDone={() => {
            setEditing(false);
            refresh();
          }}
        />
        <BottomNav />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center font-display text-2xl font-extrabold">
        Carregando...
      </div>
    );
  }

  // Weekly per-op aggregation
  const weekKeys = lastNDaysKeys(7);
  const weekly: Record<Operation, { total: number; correct: number }> = {
    addition: { total: 0, correct: 0 },
    subtraction: { total: 0, correct: 0 },
    multiplication: { total: 0, correct: 0 },
    division: { total: 0, correct: 0 },
  };
  let weekTotal = 0;
  for (const key of weekKeys) {
    const entry = days[key];
    if (!entry) continue;
    weekTotal += entry.total;
    for (const op of OPERATIONS) {
      const e = entry.byOp[op];
      if (e) {
        weekly[op].total += e.total;
        weekly[op].correct += e.correct;
      }
    }
  }

  const withData = OPERATIONS.filter((op) => weekly[op].total >= 3);
  const acc = (op: Operation) =>
    Math.round((weekly[op].correct / Math.max(1, weekly[op].total)) * 100);
  let insight = `${profile.name} ainda não praticou muito nesta semana. Uma rodada rápida por dia ajuda a criar o hábito!`;
  if (withData.length > 0) {
    const sorted = [...withData].sort((a, b) => acc(b) - acc(a));
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];
    if (best === worst) {
      insight = `${profile.name} acertou ${acc(best)}% em ${OP_META[best].label.toLowerCase()} nesta semana. Tente incluir outra operação!`;
    } else {
      insight = `${profile.name} acertou ${acc(best)}% em ${OP_META[best].label.toLowerCase()} nesta semana, mas pode praticar mais ${OP_META[worst].label.toLowerCase()} (${acc(worst)}%).`;
    }
  }

  return (
    <div className="mx-auto min-h-screen w-full px-4 pb-28 pt-6">
      <h1 className="mb-2 text-center font-display text-3xl font-extrabold text-primary">
        Painel dos responsáveis 📊
      </h1>
      <div className="mb-6 flex items-center justify-center gap-2">
        <span className="rounded-full bg-muted px-3 py-1 text-sm font-bold text-muted-foreground">
          Criança: <span className="font-extrabold text-foreground">{profile.name}</span>
        </span>
        <button
          onClick={() => setEditing(true)}
          className="btn-bounce rounded-full bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary"
        >
          ✏️ Editar perfil
        </button>
      </div>

      {/* Insight */}
      <div className="shadow-pop mb-6 rounded-3xl border-4 border-fun-blue bg-card p-5 animate-pop-in">
        <p className="font-display text-sm font-extrabold uppercase tracking-wide text-fun-blue">
          Esta semana
        </p>
        <p className="mt-1 text-base font-bold leading-relaxed">{insight}</p>
      </div>

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="shadow-pop rounded-3xl border-4 border-border bg-card p-4 text-center">
          <p className="font-display text-2xl font-extrabold">{weekTotal}</p>
          <p className="text-xs font-bold text-muted-foreground">Respostas nesta semana</p>
        </div>
        <div className="shadow-pop rounded-3xl border-4 border-border bg-card p-4 text-center">
          <p className="font-display text-2xl font-extrabold">{streak} 🔥</p>
          <p className="text-xs font-bold text-muted-foreground">Dias seguidos</p>
        </div>
        <div className="shadow-pop rounded-3xl border-4 border-border bg-card p-4 text-center">
          <p className="font-display text-2xl font-extrabold">{badgeCount} 🏅</p>
          <p className="text-xs font-bold text-muted-foreground">Medalhas conquistadas</p>
        </div>
      </div>

      {/* Weekly accuracy by operation */}
      <section className="mb-8">
        <h2 className="mb-4 font-display text-xl font-extrabold">Precisão semanal</h2>
        <div className="space-y-3">
          {OPERATIONS.map((op) => {
            const w = weekly[op];
            const pct = w.total > 0 ? Math.round((w.correct / w.total) * 100) : 0;
            return (
              <div key={op} className="shadow-pop rounded-3xl border-4 border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-display text-base font-extrabold">
                    {OP_META[op].symbol} {OP_META[op].label}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">
                    {w.total > 0 ? `${pct}% · ${w.correct}/${w.total}` : "Ainda sem prática"}
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full bg-${OP_META[op].color} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* All-time */}
      <section>
        <h2 className="mb-4 font-display text-xl font-extrabold">Todo o período</h2>
        <div className="shadow-pop overflow-hidden rounded-3xl border-4 border-border bg-card">
          {OPERATIONS.map((op) => {
            const s = stats[op];
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div
                key={op}
                className="flex items-center justify-between border-b-2 border-border px-5 py-3 last:border-b-0"
              >
                <span className="font-display text-base font-extrabold">{OP_META[op].label}</span>
                <span className="text-sm font-bold text-muted-foreground">
                  {s.total > 0 ? `${pct}% (${s.correct}/${s.total})` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-8">
        <SettingsPanel onEditProfile={() => setEditing(true)} />
      </div>

      <BottomNav />
    </div>
  );
}
