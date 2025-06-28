import { Search, Globe, Building2, TrendingUp, Heart, Trophy, Palette, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';

const sections = [
  { id: 'world', name: 'World', icon: Globe, color: 'text-blue-600' },
  { id: 'us', name: 'U.S.', icon: Building2, color: 'text-red-600' },
  { id: 'business', name: 'Business', icon: TrendingUp, color: 'text-green-600' },
  { id: 'health', name: 'Health', icon: Heart, color: 'text-pink-600' },
  { id: 'sports', name: 'Sports', icon: Trophy, color: 'text-orange-600' },
  { id: 'arts', name: 'Arts', icon: Palette, color: 'text-purple-600' },
  { id: 'opinion', name: 'Opinion', icon: MessageSquare, color: 'text-indigo-600' },
  { id: 'more', name: 'More', icon: MoreHorizontal, color: 'text-gray-600' },
];

interface SectionsPageProps {
  onSectionSelect: (sectionId: string) => void;
}

export function SectionsPage({ onSectionSelect }: SectionsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'top' | 'latest'>('top');

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="font-serif font-bold text-2xl mb-4">Sections</h1>
        
        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter toggle */}
        <div className="flex rounded-lg bg-muted p-1">
          <button
            onClick={() => setFilter('top')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              filter === 'top'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Top Stories
          </button>
          <button
            onClick={() => setFilter('latest')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              filter === 'latest'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Latest
          </button>
        </div>
      </div>

      {/* Sections grid */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionSelect(section.id)}
                className="flex flex-col items-center p-6 bg-card rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <Icon className={`w-8 h-8 mb-3 ${section.color}`} />
                <span className="font-medium text-card-foreground">{section.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}