"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import { SectionTitle } from "@/components/ui";

// Pautas universais: arquétipos de conteúdo que funcionam para qualquer tema
// de canal. O {tema} é preenchido com o tema configurado logo acima — então a
// mesma prateleira serve para tecnologia, nutrição, finanças, o que for.
const CATEGORIAS = [
  {
    titulo: "Para educar",
    pautas: [
      "Guia de iniciantes: o essencial de {tema} para quem está começando",
      "Mitos e verdades sobre {tema}",
      "Os erros mais comuns de quem está começando em {tema}",
      "Termos de {tema} que todo mundo confunde, explicados de forma simples",
    ],
  },
  {
    titulo: "Para engajar",
    pautas: [
      "As perguntas mais comuns sobre {tema}, respondidas",
      "Como {tema} mudou nos últimos anos — antes e depois",
      "Sinais de que você precisa aprender mais sobre {tema}",
      "O que ninguém te conta sobre {tema}",
    ],
  },
  {
    titulo: "Para atualizar",
    pautas: [
      "O que mudou recentemente em {tema}",
      "Tendências de {tema} para ficar de olho",
      "A novidade mais comentada de {tema} nesta semana",
    ],
  },
  {
    titulo: "Para inspirar ação",
    pautas: [
      "Por onde começar em {tema}: o primeiro passo certo",
      "Hábitos simples de quem se dá bem com {tema}",
      "Checklist básico de {tema} para não esquecer de nada",
    ],
  },
];

export default function TemasPage() {
  const [format, setFormat] = useState("reel");
  const [niche, setNiche] = useState("");
  const [nicheDraft, setNicheDraft] = useState("");
  const [savingNiche, setSavingNiche] = useState(false);
  const [selected, setSelected] = useState(null); // pauta aberta no painel
  const [explanation, setExplanation] = useState(null);
  const [loadingExpl, setLoadingExpl] = useState(false);
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api
      .niche()
      .then((r) => {
        setNiche(r.niche || "");
        setNicheDraft(r.niche || "");
      })
      .catch(() => {});
  }, []);

  async function salvarNiche() {
    const v = nicheDraft.trim();
    if (!v || savingNiche) return;
    setSavingNiche(true);
    setMsg("");
    try {
      const r = await api.setNiche(v);
      setNiche(r.niche);
      setNicheDraft(r.niche);
      setMsg("Tema salvo — a fonte de notícias já acompanhou. Vá em Notícias e toque em Coletar.");
    } catch (e) {
      setMsg(`Não consegui salvar o tema: ${e.message}`);
    } finally {
      setSavingNiche(false);
    }
  }

  // Preenche o {tema} das pautas com o tema atual do canal.
  function montar(pauta) {
    return pauta.replaceAll("{tema}", niche || "o tema do canal");
  }

  // Abre o painel e busca a explicação da pauta.
  async function abrir(pautaTexto) {
    const item = { label: pautaTexto, topic: pautaTexto };
    setSelected(item);
    setExplanation(null);
    setLoadingExpl(true);
    setMsg("");
    try {
      const r = await api.explainTopic(item.topic);
      setExplanation(r.explanation);
    } catch (e) {
      setExplanation("Não consegui carregar a explicação agora — mas você ainda pode criar o roteiro.");
    } finally {
      setLoadingExpl(false);
    }
  }

  function fechar() {
    setSelected(null);
    setExplanation(null);
  }

  // Confirma e cria o roteiro a partir da pauta aberta.
  async function confirmar() {
    if (!selected) return;
    setCreating(true);
    try {
      await api.createFromTopic({ topic: selected.topic, format });
      setMsg("Roteiro escrito e verificado. Está em Roteiros, na fila a revisar.");
      fechar();
    } catch (e) {
      setMsg(`Não consegui gerar agora: ${e.message}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="rise">
      <SectionTitle kicker="Pautas" title="Temas" />

      {/* Tema do canal: o coração da demo — tudo se molda a ele */}
      <div className="mb-6 rounded-2xl border border-cream-deep bg-cream-card p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Seu canal
        </p>
        <p className="mt-1 text-sm text-muted">
          Diga sobre o que é o canal. A triagem de notícias, os roteiros e as pautas abaixo se
          moldam a esse tema na hora.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={nicheDraft}
            onChange={(e) => setNicheDraft(e.target.value)}
            placeholder="ex.: nutrição esportiva, finanças pessoais, fotografia…"
            maxLength={200}
            className="flex-1 rounded-xl border border-cream-deep bg-cream px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest"
          />
          <button
            onClick={salvarNiche}
            disabled={savingNiche || !nicheDraft.trim() || nicheDraft.trim() === niche}
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {savingNiche ? "Salvando…" : "Salvar tema"}
          </button>
        </div>
      </div>

      {/* Formato dos roteiros criados a partir das pautas */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Gerar como
        </span>
        <div className="flex overflow-hidden rounded-full border border-cream-deep">
          <button
            onClick={() => setFormat("reel")}
            className={`px-4 py-1.5 text-sm transition-colors ${
              format === "reel" ? "bg-forest text-cream" : "text-muted hover:text-ink"
            }`}
          >
            Reel
          </button>
          <button
            onClick={() => setFormat("carrossel")}
            className={`px-4 py-1.5 text-sm transition-colors ${
              format === "carrossel" ? "bg-forest text-cream" : "text-muted hover:text-ink"
            }`}
          >
            Carrossel
          </button>
        </div>
        <span className="text-sm text-muted">
          Toque numa pauta — primeiro você entende o assunto, depois decide criar.
        </span>
      </div>

      {msg && (
        <p className="mb-5 rounded-xl border border-cream-deep bg-cream-card px-4 py-2 text-sm text-muted">
          {msg}
        </p>
      )}

      {/* Prateleira de pautas universais */}
      <div className="flex flex-col gap-7">
        {CATEGORIAS.map((cat) => (
          <div key={cat.titulo}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
              {cat.titulo}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {cat.pautas.map((p) => (
                <button
                  key={p}
                  onClick={() => abrir(montar(p))}
                  className="group rounded-2xl border border-cream-deep bg-cream-card p-4 text-left transition-colors hover:border-forest"
                >
                  <span className="text-sm leading-snug text-ink">{montar(p)}</span>
                  <span className="mt-2 block text-xs font-medium text-forest/70 group-hover:text-forest">
                    Ver e criar →
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <ExplainModal
          item={selected}
          format={format}
          explanation={explanation}
          loading={loadingExpl}
          creating={creating}
          onCreate={confirmar}
          onClose={fechar}
        />
      )}
    </div>
  );
}

function ExplainModal({ item, format, explanation, loading, creating, onCreate, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !creating) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, creating]);

  if (typeof document === "undefined") return null;

  const paras = (explanation || "").split("\n").filter((p) => p.trim());

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(4, 9, 18, 0.7)" }}
      onClick={() => !creating && onClose()}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-cream-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-cream-deep px-6 py-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">Sobre esta pauta</p>
          <h2 className="font-display text-xl leading-tight text-forest">{item.label}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <p className="text-sm text-muted">Explicando o assunto…</p>
          ) : (
            <div className="space-y-3 text-sm leading-relaxed text-ink">
              {paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-cream-deep px-6 py-4">
          <button
            onClick={onClose}
            disabled={creating}
            className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-forest disabled:opacity-60"
          >
            Fechar
          </button>
          <button
            onClick={onCreate}
            disabled={loading || creating}
            className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {creating ? "Escrevendo…" : `Criar roteiro · ${format === "carrossel" ? "Carrossel" : "Reel"}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
