import { useState } from 'react';
import { Bookmark, Edit3, Trash2 } from 'lucide-react';
import { ArticleCard } from './ArticleCard';

// Mock bookmarked articles
const bookmarkedArticles = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    summary: "World leaders from 195 countries have reached a groundbreaking consensus on reducing carbon emissions.",
    source: "The Times",
    publishedDate: "2 hours ago",
    savedDate: "Saved 1h ago",
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Tech Giants Face New Regulatory Challenges in European Markets",
    summary: "New legislation targeting major technology companies could reshape the digital landscape.",
    source: "Business Desk",
    publishedDate: "4 hours ago",
    savedDate: "Saved 3h ago",
    imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop"
  }
];

interface BookmarksPageProps {
  onArticleSelect: (articleId: number) => void;
}

export function BookmarksPage({ onArticleSelect }: BookmarksPageProps) {
  const [bookmarks, setBookmarks] = useState(bookmarkedArticles);
  const [isEditMode, setIsEditMode] = useState(false);

  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(article => article.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="font-serif font-bold text-2xl">Bookmarks</h1>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-lg transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        {bookmarks.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-serif font-bold text-xl mb-2">No saved articles yet</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Tap the bookmark icon on any article to save it for later reading.
            </p>
          </div>
        ) : (
          // Articles list
          <div className="divide-y divide-border">
            {bookmarks.map((article) => (
              <div key={article.id} className="relative">
                <div onClick={() => onArticleSelect(article.id)}>
                  <ArticleCard
                    title={article.title}
                    summary={article.summary}
                    source={article.source}
                    publishedDate={article.savedDate}
                    imageUrl={article.imageUrl}
                  />
                </div>
                
                {isEditMode && (
                  <button
                    onClick={() => removeBookmark(article.id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}