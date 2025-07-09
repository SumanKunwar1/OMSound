import { useState } from 'react';
import { Save, Globe, Mail, MapPin, Shield } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    logo: string;
    favicon: string;
    timezone: string;
    language: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      youtube: string;
      pinterest: string;
    };
  };
  ecommerce: {
    currency: string;
    taxRate: number;
    shippingCost: number;
    freeShippingThreshold: number;
    paymentMethods: string[];
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    googleAnalytics: string;
    googleTagManager: string;
    facebookPixel: string;
  };
  security: {
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
  };
}

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<keyof Settings>('general');
  const [settings, setSettings] = useState<Settings>({
    general: {
      siteName: 'OMSound Nepal',
      siteDescription: 'Authentic Himalayan Singing Bowls for Sound Healing and Meditation',
      siteUrl: 'https://omsoundnepal.com',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      timezone: 'Asia/Kathmandu',
      language: 'en'
    },
    contact: {
      email: 'info@omsoundnepal.com',
      phone: '+977 1234 5678',
      address: 'Sanepa, Lalitpur, Kathmandu Valley, Nepal',
      businessHours: 'Monday-Friday: 10am-6pm NPT',
      socialMedia: {
        facebook: 'https://facebook.com/omsoundnepal',
        instagram: 'https://instagram.com/omsoundnepal',
        youtube: 'https://youtube.com/omsoundnepal',
        pinterest: 'https://pinterest.com/omsoundnepal'
      }
    },
    ecommerce: {
      currency: 'USD',
      taxRate: 0,
      shippingCost: 15,
      freeShippingThreshold: 100,
      paymentMethods: ['stripe', 'paypal']
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: 'noreply@omsoundnepal.com',
      fromName: 'OMSound Nepal'
    },
    seo: {
      metaTitle: 'OMSound Nepal - Authentic Himalayan Singing Bowls',
      metaDescription: 'Discover authentic handcrafted Himalayan singing bowls from Nepal. Premium quality sound healing instruments for meditation, therapy, and wellness.',
      metaKeywords: 'singing bowls, himalayan singing bowls, sound healing, meditation, nepal',
      googleAnalytics: '',
      googleTagManager: '',
      facebookPixel: ''
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const { hasPermission } = useAdminAuth();

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'ecommerce', label: 'E-commerce', icon: MapPin },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const handleInputChange = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section: keyof Settings, parentField: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section] as any)[parentField],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
    setIsSaving(false);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Name *
          </label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site URL *
          </label>
          <input
            type="url"
            value={settings.general.siteUrl}
            onChange={(e) => handleInputChange('general', 'siteUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Description
          </label>
          <textarea
            value={settings.general.siteDescription}
            onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="Asia/Kathmandu">Asia/Kathmandu (NPT)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="en">English</option>
            <option value="ne">Nepali</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email *
          </label>
          <input
            type="email"
            value={settings.contact.email}
            onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.contact.phone}
            onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Address
          </label>
          <textarea
            value={settings.contact.address}
            onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Hours
          </label>
          <input
            type="text"
            value={settings.contact.businessHours}
            onChange={(e) => handleInputChange('contact', 'businessHours', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={settings.contact.socialMedia.facebook}
              onChange={(e) => handleNestedInputChange('contact', 'socialMedia', 'facebook', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="url"
              value={settings.contact.socialMedia.instagram}
              onChange={(e) => handleNestedInputChange('contact', 'socialMedia', 'instagram', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube
            </label>
            <input
              type="url"
              value={settings.contact.socialMedia.youtube}
              onChange={(e) => handleNestedInputChange('contact', 'socialMedia', 'youtube', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pinterest
            </label>
            <input
              type="url"
              value={settings.contact.socialMedia.pinterest}
              onChange={(e) => handleNestedInputChange('contact', 'socialMedia', 'pinterest', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEcommerceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency *
          </label>
          <select
            value={settings.ecommerce.currency}
            onChange={(e) => handleInputChange('ecommerce', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="NPR">NPR - Nepalese Rupee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={settings.ecommerce.taxRate}
            onChange={(e) => handleInputChange('ecommerce', 'taxRate', parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Cost ($)
          </label>
          <input
            type="number"
            value={settings.ecommerce.shippingCost}
            onChange={(e) => handleInputChange('ecommerce', 'shippingCost', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Free Shipping Threshold ($)
          </label>
          <input
            type="number"
            value={settings.ecommerce.freeShippingThreshold}
            onChange={(e) => handleInputChange('ecommerce', 'freeShippingThreshold', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Meta Title
          </label>
          <input
            type="text"
            value={settings.seo.metaTitle}
            onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Meta Description
          </label>
          <textarea
            value={settings.seo.metaDescription}
            onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Meta Keywords
          </label>
          <input
            type="text"
            value={settings.seo.metaKeywords}
            onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.seo.googleAnalytics}
              onChange={(e) => handleInputChange('seo', 'googleAnalytics', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="GA-XXXXXXXXX-X"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Tag Manager ID
            </label>
            <input
              type="text"
              value={settings.seo.googleTagManager}
              onChange={(e) => handleInputChange('seo', 'googleTagManager', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="GTM-XXXXXXX"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value) || 30)}
            min="5"
            max="1440"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value) || 5)}
            min="3"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Password Length
          </label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value) || 8)}
            min="6"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.security.enableTwoFactor}
            onChange={(e) => handleInputChange('security', 'enableTwoFactor', e.target.checked)}
            className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'ecommerce':
        return renderEcommerceSettings();
      case 'seo':
        return renderSEOSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderGeneralSettings();
    }
  };

  if (!hasPermission('settings.read')) {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
        <p className="mt-1 text-sm text-gray-500">You don't have permission to view settings.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your website settings and preferences</p>
        </div>
        {hasPermission('settings.write') && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as keyof Settings)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;