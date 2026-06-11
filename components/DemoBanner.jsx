// Faixa fina no topo: deixa claro que isto é um playground público.
// Os dados são compartilhados entre os visitantes e zerados toda noite.
export function DemoBanner() {
  return (
    <div className="border-b border-cream-deep/60 bg-gold/15 px-5 py-1.5 text-center text-xs text-gold-deep">
      Playground público — sinta-se em casa. Tudo aqui é demonstração e os dados
      são limpos toda madrugada.
    </div>
  );
}
