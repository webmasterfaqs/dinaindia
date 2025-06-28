import { ArrowLeft, Bookmark, Share, Volume2, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ArticleDetailPageProps {
  onBack: () => void;
}

// Mock article data
const article = {
  title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
  heroImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
  byline: "By Sarah Johnson and Michael Chen",
  publishedDate: "June 28, 2025, 2:30 PM",
  readTime: "8 min read",
  content: `
    World leaders from 195 countries have reached a groundbreaking consensus on reducing carbon emissions by 50% over the next decade, marking the most significant climate action in international history.

    The agreement, reached after five days of intense negotiations in Geneva, establishes binding targets for greenhouse gas reductions and creates a $500 billion fund to support developing nations in their transition to clean energy.

    "This is a watershed moment for our planet," said UN Secretary-General Maria Santos during the closing ceremony. "For the first time in history, we have unanimous agreement on the scale and urgency of action needed to address the climate crisis."

    ## Key Provisions of the Agreement

    The historic accord includes several groundbreaking provisions that environmental scientists are calling unprecedented in scope and ambition:

    **Emission Reduction Targets:** All signatory nations have committed to reducing their carbon emissions by 50% by 2035, with interim targets of 25% by 2030. The targets are legally binding and include penalties for non-compliance.

    **Clean Energy Investment:** The agreement establishes a global clean energy investment fund of $500 billion, to be contributed by developed nations over the next five years. This fund will support renewable energy infrastructure in developing countries.

    **Technology Transfer:** Developed nations have agreed to share clean energy technologies freely with developing countries, removing patent barriers that have historically limited access to advanced renewable energy solutions.

    ## Impact on Global Markets

    Financial markets responded positively to the announcement, with renewable energy stocks surging 15% in early trading. Oil and gas companies saw mixed reactions, with some pivoting quickly to announce new clean energy initiatives.

    "This agreement fundamentally changes the economics of energy," said Dr. Elena Rodriguez, chief economist at the International Energy Agency. "We expect to see massive shifts in investment patterns over the next decade."

    The automotive industry, already in the midst of an electric vehicle transition, received additional momentum from the agreement's provision requiring 75% of new vehicle sales to be electric by 2032.

    ## Challenges Ahead

    Despite the historic nature of the agreement, experts warn that implementation will face significant challenges. Political changes in signatory countries could threaten commitment levels, and the technical challenges of such rapid decarbonization remain substantial.

    "The agreement is just the beginning," noted climate scientist Dr. James Patterson. "The real work starts now, and it will require sustained political will and unprecedented international cooperation."

    The next review conference is scheduled for 2027, where progress will be assessed and targets potentially adjusted based on technological developments and implementation challenges.
  `,
  relatedArticles: [
    {
      id: 1,
      title: "Renewable Energy Stocks Surge Following Climate Agreement",
      source: "Business Desk",
      time: "1 hour ago"
    },
    {
      id: 2,
      title: "How the Climate Deal Could Transform Global Supply Chains",
      source: "Analysis",
      time: "2 hours ago"
    }
  ]
};

export function ArticleDetailPage({ onBack }: ArticleDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          {hasAudio && (
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Volume2 className="w-5 h-5 text-primary" />
            </button>
          )}
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Article content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero image */}
        {article.heroImage && (
          <div className="aspect-video">
            <ImageWithFallback
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4">
          {/* Article header */}
          <div className="mb-6">
            <h1 className="font-serif font-bold text-2xl leading-tight mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>{article.byline}</span>
              <span>•</span>
              <span>{article.publishedDate}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="font-serif font-bold text-xl mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="font-medium mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Related articles */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-serif font-bold text-lg mb-4">Related Articles</h3>
            <div className="space-y-3">
              {article.relatedArticles.map((related) => (
                <div key={related.id} className="p-3 bg-muted/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <h4 className="font-serif font-medium mb-1">{related.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{related.source}</span>
                    <span>•</span>
                    <span>{related.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}