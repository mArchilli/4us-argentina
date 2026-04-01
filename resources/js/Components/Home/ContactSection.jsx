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
        <section id="contacto" className="relative min-h-[80vh] py-24 px-6 md:px-16 mx-auto">
            <div className="relative z-10 mx-auto px-0 md:px-8">
                {/* Heading y Formulario alineados arriba */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
                    {/* Título */}
                    <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-start">
                        <div className="mb-16">
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-left">
                                <span className="block text-white">PONETE EN</span>
                                <span className="block text-[#8eff71] italic">CONTACTO</span>
                            </h1>
                        </div>
                        <div className="space-y-6">
                            <p className="text-2xl md:text-3xl font-headline font-bold italic uppercase leading-tight text-white">
                                ¿Querés vender 4us o tenés alguna consulta?
                            </p>
                            <p className="text-[#adaaaa] text-lg max-w-md leading-relaxed">
                                Estamos buscando expandir nuestra cultura. Si sos un retailer o simplemente querés charlar sobre un drop, escribinos. La respuesta es inmediata.
                            </p>
                        </div>
                        <div className="space-y-4 mt-8">
                            <p className="font-label text-xs uppercase tracking-widest text-[#8eff71] font-bold">Conectá con el equipo</p>
                            <div className="flex flex-col gap-4">
                                <a className="inline-flex items-center gap-4 group w-fit" href="https://wa.me/5491169659907" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] transition-all duration-300">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#8eff71" className="group-hover:fill-[#0d6100]"/>
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.108-1.138l-.292-.174-3.028.9.9-3.028-.19-.302A7.963 7.963 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="#8eff71" className="group-hover:fill-[#0d6100]"/>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">WhatsApp</span>
                                </a>
                                <a className="inline-flex items-center gap-4 group w-fit" href="https://www.instagram.com/4usargentina/" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] transition-all duration-300">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                            <rect x="2" y="2" width="20" height="20" rx="6" stroke="#8eff71" strokeWidth="2" fill="none" className="group-hover:stroke-[#0d6100]"/>
                                            <circle cx="12" cy="12" r="5" stroke="#8eff71" strokeWidth="2" fill="none" className="group-hover:stroke-[#0d6100]"/>
                                            <circle cx="18" cy="6" r="1.5" fill="#8eff71" className="group-hover:fill-[#0d6100]"/>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">@4us_arg</span>
                                </a>
                                <a className="inline-flex items-center gap-4 group w-fit" href="mailto:contacto@4usargentina.com" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] transition-all duration-300">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                            <rect x="2" y="4" width="20" height="16" rx="3" stroke="#8eff71" strokeWidth="2" fill="none" className="group-hover:stroke-[#0d6100]"/>
                                            <path d="M2 7l8.913 5.7a2 2 0 002.174 0L22 7" stroke="#8eff71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="group-hover:stroke-[#0d6100]"/>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">contacto@4usargentina.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Formulario + Imagen */}
                    <div ref={formRef} className="lg:col-span-7 flex flex-col">
                        <img
                            src="/images/contact-image.png"
                            alt="Contact Image"
                            className="w-full mb-8 rounded-2xl object-cover"
                            style={{ maxHeight: '300px' }}
                        />
                        <div className="glass-card bg-[#1a1919]/60 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-[#484847]/10 shadow-2xl w-full flex-1 flex flex-col">
                            <form className="space-y-4 flex flex-col flex-1" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-1">Tu Nombre</label>
                                        <input name="name" value={form.name} onChange={handleChange} required
                                            className="w-full bg-[#000] border border-[#484847]/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71] focus:border-[#8eff71] transition-all placeholder:text-[#767575]"
                                            placeholder="Nombre completo" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-1">Tu Email</label>
                                        <input name="email" value={form.email} onChange={handleChange} required
                                            className="w-full bg-[#000] border border-[#484847]/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71] focus:border-[#8eff71] transition-all placeholder:text-[#767575]"
                                            placeholder="email@ejemplo.com" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 flex-1 flex flex-col">
                                    <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-1">Mensaje</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required
                                        className="w-full bg-[#000] border border-[#484847]/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71] focus:border-[#8eff71] transition-all placeholder:text-[#767575] resize-none flex-1 min-h-[120px]"
                                        placeholder="¿En qué podemos ayudarte?" rows={4}></textarea>
                                </div>
                                <button type="submit"
                                    className="w-full py-3 bg-[#8eff71] text-[#0d6100] font-bold tracking-tight italic uppercase text-base rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300">
                                    Enviar consulta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
