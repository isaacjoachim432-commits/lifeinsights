import { Insight, BookSummary, Coach } from './types';

export const insights: Insight[] = [
  {
    id: 'psy-01',
    category: 'psychology',
    categoryLabel: 'Psychology & Growth',
    title: 'Focus on the Action, Not the Outcome',
    simpleExplanation: 'Our brains are wired to crave instant gratification and final results, which can create anxiety and lead to procrastination. By mentally shifting your energy entirely to the mechanical step right in front of you (the next sentence, the next form field), you bypass the weight of the massive goal and trigger flow state.',
    realLifeExample: 'Instead of obsessing over writing a 10-page research paper, a writer tells themselves: "For the next 15 minutes, all I am doing is typing 10 sentences about the introduction." The pressure vanishes, and they end up writing 3 pages.',
    actionStep: 'Identify a task you are putting off. Break it down to an ridiculously small 5-minute step. Set a timer and do ONLY that small piece with zero expectation of the final result.',
    reflectionQuestion: 'What massive goal are you currently intimidating yourself with, and what is its absolute smallest immediate physical action step?',
    quote: 'Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it.',
    author: 'Greg Anderson'
  },
  {
    id: 'psy-02',
    category: 'psychology',
    categoryLabel: 'Psychology & Growth',
    title: 'The Spotlight Effect',
    simpleExplanation: 'We suffer from an egocentric bias where we overestimate how much others notice our flaws, mistakes, and appearance. In reality, everyone is the main character in their own drama, preoccupied with themselves, and barely registers details we spend hours worrying about.',
    realLifeExample: 'You accidentally wear a shirt with a small coffee stain to a meeting and feel intense embarrassment all day. When polled later, not a single colleague noticed or remembered anything about your clothing.',
    actionStep: 'The next time you make a minor social stumble, take a deep breath and say to yourself: "No one is paying as close attention to me as I am." Switch your focus to making others feel understood.',
    reflectionQuestion: 'In what ways has the fear of other people\'s judgment stopped you from expressing your true self or taking a positive risk?',
    quote: 'You would care a lot less about what others think of you if you realized how seldom they do.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 'acad-01',
    category: 'academic',
    categoryLabel: 'Academic Growth',
    title: 'The Feynman Technique for Deep Learning',
    simpleExplanation: 'True mastery involves simplicity. The Feynman Technique forces you to take a complex subject, strip away jargon, and explain it as if you were teaching a 10-year-old child. If you stumble or have to use complex language to defend your point, you have identified a gap in your own understanding.',
    realLifeExample: 'To study blockchain, instead of repeating rote phrases like "decentralized cryptographic ledgers", you explain it as "a digital notebook that everyone has a copy of, where entries can never be erased once written, so everyone always agrees on what is inside."',
    actionStep: 'Choose any concept you are studying or working on. Write a 3-sentence explanation of it using only vocabulary a kid would understand. Note where you struggle.',
    reflectionQuestion: 'What is a topic you claim to understand, but would struggle to explain in simple, normal terms to an average person?',
    quote: 'If you cannot explain it simply, you do not understand it well enough.',
    author: 'Albert Einstein'
  },
  {
    id: 'acad-02',
    category: 'academic',
    categoryLabel: 'Academic Growth',
    title: 'The Pomodoro & Spaced Repetition Synergy',
    simpleExplanation: 'Cramming causes knowledge to decay rapidly from short-term memory. Spaced repetition exploits the forgetting curve: by reviewing information at increasing intervals (1 day, 3 days, 1 week, 1 month), you signal to your brain that this data is permanent, cementing it into long-term structures.',
    realLifeExample: 'Instead of studying flashcards for 4 hours straight before an exam, you study them for 20 minutes a day over two weeks. You retrieve the knowledge faster and retain it long after the test is over.',
    actionStep: 'Take one key concept or skill you want to master. Schedule a 10-minute review session for tomorrow morning, then another 3 days later, and another a week after that.',
    reflectionQuestion: 'Are you currently trying to force-learn anything through exhaustion rather than smart, sustainable distribution?',
    quote: 'Continuous improvement is better than delayed perfection.',
    author: 'Mark Twain'
  },
  {
    id: 'rel-01',
    category: 'relationships',
    categoryLabel: 'Relationships & Trust',
    title: 'Listen to Understand, Not to Reply',
    simpleExplanation: 'In most conversations, we do not actually listen. We wait for our turn to speak, preparing our next argument or anecdote while the other person is still talking. Active listening means fully absorbing their message, validating their underlying emotion, and mirroring what they said before proposing any solution.',
    realLifeExample: 'A partner vents: "Work is absolute chaos and I feel totally overwhelmed." Instead of replying: "Well, you should talk to your supervisor or change your schedule like I did...", you say: "It sounds like you are carrying a massive weight right now and feeling completely exhausted. That must be so hard."',
    actionStep: 'In your next conversation, when the other person finishes talking, pause for 2 full seconds. Before giving your opinion, start with: "What I hear you saying is..." and repeat their sentiment.',
    reflectionQuestion: 'When was the last time you felt truly, deeply heard by someone, and what exactly did they do to make you feel that way?',
    quote: 'Most people do not listen with the intent to understand; they listen with the intent to reply.',
    author: 'Stephen R. Covey'
  },
  {
    id: 'rel-02',
    category: 'relationships',
    categoryLabel: 'Relationships & Trust',
    title: 'The Magic Ratio of Interaction',
    simpleExplanation: 'Psychological research shows that stable, healthy relationships require a ratio of at least 5 positive interactions to every 1 negative interaction. Negative events have a disproportionately stronger psychological impact, meaning simple civility is not enough; we must actively deposit positive moments to keep the emotional glass full.',
    realLifeExample: 'A family where criticism or chores represent 50% of conversations drifts apart, even if there are no major fights. Injecting spontaneous compliments, micro-gestures of help, and laughter restores the emotional balance.',
    actionStep: 'Today, send a unexpected text memory, word of appreciation, or compliment to someone close to you. Do it with zero expectations of receiving anything back.',
    reflectionQuestion: 'If your primary relationship were a bank account, is it currently running on a visual surplus of daily positive deposits, or hovering near a negative balance?',
    quote: 'We need five good compliments to offset one single insult.',
    author: 'Dr. John Gottman'
  },
  {
    id: 'sport-01',
    category: 'sports',
    categoryLabel: 'Sports & Performance',
    title: 'The 1% Margin of Aggregation',
    simpleExplanation: 'Elite physical performance is rarely the result of a single monumental change. It is the compound impact of tiny, almost imperceptible adjustments across a dozen disciplines: improving sleep by 15 minutes, drinking 1 more glass of water, stretching for 5 minutes, and refining a technical grip by 1 degree.',
    realLifeExample: 'The British Cycling team went from decades of mediocrity to absolute dominance by applying this rule: they redesigned bike seats for comfort, tested fabrics in wind tunnels, and even carried their own precise therapeutic pillows to hotels.',
    actionStep: 'Select one athletic or work activity. List 3 micro-areas (hydration, posture, warm-up length, footwear, gear organization) where you could make a quick 1% adjustment today.',
    reflectionQuestion: 'What minor, boring daily habits are you neglecting because they seem too small/insignificant to matter on their own?',
    quote: 'The difference between ordinary and extraordinary is that little extra.',
    author: 'Jimmy Johnson'
  },
  {
    id: 'sport-02',
    category: 'sports',
    categoryLabel: 'Sports & Performance',
    title: 'The Centering Breath Under Pressure',
    simpleExplanation: 'When adrenaline spikes (due to a penalty shot, a public speech, or an aggressive email), our body triggers a sympathetic "fight or flight" response, restricting logical blood flow. The "physiological sigh"—two deep structural inhales through the nose followed by a slow, extended exhale through the mouth—instantly activates the parasympathetic system, resetting the heart rate.',
    realLifeExample: 'A professional tennis player misses a critical serve. Instead of throwing their racket or rushing, they turn their back, execute a double-inhale physiological sigh, bounce the ball three times, and deliver an ace.',
    actionStep: 'Practice the physiological sigh right now: Inhale deeply through your nose, squeeze a tiny bit more air in at the top, then let it out through your mouth with a soft sigh of relief. Repeat twice.',
    reflectionQuestion: 'How do you typically react when a sudden mistake or high-pressure event occurs? Do you speed up in panic, or consciously slow down to regain control?',
    quote: 'Under pressure, you do not rise to the level of your expectations, you fall to the level of your training.',
    author: 'Archilochus'
  },
  {
    id: 'faith-01',
    category: 'faith',
    categoryLabel: 'Faith & Spiritual Growth',
    title: 'The Discipline of Radical Gratitude',
    simpleExplanation: 'In a consumerist world, our minds focus on what is missing (scarcity). Spiritual maturity redirects attention to what is present (abundance). Radical gratitude isn\'t just thanking God or the universe for miracles; it is a discipline of thanking and finding beauty in the standard, mundane details of a standard day.',
    realLifeExample: 'Instead of waking up complaining about the heavy rain spoiling your commute, you close your eyes and feel deep gratitude for water that feeds the earth, a solid roof over your head, and working eyes to see the morning light.',
    actionStep: 'Open your notes or grab a scrap of paper. Write down 5 extremely specific things you are grateful for today that are NOT money or achievements (e.g., the hot water faucet, a warm sock, a memory from 5 years ago, the smell of coffee).',
    reflectionQuestion: 'How would your mood and relationship with others change if you spent half as much time inspecting your grievances as you do listing your blessings?',
    quote: 'Gratitude turns what we have into enough, and more.',
    author: 'Melody Beattie'
  },
  {
    id: 'faith-02',
    category: 'faith',
    categoryLabel: 'Faith & Spiritual Growth',
    title: 'The Anchor of Absolute Hope',
    simpleExplanation: 'Unlike optimism, which is a superficial belief that everything will turn out perfect, spiritual hope is the quiet conviction that everything makes ultimate sense, regardless of the temporary pain or darkness. It is an internal anchor that holds firm when external tides are chaotic.',
    realLifeExample: 'Going through a painful career setback, instead of falling into despair, you hold a quiet belief that this closed door is redirecting you to a path where you can build deeper character and serve people in a more profound way.',
    actionStep: 'Today, when you feel a wave of worry or doubt about the future, stop, place a hand over your heart, and whisper: "This too is part of my path. I am safe, I am growing, and there is hope."',
    reflectionQuestion: 'What aspect of your current struggles might be preparing you to help, guide, or comfort someone else in the future?',
    quote: 'Hope is being able to see that there is light despite all of the darkness.',
    author: 'Desmond Tutu'
  },
  {
    id: 'everyday-01',
    category: 'everyday',
    categoryLabel: 'Everyday Wisdom',
    title: 'The Wealth Buffer: Income vs. Wealth',
    simpleExplanation: 'Most people confuse high income with wealth. Income is what you show the world (cars, houses, expensive dinners). Wealth is what you don\'t see (investments, savings, unspent assets). True wealth is the luxury of options, flexibility, and control over your time—it is buyable peace of mind.',
    realLifeExample: 'An executive making $300k but spending $295k is highly fragile: one job loss and they panic. An employee making $70k but saving 25% has built a runway of freedom: they can leave bad situations, take career breaks, and sleep peacefully.',
    actionStep: 'Review your last month\'s expenses. Identify one recurring unnecessary cost you can cut. Set up an automatic transfer of that exact amount into a separate savings or investment account.',
    reflectionQuestion: 'To what extent are your financial choices made to buy genuine safety and freedom vs. buying social status or temporary approval?',
    quote: 'Spending money to show people how much money you have is the quickest way to have less money.',
    author: 'Morgan Housel'
  },
  {
    id: 'everyday-02',
    category: 'everyday',
    categoryLabel: 'Everyday Wisdom',
    title: 'The Paradox of Choice and Social Skills',
    simpleExplanation: 'To be incredibly compelling in social environments, you do not need to be a brilliant storyteller or a charismatic comedian. Humans are deeply starved of genuine interest. By asking thoughtful, open-ended questions and showing sincere curiosity about the other person\'s world, you automatically become the most interesting person in the room.',
    realLifeExample: 'At a dinner party of strangers, instead of talking about your achievements, you ask: "What are you working on right now that you are excited about?" or "How did you get into that field?" The person speaks passionately, and leaves thinking you are an incredibly clever conversationalist.',
    actionStep: 'In your next social interaction, set a challenge for yourself: ask at least 3 deep questions that cannot be answered with a simple "yes" or "no", and let their responses guide your curiosity.',
    reflectionQuestion: 'How often do you ask questions with the sincere goal of learning about someone, rather than just filling a silent space?',
    quote: 'You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.',
    author: 'Dale Carnegie'
  }
];

