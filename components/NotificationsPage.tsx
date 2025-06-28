import { useState } from 'react';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  summary: string;
  time: string;
  isRead: boolean;
  isBreaking: boolean;
  group: 'today' | 'yesterday' | 'older';
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Breaking: Supreme Court Decision Expected",
    summary: "Historic climate change case reaches final stages",
    time: "2h ago",
    isRead: false,
    isBreaking: true,
    group: 'today'
  },
  {
    id: 2,
    title: "Tech Stocks Surge After Earnings",
    summary: "Major technology companies report strong quarterly results",
    time: "4h ago",
    isRead: false,
    isBreaking: false,
    group: 'today'
  },
  {
    id: 3,
    title: "Daily Briefing: Your Morning Update",
    summary: "Top stories from around the world",
    time: "8h ago",
    isRead: true,
    isBreaking: false,
    group: 'today'
  },
  {
    id: 4,
    title: "Election Results Coming In",
    summary: "Live updates from key battleground states",
    time: "Yesterday",
    isRead: true,
    isBreaking: true,
    group: 'yesterday'
  }
];

interface NotificationsPageProps {
  onNotificationSelect: (notificationId: number) => void;
}

export function NotificationsPage({ onNotificationSelect }: NotificationsPageProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'breaking'>('all');

  const removeNotification = (id: number) => {
    setNotificationsList(notificationsList.filter(n => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    onNotificationSelect(id);
  };

  const filteredNotifications = notificationsList.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'breaking') return notification.isBreaking;
    return true;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const group = notification.group;
    if (!groups[group]) groups[group] = [];
    groups[group].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="font-serif font-bold text-2xl mb-4">Notifications</h1>
        
        {/* Filter tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'breaking', label: 'Breaking Only' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
          <div key={group}>
            {/* Group header */}
            <div className="px-4 py-2 bg-muted/50 border-b border-border">
              <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                {group === 'today' ? 'Today' : group === 'yesterday' ? 'Yesterday' : 'Earlier'}
              </h2>
            </div>

            {/* Group notifications */}
            {groupNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-4 border-b border-border hover:bg-accent/50 transition-colors relative group"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    notification.isRead ? 'bg-muted-foreground/30' : 'bg-primary'
                  }`} />
                </div>
                
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {notification.isBreaking && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs font-medium">
                        BREAKING
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  
                  <h3 className={`font-serif mb-1 ${
                    notification.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'
                  }`}>
                    {notification.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.summary}
                  </p>
                </div>

                <button
                  onClick={() => removeNotification(notification.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="font-serif font-bold text-xl mb-2">No notifications</h2>
            <p className="text-muted-foreground text-sm">
              {filter === 'unread' ? "You're all caught up!" : "No notifications to show"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}