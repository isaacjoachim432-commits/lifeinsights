import React, { useState, useEffect } from 'react';
import { Insight, BookSummary, UserStats, Message } from './types';
import { insights, defaultCoaches, defaultWeeklyChallenges, initialBadges } from './data';
import Logo from './components/Logo';
import DailyInsightCard from './components/DailyInsightCard';
import BookSummaryView from './components/BookSummaryView';
import AICoachesChat from './components/AICoachesChat';
import { 
  Trophy, Sparkles, BookOpen, Compass, Calendar, 
  Flame, CheckCircle, GraduationCap, ArrowRight, Sun, Moon, 
  MapPin, Heart, Plus, Bookmark, Activity, Code, Star, HeartHandshake, History, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const cached = localStorage.getItem('theme');
    if (cached) return cached === 'dark';
    return true; // Default to elegant premium Dark Mode as preferred by custom logo
  });

  // App Main navigation tab
  const [activeTab, setActiveTab] = useState<'daily' | 'library' | 'coach' | 'dashboard' | 'journal'>('daily');
  
  // Custom user generated books
  const [customBooks, setCustomBooks] = useState<BookSummary[]>(() => {
    const cached = localStorage.getItem('custom_books');
    return cached ? JSON.parse(cached) : [];
  });

  // Active insight index
  const [currentInsightIndex, setCurrentInsightIndex] = useState<number>(0);

  // Journal logs containing written reflections
  const [journalEntries, setJournalEntries] = useState<{ id: string; date: string; insightTitle: string; answer: string; category: string }[]>(() => {
    const cached = localStorage.getItem('journal_entries');
    return cached ? JSON.parse(cached) : [
      {
        id: 'init-j',
        date: new Date(Date.now() - 3600000 * 24).toLocaleDateString(),
        insightTitle: 'The 1% Margin of Aggregation',
        answer: 'Today I packed my workout clothes inside my work bag the night before, making it 1% easier to leave straight for the gym. It worked perfectly and felt automatic.',
        category: 'sports'
      }
    ];
  });

  // User Stats state
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const cached = localStorage.getItem('user_stats');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback to initial representation
      }
    }
    return {
      streak: 3,
      lastActiveDate: new Date().toDateString(),
      growthScore: 180,
      completedInsights: ['psy-01'],
      savedInsights: [],
      savedBooks: ['book-01'],
      completedBooks: [],
      badges: initialBadges,
      weeklyChallenges: defaultWeeklyChallenges,
      categoryScores: {
        psychology: 45,
        academic: 10,
        relationships: 30,
        sports: 55,
        faith: 20,
        everyday: 20,
      }
    };
  });

  // Initialize theme Class List on root node
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Synchronize custom generated books
  useEffect(() => {
    localStorage.setItem('custom_books', JSON.stringify(customBooks));
  }, [customBooks]);

  // Synchronize statistics
  useEffect(() => {
    localStorage.setItem('user_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Synchronize journal logs
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Toggle saving of insights or books
  const handleSaveToggle = (id: string, type: 'savedInsights' | 'completedInsights' | 'savedBooks' | 'completedBooks') => {
    const isPresent = userStats[type].includes(id);
    let nextState = [...userStats[type]];

    if (isPresent) {
      nextState = nextState.filter(item => item !== id);
    } else {
      nextState.push(id);
    }

    // Allocate score bumps for new completions or saves
    let scoreDelta = 0;
    if (!isPresent) {
      if (type === 'completedInsights') scoreDelta = 20;
      if (type === 'savedInsights') scoreDelta = 10;
      if (type === 'completedBooks') scoreDelta = 50;
      if (type === 'savedBooks') scoreDelta = 15;
    }

    // Increment specific category score on completion
    let updatedCategoryScores = { ...userStats.categoryScores };
    if (!isPresent && type === 'completedInsights') {
      const activeInsight = insights.find(ins => ins.id === id);
      if (activeInsight) {
        const cat = activeInsight.category;
        updatedCategoryScores[cat] = Math.min(100, (updatedCategoryScores[cat] || 0) + 15);
      }
    }

    const updatedStats = {
      ...userStats,
      [type]: nextState,
      growthScore: userStats.growthScore + scoreDelta,
      categoryScores: updatedCategoryScores
    };

    setUserStats(updatedStats);
    checkAndUnlockBadges(updatedStats);
  };

  // Record an absolute reflection response
  const handleAddJournalEntry = (insightId: string, answer: string) => {
    const activeInsight = insights.find(ins => ins.id === insightId);
    if (!activeInsight) return;

    const newEntry = {
      id: `j-entry-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      insightTitle: activeInsight.title,
      answer,
      category: activeInsight.category
    };

    const updatedJournal = [newEntry, ...journalEntries];
    setJournalEntries(updatedJournal);

    // Bump score and mark completed automatically
    let completedList = [...userStats.completedInsights];
    if (!completedList.includes(insightId)) {
      completedList.push(insightId);
    }

    let categoryScores = { ...userStats.categoryScores };
    const cat = activeInsight.category;
    categoryScores[cat] = Math.min(100, (categoryScores[cat] || 0) + 20);

    const updatedStats = {
      ...userStats,
      completedInsights: completedList,
      growthScore: userStats.growthScore + 30, // 30 points for writing effort
      categoryScores
    };

    setUserStats(updatedStats);
    checkAndUnlockBadges(updatedStats);
  };

  // Direct manual reward adjustments callback (e.g. from AICoachesChat conversations)
  const handleAddPoints = (amount: number) => {
    const updatedStats = {
      ...userStats,
      growthScore: userStats.growthScore + amount
    };
    setUserStats(updatedStats);
    checkAndUnlockBadges(updatedStats);
  };

  // Add new Custom Book Summaries generated by LLM
  const handleAddNewBookSummary = (newBook: BookSummary) => {
    setCustomBooks(prev => [newBook, ...prev]);
    
    // Add points for library discovery
    const updatedStats = {
      ...userStats,
      growthScore: userStats.growthScore + 40,
    };
    setUserStats(updatedStats);
    checkAndUnlockBadges(updatedStats);
  };

  // Coach Badge metrics increments
  const handleCoachInteraction = (coachId: string) => {
    // Increment category intelligence on chat
    let updatedCategoryScores = { ...userStats.categoryScores };
    if (coachId === 'study') updatedCategoryScores.academic = Math.min(100, updatedCategoryScores.academic + 5);
    if (coachId === 'habit') updatedCategoryScores.everyday = Math.min(100, updatedCategoryScores.everyday + 5);
    if (coachId === 'relationship') updatedCategoryScores.relationships = Math.min(100, updatedCategoryScores.relationships + 5);
    if (coachId === 'goal') updatedCategoryScores.psychology = Math.min(100, updatedCategoryScores.psychology + 5);

    const updatedStats = {
      ...userStats,
      categoryScores: updatedCategoryScores
    };
    setUserStats(updatedStats);
    checkAndUnlockBadges(updatedStats);
  };

  // Interactive daily index cycling
  const handleNextInsight = () => {
    setCurrentInsightIndex((prevIndex) => (prevIndex + 1) % insights.length);
  };

  // Badge unlock mechanisms checking compliance constraints
  const checkAndUnlockBadges = (stats: UserStats) => {
    let changed = false;
    const nextBadges = stats.badges.map(b => {
      if (b.unlockedAt) return b; // Already unlocked

      let shouldUnlock = false;
      if (b.id === 'b-streak-3' && stats.streak >= 3) shouldUnlock = true;
      if (b.id === 'b-streak-7' && stats.streak >= 7) shouldUnlock = true;
      if (b.id === 'b-insights-5' && stats.completedInsights.length >= 5) shouldUnlock = true;
      if (b.id === 'b-books-2' && stats.completedBooks.length >= 2) shouldUnlock = true;
      if (b.id === 'b-reflex' && journalEntries.length >= 2) shouldUnlock = true;
      if (b.id === 'b-coach-3' && stats.growthScore > 250) shouldUnlock = true;

      if (shouldUnlock) {
        changed = true;
        return {
          ...b,
          unlockedAt: new Date().toLocaleDateString()
        };
      }
      return b;
    });

    if (changed) {
      setUserStats(prev => ({
        ...prev,
        badges: nextBadges,
        growthScore: prev.growthScore + 75 // Gold milestone bonus!
      }));
    }
  };

  const handleWeeklyChallengeComplete = (challengeId: string) => {
    const isCompleted = userStats.weeklyChallenges.find(c => c.id === challengeId)?.completed;
    if (isCompleted) return;

    const updatedChallenges = userStats.weeklyChallenges.map(c => {
      if (c.id === challengeId) {
        return { ...c, completed: true };
      }
      return c;
    });

    const reward = userStats.weeklyChallenges.find(c => c.id === challengeId)?.points || 100;

    setUserStats(prev => ({
      ...prev,
      weeklyChallenges: updatedChallenges,
      growthScore: prev.growthScore + reward
    }));
  };

  // Pick categories metadata for visual graphs
  const categoriesList = [
    { key: 'psychology', label: 'Psychology', icon: '🧠', color: 'from-indigo-500 to-indigo-700' },
    { key: 'academic', label: 'Academics', icon: '📚', color: 'from-amber-500 to-yellow-600' },
    { key: 'relationships', label: 'Relationships', icon: '❤️', color: 'from-rose-500 to-pink-600' },
    { key: 'sports', label: 'Sports', icon: '🏆', color: 'from-emerald-500 to-teal-600' },
    { key: 'faith', label: 'Faith & Encouragement', icon: '✝️', color: 'from-purple-500 to-purple-700' },
    { key: 'everyday', label: 'Everyday Wisdom', icon: '🌍', color: 'from-sky-500 to-blue-600' }
  ] as const;

  const currentActiveInsight = insights[currentInsightIndex];

  return (
    <div id="application-view-port" className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-zinc-950 dark:text-zinc-100 transition duration-300 font-sans">
      
      {/* ==========================================
          PREMIUM NAVIGATION HEADER WITH BRANDING LOGO
          ========================================== */}
      <nav id="top-nav-bar" className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/95 border-b border-gray-100 dark:border-zinc-850 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('daily')}>
            <Logo className="w-9 h-9 sm:w-11 sm:h-11 shadow-sm shrink-0" showText={false} />
            <div className="hidden sm:block">
              <span className="text-sm font-extrabold uppercase font-display tracking-[0.18em] text-amber-500 bg-gradient-to-r from-amber-400 to-gold-600 bg-clip-text text-transparent">
                LifeInsights
              </span>
              <p className="text-[8px] uppercase tracking-[0.16em] text-gray-400 dark:text-zinc-500 font-semibold leading-none">
                Grow Every Day. Learn for Life.
              </p>
            </div>
          </div>

          {/* Core high status user scores trackers */}
          <div className="flex items-center gap-3 sm:gap-4 select-none">
            {/* Streak metrics widget */}
            <div className="bg-amber-50/75 dark:bg-amber-950/20 px-3.5 py-1.5 rounded-2xl border border-amber-100/50 dark:border-amber-900/10 flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse fill-amber-500" />
              <span>{userStats.streak} DAY STREAK</span>
            </div>

            {/* Total growth points status */}
            <div className="bg-gradient-to-r from-zinc-900 to-black dark:from-zinc-100 dark:to-white text-white dark:text-zinc-950 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-extrabold tracking-wide uppercase shadow-md hover:scale-105 transition">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{userStats.growthScore} PTS</span>
            </div>

            {/* Theme switcher */}
            <button
              id="theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-gray-150 dark:border-zinc-800 hover:bg-gray-150 dark:hover:bg-zinc-850 cursor-pointer transition text-gray-500 dark:text-zinc-400"
              title="Toggle theme (Light / Dark)"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5 text-indigo-950" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ==========================================
          MAIN LAYOUT CONTAINER WITH BALANCED SPACING
          ========================================== */}
      <main id="primary-content-viewport" className="pb-32 pt-6 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* ==========================================
                1. DAILY INSIGHT VIEW TAB
                ========================================== */}
            {activeTab === 'daily' && (
              <motion.div
                key="tab-daily"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#6366f1]">DAILY EXPERIENCE</span>
                  <h1 className="text-xl sm:text-3xl font-extrabold font-display leading-tight dark:text-white">
                    Today's Seed of Wisdom
                  </h1>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-zinc-400">
                     A curated psychological and moral compass point for your immediate day. Complete actions to unlock achievements.
                  </p>
                </div>

                <DailyInsightCard
                  insight={currentActiveInsight}
                  userStats={userStats}
                  onSaveToggle={handleSaveToggle}
                  onAddJournalEntry={handleAddJournalEntry}
                  onNextInsight={handleNextInsight}
                  isSaved={userStats.savedInsights.includes(currentActiveInsight.id)}
                  isCompleted={userStats.completedInsights.includes(currentActiveInsight.id)}
                  hasJournaled={journalEntries.some(j => j.insightTitle === currentActiveInsight.title)}
                />
              </motion.div>
            )}

            {/* ==========================================
                2. BOOK SUMMARIES VIEWER
                ========================================== */}
            {activeTab === 'library' && (
              <motion.div
                key="tab-library"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <BookSummaryView
                  userStats={userStats}
                  onSaveToggle={handleSaveToggle}
                  onAddNewBookSummary={handleAddNewBookSummary}
                  customBooks={customBooks}
                />
              </motion.div>
            )}

            {/* ==========================================
                3. AI COACHES COMMUNICATOR
                ========================================== */}
            {activeTab === 'coach' && (
              <motion.div
                key="tab-coach"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <AICoachesChat
                  onCoachInteraction={handleCoachInteraction}
                  growthPoints={userStats.growthScore}
                  onAddPoints={handleAddPoints}
                />
              </motion.div>
            )}

            {/* ==========================================
                4. GAMIFIED DASHBOARD / METRICS TAB
                ========================================== */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="tab-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Hero profile summary card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-zinc-900 to-zinc-950 dark:dark-gold-card text-white border border-zinc-800 shadow-xl flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs uppercase bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-bold tracking-widest font-display inline-block">
                       GROWTH ENGINE ACTIVE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                      Mind & Character Dashboard
                    </h2>
                    <p className="text-xs text-zinc-400 max-w-lg leading-relaxed font-sans">
                      Your current Growth Score consolidates mental endurance, study efficiency, relationship appreciation, spiritual character, and financial awareness. Keep reviewing daily!
                    </p>
                  </div>

                  <div className="flex gap-4 select-none">
                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center min-w-[100px]">
                      <span className="text-xs text-zinc-500 block">Completes</span>
                      <span className="text-xl font-bold font-display text-emerald-400">{userStats.completedInsights.length}</span>
                    </div>

                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center min-w-[100px]">
                      <span className="text-xs text-zinc-500 block">Saves</span>
                      <span className="text-xl font-bold font-display text-indigo-400">{userStats.savedInsights.length}</span>
                    </div>

                    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center min-w-[100px]">
                      <span className="text-xs text-zinc-500 block">Weekly Streak</span>
                      <span className="text-xl font-bold font-display text-amber-400">{userStats.streak}d</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Category Progress Radar Representation */}
                  <div className="col-span-1 md:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-850 shadow-xs space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#6366f1] mb-2 font-display">
                      Intelligences Balanced Breakdown
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoriesList.map((category) => {
                        const score = userStats.categoryScores[category.key as keyof typeof userStats.categoryScores] || 0;
                        return (
                          <div key={category.key} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-2">
                                <span className="text-base select-none">{category.icon}</span>
                                {category.label}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#6366f1]">{score}% Mastery</span>
                            </div>
                            
                            {/* SVG progress line */}
                            <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${score}%` }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Weekly Challenges Column */}
                  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-850 shadow-xs space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 font-display">
                      Weekly Missions
                    </h3>
                    <div className="space-y-3">
                      {userStats.weeklyChallenges.map((challenge) => (
                        <div
                          key={challenge.id}
                          className={`p-4 rounded-2xl border flex flex-col gap-2 transition cursor-pointer select-none ${
                            challenge.completed 
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-400' 
                              : 'bg-zinc-50 dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 hover:border-emerald-200'
                          }`}
                          onClick={() => handleWeeklyChallengeComplete(challenge.id)}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold tracking-tight">{challenge.title}</h4>
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded leading-none bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 shrink-0 font-bold">
                              +{challenge.points} XP
                            </span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-gray-500 dark:text-zinc-400 font-sans font-light">
                            {challenge.description}
                          </p>
                          <div className="flex justify-end pt-1">
                            <span className={`text-[9px] uppercase font-bold tracking-wider rounded-md border px-2 py-0.5 ${
                              challenge.completed 
                                ? 'bg-emerald-500 border-emerald-500 text-white' 
                                : 'border-gray-300 dark:border-zinc-700 text-gray-400 dark:text-zinc-500'
                            }`}>
                              {challenge.completed ? 'CLAIMED' : 'UNCLAIMED'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Achievements Showcase Section */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-850 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500 font-display flex items-center gap-2">
                      <Trophy className="w-4.5 h-4.5" />
                      Milestone Achievements
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userStats.badges.map((badge) => {
                      const isUnlocked = !!badge.unlockedAt;
                      return (
                        <div
                          key={badge.id}
                          className={`p-4 rounded-2xl border transition flex gap-3.5 items-center ${
                            isUnlocked
                              ? 'bg-amber-50/50 dark:bg-amber-950/15 border-amber-200 dark:border-amber-900'
                              : 'bg-gray-50/50 dark:bg-zinc-950/20 border-gray-200 dark:border-zinc-850 opacity-55'
                          }`}
                        >
                          <span className={`text-2xl p-2 rounded-xl shrink-0 select-none bg-white dark:bg-zinc-905 shadow-sm`}>
                            {badge.icon}
                          </span>
                          <div className="space-y-0.5">
                            <h4 className={`text-xs font-bold font-display ${isUnlocked ? 'text-amber-800 dark:text-amber-300' : 'text-gray-400'}`}>
                              {badge.title}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400 leading-normal font-sans pt-0.5">
                              {badge.description}
                            </p>
                            {isUnlocked && (
                              <span className="text-[9px] text-amber-600 uppercase font-mono tracking-widest font-extrabold block pt-1">
                                Unlocked: {badge.unlockedAt}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            )}

            {/* ==========================================
                5. PERSONAL GROWTH REFLECTION JOURNAL SCREEN
                ========================================== */}
            {activeTab === 'journal' && (
              <motion.div
                key="tab-journal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white leading-tight">My Reflection Journal</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                    A secure private log of your personal reflections, insights, and structural written self-audits.
                  </p>
                </div>

                <div className="space-y-4">
                  {journalEntries.length > 0 ? (
                    journalEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-850 shadow-xs flex flex-col gap-3 font-sans"
                      >
                        <div className="flex justify-between items-start gap-1">
                          <div>
                            <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded leading-none bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 font-bold">
                              {entry.category.toUpperCase()} REFLECTION
                            </span>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-1.5 font-display">
                              {entry.insightTitle}
                            </h3>
                          </div>
                          <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono font-medium whitespace-nowrap">
                            {entry.date}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-700 dark:text-zinc-300 border-l-2 border-rose-300 dark:border-rose-900 pl-4 py-1.5 leading-relaxed font-serif italic text-sidebar-hover font-light">
                          "{entry.answer}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-gray-400">
                      <HelpCircle className="w-10 h-10 mx-auto opacity-30 mb-3" />
                      <p className="text-sm">Your reflective logs are empty. Read daily insights and commit thoughts to write entries.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ==========================================
          IMMERSIVE MOBILE-FIRST FLOATING NAVIGATION TAB RAIL
          ========================================== */}
      <div id="sticky-tabs-rail" className="fixed bottom-0 left-0 right-0 py-4 px-3 bg-linear-to-t from-white via-white/95 to-white/70 dark:from-zinc-950 dark:via-zinc-950/95 dark:to-zinc-950/70 backdrop-blur-md border-t border-gray-100 dark:border-zinc-850 z-30">
        <div className="max-w-xl mx-auto bg-white/50 dark:bg-zinc-900/40 p-1.5 rounded-full border border-gray-150/50 dark:border-zinc-800/50 shadow-lg flex items-center justify-around overflow-hidden">
          
          <button
            id="tab-btn-daily"
            onClick={() => setActiveTab('daily')}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition ${
              activeTab === 'daily' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-105 px-4 font-bold' 
                : 'text-gray-400 hover:text-gray-950 dark:hover:text-white px-2'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Daily Wisdom</span>
          </button>

          <button
            id="tab-btn-library"
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition ${
              activeTab === 'library' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-105 px-4 font-bold' 
                : 'text-gray-400 hover:text-gray-950 dark:hover:text-white px-2'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Book Library</span>
          </button>

          <button
            id="tab-btn-coach"
            onClick={() => setActiveTab('coach')}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition ${
              activeTab === 'coach' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-105 px-4 font-bold' 
                : 'text-gray-400 hover:text-gray-950 dark:hover:text-white px-2'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Growth Coach</span>
          </button>

          <button
            id="tab-btn-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition ${
              activeTab === 'dashboard' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-105 px-4 font-bold' 
                : 'text-gray-400 hover:text-gray-950 dark:hover:text-white px-2'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Progress Dashboard</span>
          </button>

          <button
            id="tab-btn-journal"
            onClick={() => setActiveTab('journal')}
            className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition ${
              activeTab === 'journal' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 scale-105 px-4 font-bold' 
                : 'text-gray-400 hover:text-gray-950 dark:hover:text-white px-2'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Journal</span>
          </button>

        </div>
      </div>

    </div>
  );
}
