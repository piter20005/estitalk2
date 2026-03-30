import React from 'react';
import { Check, ArrowRight, Play } from 'lucide-react';

interface DoctorsSubscriptionProps {
  onViewPage: () => void;
}

const DoctorsSubscription: React.FC<DoctorsSubscriptionProps> = ({ onViewPage }) => {
    const benefits = [
        "Early Access do pełnych wywiadów z topowymi ekspertami",
        "„Clinical Notes” – 5 klinicznych wniosków z każdego odcinka",
        "„Expert Insights” – 1-stronicowy PDF dla lekarzy",
        "Dostęp do rozszerzonych materiałów z konferencji",
        "„Monthly Clinical Brief” – comiesięczna piguła aktualnej wiedzy",
        "„Ask The Expert” – miesięczne odpowiedzi na pytania subskrybentów",
        "Dostęp do całego archiwum EstiTalk",
        "-10% na szkolenia EstiAcademy",
        "Dostęp do zamkniętego kanału EstiTalk Doctors Line"
    ];

    return (
        <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-esti-gold/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-esti-taupe/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-block mb-6">
                            <span className="bg-esti-gold/20 text-esti-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-esti-gold/30">
                                Premium Access
                            </span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
                            EstiTalk <br />
                            <span className="text-esti-gold italic">for Doctors</span>
                        </h2>

                        <p className="font-sans text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                            EstiTalk for Doctors to subskrypcja dla lekarzy, którzy chcą być zawsze 2 kroki przed trendami, protokołami i praktyką kliniczną.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-4xl font-serif text-white">39,99 zł</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider">/ miesięcznie</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-8 font-light">
                                Wiedza premium. Szybko, konkretnie i praktycznie — zawsze pod ręką.
                            </p>

                            <a
                                href="https://buy.stripe.com/eVq7sK55mbDG9IFczFgMw02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 w-full bg-esti-gold text-esti-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 mb-3"
                            >
                                <span>Dołącz teraz</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button
                                onClick={onViewPage}
                                className="group flex items-center justify-center gap-3 w-full bg-transparent text-white border border-white/20 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
                            >
                                <Play size={16} className="text-esti-gold" fill="currentColor" />
                                <span>Zobacz film</span>
                            </button>
                        </div>
                    </div>

                    {/* Benefits Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-sm hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-esti-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-esti-gold group-hover:text-esti-dark transition-colors text-esti-gold">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-sans text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DoctorsSubscription;
