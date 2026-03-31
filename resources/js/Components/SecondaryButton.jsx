export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-full bg-[#0d6100] text-[#8eff71] font-headline font-black italic px-12 py-6 text-2xl uppercase tracking-tight transition-all hover:scale-105 shadow-2xl ${
                    disabled ? 'opacity-25 pointer-events-none' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