export const bookSummaries: BookSummary[] = [
  {
    id: 'book-01',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverColor: 'bg-indigo-600',
    category: 'Habits & Productivity',
    oneSentence: 'Tiny changes repeated daily compound into massive personal and professional transformations.',
    summary: 'Clear outlines a practical framework for building good habits and breaking bad ones, anchored on the concept that results are the lagging measure of our systems, not our willpower. Real change comes from the compounding effects of hundreds of micro-decisions—getting 1% better each day.',
    lessons: [
      {
        title: 'Focus on Systems over Goals',
        description: 'Winners and losers have the same goals. What separates them is their systems—the daily processes and routines that make progress automatic. You do not rise to the level of your goals, you fall to the level of your systems.'
      },
      {
        title: 'Identity-Based Habits',
        description: 'The key to lasting change is to focus on who you wish to become, rather than what you want to achieve. Shift your self-description: instead of "I am trying to stop smoking," say, "I am not a smoker."'
      },
      {
        title: 'The Four Laws of Behavior Change',
        description: 'To build a good habit: Make it obvious, Make it attractive, Make it easy, and Make it satisfying. To break a bad habit, invert these laws: Make it invisible, unattractive, difficult, and unsatisfying.'
      }
    ],
    favoriteQuotes: [
      "Every action you take is a vote for the type of person you wish to become.",
      "Habits are the compound interest of self-improvement.",
      "You do not rise to the level of your goals. You fall to the level of your systems."
    ],
    takeaways: [
      "Habit Stacking: Pair a new behavior with an existing daily habit (e.g., 'After I pour my morning coffee, I will meditate for 1 minute').",
      "The 2-Minute Rule: When starting a new habit, it should take less than two minutes to do (e.g., 'Read one page'). This bypasses mental resistance.",
      "Environment Design: Prime your physical spaces to make good cues highly obvious and bad cues invisible."
    ],
    recommendation: 'Highly recommended for anyone struggling with discipline, consistency, or wanting to rebuild their daily routines from the ground up.'
  },
  {
    id: 'book-02',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    coverColor: 'bg-emerald-600',
    category: 'Financial Wisdom',
    oneSentence: 'Doing well with money isn\'t about how smart you are, it is about how you behave.',
    summary: 'Housel presents 19 short stories exploring the complex and often irrational ways people think about wealth. He argues that financial success is a soft skill driven by psychology, history, personal vanity, and risk tolerances rather than technical spreadsheet formulas.',
    lessons: [
      {
        title: 'No One is Crazy',
        description: 'Everyone\'s financial decisions are shaped by the unique slice of history and upbringing they experienced. A child of poverty thinks about stock markets very differently than an investor\'s heir—both are acting rationally in their own minds.'
      },
      {
        title: 'The Power of Compounding Time',
        description: 'Warren Buffett\'s real trick is time, not intellect. Over 90% of his multi-billion dollar wealth was accumulated after he turned 50, showing that holding onto assets without interrupting progress is the ultimate accelerator.'
      },
      {
        title: 'Getting Wealthy vs. Staying Wealthy',
        description: 'Getting wealthy requires taking risks, optimism, and putting yourself out there. Staying wealthy requires the exact opposite: humility, frugality, and a healthy dose of paranoia that everything could be taken away from you.'
      }
    ],
    favoriteQuotes: [
      "Wealth is what you don't see. It is the cars not purchased. The diamonds not bought.",
      "Using your money to buy control over your time is the highest dividend money pays.",
      "Doing well with money has a little to do with how smart you are and a lot to do with how you behave."
    ],
    takeaways: [
      "Save money just to save it: You do not need a specific reason (like a car or house) to put money aside. Savings buy hedge against life\'s unpredictability.",
      "Check your pride: Frugality is simply an exercise in spending less than you can, which is driven by ignoring what other people think of you.",
      "Keep a high visual buffer: Maintain cash reserves that feel unreasonable to others, because flexibility represents the ultimate wealth."
    ],
    recommendation: 'Essential reading for any age to completely redefine what a secure, peaceful, and wealthy life truly looks like.'
  },
  {
    id: 'book-03',
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    coverColor: 'bg-zinc-800',
    category: 'Sports & Mindset',
    oneSentence: 'We operate at only 40% of our actual mental and physical capabilities due to self-imposed comfort.',
    summary: 'Goggins shares his astonishing life story—surviving childhood trauma, obesity, and prejudice to become a Navy SEAL, Army Ranger, and world-record ultramarathoner. He explains how to master the mind, push past pain, and eliminate the victim mindset.',
    lessons: [
      {
        title: 'The 40% Rule',
        description: 'When mental fatigue hits and your brain tells you that you are completely finished, you have actually only tapped into 40% of your actual capability. The remaining 60% lies locked behind the wall of discomfort.'
      },
      {
        title: 'The Accountability Mirror',
        description: 'True growth begins with brutal, unvarnished honesty. Write your insecurities, flaws, and goals on tape and stick them to the mirror. Face them every day and own the path to correcting them.'
      },
      {
        title: 'Callousing the Mind',
        description: 'To build resilience, you must seek out friction. Intentionally do things you hate, wake up early, exercise when exhausted, and choose the harder route until your mind becomes hard as leather.'
      }
    ],
    favoriteQuotes: [
      "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
      "Most limits are self-imposed because we crave security and fear the work.",
      "Brutal honesty with oneself is the ultimate superpower."
    ],
    takeaways: [
      "Write down your 'Cookie Jar': List your past victories, moments you overcame heavy despair, or did hard tasks. When you want to quit, reach into the jar and eat a cookie of historic courage.",
      "Take souls: Out-work your critics and hurdles. By displaying a work ethic they cannot comprehend, you gain the psychological edge.",
      "Eliminate comfort habits: Make a conscious choice to seek out one physical task you dislike every single day."
    ],
    recommendation: 'A powerful motivator for athletes, fitness enthusiasts, and anyone trapped in comfort seeking a mental revolution.'
  },
  {
    id: 'book-04',
    title: 'How to Win Friends & Influence People',
    author: 'Dale Carnegie',
    coverColor: 'bg-amber-600',
    category: 'Relationships & Social',
    oneSentence: 'Success is 15% technical knowledge and 85% human engineering—communicating and listening beautifully.',
    summary: 'A timeless classic detailing fundamental principles for dealing with people, cultivating popular goodwill, and winning colleagues over to your way of thinking. Carnegie\'s central premise is that people crave being valued and understood.',
    lessons: [
      {
        title: 'The Deep Craving to Feel Important',
        description: 'The deepest urge in human nature is the desire to be appreciated. Sincere praise and honest appreciation are rare currencies; scatter them everywhere, and people will love you.'
      },
      {
        title: 'Become Genuinely Interested in Others',
        description: 'Listen intently, ask questions that others enjoy answering, and talk in terms of their interests. A person\'s name is to that person the sweetest and most important sound in any language.'
      },
      {
        title: 'Avoid Arguments and Criticism',
        description: 'You cannot win an argument; even if you defeat their logic, you ruin their pride, yielding cold resentment. Instead of condemning others, try to understand why they do what they do.'
      }
    ],
    favoriteQuotes: [
      "Critique is like a homing pigeon; it always returns home.",
      "Talk to someone about themselves and they will listen for hours.",
      "Sincere appreciation can change another person's whole day or even their life."
    ],
    takeaways: [
      "Smile: It costs nothing but coordinates instant warmth and social safety in under a second.",
      "Remember names: Do whatever it takes to lock in names on meeting someone—repeat it, write it down, associate it.",
      "Acknowledge mistakes instantly: If you are wrong, admit it quickly and enthusiastically. It disarms conflict and earns high respect."
    ],
    recommendation: 'The foundational standard for social skills, management, teamwork, and healthy personal relationships.'
  },
  {
    id: 'book-05',
    title: 'Deep Work',
    author: 'Cal Newport',
    coverColor: 'bg-slate-700',
    category: 'Academics & Focus',
    oneSentence: 'The ability to perform deep, distraction-free concentration is becoming rare just as its value spikes.',
    summary: 'Newport contrasts deep work—cognitively demanding tasks performed in concentration—with shallow work, which includes logistical, low-value tasks like replying to emails or checking feeds. He provides actionable rules for designing a highly focused professional life.',
    lessons: [
      {
        title: 'The Distraction Tax',
        description: 'Every time you glance at an SMS or email, your attention remains fractured. Attention residue lingers on the interruption for up to 20 minutes, draining your brain\'s processing power for the core job.'
      },
      {
        title: 'Monopolizing Concentration',
        description: 'We must treat focus as a muscle. If you instantly reach for boredom-killers (social media, news) every time you wait in line, you train your brain to never tolerate a lack of stimulation, destroying focus.'
      },
      {
        title: 'The Shutdown Ritual',
        description: 'To let your logical circuits rest and synthesize ideas, you must enforce a strict, definitive end to the workday. A systematic shutdown ritual tells your subconscious that it is safe to completely switch off.'
      }
    ],
    favoriteQuotes: [
      "If you don't produce, you won't thrive—no matter how skilled or talented you are.",
      "To produce at your peak level you need to work for extended periods with full concentration on a single task.",
      "Let your mind be bored sometimes; that is where brilliant insights are incubated."
    ],
    takeaways: [
      "Time-block your day: Schedule every hour of your workspace. It converts chaotic impulses into specific intentions.",
      "Productive Meditation: During walks or exercise, focus your attention on a single hard, unsolved problem.",
      "Unplug entirely: Cultivate periods where you have absolutely no computer screens, notifications, or devices on your desk."
    ],
    recommendation: 'A must-read for students, researchers, developers, and creatives struggling with attention span in the digital age.'
  }
];

