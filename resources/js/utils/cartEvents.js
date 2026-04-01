const CART_CHANGED_EVENT = 'cart:changed';

export function emitCartChanged() {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function subscribeCartChanged(listener) {
    if (typeof window === 'undefined') return () => {};

    window.addEventListener(CART_CHANGED_EVENT, listener);
    return () => window.removeEventListener(CART_CHANGED_EVENT, listener);
}
