import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleCardProps {
  title: string;
  summary: string;
  source: string;
  publishedDate: string;
  imageUrl?: string;
  isLive?: boolean;
  isTrending?: boolean;
}

export function ArticleCard({ 
  title, 
  summary, 
  source, 
  publishedDate, 
  imageUrl,
  isLive,
  isTrending 
}: ArticleCardProps) {
  return (
    <div className="bg-background border-b border-border px-4 py-4 active:bg-muted/50 transition-colors">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isLive && (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                LIVE
              </span>
            )}
            {isTrending && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                TRENDING
              </span>
            )}
          </div>
          
          <h3 className="font-serif font-bold text-lg leading-tight mb-2 text-foreground">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
            {summary}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{source}</span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>
        </div>
        
        {imageUrl && (
          <div className="w-20 h-20 flex-shrink-0">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}