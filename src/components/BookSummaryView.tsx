import React, { useState } from 'react';
import { BookSummary, UserStats } from '../types';
import { bookSummaries } from '../data';
import { Search, Compass, BookOpen, Quote, CheckSquare, Star, ArrowLeft, RefreshCw, Bookmark, Sparkles, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookSummaryViewProps {
  userStats: UserStats;
  onSaveToggle: (id: string, type: 'savedBooks' | 'completedBooks') => void;
  onAddNewBookSummary: (newBook: BookSummary) => void;
  customBooks: BookSummary[];
}

export default function BookSummaryView({
  userStats,
  onSaveToggle,
  onAddNewBookSummary,
  customBooks,
}: BookSummaryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'lessons' | 'takeaways' | 'quotes'>('summary');
  
  // Custom book generation states
  const [customTitle, setCustomTitle] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Combine default books with any custom generated ones
  const allBooks = [...bookSummaries, ...customBooks];

  // Filter books matching search
  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    setIsGenerating(true);
    setGenerationError('');
    try {
      const response = await fetch('/api/ai/generate-book-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookTitle: customTitle,
          bookAuthor: customAuthor,
        }),
      });

      const data = await response.json();
      if (response.ok && data.title) {
        // Generate a random pleasant background color class for the book spine
        const colorClasses = ['bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600', 'bg-blue-600', 'bg-purple-600', 'bg-teal-600', 'bg-slate-800'];
        const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        
        const newSummary: BookSummary = {
          ...data,
          id: `custom-book-${Date.now()}`,
          coverColor: randomColor,
        };

        onAddNewBookSummary(newSummary);
        setSelectedBook(newSummary);
        setCustomTitle('');
        setCustomAuthor('');
      } else {
        setGenerationError(data.error || 'The librarian models were unable to parse this title. Please try another popular non-fiction book.');
      }
    } catch (err) {
      setGenerationError('Failed to communicate with translation server. Please check environment configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isSaved = selectedBook ? userStats.savedBooks.includes(selectedBook.id) : false;
  const isCompleted = selectedBook ? userStats.completedBooks.includes(selectedBook.id) : false;

  return (
    <div id="library-container" className="max-w-4xl mx-auto px-1 sm:px-4">
      <AnimatePresence mode="wait">
        {!selectedBook ? (
          // ==============================
          // LIBRARY DIRECTORY VIEW
          // ==============================
          <motion.div
            key="directory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Library greeting title */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white leading-tight">Digital Hub Library</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                Explore actionable breakdowns, essential lessons, and key quotes from worldwide non-fiction bestsellers.
              </p>
            </div>

            {/* Search and filter layout */}
            <div className="flex gap-2">
              <div id="search-input-group" className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-650 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search popular books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl text-sm placeholder-gray-400 dark:placeholder-zinc-600 text-gray-800 dark:text-zinc-100 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* AI Custom Book Request section */}
            <div className="p-5 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-3xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-indigo-300 font-display">AI Summon Book Summary</h3>
              </div>
              <p className="text-xs text-sidebar-hover text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">
                Can't find your favorite growth book? Submit the title below, and our advanced LLM engine will fetch its core summary, real takeaways, and lessons immediately!
              </p>
              
              <form onSubmit={handleGenerateBook} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Book Title (e.g. Good to Great)"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="px-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 outline-none focus:border-indigo-400"
                    disabled={isGenerating}
                  />
                  <input
                    type="text"
                    placeholder="Author (Optional)"
                    value={customAuthor}
                    onChange={(e) => setCustomAuthor(e.target.value)}
                    className="px-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 outline-none focus:border-indigo-400"
                    disabled={isGenerating}
                  />
                </div>
                {generationError && (
                  <p className="text-xs text-rose-500 font-medium">{generationError}</p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isGenerating || !customTitle.trim()}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Generating full lessons...
                      </>
                    ) : (
                      <>
                        <Compass className="w-3.5 h-3.5" />
                        Generate AI Summary
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* List grid */}
            <div id="books-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                  const bookRead = userStats.completedBooks.includes(book.id);
                  const bookSelected = userStats.savedBooks.includes(book.id);
                  return (
                    <motion.div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      layoutId={`book-card-${book.id}`}
                      className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-zinc-700 p-5 flex items-start gap-4 cursor-pointer transition shadow-sm hover:shadow-md"
                    >
                      {/* Interactive spine color cover representation */}
                      <div className={`w-14 h-20 sm:w-16 sm:h-24 ${book.coverColor} rounded-md shadow-lg flex flex-col justify-between p-2 shrink-0 text-white select-none`}>
                        <div className="w-1.5 h-full bg-black/10 absolute left-0 top-0 rounded-l-md" />
                        <span className="text-[7px] uppercase font-bold tracking-widest opacity-60 truncate">Life insights</span>
                        <h4 className="text-[10px] font-bold tracking-tight line-clamp-2 leading-none">{book.title}</h4>
                        <span className="text-[8px] font-medium opacity-80 border-t border-white/20 pt-1 truncate">{book.author}</span>
                      </div>

                      {/* Info display text details */}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1] select-none block truncate">
                            {book.category}
                          </span>
                          <div className="flex gap-1">
                            {bookRead && (
                              <span className="text-[10px] leading-none bg-emerald-100 dark:bg-emerald-950 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold uppercase">READ</span>
                            )}
                            {bookSelected && (
                              <span className="text-[10px] leading-none bg-amber-100 dark:bg-amber-950 text-amber-700 px-1.5 py-0.5 rounded font-extrabold uppercase">SAVED</span>
                            )}
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate font-display mb-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-2 font-sans font-light">
                          {book.oneSentence}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                          <span>Begin Reading</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-gray-400">
                  <Compass className="w-10 h-10 mx-auto opacity-30 mb-3" />
                  <p className="text-sm">No book summaries found matching your query.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // ==============================
          // BOOK STUDY IN-DEPTH READING MODE
          // ==============================
          <motion.div
            key="reader"
            layoutId={`book-card-${selectedBook.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Back button header navigation bar representing pure premium layout */}
            <div className="flex justify-between items-center bg-gray-50/50 dark:bg-zinc-950/20 p-2.5 rounded-2xl border border-gray-150/50 dark:border-zinc-800/50">
              <button
                id="btn-back-to-library"
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-1.5 font-bold text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Library
              </button>
              
              <div className="flex gap-2">
                <button
                  id="btn-bookmark-book"
                  onClick={() => onSaveToggle(selectedBook.id, 'savedBooks')}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                    isSaved
                      ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-500'
                      : 'bg-white dark:bg-zinc-900 border-gray-250 dark:border-zinc-800 text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                  <span>{isSaved ? "Saved" : "Save Summary"}</span>
                </button>

                <button
                  id="btn-complete-book"
                  onClick={() => onSaveToggle(selectedBook.id, 'completedBooks')}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                    isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400'
                      : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 font-bold hover:opacity-90'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isCompleted ? "Finished" : "Mark Finished (+50pts)"}</span>
                </button>
              </div>
            </div>

            {/* Book Spine banner block panel style */}
            <div className={`p-6 sm:p-8 rounded-3xl ${selectedBook.coverColor} text-white shadow-xl relative overflow-hidden`}>
              {/* Soft visual overlays */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-linear-to-l from-black/25 to-transparent pointer-events-none" />
              <div className="w-2.5 h-full bg-black/10 absolute left-0 top-0" />

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center relative z-10">
                <div className="w-20 h-30 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shrink-0 rounded-lg p-3 flex flex-col justify-between hidden sm:flex">
                  <span className="text-[7px] uppercase tracking-widest opacity-60 font-bold">Digest</span>
                  <h4 className="text-xs font-bold leading-tight">{selectedBook.title}</h4>
                  <span className="text-[8px] opacity-70 border-t border-white/10 pt-1 truncate">{selectedBook.author}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-widest text-white tracking-widest leading-none">
                    {selectedBook.category}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-extrabold font-display leading-tight">{selectedBook.title}</h2>
                  <p className="text-xs sm:text-sm font-semibold opacity-90 font-sans">
                    By {selectedBook.author}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-serif italic py-1 border-t border-white/10 mt-3 max-w-xl">
                    "{selectedBook.oneSentence}"
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Readers Tabs */}
            <div className="flex border-b border-gray-150 dark:border-zinc-800 scrollbar-none overflow-x-auto">
              {(['summary', 'lessons', 'takeaways', 'quotes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs uppercase font-bold tracking-wider border-b-2 transition shrink-0 cursor-pointer ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Read Module contents rendered dynamically */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-850 shadow-sm leading-relaxed">
              <AnimatePresence mode="wait">
                {activeTab === 'summary' && (
                  <motion.div
                    key="summary-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6366f1] mb-2 font-display">
                        <BookOpen className="w-4.5 h-4.5" />
                        Summarized Core Thesis
                      </h3>
                      <p className="text-sm sm:text-base font-sans text-gray-700 dark:text-zinc-300 leading-relaxed font-light">
                        {selectedBook.summary}
                      </p>
                    </div>

                    <div className="bg-indigo-50/40 dark:bg-indigo-950/10 p-5 rounded-2xl border border-indigo-500/15">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400 mb-2">Editor's Growth Recommendation</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                        {selectedBook.recommendation}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'lessons' && (
                  <motion.div
                    key="lessons-pane"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#6366f1] mb-3">Key Strategic Lessons</h3>
                    <div className="space-y-4">
                      {selectedBook.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-950 border border-gray-100 dark:border-zinc-800 transition">
                          <span className="w-7 h-7 bg-indigo-50 dark:bg-indigo-950 mt-1 rounded-full text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 font-display">{lesson.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">{lesson.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'takeaways' && (
                  <motion.div
                    key="takeaways-pane"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <CheckSquare className="w-4.5 h-4.5 text-emerald-500" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#6366f1]">Actionable Growth Blueprints</h3>
                    </div>
                    
                    <p className="text-xs text-gray-400 dark:text-zinc-500 mb-2">
                       Take action immediately. Check these takeaways off as you apply them in real-world scenarios:
                    </p>

                    <div className="space-y-3">
                      {selectedBook.takeaways.map((takeaway, idx) => {
                        const takeawayKey = `takeaway-${selectedBook.id}-${idx}`;
                        const isChecked = localStorage.getItem(takeawayKey) === 'true';
                        return (
                          <div 
                            key={idx} 
                            onClick={() => {
                              const nextState = !isChecked;
                              localStorage.setItem(takeawayKey, String(nextState));
                              // Simple update visual force
                              setActiveTab('lessons');
                              setTimeout(() => setActiveTab('takeaways'), 5);
                            }}
                            className={`flex gap-3 p-4 rounded-xl border transition cursor-pointer ${
                              isChecked 
                                ? 'bg-emerald-5 w-full dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300' 
                                : 'bg-gray-50/50 dark:bg-zinc-950 border-gray-150 dark:border-zinc-800 hover:border-indigo-300 text-gray-700 dark:text-zinc-300'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center ${
                              isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-zinc-700'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span className="text-xs sm:text-sm font-medium leading-normal">{takeaway}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'quotes' && (
                  <motion.div
                    key="quotes-pane"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#6366f1] mb-2">Elite Quotations</h3>
                    <div className="space-y-4">
                      {selectedBook.favoriteQuotes.map((quote, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-l-4 border-indigo-500 flex gap-3 relative">
                          <Quote className="w-8 h-8 text-indigo-500/10 absolute right-4 top-4" />
                          <p className="text-sm sm:text-base font-serif italic text-gray-700 dark:text-zinc-350 leading-relaxed font-light">
                            "{quote}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
