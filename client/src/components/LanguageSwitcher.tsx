import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English',    flag: '🇺🇸' },
  { code: 'ar', name: 'العربية',    flag: '🇸🇦' },
  { code: 'es', name: 'Español',    flag: '🇪🇸' },
  { code: 'fr', name: 'Français',   flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch',    flag: '🇩🇪' },
  { code: 'it', name: 'Italiano',   flag: '🇮🇹' },
  { code: 'pt', name: 'Português',  flag: '🇧🇷' },
  { code: 'zh', name: '中文',        flag: '🇨🇳' },
  { code: 'ja', name: '日本語',      flag: '🇯🇵' },
  { code: 'ru', name: 'Русский',    flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const current = languages.find(l => l.code === i18n.language) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/20 bg-black/40 hover:border-white/40 transition-colors text-white/60 hover:text-white"
          aria-label="Change language"
        >
          <Globe size={13} />
          <span className="text-[11px] font-black tracking-widest">{current.flag}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 bg-[#0c0c0e] border border-white/10 rounded-2xl p-1 shadow-2xl"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-xs font-bold uppercase tracking-widest transition-colors ${
              i18n.language === lang.code
                ? 'text-white bg-white/10'
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
