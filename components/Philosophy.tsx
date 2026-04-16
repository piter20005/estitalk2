export default function Philosophy() {
  return (
    <section className="py-32 bg-esti-dark text-esti-light relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              Więcej niż zabiegi – <br />
              <span className="text-esti-beige italic">rozmowy o świadomym pięknie.</span>
            </h2>
          </div>

          <div className="lg:w-1/2 space-y-8 font-light text-lg text-white/80 leading-relaxed font-sans border-l border-white/10 pl-8 lg:pl-12">
            <p>
              W gąszczu internetowych porad i marketingowych obietnic trudno odróżnić fakt od mitu. EstiTalk to
              przestrzeń wolna od tabu, w której rzetelna wiedza medyczna łączy się z praktyką.
            </p>
            <p>
              W każdym odcinku dr Tatiana Jasińska oraz zaproszeni eksperci – wybitni dermatolodzy, ginekolodzy
              estetyczni i specjaliści anti-aging – rozkładają na czynniki pierwsze najpopularniejsze zabiegi,
              technologie i trendy. Rozmawiamy o tym, co działa, co jest bezpieczne i jak mądrze dbać o siebie w każdym
              wieku.
            </p>
            <div className="pt-4">
              <p className="font-serif text-2xl text-esti-beige">&ldquo;Bo piękno to wiedza.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
