import React, { useState } from 'react';
import { Insight, UserStats } from '../types';
import { Brain, BookOpen, Heart, Trophy, Cross, Globe, Share2, Bookmark, Sparkles, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyInsightCardProps {
  insight: Insight;
  userStats: UserStats;
  onSaveToggle: (id: string, type: 'savedInsights' | 'completedInsights') => void;
  onAddJournalEntry: (insightId: string, answer: string) => void;
  onNextInsight: () => void;
  isSaved: boolean;
  isCompleted: boolean;
  hasJournaled: boolean;
}

export default function DailyInsightCard({
  insight,
  userStats,
  onSaveToggle,
  onAddJournalEntry,
  onNextInsight,
  isSaved,
  isCompleted,
  hasJournaled,
}: DailyInsightCardProps) {
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [showAIExpansion, setShowAIExpansion] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState('');
  const [message, setMessage] = useState('');

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'psychology':
        return {
          icon: <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
          bg: 'bg-indigo-50 dark:bg-indigo-950/30',
          border: 'border-indigo-100 dark:border-indigo-900/30',
          text: 'text-indigo-800 dark:text-indigo-300',
          accent: 'indigo'
        };
      case 'academic':
        return {
          icon: <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-100 dark:border-amber-900/30',
          text: 'text-amber-800 dark:text-amber-300',
          accent: 'amber'
        };
      case 'relationships':
        return {
          icon: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-100 dark:border-rose-900/30',
          text: 'text-rose-800 dark:text-rose-300',
          accent: 'rose'
        };
      case 'sports':
        return {
          icon: <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
          bg: 'bg-emerald-50 dark:bg-emerald-950/30',
          border: 'border-emerald-100 dark:border-emerald-900/30',
          text: 'text-emerald-800 dark:text-emerald-300',
          accent: 'emerald'
        };
      case 'faith':
        return {
          icon: <Cross className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
          bg: 'bg-purple-50 dark:bg-purple-950/30',
          border: 'border-purple-100 dark:border-purple-900/30',
          text: 'text-purple-800 dark:text-purple-300',
          accent: 'purple'
        };
      default:
        return {
          icon: <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
          bg: 'bg-sky-50 dark:bg-sky-950/30',
          border: 'border-sky-100 dark:border-sky-900/30',
          text: 'text-sky-800 dark:text-sky-300',
          accent: 'sky'
        };
    }
  };

  const theme = getCategoryTheme(insight.category);

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return;
    onAddJournalEntry(insight.id, reflectionAnswer);
    setReflectionAnswer('');
    triggerTemporaryToast('Reflection response logged! +30 Growth Points');
  };

  const handleShare = () => {
    const textToCopy = `"${insight.title}" - ${insight.simpleExplanation} \nAction Step: ${insight.actionStep}\n\nShared from LifeInsights: Grow Every Day. Learn for Life.`;
    navigator.clipboard.writeText(textToCopy);
    triggerTemporaryToast('Insight copied to clipboard!');
  };

  const triggerTemporaryToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAskAI = async () => {
    if (showAIExpansion && aiText) {
      setShowAIExpansion(false);
      return;
    }
    setShowAIExpansion(true);
    if (aiText) return; // cache responses to prevent unnecessary API calling

    setAiLoading(true);
    try {
      const response = await fetch('/api/ai/expand-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          insight,
          userQuestion: 'How can I integrate this lesson specifically when setting systems for extreme cognitive load?'
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setAiText(data.text || 'Could not elaborate at this time.');
      } else {
        setAiText(`Coach Ethan is currently busy refining other strategies: ${data.error || 'Server error'}`);
      }
    } catch (e) {
      setAiText('Failed to reach backend life coach server. Check your internet connection.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div id="insight-container" className="flex flex-col gap-5 max-w-2xl mx-auto px-1 sm:px-4">
      {/* Toast popup */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main card */}
      <motion.div
        key={insight.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8 flex flex-col h-full">
          {/* Category layout */}
          <div className="flex justify-between items-center mb-6">
            <span id="category-badge" className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${theme.bg} ${theme.text} leading-none`}>
              {theme.icon}
              {theme.accent.toUpperCase()}
            </span>
            <div className="flex gap-2">
              <button
                id="btn-save-insight"
                onClick={() => {
                  onSaveToggle(insight.id, 'savedInsights');
                  triggerTemporaryToast(isSaved ? 'Removed from saved collection' : 'Added to saved collection! +10 Points');
                }}
                className={`p-2.5 rounded-full transition-all border ${
                  isSaved
                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 border-amber-200 dark:border-amber-900/30'
                    : 'bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-150 border-gray-150 dark:border-zinc-700'
                }`}
                title="Save Insight"
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button
                id="btn-share-insight"
                onClick={handleShare}
                className="p-2.5 rounded-full bg-gray-50 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-150 dark:border-zinc-700 transition"
                title="Copy Share Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inspirational quotes display */}
          {insight.quote && (
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/50 border-l-4 border-slate-300 dark:border-zinc-700 italic">
              <p className="text-sm text-gray-600 dark:text-zinc-400 font-serif leading-relaxed">
                "{insight.quote}"
              </p>
              <span className="block text-right text-xs font-semibold tracking-wider text-gray-400 dark:text-zinc-500 mt-2">
                — {insight.author || 'Unknown'}
              </span>
            </div>
          )}

          {/* Core insights statement */}
          <h2 id="insight-title" className="text-xl sm:text-2xl font-bold font-display text-gray-900 dark:text-white leading-tight mb-4 tracking-tight">
            {insight.title}
          </h2>

          <div id="insight-body" className="space-y-6 flex-grow">
            {/* Explanation section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-2">The Explanation</h3>
              <p className="text-sm font-sans text-gray-600 dark:text-zinc-300 leading-relaxed">
                {insight.simpleExplanation}
              </p>
            </div>

            {/* Practical example */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-150 dark:border-zinc-820">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-2">Real-Life Example</h3>
              <p className="text-sm font-sans text-gray-700 dark:text-zinc-300 leading-relaxed italic">
                {insight.realLifeExample}
              </p>
            </div>

            {/* Dynamic Interactive checklists */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-2">Action Step</h3>
              <div 
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                  isCompleted 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-emerald-300 text-gray-700 dark:text-zinc-300'
                }`}
                onClick={() => {
                  onSaveToggle(insight.id, 'completedInsights');
                  triggerTemporaryToast(isCompleted ? 'Reset action state' : 'Action step checked off! +20 Points!');
                }}
              >
                <div id="action-checkbox" className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-0.5 transition ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-transparent'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-relaxed">
                    {insight.actionStep}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                    {isCompleted ? "Completed! Click to uncheck." : "Click to mark this step completed to gain score."}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Coaching Expansion Module */}
            <div className="border-t border-gray-100 dark:border-zinc-800 pt-5">
              <button
                id="btn-ai-expansion"
                onClick={handleAskAI}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30 dark:hover:from-indigo-950/40 dark:hover:to-purple-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100/50 dark:border-indigo-900/30 transition-all font-medium text-sm shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                  <span>Coach Ethan's AI Deep-Dive</span>
                </span>
                <span className="text-xs bg-indigo-200/50 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                  {showAIExpansion ? "Hide" : "Expand"}
                </span>
              </button>

              <AnimatePresence>
                {showAIExpansion && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <div id="ai-response-tray" className="p-4 rounded-2xl bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-500/10 text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed font-sans space-y-3">
                      {aiLoading ? (
                        <div className="flex items-center justify-center py-4 gap-2">
                          <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
                          <span className="text-indigo-500 font-medium">Consulting psychology models...</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap divide-y divide-indigo-100/35 dark:divide-zinc-800 pt-1 space-y-3">
                          {aiText}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Reflection Input Section */}
            <div className="border-t border-gray-150 dark:border-zinc-800 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-500">Self-Reflection Question</h3>
              </div>
              
              <p className="text-sm font-medium text-gray-800 dark:text-white leading-relaxed mb-4 font-serif italic bg-rose-50/50 dark:bg-rose-950/10 p-3 rounded-xl border border-rose-100/20 dark:border-rose-900/20">
                "{insight.reflectionQuestion}"
              </p>

              {hasJournaled ? (
                <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/40 flex items-center gap-3 text-emerald-800 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-semibold">Reflection response submitted! Journal entries locked.</span>
                </div>
              ) : (
                <form id="reflection-form" onSubmit={handleJournalSubmit} className="space-y-3">
                  <textarea
                    rows={3}
                    value={reflectionAnswer}
                    onChange={(e) => setReflectionAnswer(e.target.value)}
                    placeholder="Enter your honest written thoughts here to solidify this wisdom..."
                    className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-850 hover:border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-200 bg-gray-50 dark:bg-zinc-950 text-sm placeholder-gray-400 dark:placeholder-zinc-650 text-gray-800 dark:text-zinc-100 outline-none transition"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                      +30 Growth Points on completion
                    </span>
                    <button
                      id="btn-submit-reflection"
                      type="submit"
                      disabled={!reflectionAnswer.trim()}
                      className="flex items-center gap-1 px-4 py-2 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-white rounded-xl transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Commit to Journal
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </motion.div>

      {/* Button to flip to next Daily Lesson */}
      <button
        id="btn-next-insight"
        onClick={onNextInsight}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 hover:border-gray-500 dark:hover:border-zinc-300 text-sm font-bold text-gray-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 mt-2 cursor-pointer shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
      >
        <RefreshCw className="w-4 h-4" />
        Explore Next Daily Insight
      </button>
    </div>
  );
}