export const defaultCoaches: Coach[] = [
  {
    id: 'general',
    name: 'Coach Ethan',
    title: 'Behavioral Psychologist & Head Growth Coach',
    avatar: '👨‍💼',
    role: 'AI Life Coach',
    prompt: 'You are Coach Ethan, an elite behavioral psychologist and head growth coach with years of expertise guiding high-achieving individuals. Your style is balanced, encouraging yet direct, incredibly deeply structured, and rich in practical psychological advice. Respond in a styled markdown format with bullet points for easy reading. Give 1 action step and 1 reflection prompt at the end.',
    greeting: 'Hello, friend. I am Coach Ethan. Let us work together to build a life of deep purpose, clear discipline, and emotional wisdom. What area of your personal growth are we inspecting today?',
    bgColor: 'bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/30',
    borderColor: 'border-indigo-100 dark:border-indigo-900/50'
  },
  {
    id: 'goal',
    name: 'Sienna',
    title: 'Strategic Planner & Goals Specialist',
    avatar: '📐',
    role: 'Goal-Setting Assistant',
    prompt: 'You are Sienna, a world-class strategic planner who believes in ruthless simplicity, KPI accountability, and absolute clarity. Your job is to take huge, chaotic dreams and break them down into highly actionable OKRs, weekly milestones, and metrics. You are supportive but expect clarity. Format with clear headers and bullet points.',
    greeting: 'Hi there! I am Sienna. Let us stop daydreaming in abstract terms and draft a concrete, bulletproof roadmap for your ambitions. Tell me: what huge objective are you aiming for in the next 3 to 12 months?',
    bgColor: 'bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30',
    borderColor: 'border-emerald-100 dark:border-emerald-900/50'
  },
  {
    id: 'study',
    name: 'Dr. Evelyn',
    title: 'Cognitive Science & Learning Professor',
    avatar: '🎓',
    role: 'Learning & Study Coach',
    prompt: 'You are Dr. Evelyn, a cognitive scientist specializing in pedagogy, active recall, dual-coding, and memory persistence models. You think cramming is a waste of time and love explaining the underlying mechanisms of study habits. Give highly customized learning strategies, retrieval challenges, and time-boxing structures.',
    greeting: 'Welcome to your deep learning space. I am Dr. Evelyn. Together, we will transform how you absorb, store, and recall knowledge without burn-out. What topic or exam are you trying to crack?',
    bgColor: 'bg-amber-50/50 hover:bg-amber-50 dark:bg-amber-950/20 dark:hover:bg-amber-950/30',
    borderColor: 'border-amber-100 dark:border-amber-900/50'
  },
  {
    id: 'relationship',
    name: 'Nico',
    title: 'Licensed Conflict Resolver & Coach',
    avatar: '❤️',
    role: 'Relationship Advisor',
    prompt: 'You are Nico, an empathetic, highly skilled communication expert and couples counselor. You look for root emotions, boundary problems, hidden needs, and non-violent communication schemas. Give direct relationship scripts (exact words to say) to resolve conflicts, express needs, and build deep trust.',
    greeting: 'Hello. I am Nico. Relationships are the foundation of our psychological well-being. Whether you are navigating friendship dynamics, family boundaries, or dating, I am here to help. What dynamic shall we review?',
    bgColor: 'bg-rose-50/50 hover:bg-rose-50 dark:bg-rose-950/20 dark:hover:bg-rose-950/30',
    borderColor: 'border-rose-100 dark:border-rose-900/50'
  },
  {
    id: 'habit',
    name: 'Marcus',
    title: 'Habit Systems Architect',
    avatar: '⚙️',
    role: 'Habit-Building Assistant',
    prompt: 'You are Marcus, a habit systems architect heavily inspired by Atomic Habits and behavioral loops. You believe willpower is an illusion and that systems and cues are all that matters. Help users construct cues, make habits ridiculously easy to start, stacked on top of existing physical triggers.',
    greeting: 'Hey! Marcus here. Let us construct automatic systems that do the hard work for you. Tell me what healthy habit you want to introduce of what bad routine is draining your potential—let us build a cue loop!',
    bgColor: 'bg-sky-50/50 hover:bg-sky-50 dark:bg-sky-950/20 dark:hover:bg-sky-950/30',
    borderColor: 'border-sky-100 dark:border-sky-900/50'
  }
];

