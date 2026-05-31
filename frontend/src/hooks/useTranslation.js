import { useSelector } from 'react-redux';
import { translations } from '../store/translations';

export function useTranslation() {
  const locale = useSelector((state) => state.library.locale || 'fr');

  const t = (key) => {
    if (!translations[locale]) return key;
    return translations[locale][key] || key;
  };

  return { t, locale };
}
