/** @type {import('tailwindcss').Config} */
// TEMA CORUJA — estúdio noturno: preto-azulado + tons de azul.
// Nota: os NOMES dos tokens (cream/forest/gold/ink/muted) foram herdados do
// projeto-mãe para não reescrever todas as telas; os VALORES são do tema Coruja.
// Mapa mental: cream = fundos escuros · forest = azul-gelo (títulos/botões) ·
// gold = azul-médio (destaques/rótulos) · ink = texto claro · muted = secundário.
export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#0B1322", // fundo (quase preto azulado)
          deep: "#22335A", // bordas / faixas
          card: "#111C33", // superfície dos cards
        },
        forest: {
          DEFAULT: "#93C2FD", // azul-gelo: títulos e botões principais
          light: "#A8CEFF",
          soft: "#6FA4E8",
        },
        gold: {
          DEFAULT: "#3868B8", // azul-médio: destaques e fundos de selo
          deep: "#7FAEF2", // azul-claro: rótulos e kickers
        },
        ink: "#D9E4F5", // texto principal
        muted: "#7E92B8", // texto secundário
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.35)",
        lift: "0 4px 12px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
