import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Navbar from '@/Components/Home/Navbar';
import HomeFooter from '@/Components/Home/HomeFooter';
import { emitCartChanged } from '@/utils/cartEvents';

const PROVINCES = [
    'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
    'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
    'Tierra del Fuego', 'Tucumán',
];

const SHIPPING_COMPANIES = [
    'Andreani', 'OCA', 'Correo Argentino', 'Via Cargo', 'Cruz del Sur',
];

function FormInput({ label, id, type = 'text', value, onChange, error, placeholder, colSpan, ...props }) {
    return (
        <div className={colSpan}>
            <label htmlFor={id} className="block text-[9px] uppercase tracking-[0.15em] text-[#adaaaa]/80 ml-1 mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-[#262626] border-none rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 placeholder:text-[#adaaaa]/20 transition-all"
                {...props}
            />
            {error && <p className="text-[#ff7351] text-[10px] mt-1">{error}</p>}
        </div>
    );
}

function FormSelect({ label, id, value, onChange, error, options, placeholder, colSpan }) {
    return (
        <div className={colSpan}>
            <label htmlFor={id} className="block text-[9px] uppercase tracking-[0.15em] text-[#adaaaa]/80 ml-1 mb-1">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full bg-[#262626] border-none rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 appearance-none transition-all"
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {error && <p className="text-[#ff7351] text-[10px] mt-1">{error}</p>}
        </div>
    );
}

export default function CheckoutIndex({ auth, items = [], subtotal = 0 }) {
    const [shippingMethod, setShippingMethod] = useState('domicilio');
    const [submitError, setSubmitError] = useState('');
    const [localErrors, setLocalErrors] = useState({});
    const freeShipping = subtotal >= 20000;

    const { data, setData, processing, errors } = useForm({
        shipping_method: 'domicilio',
        first_name: '',
        last_name: '',
        email: '',
        dni: '',
        province: '',
        city: '',
        postal_code: '',
        shipping_company: '',
        address: '',
        phone: '',
        observations: '',
    });

    const switchMethod = (method) => {
        setShippingMethod(method);
        setData('shipping_method', method);
        setLocalErrors((prev) => ({
            ...prev,
            address: undefined,
            shipping_company: undefined,
        }));
    };

    const formatArs = (value) => `$${Number(value).toLocaleString('es-AR')} ARS`;

    const validateForWhatsApp = () => {
        const nextErrors = {};

        if (!data.first_name.trim()) nextErrors.first_name = 'El nombre es obligatorio.';
        if (!data.last_name.trim()) nextErrors.last_name = 'El apellido es obligatorio.';
        if (!data.email.trim()) nextErrors.email = 'El email es obligatorio.';
        if (!data.dni.trim()) nextErrors.dni = 'El DNI es obligatorio.';
        if (!data.phone.trim()) nextErrors.phone = 'El teléfono es obligatorio.';
        if (!data.province.trim()) nextErrors.province = 'La provincia es obligatoria.';
        if (!data.city.trim()) nextErrors.city = 'La localidad es obligatoria.';
        if (!data.postal_code.trim()) nextErrors.postal_code = 'El código postal es obligatorio.';

        if (shippingMethod === 'domicilio' && !data.address.trim()) {
            nextErrors.address = 'La dirección es obligatoria para envío a domicilio.';
        }

        if (shippingMethod === 'sucursal' && !data.shipping_company.trim()) {
            nextErrors.shipping_company = 'Seleccioná la empresa de correo para envío a sucursal.';
        }

        setLocalErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const buildWhatsAppMessage = () => {
        const shippingLabel = shippingMethod === 'domicilio' ? 'Envío a Domicilio' : 'Envío a Sucursal';
        const lines = [
            'Hola! Quiero finalizar este pedido:',
            '',
            '*Productos*',
            ...items.map((item, index) => `${index + 1}. ${item.title} x${item.quantity} - ${formatArs(item.line_total)}`),
            '',
            `*Subtotal:* ${formatArs(subtotal)}`,
            `*Envío:* ${freeShipping ? 'Gratis' : 'A confirmar'}`,
            `*Total estimado:* ${formatArs(subtotal)}`,
            '',
            '*Datos del cliente*',
            `Nombre: ${data.first_name} ${data.last_name}`,
            `Email: ${data.email}`,
            `DNI: ${data.dni}`,
            `Teléfono: ${data.phone}`,
            '',
            '*Datos de envío*',
            `Método: ${shippingLabel}`,
            `Provincia: ${data.province}`,
            `Localidad: ${data.city}`,
            `Código Postal: ${data.postal_code}`,
        ];

        if (shippingMethod === 'domicilio') {
            lines.push(`Dirección: ${data.address}`);
            if (data.observations.trim()) lines.push(`Observaciones: ${data.observations}`);
        }

        if (shippingMethod === 'sucursal') {
            lines.push(`Empresa de correo: ${data.shipping_company}`);
        }

        lines.push('', 'Quedo atento/a para coordinar pago y envío.');

        return lines.join('\n');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!items.length) {
            setSubmitError('Tu carrito está vacío. Agregá productos antes de finalizar.');
            toast.error('Tu carrito está vacío.');
            return;
        }

        if (!validateForWhatsApp()) {
            setSubmitError('Completá los datos obligatorios para generar el pedido por WhatsApp.');
            toast.error('Completá los datos obligatorios del envío.');
            return;
        }

        setSubmitError('');

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch(route('cart.clear'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error('No se pudo vaciar el carrito.');
            }

            emitCartChanged();

            const message = buildWhatsAppMessage();
            const waUrl = `https://wa.me/5491169659907?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
            toast.success('Pedido generado. Te redirigimos a WhatsApp.');
        } catch {
            setSubmitError('No se pudo preparar el pedido. Intentá nuevamente.');
            toast.error('No se pudo vaciar el carrito antes de enviar.');
        }
    };

    return (
        <>
            <Head title="Checkout - 4us Argentina" />
            <div className="bg-[#0e0e0e] text-white min-h-screen">
                <Navbar auth={auth} />

                <main className="pt-32 pb-32 px-6 max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* ── Left column (8 cols) ── */}
                        <div className="lg:col-span-8 space-y-6">
                            <h1 className="text-5xl md:text-8xl font-headline font-black italic uppercase leading-none tracking-tighter mb-8">FINALIZAR <span className="text-[#8eff71]">COMPRA</span>.</h1>

                            <form id="checkout-form" onSubmit={handleSubmit}>
                                {/* Shipping section */}
                                <section className="bg-[#131313] rounded-[1rem] p-6 shadow-2xl relative overflow-hidden">
                                    {/* Green left accent bar */}
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8eff71]" />

                                    {/* Section header: title + toggle */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pl-3">
                                        <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#8eff71]">local_shipping</span>
                                            Información de Envío
                                        </h2>
                                        <div className="grid grid-cols-2 gap-2 w-full md:max-w-xs">
                                            <button
                                                type="button"
                                                onClick={() => switchMethod('domicilio')}
                                                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[0.75rem] border-2 transition-all text-xs font-bold uppercase tracking-wider ${
                                                    shippingMethod === 'domicilio'
                                                        ? 'border-[#8eff71] bg-[#8eff71]/10 text-[#8eff71]'
                                                        : 'border-[#484848] text-[#adaaaa] hover:border-[#8eff71]/50'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                                                Domicilio
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => switchMethod('sucursal')}
                                                className={`flex items-center justify-center gap-2 py-2 px-4 rounded-[0.75rem] border-2 transition-all text-xs font-bold uppercase tracking-wider ${
                                                    shippingMethod === 'sucursal'
                                                        ? 'border-[#8eff71] bg-[#8eff71]/10 text-[#8eff71]'
                                                        : 'border-[#484848] text-[#adaaaa] hover:border-[#8eff71]/50'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-xl">store</span>
                                                Sucursal
                                            </button>
                                        </div>
                                    </div>

                                    {/* Form grid — 3 columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 pl-3">
                                        <FormInput
                                            label="Nombre"
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            error={localErrors.first_name || errors.first_name}
                                            placeholder="Tu nombre"
                                        />
                                        <FormInput
                                            label="Apellido"
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            error={localErrors.last_name || errors.last_name}
                                            placeholder="Tu apellido"
                                        />
                                        <FormInput
                                            label="Correo Electrónico"
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={localErrors.email || errors.email}
                                            placeholder="email@ejemplo.com"
                                        />
                                        <FormInput
                                            label="DNI"
                                            id="dni"
                                            value={data.dni}
                                            onChange={(e) => setData('dni', e.target.value)}
                                            error={localErrors.dni || errors.dni}
                                            placeholder="DNI"
                                        />
                                        <FormInput
                                            label="Teléfono"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            error={localErrors.phone || errors.phone}
                                            placeholder="+54 11 0000-0000"
                                        />
                                        <FormSelect
                                            label="Provincia"
                                            id="province"
                                            value={data.province}
                                            onChange={(e) => setData('province', e.target.value)}
                                            error={localErrors.province || errors.province}
                                            options={PROVINCES}
                                            placeholder="Buenos Aires"
                                        />
                                        <FormInput
                                            label="Localidad"
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            error={localErrors.city || errors.city}
                                            placeholder="Ciudad"
                                        />
                                        {shippingMethod === 'domicilio' && (
                                            <FormInput
                                                label="Dirección"
                                                id="address"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                error={localErrors.address || errors.address}
                                                placeholder="Calle y número"
                                            />
                                        )}
                                        <FormInput
                                            label="Código Postal"
                                            id="postal_code"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            error={localErrors.postal_code || errors.postal_code}
                                            placeholder="C1425"
                                        />
                                        {shippingMethod === 'domicilio' && (
                                            <div className="md:col-span-3">
                                                <label htmlFor="observations" className="block text-[9px] uppercase tracking-[0.15em] text-[#adaaaa]/80 ml-1 mb-1">
                                                    Observaciones
                                                </label>
                                                <textarea
                                                    id="observations"
                                                    rows={2}
                                                    value={data.observations}
                                                    onChange={(e) => setData('observations', e.target.value)}
                                                    placeholder="Instrucciones adicionales para la entrega..."
                                                    className="w-full bg-[#262626] border-none rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#8eff71]/40 placeholder:text-[#adaaaa]/20 transition-all resize-none"
                                                />
                                                {(localErrors.observations || errors.observations) && <p className="text-[#ff7351] text-[10px] mt-1">{localErrors.observations || errors.observations}</p>}
                                            </div>
                                        )}
                                        {shippingMethod === 'sucursal' && (
                                            <FormSelect
                                                label="Empresa de Correo"
                                                id="shipping_company"
                                                value={data.shipping_company}
                                                onChange={(e) => setData('shipping_company', e.target.value)}
                                                error={localErrors.shipping_company || errors.shipping_company}
                                                options={SHIPPING_COMPANIES}
                                                placeholder="Seleccione una empresa"
                                            />
                                        )}
                                    </div>
                                </section>

                                {/* Payment — locked until shipping filled */}
                                <section className="bg-[#131313] rounded-[1rem] p-6 mt-6 opacity-40 grayscale pointer-events-none select-none">
                                    <h2 className="text-xl font-bold mb-4 uppercase tracking-widest flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[#767575]">payments</span>
                                        Método de Pago
                                    </h2>
                                    <div className="h-16 bg-[#191a1a] border border-dashed border-[#484848] rounded-xl flex items-center justify-center">
                                        <span className="text-[#adaaaa] text-xs italic">Completá el envío para habilitar el pago</span>
                                    </div>
                                </section>
                            </form>
                        </div>

                        {/* ── Right column (4 cols) — sticky summary ── */}
                        <div className="lg:col-span-4 sticky top-28 space-y-4">
                            <div className="bg-[#262626] rounded-[1rem] p-6 shadow-2xl relative overflow-hidden">
                                {/* Ambient glow */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#8eff71]/20 blur-3xl rounded-full pointer-events-none" />

                                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest border-b border-[#484848] pb-3">
                                    Resumen
                                </h3>

                                {/* Item list */}
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.product_id} className="flex gap-3 items-center">
                                            <div className="w-12 h-12 bg-[#191a1a] rounded-[0.5rem] flex-shrink-0 overflow-hidden">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[#2a2a2a] text-xl">image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-xs font-bold leading-tight truncate text-white">{item.title}</p>
                                                <p className="text-[9px] text-[#adaaaa] uppercase tracking-widest">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-[#8eff71] text-sm shrink-0">
                                                ${Number(item.line_total).toLocaleString('es-AR')}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 border-t border-[#484848] pt-4">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#adaaaa]">Subtotal</span>
                                        <span className="text-white">${Number(subtotal).toLocaleString('es-AR')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-[#adaaaa]">Envío</span>
                                        <span className={freeShipping ? 'text-[#8eff71] font-bold' : 'text-[#adaaaa]'}>
                                            {freeShipping ? 'Gratis' : 'A confirmar'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black pt-3 text-[#8eff71]">
                                        <span>TOTAL</span>
                                        <span>${Number(subtotal).toLocaleString('es-AR')}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={processing}
                                    className="w-full mt-6 py-4 rounded-full bg-gradient-to-br from-[#8eff71] to-[#2ff801] text-[#0d6100] font-black uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(142,255,113,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Procesando...' : 'Finalizar Compra'}
                                </button>

                                <p className="mt-4 text-xs text-[#8eff71] leading-relaxed">
                                    Al finalizar compra se abrirá WhatsApp con el detalle completo del pedido para que lo envíes. El pago se coordina luego por chat una vez que te contactemos.
                                </p>

                                {submitError && (
                                    <p className="mt-2 text-xs text-[#ff7351]">{submitError}</p>
                                )}

                                <p className="mt-4 text-[9px] text-center text-[#adaaaa] uppercase tracking-[0.15em] leading-relaxed">
                                    Secure checkout powered by 4US Argentina.<br />Neon vibes only.
                                </p>
                            </div>

                            {/* Promo banner */}
                            <div className="bg-[#8eff71] rounded-[1rem] p-4 text-[#0d6100] flex items-center gap-3 overflow-hidden relative">
                                <span className="material-symbols-outlined text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    auto_fix_high
                                </span>
                                <div>
                                    <p className="font-bold leading-tight text-sm uppercase">15% OFF EXTRA</p>
                                    <p className="text-[10px] uppercase tracking-wide">
                                        Usá el código <span className="font-black">NEONVIBE</span>
                                    </p>
                                </div>
                                {/* Decorative bolt */}
                                <div className="absolute -right-4 -bottom-4 text-[#0d6100]/10 scale-[2.5] pointer-events-none">
                                    <span className="material-symbols-outlined text-7xl">bolt</span>
                                </div>
                            </div>

                            <Link
                                href={route('cart.index')}
                                className="inline-flex items-center gap-2 text-[#adaaaa] hover:text-[#8eff71] transition-colors text-xs font-bold uppercase tracking-widest"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                                Volver al carrito
                            </Link>
                        </div>

                    </div>
                </main>

                <HomeFooter />
            </div>
        </>
    );
}
