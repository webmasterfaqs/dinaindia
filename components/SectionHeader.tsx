interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="px-4 py-4 bg-background border-b border-border">
      <h2 className="font-serif font-bold text-xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}