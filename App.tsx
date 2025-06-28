import { useState } from 'react';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleCard } from './components/ArticleCard';
import { BreakingNewsBanner } from './components/BreakingNewsBanner';
import { BottomTabBar } from './components/BottomTabBar';
import { SectionHeader } from './components/SectionHeader';
import { TopTabs } from './components/TopTabs';
import { SectionsPage } from './components/SectionsPage';
import { BookmarksPage } from './components/BookmarksPage';
import { NotificationsPage } from './components/NotificationsPage';
import { ProfilePage } from './components/ProfilePage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { PullToRefresh } from './components/PullToRefresh';

// Mock data for the news app
const breakingNews = "Supreme Court to hear landmark climate change case next month";

const featuredArticle = {
  title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
  summary: "World leaders from 195 countries have reached a groundbreaking consensus on reducing carbon emissions by 50% over the next decade, marking the most significant climate action in international history.",
  source: "The Times",
  publishedDate: "2 hours ago",
  imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop",
  isLive: true
};

const articlesByCategory = {
  top: [
    {
      id: 1,
      title: "Tech Giants Face New Regulatory Challenges in European Markets",
      summary: "New legislation targeting major technology companies could reshape the digital landscape across Europe, with potential impacts on global operations.",
      source: "Business Desk",
      publishedDate: "4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
      isTrending: true
    },
    {
      id: 2,
      title: "Breakthrough in Quantum Computing Promises Revolutionary Changes",
      summary: "Scientists at leading research institutions have achieved a major milestone in quantum computing that could accelerate technological advancement.",
      source: "Science",
      publishedDate: "6 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Global Food Security Initiative Launches Across 50 Countries",
      summary: "A comprehensive program aimed at addressing food insecurity worldwide has been launched with support from international organizations and governments.",
      source: "World News",
      publishedDate: "8 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
    }
  ],
  world: [
    {
      id: 4,
      title: "European Union Announces New Trade Partnership with Southeast Asia",
      summary: "Historic agreement aims to boost economic cooperation and sustainable development across regions.",
      source: "World News",
      publishedDate: "3 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Antarctic Research Station Reports Record Ice Sheet Changes",
      summary: "Scientists document unprecedented changes in polar ice formations with global implications.",
      source: "Science",
      publishedDate: "5 hours ago"
    }
  ],
  politics: [
    {
      id: 6,
      title: "Congressional Leaders Reach Bipartisan Infrastructure Agreement",
      summary: "Landmark legislation promises major investments in clean energy and digital connectivity.",
      source: "Politics",
      publishedDate: "2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop"
    }
  ],
  science: [
    {
      id: 7,
      title: "New Gene Therapy Shows Promise for Treating Rare Genetic Disorders",
      summary: "Clinical trials demonstrate significant improvements in patient outcomes using innovative treatment approach.",
      source: "Health & Science",
      publishedDate: "4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    }
  ],
  tech: [
    {
      id: 8,
      title: "AI Breakthrough: New Model Achieves Human-Level Performance in Complex Reasoning",
      summary: "Latest artificial intelligence system demonstrates unprecedented capabilities in problem-solving and analysis.",
      source: "Technology",
      publishedDate: "1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      isLive: true
    }
  ]
};

type Screen = 'home' | 'sections' | 'bookmarks' | 'notifications' | 'profile' | 'article';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [activeTopTab, setActiveTopTab] = useState('top');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveScreen(tabId as Screen);
  };

  const handleSectionSelect = (sectionId: string) => {
    setActiveTopTab(sectionId);
    setActiveScreen('home');
    setActiveTab('home');
  };

  const handleArticleSelect = (articleId: number) => {
    setActiveScreen('article');
  };

  const handleNotificationSelect = (notificationId: number) => {
    setActiveScreen('article');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'sections':
        return <SectionsPage onSectionSelect={handleSectionSelect} />;
      case 'bookmarks':
        return <BookmarksPage onArticleSelect={handleArticleSelect} />;
      case 'notifications':
        return <NotificationsPage onNotificationSelect={handleNotificationSelect} />;
      case 'profile':
        return <ProfilePage isDarkMode={isDarkMode} onDarkModeToggle={toggleDarkMode} />;
      case 'article':
        return <ArticleDetailPage onBack={() => setActiveScreen('home')} />;
      case 'home':
      default:
        return (
          <div className="flex flex-col h-full">
            {/* Top category tabs */}
            <TopTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
            
            <PullToRefresh onRefresh={handleRefresh}>
              <div className="pb-4">
                {/* Featured article - only show on "top" tab */}
                {activeTopTab === 'top' && (
                  <div onClick={() => handleArticleSelect(0)}>
                    <FeaturedArticle {...featuredArticle} />
                  </div>
                )}
                
                {/* Section header */}
                <SectionHeader 
                  title={activeTopTab === 'top' ? 'Latest News' : activeTopTab.charAt(0).toUpperCase() + activeTopTab.slice(1)} 
                  subtitle="Stay updated with breaking stories" 
                />
                
                {/* News feed */}
                <div className="divide-y divide-border">
                  {(articlesByCategory[activeTopTab as keyof typeof articlesByCategory] || articlesByCategory.top).map((article) => (
                    <div key={article.id} onClick={() => handleArticleSelect(article.id)}>
                      <ArticleCard
                        title={article.title}
                        summary={article.summary}
                        source={article.source}
                        publishedDate={article.publishedDate}
                        imageUrl={article.imageUrl}
                        isTrending={article.isTrending}
                        isLive={article.isLive}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </PullToRefresh>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      {/* App container with iPhone 13 dimensions */}
      <div className="max-w-sm mx-auto min-h-screen bg-background relative flex flex-col">
        
        {/* Status bar simulation */}
        <div className="h-12 bg-background flex items-center justify-between px-4 pt-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
          </div>
          <div className="font-medium text-sm">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-6 h-3 border border-foreground rounded-sm">
              <div className="w-4 h-1 bg-foreground rounded-sm mt-0.5 ml-0.5"></div>
            </div>
          </div>
        </div>

        {/* Header - only show on home screen */}
        {activeScreen === 'home' && (
          <>
            <header className="bg-background border-b border-border px-4 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="font-serif font-bold text-2xl text-foreground">The Times</h1>
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </header>

            {/* Breaking news banner */}
            <BreakingNewsBanner message={breakingNews} />
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-hidden pb-20">
          {renderScreen()}
        </main>

        {/* Bottom navigation */}
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}