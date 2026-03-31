export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full bg-[#8eff71] text-[#0d6100] font-headline font-black italic px-8 py-5 text-lg uppercase tracking-tight transition-all hover:shadow-[0_0_30px_rgba(142,255,113,0.3)] active:scale-95 gap-2 ${
                    disabled ? 'opacity-25 pointer-events-none' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
