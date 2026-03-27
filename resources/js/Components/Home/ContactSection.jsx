import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const infoRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(infoRef.current,
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: infoRef.current, start: 'top 85%', once: true },
                }
            );
            gsap.fromTo(formRef.current,
                { x: 40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: formRef.current, start: 'top 85%', once: true },
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Hola! Te escribo desde el sitio web.\n\n*Nombre:* ${form.name}\n*Email:* ${form.email}\n\n*Mensaje:*\n${form.message}`;
        const url = `https://wa.me/5491169659907?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="contacto" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="bg-[#262626] rounded-2xl p-10 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left: info */}
                <div ref={infoRef}>
                    <h2 className="text-4xl font-bold mb-6 tracking-tight">
                        PONETE EN <br />
                        <span className="text-[#8eff71]">CONTACTO.</span>
                    </h2>
                    <p className="text-[#adaaaa] mb-12">
                        ¿Querés vender 4us o tenés alguna consulta? Nuestro equipo en Buenos Aires está listo para ayudarte.
                    </p>

                    <div className="space-y-6">
                        <a className="flex items-center gap-4 group" href="https://wa.me/5491169659907" target="_blank" rel="noreferrer">
                            <div className="w-12 h-12 rounded-full bg-[#8eff71]/10 flex items-center justify-center group-hover:bg-[#8eff71] transition-all">
                                <span className="material-symbols-outlined text-[#8eff71] group-hover:text-[#0d6100]">send</span>
                            </div>
                            <div>
                                <p className="text-sm text-[#adaaaa]">WhatsApp</p>
                                <p className="font-bold">+54 11 6965 9907</p>
                            </div>
                        </a>

                        <a className="flex items-center gap-4 group" href="https://www.instagram.com/4usargentina/" target="_blank" rel="noreferrer">
                            <div className="w-12 h-12 rounded-full bg-[#8eff71]/10 flex items-center justify-center group-hover:bg-[#8eff71] transition-all">
                                <span className="material-symbols-outlined text-[#8eff71] group-hover:text-[#0d6100]">photo_camera</span>
                            </div>
                            <div>
                                <p className="text-sm text-[#adaaaa]">Instagram</p>
                                <p className="font-bold">@4usargentina</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Right: form */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre completo"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#262626] border border-[#484848] rounded-2xl p-4 focus:ring-2 focus:ring-[#8eff71]/40 focus:outline-none transition-all placeholder:text-[#adaaaa] text-white"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#262626] border border-[#484848] rounded-2xl p-4 focus:ring-2 focus:ring-[#8eff71]/40 focus:outline-none transition-all placeholder:text-[#adaaaa] text-white"
                    />
                    <textarea
                        name="message"
                        placeholder="Tu mensaje"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#262626] border border-[#484848] rounded-2xl p-4 focus:ring-2 focus:ring-[#8eff71]/40 focus:outline-none transition-all placeholder:text-[#adaaaa] text-white resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#8eff71] text-[#0d6100] font-bold py-4 rounded-full hover:shadow-[0_0_20px_rgba(142,255,113,0.4)] transition-all active:scale-95"
                    >
                        Enviar consulta
                    </button>
                </form>
            </div>
        </section>
    );
}
