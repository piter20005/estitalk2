export default function Marquee() {
  const items = Array.from({ length: 10 });
  return (
    <div className="bg-esti-dark py-4 overflow-hidden whitespace-nowrap relative flex">
      <div className="animate-scroll flex gap-8 min-w-full">
        {items.map((_, i) => (
          <span
            key={i}
            className="text-esti-beige text-sm font-bold tracking-[0.3em] uppercase opacity-80"
          >
            Całe miasto słucha Esti Talk &bull;
          </span>
        ))}
      </div>
      <div className="animate-scroll flex gap-8 min-w-full absolute top-4 left-full">
        {items.map((_, i) => (
          <span
            key={`dup-${i}`}
            className="text-esti-beige text-sm font-bold tracking-[0.3em] uppercase opacity-80"
          >
            Całe miasto słucha Esti Talk &bull;
          </span>
        ))}
      </div>
    </div>
  );
}
