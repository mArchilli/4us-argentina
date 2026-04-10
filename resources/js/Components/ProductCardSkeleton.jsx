/**
 * ProductCardSkeleton
 *
 * variant="catalog"  — matches the card layout used in Catalog/Index.jsx
 * variant="featured" — matches the card layout used in Home/FeaturedSection.jsx
 */
export default function ProductCardSkeleton({ variant = 'catalog' }) {
    if (variant === 'featured') {
        return (
            <div className="h-full flex flex-col animate-pulse">
                {/* Image area */}
                <div className="rounded-[1.6rem] mb-5 bg-[#1c1c1c] flex-1 min-h-[260px]" />

                {/* Title + price */}
                <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="h-6 bg-[#1c1c1c] rounded-full w-2/3" />
                    <div className="h-6 bg-[#1c1c1c] rounded-full w-1/4" />
                </div>

                {/* Category tags */}
                <div className="flex gap-2 mt-1">
                    <div className="h-5 bg-[#1c1c1c] rounded-full w-16" />
                    <div className="h-5 bg-[#1c1c1c] rounded-full w-20" />
                </div>

                {/* Quantity selector */}
                <div className="mt-4 h-8 bg-[#1c1c1c] rounded-full w-28" />

                {/* CTA buttons */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-9 bg-[#1c1c1c] rounded-full" />
                    <div className="h-9 bg-[#1c1c1c] rounded-full" />
                </div>
            </div>
        );
    }

    // catalog variant
    return (
        <div className="flex flex-col bg-[#131313] rounded-[1.6rem] overflow-hidden animate-pulse shadow-xl">
            {/* Image area */}
            <div className="aspect-[4/5] bg-[#1c1c1c]" />

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                    <div className="h-6 bg-[#1c1c1c] rounded-full w-2/3" />
                    <div className="h-6 bg-[#1c1c1c] rounded-full w-1/5" />
                </div>
                <div className="h-4 bg-[#1c1c1c] rounded-full w-full" />
                <div className="h-4 bg-[#1c1c1c] rounded-full w-4/5" />

                {/* Quantity selector */}
                <div className="mt-1 h-8 bg-[#1c1c1c] rounded-full w-28" />

                {/* CTA buttons */}
                <div className="mt-1 grid grid-cols-2 gap-2">
                    <div className="h-9 bg-[#1c1c1c] rounded-full" />
                    <div className="h-9 bg-[#1c1c1c] rounded-full" />
                </div>
            </div>
        </div>
    );
}
