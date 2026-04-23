'use client';

import { useState, useEffect } from 'react';
import StudentSidebar from '@/landing_page/StudentSidebar';
import StudentNavbar from '@/landing_page/StudentNavbar';
import { 
  Lock, Palette, Database, Download, Trash2,
  Moon, Sun, Monitor, Languages, Key,
  AlertTriangle, CheckCircle
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Translation dictionary
const translations = {
  English: {
    settings: 'Settings',
    manageAccount: 'Manage your account preferences',
    appearance: 'Appearance',
    security: 'Security',
    account: 'Account',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    fontSize: 'Font Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    language: 'Language',
    compactView: 'Compact View',
    animations: 'Animations',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password',
    dataExport: 'Data Export',
    exportData: 'Export Data',
    deleteAccount: 'Delete Account',
    deleteWarning: 'Warning: Deleting your account is permanent and cannot be undone.',
    passwordUpdated: 'Password updated successfully!',
    passwordMismatch: 'Passwords do not match',
    dataExported: 'Data exported successfully!',
    securityRecommendation: 'For security, we recommend using a strong, unique password.',
    accountManagement: 'Account Management',
    saveChanges: 'Save Changes',
    updating: 'Updating...',
    showMoreContent: 'Show more content by reducing spacing',
    enableAnimations: 'Enable smooth transitions and effects'
  },
  Spanish: {
    settings: 'Configuración',
    manageAccount: 'Administra las preferencias de tu cuenta',
    appearance: 'Apariencia',
    security: 'Seguridad',
    account: 'Cuenta',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    fontSize: 'Tamaño de Fuente',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    language: 'Idioma',
    compactView: 'Vista Compacta',
    animations: 'Animaciones',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    updatePassword: 'Actualizar Contraseña',
    dataExport: 'Exportar Datos',
    exportData: 'Exportar Datos',
    deleteAccount: 'Eliminar Cuenta',
    deleteWarning: 'Advertencia: Eliminar tu cuenta es permanente y no se puede deshacer.',
    passwordUpdated: '¡Contraseña actualizada exitosamente!',
    passwordMismatch: 'Las contraseñas no coinciden',
    dataExported: '¡Datos exportados exitosamente!',
    securityRecommendation: 'Por seguridad, recomendamos usar una contraseña fuerte y única.',
    accountManagement: 'Gestión de Cuenta',
    saveChanges: 'Guardar Cambios',
    updating: 'Actualizando...',
    showMoreContent: 'Muestra más contenido reduciendo el espacio',
    enableAnimations: 'Habilitar transiciones y efectos suaves'
  }
};

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    language: 'English',
    compactView: false,
    animations: true
  });

  // Security Settings
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load saved settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedLanguage = localStorage.getItem('language') || 'English';
    const savedCompactView = localStorage.getItem('compactView') === 'true';
    const savedAnimations = localStorage.getItem('animations') !== 'false';
    
    setAppearance({
      theme: savedTheme,
      fontSize: savedFontSize,
      language: savedLanguage,
      compactView: savedCompactView,
      animations: savedAnimations
    });
    
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyCompactView(savedCompactView);
    applyAnimations(savedAnimations);
  }, []);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    if (size === 'small') {
      root.style.fontSize = '14px';
    } else if (size === 'medium') {
      root.style.fontSize = '16px';
    } else if (size === 'large') {
      root.style.fontSize = '18px';
    }
  };

  const applyCompactView = (isCompact) => {
    if (isCompact) {
      document.body.classList.add('compact-view');
    } else {
      document.body.classList.remove('compact-view');
    }
  };

  const applyAnimations = (hasAnimations) => {
    if (!hasAnimations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  };

  const handleThemeChange = (theme) => {
    setAppearance({...appearance, theme});
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  };

  const handleFontSizeChange = (size) => {
    setAppearance({...appearance, fontSize: size});
    localStorage.setItem('fontSize', size);
    applyFontSize(size);
  };

  const handleLanguageChange = (lang) => {
    setAppearance({...appearance, language: lang});
    localStorage.setItem('language', lang);
  };

  const handleCompactViewChange = () => {
    const newValue = !appearance.compactView;
    setAppearance({...appearance, compactView: newValue});
    localStorage.setItem('compactView', newValue);
    applyCompactView(newValue);
  };

  const handleAnimationsChange = () => {
    const newValue = !appearance.animations;
    setAppearance({...appearance, animations: newValue});
    localStorage.setItem('animations', newValue);
    applyAnimations(newValue);
  };

  const handleUpdatePassword = async () => {
    if (security.newPassword !== security.confirmPassword) {
      alert(translations[appearance.language].passwordMismatch);
      return;
    }
    
    if (security.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: security.currentPassword,
          newPassword: security.newPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showSuccess(translations[appearance.language].passwordUpdated);
        setSecurity({ 
          currentPassword: '', 
          newPassword: '', 
          confirmPassword: '' 
        });
      } else {
        alert(data.message || 'Current password is incorrect');
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/export-data`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      showSuccess(translations[appearance.language].dataExported);
    } catch (error) {
      console.error('Failed to export data:', error);
      alert('Failed to export data');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm(translations[appearance.language].deleteWarning)) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/signin';
        } else {
          alert('Failed to delete account');
        }
      } catch (error) {
        console.error('Failed to delete account:', error);
        alert('Failed to delete account');
      }
    }
  };

  const t = translations[appearance.language] || translations.English;

  const sections = [
    { id: 'appearance', name: t.appearance, icon: Palette },
    { id: 'security', name: t.security, icon: Lock },
    { id: 'account', name: t.account, icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <StudentNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t.settings}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t.manageAccount}</p>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckCircle size={18} />
              {successMessage}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <section.icon size={18} />
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t.appearance}</h2>
                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">{t.theme}</label>
                      <div className="flex gap-4">
                        {[
                          { id: 'light', name: t.light, icon: Sun },
                          { id: 'dark', name: t.dark, icon: Moon },
                          { id: 'system', name: t.system, icon: Monitor }
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => handleThemeChange(theme.id)}
                            className={`flex-1 p-4 border-2 rounded-lg text-center transition-colors ${
                              appearance.theme === theme.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <theme.icon className="mx-auto mb-2 dark:text-white" size={24} />
                            <span className="text-sm font-medium dark:text-white">{theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.fontSize}</label>
                      <select
                        value={appearance.fontSize}
                        onChange={(e) => handleFontSizeChange(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="small">{t.small}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="large">{t.large}</option>
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.language}</label>
                      <select
                        value={appearance.language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Español</option>
                      </select>
                    </div>

                    {/* Toggle Options */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700 dark:text-gray-300">{t.compactView}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t.showMoreContent}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appearance.compactView}
                            onChange={handleCompactViewChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700 dark:text-gray-300">{t.animations}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t.enableAnimations}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appearance.animations}
                            onChange={handleAnimationsChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t.security}</h2>
                  <div className="space-y-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        <AlertTriangle size={16} className="inline mr-2" />
                        {t.securityRecommendation}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.currentPassword}</label>
                      <input
                        type="password"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.newPassword}</label>
                      <input
                        type="password"
                        value={security.newPassword}
                        onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter new password (min 6 characters)"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{t.confirmPassword}</label>
                      <input
                        type="password"
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <button
                      onClick={handleUpdatePassword}
                      disabled={saving || !security.currentPassword || !security.newPassword || !security.confirmPassword}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {saving ? t.updating : t.updatePassword}
                    </button>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t.accountManagement}</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.dataExport}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Download all your personal data</p>
                      </div>
                      <button 
                        onClick={handleExportData}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Download size={16} className="inline mr-1" /> {t.exportData}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.deleteAccount}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
                      </div>
                      <button 
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} className="inline mr-1" /> {t.deleteAccount}
                      </button>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-sm text-red-800 dark:text-red-400">
                        <AlertTriangle size={16} className="inline mr-2" />
                        {t.deleteWarning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}