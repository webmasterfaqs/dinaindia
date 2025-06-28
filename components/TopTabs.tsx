interface TopTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs = [
  { id: 'top', label: 'Top News' },
  { id: 'world', label: 'World' },
  { id: 'politics', label: 'Politics' },
  { id: 'science', label: 'Science' },
  { id: 'tech', label: 'Tech' },
];

export function TopTabs({ activeTab, onTabChange }: TopTabsProps) {
  return (
    <div className="bg-background border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-foreground text-foreground font-medium'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}