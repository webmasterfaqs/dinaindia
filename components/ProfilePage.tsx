import { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Type, 
  Moon, 
  Globe, 
  Volume2, 
  Shield, 
  FileText, 
  LogOut,
  ChevronRight 
} from 'lucide-react';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ProfilePageProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

export function ProfilePage({ isDarkMode, onDarkModeToggle }: ProfilePageProps) {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [breakingNewsEnabled, setBreakingNewsEnabled] = useState(true);
  const [dailySummaryEnabled, setDailySummaryEnabled] = useState(true);
  const [audioAutoplayEnabled, setAudioAutoplayEnabled] = useState(false);

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    action, 
    showChevron = false 
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle?: string;
    action: React.ReactNode;
    showChevron?: boolean;
  }) => (
    <div className="flex items-center justify-between p-4 bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <div>
          <div className="font-medium">{title}</div>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {action}
        {showChevron && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with profile info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-serif font-bold text-xl">John Doe</h1>
            <p className="text-muted-foreground">john.doe@email.com</p>
          </div>
        </div>
      </div>

      {/* Settings sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Account Settings */}
        <div className="mb-6">
          <h2 className="px-4 py-2 font-medium text-muted-foreground uppercase text-sm tracking-wide">
            Account Settings
          </h2>
          <div className="bg-card border-y border-border">
            <SettingItem
              icon={User}
              title="Email & Password"
              subtitle="Manage your account credentials"
              action={<></>}
              showChevron
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h2 className="px-4 py-2 font-medium text-muted-foreground uppercase text-sm tracking-wide">
            Preferences
          </h2>
          <div className="bg-card border-y border-border divide-y divide-border">
            <SettingItem
              icon={Type}
              title="Font Size"
              action={
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1 rounded text-sm capitalize ${
                        fontSize === size
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              }
            />
            
            <SettingItem
              icon={Moon}
              title="Dark Mode"
              action={
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onDarkModeToggle}
                />
              }
            />
            
            <SettingItem
              icon={Globe}
              title="Language"
              subtitle="English"
              action={<></>}
              showChevron
            />
            
            <SettingItem
              icon={Volume2}
              title="Audio Articles Autoplay"
              action={
                <Switch
                  checked={audioAutoplayEnabled}
                  onCheckedChange={setAudioAutoplayEnabled}
                />
              }
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="px-4 py-2 font-medium text-muted-foreground uppercase text-sm tracking-wide">
            Notifications
          </h2>
          <div className="bg-card border-y border-border divide-y divide-border">
            <SettingItem
              icon={Bell}
              title="Breaking News"
              subtitle="Get alerts for urgent stories"
              action={
                <Switch
                  checked={breakingNewsEnabled}
                  onCheckedChange={setBreakingNewsEnabled}
                />
              }
            />
            
            <SettingItem
              icon={Bell}
              title="Daily Summary"
              subtitle="Morning briefing notifications"
              action={
                <Switch
                  checked={dailySummaryEnabled}
                  onCheckedChange={setDailySummaryEnabled}
                />
              }
            />
          </div>
        </div>

        {/* Privacy & Legal */}
        <div className="mb-6">
          <h2 className="px-4 py-2 font-medium text-muted-foreground uppercase text-sm tracking-wide">
            Privacy & Legal
          </h2>
          <div className="bg-card border-y border-border divide-y divide-border">
            <SettingItem
              icon={Shield}
              title="Terms of Service"
              action={<></>}
              showChevron
            />
            
            <SettingItem
              icon={FileText}
              title="Privacy Policy"
              action={<></>}
              showChevron
            />
          </div>
        </div>

        {/* Log out */}
        <div className="mb-8 px-4">
          <button className="flex items-center gap-3 w-full p-4 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}