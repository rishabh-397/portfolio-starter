export default function OrbitPlanet() {
  return (
    <div className="relative w-full h-40 mb-10 flex items-center justify-center overflow-hidden">
      <div className="relative w-28 h-28">
        <div
          className="absolute inset-0 rounded-full animate-[spin_18s_linear_infinite]"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #3a3f4a, #0B1220 70%)",
            boxShadow:
              "inset -10px -10px 24px rgba(0,0,0,0.6), 0 0 40px rgba(232,163,61,0.15)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            borderColor: "var(--accent)",
            borderWidth: "1.5px",
            transform: "translate(-50%, -50%) rotateX(75deg)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite]"
          style={{ transform: "translate(-50%, -50%) rotateX(75deg)" }}
        >
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
      </div>
    </div>
  );
}