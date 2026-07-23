import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, Key, Plus, Trash2, Edit3, Image as ImageIcon, 
  Check, AlertCircle, LogOut, Search, RefreshCw, FileText, LayoutDashboard,
  Upload, Link as LinkIcon
} from 'lucide-react';
import { BlogPost } from '../types';
import { 
  loginAdmin, getCurrentAdmin, logoutAdmin, getStoredBlogPosts, 
  createOrUpdateBlogPost, deleteStoredBlogPost, resetStoredBlogPosts, AdminUser 
} from '../services/blogStorage';

import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';

interface CrmAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostsUpdated: () => void;
}

const CATEGORIES = [
  'Agriculture',
  'WASH',
  'Micro-finance',
  'Environnement',
  'Éducation',
  'Autonomisation',
  'Général'
];

export const CrmAdminModal: React.FC<CrmAdminModalProps> = ({
  isOpen,
  onClose,
  onPostsUpdated
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  
  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // CRM Dashboard State
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Post Editor State
  const [editingPostId, setEditingPostId] = useState<string | number | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Général');
  const [customCategory, setCustomCategory] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [excerptInput, setExcerptInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  // Delete Confirmation State
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (isOpen) {
      const admin = getCurrentAdmin();
      setCurrentUser(admin);
      loadPostsList();
      if (admin) {
        setAuthorInput(admin.name);
      }
    }
  }, [isOpen]);

  const loadPostsList = () => {
    const list = getStoredBlogPosts();
    setPosts(list);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const user = loginAdmin(usernameInput, passwordInput);
    if (user) {
      setCurrentUser(user);
      setAuthorInput(user.name);
      setUsernameInput('');
      setPasswordInput('');
      showNotification('success', `Bienvenue ${user.name} ! Connexion réussie au CRM.`);
    } else {
      setLoginError('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
    setActiveTab('list');
    showNotification('success', 'Déconnexion effectuée.');
  };

  const resetForm = () => {
    setEditingPostId(null);
    setTitleInput('');
    setCategoryInput('Général');
    setCustomCategory('');
    setAuthorInput(currentUser?.name || 'Direction ASOFEDER');
    setImageUrlInput('');
    setExcerptInput('');
    setContentInput('');
  };

  const handleOpenCreateForm = () => {
    resetForm();
    setActiveTab('editor');
  };

  const handleOpenEditForm = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitleInput(post.title);
    
    if (CATEGORIES.includes(post.category)) {
      setCategoryInput(post.category);
      setCustomCategory('');
    } else {
      setCategoryInput('Autre');
      setCustomCategory(post.category);
    }

    setAuthorInput(post.author || currentUser?.name || 'Direction ASOFEDER');
    setImageUrlInput(post.imageUrl || '');
    setExcerptInput(post.excerpt || '');
    setContentInput(post.content || '');
    setActiveTab('editor');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'La taille de l\'image ne doit pas dépasser 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrlInput(result);
        showNotification('success', 'Image chargée depuis votre appareil.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleInput.trim()) {
      showNotification('error', 'Le titre de l\'article est obligatoire.');
      return;
    }
    if (!contentInput.trim()) {
      showNotification('error', 'Le contenu de l\'article est obligatoire.');
      return;
    }

    const finalCategory = categoryInput === 'Autre' && customCategory.trim() 
      ? customCategory.trim() 
      : categoryInput;

    const saved = createOrUpdateBlogPost({
      id: editingPostId || undefined,
      title: titleInput.trim(),
      category: finalCategory,
      excerpt: excerptInput.trim() || contentInput.slice(0, 160) + '...',
      content: contentInput.trim(),
      imageUrl: imageUrlInput.trim(),
      author: authorInput.trim() || currentUser?.name || 'Direction ASOFEDER'
    });

    loadPostsList();
    onPostsUpdated();
    setActiveTab('list');
    resetForm();

    if (editingPostId) {
      showNotification('success', `L'article "${saved.title}" a été mis à jour avec succès !`);
    } else {
      showNotification('success', `L'article "${saved.title}" a été publié avec succès !`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;
    const deletedId = postToDelete.id;
    const title = postToDelete.title;

    const success = deleteStoredBlogPost(deletedId);
    if (success) {
      loadPostsList();
      onPostsUpdated();
      showNotification('success', `L'article "${title}" a été supprimé définitivement.`);
    } else {
      showNotification('error', 'Échec de la suppression de l\'article.');
    }
    setPostToDelete(null);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Voulez-vous réinitialiser les articles avec la liste par défaut ?')) {
      resetStoredBlogPosts();
      loadPostsList();
      onPostsUpdated();
      showNotification('success', 'Articles réinitialisés par défaut.');
    }
  };

  if (!isOpen) return null;

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Tous' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 w-screen h-screen min-h-screen flex flex-col overflow-hidden">
      <div className="relative w-full h-full bg-slate-50 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#005021] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-emerald-900 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-lg shadow-sm">
              CRM
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight flex items-center gap-2">
                Espace CRM - Gestion d'Articles
              </h2>
              <p className="text-xs text-emerald-200">
                ASOFEDER • Publication, Édition et Suppression
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-700/50 text-xs">
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Administrateur : <strong className="text-amber-300">{currentUser.name}</strong></span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Quitter le CRM"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline">Quitter CRM</span>
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between shrink-0 ${
            notification.type === 'success' ? 'bg-emerald-100 text-emerald-900 border-b border-emerald-300' : 'bg-rose-100 text-rose-900 border-b border-rose-300'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-700" /> : <AlertCircle className="w-4 h-4 text-rose-700" />}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-xs opacity-70 hover:opacity-100 cursor-pointer">×</button>
          </div>
        )}

        {/* MAIN FULL PAGE CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/70">
          
          {/* SCENARIO 1: LOGIN FORM */}
          {!currentUser ? (
            <div className="max-w-md mx-auto py-12">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-slate-800">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-emerald-50 text-[#006b2d] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Connexion Administrateur</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Accès réservé au personnel d'administration ASOFEDER.
                  </p>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Nom d'utilisateur</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom d'utilisateur"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-slate-500" />
                      <span>Mot de passe</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] focus:border-transparent text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#006b2d] hover:bg-[#005021] text-white font-bold rounded-xl transition shadow-md cursor-pointer active:scale-98 flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    <span>Se connecter au CRM</span>
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-500 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    🔒 Espace sécurisé réservé aux administrateurs.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            
            /* SCENARIO 2: ADMIN DASHBOARD FULL PAGE */
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Navigation Tabs Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('list')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeTab === 'list'
                        ? 'bg-[#006b2d] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Tous les Articles ({posts.length})</span>
                  </button>

                  <button
                    onClick={handleOpenCreateForm}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeTab === 'editor' && !editingPostId
                        ? 'bg-[#006b2d] text-white shadow-xs'
                        : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300'
                    }`}
                  >
                    <Plus className="w-4 h-4 text-amber-800" />
                    <span>Nouvel Article</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetToDefault}
                    title="Réinitialiser les articles"
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Réinitialiser</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>

              {/* VIEW 1: ARTICLES LIST TABLE */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Rechercher par titre, catégorie ou auteur..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#006b2d]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Catégorie:</span>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium text-slate-700 focus:ring-2 focus:ring-[#006b2d]"
                      >
                        <option value="Tous">Toutes les catégories</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    {filteredPosts.length === 0 ? (
                      <div className="p-12 text-center text-slate-500">
                        <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-sm">Aucun article trouvé.</p>
                        <p className="text-xs mt-1">Créez votre premier article en cliquant sur "Nouvel Article".</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                              <th className="p-4">Image</th>
                              <th className="p-4">Titre</th>
                              <th className="p-4">Catégorie</th>
                              <th className="p-4">Auteur</th>
                              <th className="p-4">Date</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredPosts.map((post) => (
                              <tr key={post.id} className="hover:bg-amber-50/40 transition">
                                <td className="p-3.5">
                                  <img
                                    src={post.imageUrl || heroImg}
                                    alt={post.title}
                                    className="w-14 h-11 rounded-lg object-cover border border-slate-200 bg-slate-100 shrink-0"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = heroImg;
                                    }}
                                  />
                                </td>
                                <td className="p-3.5 max-w-sm">
                                  <p className="font-bold text-slate-900 line-clamp-1 text-xs">
                                    {post.title}
                                  </p>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {post.excerpt}
                                  </p>
                                </td>
                                <td className="p-3.5 whitespace-nowrap">
                                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    {post.category}
                                  </span>
                                </td>
                                <td className="p-3.5 whitespace-nowrap text-slate-700 font-medium">
                                  {post.author}
                                </td>
                                <td className="p-3.5 whitespace-nowrap text-slate-500">
                                  {post.date}
                                </td>
                                <td className="p-3.5 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => handleOpenEditForm(post)}
                                      className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition cursor-pointer flex items-center gap-1 font-bold text-[11px]"
                                      title="Éditer l'article"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                      <span>Éditer</span>
                                    </button>
                                    <button
                                      onClick={() => setPostToDelete(post)}
                                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer flex items-center gap-1 font-bold text-[11px]"
                                      title="Supprimer l'article"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Supprimer</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 2: EDITOR FORM */}
              {activeTab === 'editor' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-[#006b2d]" />
                      <span>{editingPostId ? 'Éditer l\'article' : 'Publier un nouvel article'}</span>
                    </h3>

                    <button
                      type="button"
                      onClick={() => setActiveTab('list')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      ← Retour à la liste
                    </button>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-6">
                    
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Titre de l'article <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Formation des femmes agricultrices à Jean-Rabel..."
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] text-sm font-medium"
                      />
                    </div>

                    {/* Category & Author Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Catégorie
                        </label>
                        <select
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] text-xs font-medium"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Autre">Autre catégorie personnalisée...</option>
                        </select>

                        {categoryInput === 'Autre' && (
                          <input
                            type="text"
                            placeholder="Entrez le nom de la catégorie..."
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="w-full mt-2 px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          Auteur
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Justilien, PRL, Direction ASOFEDER"
                          value={authorInput}
                          onChange={(e) => setAuthorInput(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] text-xs font-medium"
                        />
                      </div>
                    </div>

                    {/* IMAGE UPLOAD FROM DEVICE OR URL */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#006b2d]" />
                          <span>Image à la une (Importer depuis votre appareil)</span>
                        </span>
                        <span className="text-[11px] text-slate-400">Optionnel</span>
                      </label>

                      {/* File Upload Button */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <label className="px-4 py-2.5 rounded-xl bg-[#006b2d] hover:bg-[#005021] text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-95 shrink-0">
                          <Upload className="w-4 h-4" />
                          <span>Choisir une image sur votre appareil</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>

                        <div className="flex-1 flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type="text"
                            placeholder="Ou collez une URL d'image (https://...)"
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#006b2d]"
                          />
                        </div>
                      </div>

                      {/* Image Preview */}
                      {imageUrlInput && (
                        <div className="pt-2 flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={imageUrlInput}
                              alt="Aperçu"
                              className="w-20 h-16 rounded-xl object-cover border border-slate-300 shadow-xs"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = heroImg;
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setImageUrlInput('')}
                              className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-1 shadow-md hover:bg-rose-700"
                              title="Retirer l'image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            ✓ Image chargée et prête
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Résumé / Extrait (court résumé pour la carte)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Une à deux phrases pour présenter l'article..."
                        value={excerptInput}
                        onChange={(e) => setExcerptInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] text-xs"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Contenu complet de l'article <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={9}
                        required
                        placeholder="Rédigez l'article complet ici..."
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006b2d] text-xs leading-relaxed font-sans"
                      />
                    </div>

                    {/* Form Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveTab('list')}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      >
                        Annuler
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#006b2d] hover:bg-[#005021] text-white shadow-md transition cursor-pointer active:scale-95 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{editingPostId ? 'Mettre à jour l\'article' : 'Publier l\'article'}</span>
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>
          )}

        </div>

        {/* DELETE CONFIRMATION MODAL */}
        {postToDelete && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-slate-900 text-base">Supprimer cet article ?</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  "{postToDelete.title}"
                </p>
                <p className="text-[11px] text-rose-600 font-semibold mt-2">
                  Cette action est définitive et retirera l'article du site.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setPostToDelete(null)}
                  className="flex-1 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Oui, Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
