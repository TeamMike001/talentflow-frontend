// src/app/(instructor)/instructor/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import InstructorSidebar from '@/landing_page/InstructorSidebar';
import InstructorNavbar from '@/landing_page/InstructorNavbar';
import InstructorFooter from '@/landing_page/InstructorFooter';
import { 
  Lock, Palette, Database, Download, Trash2,
  Moon, Sun, Monitor, Languages, Key,
  AlertTriangle, CheckCircle, Bell, DollarSign, Users, BookOpen
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

// Translation dictionary
const translations = {
  English: {
    settings: 'Settings',
    manageAccount: 'Manage your account and course preferences',
    appearance: 'Appearance',
    security: 'Security',
    account: 'Account',
    notifications: 'Notifications',
    coursePreferences: 'Course Preferences',
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
    deleteWarning: 'Warning: Deleting your account is permanent and cannot be undone. All your courses and student data will be lost.',
    passwordUpdated: 'Password updated successfully!',
    passwordMismatch: 'Passwords do not match',
    dataExported: 'Data exported successfully!',
    securityRecommendation: 'For security, we recommend using a strong, unique password.',
    accountManagement: 'Account Management',
    saveChanges: 'Save Changes',
    updating: 'Updating...',
    showMoreContent: 'Show more content by reducing spacing',
    enableAnimations: 'Enable smooth transitions and effects',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    newStudentEnrollment: 'New Student Enrollment',
    courseCompletionAlert: 'Course Completion Alert',
    studentSubmissionAlert: 'Student Submission Alert',
    weeklyReport: 'Weekly Report',
    marketingEmails: 'Marketing Emails',
    defaultCourseLanguage: 'Default Course Language',
    defaultCourseLevel: 'Default Course Level',
    autoPublishCourses: 'Auto-publish Courses',
    autoPublishDesc: 'Automatically publish courses when created (requires review)',
    enableQnA: 'Enable Q&A Section',
    enableQnADesc: 'Allow students to ask questions in your courses',
    enableReviews: 'Enable Reviews',
    enableReviewsDesc: 'Allow students to leave reviews and ratings',
    instructorBio: 'Instructor Bio',
    instructorBioPlaceholder: 'Tell your students about your expertise and experience...',
    socialLinks: 'Social Links',
    website: 'Website',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    youtube: 'YouTube',
    savePreferences: 'Save Preferences',
    preferencesSaved: 'Preferences saved successfully!'
  },
  Spanish: {
    settings: 'Configuración',
    manageAccount: 'Administra las preferencias de tu cuenta y cursos',
    appearance: 'Apariencia',
    security: 'Seguridad',
    account: 'Cuenta',
    notifications: 'Notificaciones',
    coursePreferences: 'Preferencias de Cursos',
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
    deleteWarning: 'Advertencia: Eliminar tu cuenta es permanente y no se puede deshacer. Todos tus cursos y datos de estudiantes se perderán.',
    passwordUpdated: '¡Contraseña actualizada exitosamente!',
    passwordMismatch: 'Las contraseñas no coinciden',
    dataExported: '¡Datos exportados exitosamente!',
    securityRecommendation: 'Por seguridad, recomendamos usar una contraseña fuerte y única.',
    accountManagement: 'Gestión de Cuenta',
    saveChanges: 'Guardar Cambios',
    updating: 'Actualizando...',
    showMoreContent: 'Muestra más contenido reduciendo el espacio',
    enableAnimations: 'Habilitar transiciones y efectos suaves',
    emailNotifications: 'Notificaciones por Correo',
    pushNotifications: 'Notificaciones Push',
    newStudentEnrollment: 'Nueva Inscripción de Estudiante',
    courseCompletionAlert: 'Alerta de Curso Completado',
    studentSubmissionAlert: 'Alerta de Envío de Estudiante',
    weeklyReport: 'Reporte Semanal',
    marketingEmails: 'Correos de Marketing',
    defaultCourseLanguage: 'Idioma Predeterminado del Curso',
    defaultCourseLevel: 'Nivel Predeterminado del Curso',
    autoPublishCourses: 'Publicar Cursos Automáticamente',
    autoPublishDesc: 'Publicar automáticamente los cursos al crearlos (requiere revisión)',
    enableQnA: 'Habilitar Sección de Preguntas',
    enableQnADesc: 'Permitir que los estudiantes hagan preguntas en tus cursos',
    enableReviews: 'Habilitar Reseñas',
    enableReviewsDesc: 'Permitir que los estudiantes dejen reseñas y calificaciones',
    instructorBio: 'Biografía del Instructor',
    instructorBioPlaceholder: 'Cuéntales a tus estudiantes sobre tu experiencia...',
    socialLinks: 'Enlaces Sociales',
    website: 'Sitio Web',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    youtube: 'YouTube',
    savePreferences: 'Guardar Preferencias',
    preferencesSaved: '¡Preferencias guardadas exitosamente!'
  }
};

export default function InstructorSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);

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

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newStudentEnrollment: true,
    courseCompletionAlert: true,
    studentSubmissionAlert: true,
    weeklyReport: false,
    marketingEmails: false
  });

  // Course Preferences
  const [coursePrefs, setCoursePrefs] = useState({
    defaultLanguage: 'English',
    defaultLevel: 'Beginner',
    autoPublish: false,
    enableQnA: true,
    enableReviews: true
  });

  // Instructor Profile
  const [instructorProfile, setInstructorProfile] = useState({
    bio: '',
    website: '',
    linkedin: '',
    twitter: '',
    youtube: ''
  });

  // Load saved settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('instructor_theme') || 'light';
    const savedFontSize = localStorage.getItem('instructor_fontSize') || 'medium';
    const savedLanguage = localStorage.getItem('instructor_language') || 'English';
    const savedCompactView = localStorage.getItem('instructor_compactView') === 'true';
    const savedAnimations = localStorage.getItem('instructor_animations') !== 'false';
    
    setAppearance({
      theme: savedTheme,
      fontSize: savedFontSize,
      language: savedLanguage,
      compactView: savedCompactView,
      animations: savedAnimations
    });
    
    // Load notification settings
    const savedNotifications = localStorage.getItem('instructor_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    // Load course preferences
    const savedCoursePrefs = localStorage.getItem('instructor_course_prefs');
    if (savedCoursePrefs) {
      setCoursePrefs(JSON.parse(savedCoursePrefs));
    }
    
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyCompactView(savedCompactView);
    applyAnimations(savedAnimations);
    
    fetchInstructorProfile();
  }, []);

  const fetchInstructorProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const user = await response.json();
        setUserData(user);
        if (user.bio) setInstructorProfile(prev => ({ ...prev, bio: user.bio }));
        if (user.website) setInstructorProfile(prev => ({ ...prev, website: user.website }));
        if (user.linkedin) setInstructorProfile(prev => ({ ...prev, linkedin: user.linkedin }));
        if (user.twitter) setInstructorProfile(prev => ({ ...prev, twitter: user.twitter }));
        if (user.youtube) setInstructorProfile(prev => ({ ...prev, youtube: user.youtube }));
      }
    } catch (error) {
      console.error('Failed to fetch instructor profile:', error);
    }
  };

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
    localStorage.setItem('instructor_theme', theme);
    applyTheme(theme);
  };

  const handleFontSizeChange = (size) => {
    setAppearance({...appearance, fontSize: size});
    localStorage.setItem('instructor_fontSize', size);
    applyFontSize(size);
  };

  const handleLanguageChange = (lang) => {
    setAppearance({...appearance, language: lang});
    localStorage.setItem('instructor_language', lang);
  };

  const handleCompactViewChange = () => {
    const newValue = !appearance.compactView;
    setAppearance({...appearance, compactView: newValue});
    localStorage.setItem('instructor_compactView', newValue);
    applyCompactView(newValue);
  };

  const handleAnimationsChange = () => {
    const newValue = !appearance.animations;
    setAppearance({...appearance, animations: newValue});
    localStorage.setItem('instructor_animations', newValue);
    applyAnimations(newValue);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    localStorage.setItem('instructor_notifications', JSON.stringify({
      ...notifications,
      [key]: !notifications[key]
    }));
  };

  const handleCoursePrefChange = (key, value) => {
    setCoursePrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveCoursePrefs = () => {
    localStorage.setItem('instructor_course_prefs', JSON.stringify(coursePrefs));
    showSuccess(translations[appearance.language].preferencesSaved);
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
      
      if (response.ok) {
        showSuccess(translations[appearance.language].passwordUpdated);
        setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await response.json();
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
      a.download = 'instructor-data.json';
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
    { id: 'notifications', name: t.notifications, icon: Bell },
    { id: 'coursePreferences', name: t.coursePreferences, icon: BookOpen },
    { id: 'security', name: t.security, icon: Lock },
    { id: 'account', name: t.account, icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <InstructorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} title={t.settings} />
        
        <main className="flex-1 p-6">
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

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t.notifications}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.emailNotifications}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={() => handleNotificationChange('emailNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.pushNotifications}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={() => handleNotificationChange('pushNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.newStudentEnrollment}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">When a student enrolls in your course</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.newStudentEnrollment}
                          onChange={() => handleNotificationChange('newStudentEnrollment')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.courseCompletionAlert}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">When a student completes your course</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.courseCompletionAlert}
                          onChange={() => handleNotificationChange('courseCompletionAlert')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.studentSubmissionAlert}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">When a student submits an assignment</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.studentSubmissionAlert}
                          onChange={() => handleNotificationChange('studentSubmissionAlert')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.weeklyReport}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Weekly summary of your course performance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReport}
                          onChange={() => handleNotificationChange('weeklyReport')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Preferences */}
              {activeSection === 'coursePreferences' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{t.coursePreferences}</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.defaultCourseLanguage}</label>
                      <select
                        value={coursePrefs.defaultLanguage}
                        onChange={(e) => handleCoursePrefChange('defaultLanguage', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Español</option>
                        <option value="French">Français</option>
                        <option value="German">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t.defaultCourseLevel}</label>
                      <select
                        value={coursePrefs.defaultLevel}
                        onChange={(e) => handleCoursePrefChange('defaultLevel', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="All Levels">All Levels</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.autoPublishCourses}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.autoPublishDesc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={coursePrefs.autoPublish}
                          onChange={(e) => handleCoursePrefChange('autoPublish', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.enableQnA}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.enableQnADesc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={coursePrefs.enableQnA}
                          onChange={(e) => handleCoursePrefChange('enableQnA', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{t.enableReviews}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t.enableReviewsDesc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={coursePrefs.enableReviews}
                          onChange={(e) => handleCoursePrefChange('enableReviews', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSaveCoursePrefs}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {t.savePreferences}
                      </button>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Download all your personal data and course analytics</p>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all course data</p>
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
        </main>
        
        <InstructorFooter />
      </div>
    </div>
  );
}