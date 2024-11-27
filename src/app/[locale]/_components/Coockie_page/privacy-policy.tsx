import { useTranslations } from 'next-intl';

const PrivacyPolicy = () => {
  const t = useTranslations('CookieConsent_page');

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-center text-4xl font-bold mb-6">{t('title')}</h1>
      <p className="text-gray-800 mb-6">
        {t('intro')}
      </p>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section1.title')}</h2>
          <p className="text-gray-700">
            {t('sections.section1.text')}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section2.title')}</h2>
          <p className="text-gray-700">
            {t('sections.section2.text')}
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section3.title')}</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>{t('sections.section3.items.essential.title')}</strong> {t('sections.section3.items.essential.description')}</li>
            <li><strong>{t('sections.section3.items.analytical.title')}</strong> {t('sections.section3.items.analytical.description')}</li>
            <li><strong>{t('sections.section3.items.functionality.title')}</strong> {t('sections.section3.items.functionality.description')}</li>
          </ul>
        </div>


        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section4.title')}</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>{t('sections.section4.items.browserSettings.title')}</strong> {t('sections.section4.items.browserSettings.description')}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section5.title')}</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>{t('sections.section5.items.thirdParty.title')}</strong> {t('sections.section5.items.thirdParty.description')}</li>
            <li><strong>{t('sections.section5.items.session.title')}</strong> {t('sections.section5.items.session.description')}</li>
            <li><strong>{t('sections.section5.items.persistent.title')}</strong> {t('sections.section5.items.persistent.description')}</li>
            <li><strong>{t('sections.section5.items.doubleClick.title')}</strong> {t('sections.section5.items.doubleClick.description')}</li>
            <li><strong>{t('sections.section5.items.advertising.title')}</strong> {t('sections.section5.items.advertising.description')}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section6.title')}</h2>
          <p className="text-gray-700">
            {t('sections.section6.text')}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section7.title')}</h2>
          <p className="text-gray-700">
            {t('sections.section7.text')}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('sections.section8.title')}</h2>
          <p className="text-gray-700">
            {t('sections.section8.text')} <a href="mailto:rmcrmc603@gmail.com" className="text-blue-500 underline">rmcrmc603@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
