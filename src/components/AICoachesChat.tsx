import React, { useState, useEffect, useRef } from 'react';
import { Coach, Message } from '../types';
import { defaultCoaches } from '../data';
import { Send, Sparkles, MessageSquare, ArrowLeft, RefreshCw, BookmarkCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AICoachesChatProps {
  onCoachInteraction: (coachId: string) => void;
  growthPoints: number;
  onAddPoints: (points: number) => void;
}

export default function AICoachesChat({
  onCoachInteraction,
  growthPoints,
  onAddPoints
}: AICoachesChatProps) {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [messagesByCoach, setMessagesByCoach] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested quick-start questions based on coach type
  const getSuggestions = (coachId: string) => {
    switch (coachId) {
      case 'general':
        return [
          "How do I develop deep self-discipline?",
          "How can I manage acute stress before a presentation?",
          "What exercises build sustainable emotional intelligence?"
        ];
      case 'goal':
        return [
          "I want to write a newsletter. Help me launch a 30-day roadmap.",
          "How should I structure objectives for career switching?",
          "Help me streamline my chaotic daily task board."
        ];
      case 'study':
        return [
          "Help me build a spaced repetition plan for a dense coding test.",
          "I keep burning out after 1 hour of studying. What should I change?",
          "Explain active recall methods for non-technical subjects."
        ];
      case 'relationship':
        return [
          "How can I express frustration with my roommate without causing conflict?",
          "What script should I use to negotiate boundaries with a close family member?",
          "How do I rebuild broken trust with a colleague?"
        ];
      case 'habit':
        return [
          "Help me build a morning core-fitness habit stack loop.",
          "How do I break the bad routine of checking social media right as I wake up?",
          "What visible cues can I create to prompt 30 minutes of deep study?"
        ];
      default:
        return ["How can I grow today?"];
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesByCoach, isTyping]);

  const handleSelectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    onCoachInteraction(coach.id); // Add a point or trigger badge progress

    // Initialize with greeting if empty
    if (!messagesByCoach[coach.id]) {
      setMessagesByCoach(prev => ({
        ...prev,
        [coach.id]: [
          {
            id: 'greeting',
            sender: 'ai',
            text: coach.greeting,
            timestamp: new Date()
          }
        ]
      }));
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !selectedCoach) return;

    const currentHistory = messagesByCoach[selectedCoach.id] || [];
    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    // Update locally immediately
    const updatedHistory = [...currentHistory, newUserMessage];
    setMessagesByCoach(prev => ({
      ...prev,
      [selectedCoach.id]: updatedHistory
    }));
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachPrompt: selectedCoach.prompt,
          message: text,
          history: updatedHistory.slice(-10) // Only send recent history for context
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setIsTyping(false);
        const newAIMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: data.text,
          timestamp: new Date()
        };

        setMessagesByCoach(prev => ({
          ...prev,
          [selectedCoach.id]: [...updatedHistory, newAIMessage]
        }));

        // Gifting feedback growth points
        onAddPoints(15);
      } else {
        throw new Error(data.error);
      }
    } catch (e: any) {
      setIsTyping(false);
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        sender: 'ai',
        text: `The coach connection was briefly interrupted: ${e.message || 'Server timeout'}. Please retry or check developer settings.`,
        timestamp: new Date()
      };
      setMessagesByCoach(prev => ({
        ...prev,
        [selectedCoach.id]: [...updatedHistory, errorMsg]
      }));
    }
  };

  const chatMessages = selectedCoach ? (messagesByCoach[selectedCoach.id] || []) : [];

  return (
    <div id="chat-center" className="max-w-4xl mx-auto px-1 sm:px-4 h-[calc(100vh-12rem)] flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedCoach ? (
          // ==============================
          // COACH SELECTION PANEL
          // ==============================
          <motion.div
            key="coach-select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 flex-grow overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white leading-tight">AI Growth Coaches</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                Converse directly with expert psychological advisors, habit architects, and strategic mentors to shape your daily choices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
              {defaultCoaches.map((coach) => (
                <div
                  key={coach.id}
                  onClick={() => handleSelectCoach(coach)}
                  className={`p-5 rounded-3xl border ${coach.bgColor} ${coach.borderColor} transition-all cursor-pointer flex gap-4 shadow-sm relative overflow-hidden group hover:scale-[1.015]`}
                >
                  <span className="text-3xl sm:text-4xl select-none shrink-0 p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-xs self-start group-hover:rotate-6 transition">
                    {coach.avatar}
                  </span>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1] select-none">
                      {coach.role}
                    </span>
                    <h3 className="text-base font-bold text-gray-950 dark:text-white font-display">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                      {coach.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-zinc-300 line-clamp-2 leading-relaxed font-light font-sans pt-1">
                      {coach.greeting}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-2">
                      <span>Begin Discussion</span>
                      <Send className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // ==============================
          // CHAT INTERFACE WITH SELECTED COACH
          // ==============================
          <motion.div
            key="chat-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Header section representing coaching profile */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-950 border-b border-gray-150 dark:border-zinc-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  id="btn-back-to-coaches"
                  onClick={() => setSelectedCoach(null)}
                  className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer text-gray-500 dark:text-zinc-400 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-2xl select-none">{selectedCoach.avatar}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-10 transition">
                    {selectedCoach.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    {selectedCoach.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span id="score-display" className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm leading-none select-none">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  +15 pts/msg
                </span>
              </div>
            </div>

            {/* Message Pane */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-sm pb-8">
              {chatMessages.map((msg) => {
                const isAI = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 select-none ${
                        isAI ? 'bg-indigo-50 dark:bg-indigo-950 text-xl' : 'bg-zinc-100 dark:bg-zinc-850 text-xs text-gray-600 dark:text-zinc-300'
                    }`}>
                      {isAI ? selectedCoach.avatar : <User className="w-4 h-4" />}
                    </div>
                    
                    <div className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isAI 
                        ? 'bg-zinc-50 dark:bg-zinc-950 text-gray-800 dark:text-zinc-200 border border-zinc-150 dark:border-zinc-850 pr-5' 
                        : 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[80%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-xl shrink-0">
                    {selectedCoach.avatar}
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 text-gray-400 border border-zinc-150 dark:border-zinc-850 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick start suggestion questions */}
            {chatMessages.length === 1 && !isTyping && (
              <div className="p-4 bg-gray-50/50 dark:bg-zinc-950/40 border-t border-gray-150 dark:border-zinc-850 space-y-2 overflow-x-auto select-none">
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase font-bold tracking-widest block mb-1 px-1">
                  Suggested topics:
                </span>
                <div className="flex gap-2 pb-1 pr-4 min-w-max">
                  {getSuggestions(selectedCoach.id).map((suggest, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggest)}
                      className="text-xs px-3.5 py-2 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-850 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-zinc-300 font-sans font-medium hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                    >
                      {suggest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messaging Input Area */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-950 border-t border-gray-150 dark:border-zinc-850">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Converse with ${selectedCoach.name}...`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                      handleSendMessage(inputValue);
                    }
                  }}
                  className="flex-grow px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl text-sm text-gray-800 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-650 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100"
                  disabled={isTyping}
                />
                <button
                  id="btn-send-message"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isTyping || !inputValue.trim()}
                  className="p-3.5 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 text-white rounded-2xl flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
