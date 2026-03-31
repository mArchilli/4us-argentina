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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Título */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
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
                                <a className="flex items-center gap-4 group" href="https://wa.me/5491169659907" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] group-hover:text-[#0d6100] transition-all duration-300">
                                        {/* WhatsApp SVG */}
                                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><circle cx="16" cy="16" r="16" fill="currentColor" className="text-[#8eff71] group-hover:text-[#0d6100]"/><path d="M23.47 19.7c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.87 1.07-1.07 1.29-.2.22-.39.25-.72.09-.33-.16-1.4-.52-2.67-1.65-.99-.89-1.66-2-1.85-2.33-.19-.33-.02-.5.14-.66.15-.15.33-.39.5-.59.17-.2.22-.34.33-.56.11-.22.06-.41-.03-.59-.09-.18-.77-1.87-1.05-2.56-.28-.67-.56-.58-.77-.59-.2-.01-.41-.01-.63-.01-.22 0-.59.09-.9.41-.31.32-1.18 1.15-1.18 2.8 0 1.65 1.21 3.24 1.38 3.48.17.24 2.39 3.62 5.8 5.08.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2-.81 2.28-1.59.28-.78.28-1.45.19-1.59-.09-.14-.31-.22-.65-.39z" fill="#262626"/></svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">WhatsApp</span>
                                </a>
                                <a className="flex items-center gap-4 group" href="https://www.instagram.com/4usargentina/" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] group-hover:text-[#0d6100] transition-all duration-300">
                                        {/* Instagram SVG */}
                                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7"><rect x="6" y="6" width="20" height="20" rx="6" fill="currentColor" className="text-[#8eff71] group-hover:text-[#0d6100]"/><circle cx="16" cy="16" r="5" fill="#262626"/><circle cx="22.2" cy="9.8" r="1.2" fill="#262626"/></svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">@4us_arg</span>
                                </a>
                                <a className="flex items-center gap-4 group" href="mailto:contacto@4usargentina.com" target="_blank" rel="noreferrer">
                                    <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center group-hover:bg-[#8eff71] group-hover:text-[#0d6100] transition-all duration-300">
                                        {/* Email SVG */}
                                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                                            <rect x="6" y="8" width="20" height="16" rx="4" fill="currentColor" className="text-[#8eff71] group-hover:text-[#0d6100]"/>
                                            <path d="M8 10l8 7 8-7" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-bold group-hover:text-[#8eff71] transition-colors">contacto@4usargentina.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Formulario + Imagen */}
                    <div ref={formRef} className="lg:col-span-7 flex flex-col items-start justify-start">
                        <img
                            src="/images/contact-image.png"
                            alt="Contact Image"
                            className="w-full mb-8 rounded-2xl object-cover"
                            style={{ maxHeight: '300px' }}
                        />
                        <div className="glass-card bg-[#1a1919]/60 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-[#484847]/10 shadow-2xl w-full">
                            <form className="space-y-4" onSubmit={handleSubmit}>
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
                                <div className="space-y-1.5">
                                    <label className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] ml-1">Mensaje</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required
                                        className="w-full bg-[#000] border border-[#484847]/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71] focus:border-[#8eff71] transition-all placeholder:text-[#767575] resize-none"
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