export const defaultWeeklyChallenges = [
  {
    id: 'wc-1',
    title: 'The Mirror of Sincerity',
    description: 'Write down a detailed written reply to 2 separate Daily Insight reflection questions in your journal section.',
    points: 120,
    completed: false,
    category: 'psychology'
  },
  {
    id: 'wc-2',
    title: 'Action Trigger Practice',
    description: 'Complete the action step of today\'s insight or another unlocked insight and mark it complete.',
    points: 100,
    completed: false,
    category: 'sports'
  },
  {
    id: 'wc-3',
    title: 'Systemized Blueprint',
    description: 'Consult with Marcus (the AI Habit Assistant) to build a personalized Habit Stack loop from scratch.',
    points: 150,
    completed: false,
    category: 'everyday'
  }
];

export const initialBadges = [
  {
    id: 'b-streak-3',
    title: 'Consistent Sparks',
    description: 'Achieve a 3-day reading streak.',
    icon: '🔥',
    category: 'consistency'
  },
  {
    id: 'b-streak-7',
    title: 'Ignition Cycle',
    description: 'Achieve a 7-day reading streak.',
    icon: '⚡',
    category: 'consistency'
  },
  {
    id: 'b-insights-5',
    title: 'Wisdom Collector',
    description: 'Absorb 5 daily insights across any categories.',
    icon: '🦉',
    category: 'knowledge'
  },
  {
    id: 'b-books-2',
    title: 'Literary Scholar',
    description: 'Read the takeaways and lessons of at least 2 books in the Library.',
    icon: '📚',
    category: 'library'
  },
  {
    id: 'b-coach-3',
    title: 'Guided Ascent',
    description: 'Initiate discussions with 3 distinct AI coaches.',
    icon: '🗣️',
    category: 'ai'
  },
  {
    id: 'b-reflex',
    title: 'Conscious Scribe',
    description: 'Submit a deeply processed response to a reflection item.',
    icon: '✍️',
    category: 'reflection'
  }
];
