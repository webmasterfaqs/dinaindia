import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedArticleProps {
  title: string;
  summary: string;
  source: string;
  publishedDate: string;
  imageUrl: string;
  isLive?: boolean;
}

export function FeaturedArticle({ 
  title, 
  summary, 
  source, 
  publishedDate, 
  imageUrl,
  isLive 
}: FeaturedArticleProps) {
  return (
    <div className="bg-background active:bg-muted/50 transition-colors">
      <div className="relative">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {isLive && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              LIVE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h1 className="font-serif font-bold text-2xl leading-tight mb-3 text-foreground">
          {title}
        </h1>
        
        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          {summary}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">{source}</span>
          <span>•</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </div>
  );
}