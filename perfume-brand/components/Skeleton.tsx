export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-ebony-50 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-ebony-100 rounded shimmer" />
        <div className="h-5 w-40 bg-ebony-100 rounded shimmer" />
        <div className="h-3 w-32 bg-ebony-100 rounded shimmer" />
        <div className="flex justify-between pt-2">
          <div className="h-5 w-16 bg-ebony-100 rounded shimmer" />
          <div className="h-4 w-12 bg-ebony-100 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 animate-pulse">
      <div className="aspect-square glass rounded-3xl shimmer" />
      <div className="space-y-6">
        <div className="h-4 w-24 bg-ebony-100 rounded shimmer" />
        <div className="h-10 w-64 bg-ebony-100 rounded shimmer" />
        <div className="h-4 w-48 bg-ebony-100 rounded shimmer" />
        <div className="h-20 w-full bg-ebony-100 rounded shimmer" />
        <div className="h-8 w-32 bg-ebony-100 rounded shimmer" />
        <div className="h-12 w-full bg-ebony-100 rounded-full shimmer" />
      </div>
    </div>
  );
}
