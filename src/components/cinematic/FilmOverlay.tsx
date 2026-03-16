export default function FilmOverlay() {
  return (
    <>
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, hsl(222 47% 6% / 0.6) 100%)",
        }}
      />
      {/* Film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />
    </>
  );
}
