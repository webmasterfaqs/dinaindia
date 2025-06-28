interface BreakingNewsBannerProps {
  message: string;
}

export function BreakingNewsBanner({ message }: BreakingNewsBannerProps) {
  return (
    <div className="bg-red-600 text-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm uppercase tracking-wide">
          BREAKING
        </span>
        <span className="text-sm leading-tight">
          {message}
        </span>
      </div>
    </div>
  );
}