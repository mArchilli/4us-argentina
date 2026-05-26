import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { emitCartChanged } from '@/utils/cartEvents';

function getCsrf() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

function apiCall(url, method, body = null) {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': getCsrf(),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
}

const CartModalItem = memo(function CartModalItem({ item, onUpdate, onRemove, busy }) {
    return (
        <div className={`flex gap-3 py-4 border-b border-[#1a1a1a] last:border-b-0 transition-opacity duration-200 ${busy ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] overflow-hidden shrink-0">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#2a2a2a] text-2xl">image</span>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate pr-1">{item.title}</p>
                <p className="text-[#adaaaa] text-xs mt-0.5">${Number(item.unit_price).toLocaleString('es-AR')} c/u</p>

                <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-full overflow-hidden">
                        <button
                            type="button"
                            onClick={() => item.quantity > 1 && onUpdate(item.product_id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center text-[#adaaaa] hover:text-white disabled:opacity-30 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center text-white text-xs font-bold select-none">{item.quantity}</span>
                        <button
                            type="button"
                            onClick={() => onUpdate(item.product_id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#adaaaa] hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[#8eff71] font-black text-sm">
                            ${Number(item.line_total).toLocaleString('es-AR')}
                        </span>
                        <button
                            type="button"
                            onClick={() => onRemove(item.product_id)}
                            className="w-7 h-7 flex items-center justify-center text-[#484848] hover:text-[#ff7351] transition-colors rounded-lg hover:bg-[#ff7351]/10"
                            aria-label="Eliminar producto"
                        >
                            <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default function CartModal({ isOpen, onClose }) {
    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [busyItems, setBusyItems] = useState(new Set());
    const [confirmClear, setConfirmClear] = useState(false);

    const fetchItems = useCallback(() => {
        fetch('/carrito/items', { headers: { Accept: 'application/json' } })
            .then((r) => r.json())
            .then((data) => {
                setItems(data.items ?? []);
                setSubtotal(data.subtotal ?? 0);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchItems();
            setConfirmClear(false);
        }
    }, [isOpen, fetchItems]);

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    const setBusy = (productId, busy) => {
        setBusyItems((prev) => {
            const next = new Set(prev);
            busy ? next.add(productId) : next.delete(productId);
            return next;
        });
    };

    const handleUpdate = (productId, quantity) => {
        setBusy(productId, true);
        apiCall('/carrito/actualizar', 'PATCH', { product_id: productId, quantity })
            .then(() => { fetchItems(); emitCartChanged(); })
            .catch(() => toast.error('Error al actualizar.'))
            .finally(() => setBusy(productId, false));
    };

    const handleRemove = (productId) => {
        setBusy(productId, true);
        apiCall('/carrito/eliminar', 'DELETE', { product_id: productId })
            .then(() => { fetchItems(); emitCartChanged(); toast.success('Producto eliminado.'); })
            .catch(() => toast.error('Error al eliminar.'))
            .finally(() => setBusy(productId, false));
    };

    const handleClear = () => {
        if (!confirmClear) { setConfirmClear(true); return; }
        setLoading(true);
        apiCall('/carrito/vaciar', 'POST')
            .then(() => {
                setItems([]);
                setSubtotal(0);
                emitCartChanged();
                setConfirmClear(false);
                toast.success('Carrito vaciado.');
            })
            .catch(() => toast.error('Error al vaciar el carrito.'))
            .finally(() => setLoading(false));
    };

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className={`fixed top-0 right-0 z-[70] h-full w-full md:w-[420px] bg-[#0e0e0e] border-l border-[#1f1f1f] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a] shrink-0">
                    <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[#8eff71] text-xl">shopping_cart</span>
                        <h2 className="text-white font-black text-base tracking-tight">Tu carrito</h2>
                        {totalItems > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[#8eff71]/10 border border-[#8eff71]/20 text-[#8eff71] text-xs font-bold">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#adaaaa] hover:text-white hover:border-[#8eff71]/30 transition-colors"
                        aria-label="Cerrar carrito"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                            <span className="material-symbols-outlined text-[#1f1f1f] text-8xl">shopping_cart</span>
                            <p className="text-[#484848] font-bold text-base">Tu carrito está vacío</p>
                            <p className="text-[#333] text-sm">Explorá el catálogo y encontrá lo que buscás.</p>
                            <Link
                                href={route('catalog.index')}
                                onClick={onClose}
                                className="mt-2 px-6 py-2.5 rounded-full bg-[#8eff71] text-[#0d6100] font-black text-sm uppercase tracking-tight hover:shadow-[0_0_20px_rgba(142,255,113,0.3)] transition-shadow"
                            >
                                Ver catálogo
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {items.map((item) => (
                                <CartModalItem
                                    key={item.product_id}
                                    item={item}
                                    onUpdate={handleUpdate}
                                    onRemove={handleRemove}
                                    busy={busyItems.has(item.product_id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-[#1a1a1a] px-5 py-4 space-y-3 shrink-0">
                        <div className="flex items-center justify-between">
                            <span className="text-[#adaaaa] text-sm font-medium">Subtotal</span>
                            <span className="text-white font-black text-xl">${subtotal.toLocaleString('es-AR')}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Link
                                href={route('cart.index')}
                                onClick={onClose}
                                className="flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#adaaaa] hover:border-[#8eff71]/40 hover:text-[#8eff71] transition-colors font-bold text-sm"
                            >
                                <span className="material-symbols-outlined text-base">receipt_long</span>
                                Ver carrito
                            </Link>
                            <Link
                                href={route('checkout.index')}
                                onClick={onClose}
                                className="flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#8eff71] text-[#0d6100] font-black text-sm hover:shadow-[0_0_20px_rgba(142,255,113,0.35)] transition-shadow"
                            >
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                                Checkout
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                                confirmClear
                                    ? 'text-[#ff7351] hover:text-[#ff5733]'
                                    : 'text-[#484848] hover:text-[#ff7351]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">delete_sweep</span>
                            {confirmClear ? '¿Confirmar vaciado?' : 'Vaciar carrito'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
