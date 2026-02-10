import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        tools: 'Tools',
        allTools: 'All Tools',
        pricing: 'Pricing',
        resources: 'Resources',
        downloads: 'Downloads',
        tutorials: 'Tutorials',
        faq: 'FAQ',
        contact: 'Contact',
      },
    },
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        tools: 'Herramientas',
        allTools: 'Todas las Herramientas',
        pricing: 'Precios',
        resources: 'Recursos',
        downloads: 'Descargas',
        tutorials: 'Tutoriales',
        faq: 'Preguntas Frecuentes',
        contact: 'Contacto',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        tools: 'Outils',
        allTools: 'Tous les Outils',
        pricing: 'Tarifs',
        resources: 'Ressources',
        downloads: 'Téléchargements',
        tutorials: 'Tutoriels',
        faq: 'FAQ',
        contact: 'Contact',
      },
    },
  },
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        tools: 'Werkzeuge',
        allTools: 'Alle Werkzeuge',
        pricing: 'Preise',
        resources: 'Ressourcen',
        downloads: 'Downloads',
        tutorials: 'Anleitungen',
        faq: 'FAQ',
        contact: 'Kontakt',
      },
    },
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        tools: 'Strumenti',
        allTools: 'Tutti gli Strumenti',
        pricing: 'Prezzi',
        resources: 'Risorse',
        downloads: 'Download',
        tutorials: 'Tutorial',
        faq: 'FAQ',
        contact: 'Contatto',
      },
    },
  },
  pt: {
    translation: {
      nav: {
        home: 'Início',
        tools: 'Ferramentas',
        allTools: 'Todas as Ferramentas',
        pricing: 'Preços',
        resources: 'Recursos',
        downloads: 'Downloads',
        tutorials: 'Tutoriais',
        faq: 'FAQ',
        contact: 'Contato',
      },
    },
  },
  zh: {
    translation: {
      nav: {
        home: '首页',
        tools: '工具',
        allTools: '所有工具',
        pricing: '价格',
        resources: '资源',
        downloads: '下载',
        tutorials: '教程',
        faq: '常见问题',
        contact: '联系',
      },
    },
  },
  ja: {
    translation: {
      nav: {
        home: 'ホーム',
        tools: 'ツール',
        allTools: 'すべてのツール',
        pricing: '価格',
        resources: 'リソース',
        downloads: 'ダウンロード',
        tutorials: 'チュートリアル',
        faq: 'よくある質問',
        contact: 'お問い合わせ',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        tools: 'الأدوات',
        allTools: 'جميع الأدوات',
        pricing: 'الأسعار',
        resources: 'الموارد',
        downloads: 'التنزيلات',
        tutorials: 'الدروس',
        faq: 'الأسئلة الشائعة',
        contact: 'اتصل بنا',
      },
    },
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        tools: 'Инструменты',
        allTools: 'Все Инструменты',
        pricing: 'Цены',
        resources: 'Ресурсы',
        downloads: 'Загрузки',
        tutorials: 'Учебники',
        faq: 'FAQ',
        contact: 'Контакт',
      },
    },
  },
};

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Set dir attribute for RTL languages
if (savedLanguage === 'ar') {
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.dir = 'ltr';
}

export default i18n;
