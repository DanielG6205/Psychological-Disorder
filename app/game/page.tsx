"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type MeterKey = "mood" | "energy" | "stress" | "support";

type Meters = Record<MeterKey, number>;

type PendingEffect = {
  day: number;
  label: string;
  effects: Partial<Meters>;
};

type JournalEntry = {
  day: number;
  title: string;
  choice: string;
  note: string;
  appliedLater?: string[];
};

type Choice = {
  label: string;
  description: string;
  effects: Partial<Meters>;
  delayed?: PendingEffect[];
  note: string;
  tags: string[];
};

type Scenario = {
  day: number;
  title: string;
  prompt: string;
  context: string;
  choices: Choice[];
};

const TOTAL_DAYS = 7;

const INITIAL_METERS: Meters = {
  mood: 42,
  energy: 38,
  stress: 47,
  support: 36,
};

const CHOICE_IMPACT_MULTIPLIER = 1.55;

const METER_CONFIG: {
  key: MeterKey;
  label: string;
  tone: string;
  bg: string;
}[] = [
  {
    key: "mood",
    label: "Mood",
    tone: "from-sky-500 to-cyan-400",
    bg: "bg-sky-50",
  },
  {
    key: "energy",
    label: "Energy",
    tone: "from-amber-400 to-orange-400",
    bg: "bg-amber-50",
  },
  {
    key: "stress",
    label: "Stress",
    tone: "from-rose-500 to-pink-400",
    bg: "bg-rose-50",
  },
  {
    key: "support",
    label: "Support",
    tone: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50",
  },
];

const SCENARIOS: Scenario[] = [
  {
    day: 1,
    title: "The Day Starts Heavy",
    prompt: "I wake up tired before the day even starts.",
    context:
      "Even after sleeping, my body feels slow and my mood is low. Breakfast sounds unappealing, and getting moving already feels like work.",
    choices: [
      {
        label: "Stick to a gentle morning routine",
        description:
          "Get dressed, eat something small, and leave a few minutes early even though it takes effort.",
        effects: { mood: 1, energy: -4, stress: -2 },
        delayed: [
          {
            day: 3,
            label: "A steadier routine makes mornings a little less chaotic.",
            effects: { energy: 4, stress: -2 },
          },
        ],
        note:
          "The routine did not make me feel happy, but it gave the day some structure.",
        tags: ["routine", "coping"],
      },
      {
        label: "Stay in bed longer and skip the routine",
        description:
          "Use the extra time to avoid the stress of starting, even if it throws the morning off.",
        effects: { energy: 2, stress: -3, mood: -2, support: -1 },
        delayed: [
          {
            day: 2,
            label: "Skipping the routine makes the next morning feel more disorganized.",
            effects: { stress: 4, energy: -3 },
          },
        ],
        note:
          "The break felt relieving in the moment, but the day started to drift right away.",
        tags: ["withdrawal", "avoidance"],
      },
      {
        label: "Text someone and ask for a small check-in",
        description:
          "Send a quick message to a trusted person before school starts.",
        effects: { support: 5, stress: -1, energy: -1 },
        delayed: [
          {
            day: 4,
            label: "Reaching out makes it easier to ask for help again later.",
            effects: { support: 3, mood: 2 },
          },
        ],
        note:
          "I still felt low, but not as alone. That made the morning more manageable.",
        tags: ["support", "connection"],
      },
    ],
  },
  {
    day: 2,
    title: "Schoolwork Feels Foggy",
    prompt: "I have assignments due, but concentrating feels impossible.",
    context:
      "My thoughts keep slowing down and drifting. Every unfinished task starts to feel like proof that I am falling behind.",
    choices: [
      {
        label: "Break the work into very small steps",
        description:
          "Choose one short task, set a timer, and focus only on the next piece.",
        effects: { stress: -3, energy: -2, mood: 1 },
        delayed: [
          {
            day: 5,
            label: "Small wins make future tasks feel less impossible.",
            effects: { mood: 3, stress: -2 },
          },
        ],
        note:
          "It was still hard to focus, but turning one giant problem into smaller steps helped.",
        tags: ["coping", "routine"],
      },
      {
        label: "Push through for hours without a break",
        description:
          "Try to force productivity by staying at the desk and ignoring how drained you feel.",
        effects: { energy: -6, stress: 3, mood: -1 },
        delayed: [
          {
            day: 3,
            label: "Burnout makes it harder to recover the next day.",
            effects: { energy: -3, mood: -1 },
          },
        ],
        note:
          "I got through some work, but the effort felt punishing and left me more depleted.",
        tags: ["overextend"],
      },
      {
        label: "Avoid the work and scroll to numb out",
        description:
          "Reduce the pressure for now, even though the deadline will still be there later.",
        effects: { stress: -1, mood: -2, support: -1 },
        delayed: [
          {
            day: 3,
            label: "Unfinished work adds pressure the next day.",
            effects: { stress: 5, mood: -2 },
          },
        ],
        note:
          "The distraction lowered pressure for a little while, but the unfinished work kept hanging over me.",
        tags: ["avoidance", "withdrawal"],
      },
    ],
  },
  {
    day: 3,
    title: "A Friend Reaches Out",
    prompt: "A friend texts and asks if I want to hang out.",
    context:
      "Part of me wants connection. Another part expects I will be tired, quiet, or not much fun to be around.",
    choices: [
      {
        label: "Say yes to a short, low-pressure plan",
        description:
          "Agree to a short walk or brief hangout instead of a long event.",
        effects: { support: 6, energy: -3, mood: 2, stress: -1 },
        delayed: [
          {
            day: 6,
            label: "Positive contact makes future support feel more available.",
            effects: { support: 4, mood: 2 },
          },
        ],
        note:
          "It took effort to go, but the small amount of connection lifted some of the isolation.",
        tags: ["connection", "support"],
      },
      {
        label: "Decline and rest without fully disappearing",
        description:
          "Say no for today, but answer honestly and suggest checking in later.",
        effects: { energy: 3, stress: -2, support: 1 },
        note:
          "Rest helped, and keeping the message honest protected the relationship.",
        tags: ["rest", "coping"],
      },
      {
        label: "Ignore the message entirely",
        description:
          "Avoid the decision and let the message sit because responding feels emotionally heavy.",
        effects: { stress: -2, support: -5, mood: -2 },
        delayed: [
          {
            day: 5,
            label: "Isolation starts to feel more automatic over time.",
            effects: { support: -3, mood: -2 },
          },
        ],
        note:
          "Avoiding the text reduced pressure in the moment, but it also made me feel more disconnected.",
        tags: ["withdrawal", "avoidance"],
      },
    ],
  },
  {
    day: 4,
    title: "Not Trying Hard Enough?",
    prompt: "My family thinks I’m just not trying hard enough.",
    context:
      "Their frustration hits my self-esteem fast. I want to explain that this is chronic, not laziness, but I also feel drained and defensive.",
    choices: [
      {
        label: "Explain what PDD feels like and ask for patience",
        description:
          "Use a calm moment to describe the low energy, hopelessness, and concentration problems.",
        effects: { support: 5, stress: -2, energy: -2, mood: 1 },
        delayed: [
          {
            day: 7,
            label: "Being understood reduces some of the emotional pressure at home.",
            effects: { support: 3, stress: -2 },
          },
        ],
        note:
          "Explaining it took energy, but being understood even a little made home feel less tense.",
        tags: ["support", "communication"],
      },
      {
        label: "Keep quiet and handle it alone",
        description:
          "Avoid conflict for now, even though the misunderstanding stays in the background.",
        effects: { stress: -1, support: -2, mood: -1 },
        delayed: [
          {
            day: 6,
            label: "The lack of understanding keeps weighing on you.",
            effects: { stress: 3, mood: -1 },
          },
        ],
        note:
          "Silence prevented an argument, but it left me feeling more alone with it.",
        tags: ["withdrawal"],
      },
      {
        label: "Ask a trusted adult or counselor to help explain",
        description:
          "Bring in support so the conversation does not rest entirely on your energy.",
        effects: { support: 4, stress: -1, energy: -1 },
        delayed: [
          {
            day: 6,
            label: "Outside support helps the family respond more constructively.",
            effects: { support: 4, mood: 1 },
          },
        ],
        note:
          "I did not have to carry the whole explanation by myself, which made the situation feel more manageable.",
        tags: ["support", "connection"],
      },
    ],
  },
  {
    day: 5,
    title: "Therapy Day",
    prompt: "I have a therapy appointment today.",
    context:
      "Part of me thinks it could help. Another part feels hopeless and wonders whether anything can really change.",
    choices: [
      {
        label: "Go to therapy and talk honestly",
        description:
          "Show up even if your mood is low and discuss hopeless thoughts, routines, and coping strategies.",
        effects: { stress: -3, support: 4, energy: -2, mood: 1 },
        delayed: [
          {
            day: 7,
            label: "Therapy gives you language and strategies you can keep using.",
            effects: { mood: 4, support: 2, stress: -2 },
          },
        ],
        note:
          "Therapy did not erase the depression, but it gave me a clearer plan and made the week feel less stuck.",
        tags: ["therapy", "coping", "support"],
      },
      {
        label: "Cancel because it feels pointless",
        description:
          "Save energy today, even though it removes a source of structure and support.",
        effects: { energy: 2, stress: -1, support: -4, mood: -2 },
        delayed: [
          {
            day: 7,
            label: "Missing support makes hopeless thoughts feel louder later.",
            effects: { mood: -3, stress: 3 },
          },
        ],
        note:
          "Skipping gave me temporary relief, but it also reinforced the feeling that nothing will help.",
        tags: ["avoidance", "withdrawal"],
      },
      {
        label: "Go, but keep it brief and focus on one practical goal",
        description:
          "Conserve energy by talking about one routine or coping step you can realistically try.",
        effects: { support: 3, stress: -2, energy: -1 },
        delayed: [
          {
            day: 7,
            label: "A practical strategy starts to feel repeatable.",
            effects: { mood: 2, energy: 2 },
          },
        ],
        note:
          "It was not a breakthrough moment, but even a smaller session gave me something usable.",
        tags: ["therapy", "routine"],
      },
    ],
  },
  {
    day: 6,
    title: "Routine, Sleep, and Medication",
    prompt: "I’m trying to decide whether to stick with my routine.",
    context:
      "Sleep has been inconsistent, my appetite has been off, and I still do not feel dramatically better. The slow pace of progress makes it tempting to give up.",
    choices: [
      {
        label: "Take medication as prescribed and keep a sleep routine",
        description:
          "Stay consistent even though the benefits are gradual rather than immediate.",
        effects: { energy: -1, stress: -1, mood: 1 },
        delayed: [
          {
            day: 7,
            label: "Consistency starts to support steadier functioning.",
            effects: { mood: 3, energy: 3, stress: -1 },
          },
        ],
        note:
          "The routine felt repetitive, but it supported stability instead of waiting for motivation to appear first.",
        tags: ["medication", "routine", "coping"],
      },
      {
        label: "Take a short walk and reset the evening routine",
        description:
          "Use a small amount of movement and structure to make tonight more predictable.",
        effects: { energy: -2, stress: -3, mood: 2 },
        delayed: [
          {
            day: 7,
            label: "A modest routine shift helps sleep and stress a little.",
            effects: { energy: 2, stress: -2 },
          },
        ],
        note:
          "It was not a dramatic fix, but the walk interrupted the stuck feeling and made the evening less chaotic.",
        tags: ["routine", "exercise", "coping"],
      },
      {
        label: "Drop the routine because it is not working fast enough",
        description:
          "Stop tracking sleep and skip medication or coping steps for the day.",
        effects: { energy: 1, mood: -2, stress: 1, support: -1 },
        delayed: [
          {
            day: 7,
            label: "Inconsistency makes symptoms feel more unpredictable.",
            effects: { mood: -3, energy: -2, stress: 2 },
          },
        ],
        note:
          "Stopping felt easier in the moment, but it also fed the belief that nothing is worth maintaining.",
        tags: ["avoidance"],
      },
    ],
  },
  {
    day: 7,
    title: "End of the Week",
    prompt: "Part of me feels like nothing is ever going to change.",
    context:
      "The week has been long. PDD often lingers in the background day after day, which can make hopeless thoughts feel convincing even when small supports are helping.",
    choices: [
      {
        label: "Notice the small things that helped and make a plan for next week",
        description:
          "Write down one support, one coping habit, and one task to break into steps.",
        effects: { mood: 3, stress: -2, support: 2 },
        note:
          "The depression did not vanish, but looking for patterns made the future feel less closed off.",
        tags: ["reflection", "routine", "coping"],
      },
      {
        label: "Talk to someone I trust about how the week felt",
        description:
          "Share the truth instead of carrying the hopelessness alone.",
        effects: { support: 5, mood: 2, stress: -1, energy: -1 },
        note:
          "Being honest did not solve everything, but it made the weight feel more shared.",
        tags: ["support", "connection", "reflection"],
      },
      {
        label: "Keep everything to myself and just get through the night",
        description:
          "Avoid the emotional effort of reflecting, even if it means ending the week isolated.",
        effects: { energy: 1, mood: -2, support: -3 },
        note:
          "Getting through the night mattered, but isolation kept the hopelessness from being challenged.",
        tags: ["withdrawal", "avoidance"],
      },
    ],
  },
];

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function scaleEffect(value: number, multiplier: number) {
  if (value === 0) return 0;

  return Math.sign(value) * Math.max(1, Math.round(Math.abs(value) * multiplier));
}

function applyEffects(
  meters: Meters,
  effects: Partial<Meters>,
  multiplier = 1
) {
  return {
    mood: clamp(meters.mood + scaleEffect(effects.mood ?? 0, multiplier)),
    energy: clamp(meters.energy + scaleEffect(effects.energy ?? 0, multiplier)),
    stress: clamp(meters.stress + scaleEffect(effects.stress ?? 0, multiplier)),
    support: clamp(meters.support + scaleEffect(effects.support ?? 0, multiplier)),
  };
}

function buildDailyLoad(meters: Meters) {
  const supportBuffer = meters.support >= 55 ? 2 : 0;
  return {
    mood: -2 + supportBuffer,
    energy: -3 + (meters.support >= 65 ? 1 : 0),
    stress: 2 - supportBuffer,
    support: 0,
  };
}

function describeMeter(value: number, key: MeterKey) {
  if (key === "stress") {
    if (value >= 70) return "High";
    if (value >= 45) return "Elevated";
    return "Manageable";
  }

  if (value >= 70) return "Steadier";
  if (value >= 45) return "Low but functional";
  return "Drained";
}

function summarizeTendencies(tagCounts: Record<string, number>) {
  const tendencies: string[] = [];

  if ((tagCounts.support ?? 0) + (tagCounts.connection ?? 0) >= 3) {
    tendencies.push(
      "You often chose connection or communication, which gradually increased support and reduced isolation."
    );
  }

  if ((tagCounts.routine ?? 0) + (tagCounts.coping ?? 0) >= 3) {
    tendencies.push(
      "You used structured coping strategies, showing how routines and small steps can improve functioning over time rather than instantly."
    );
  }

  if ((tagCounts.therapy ?? 0) + (tagCounts.medication ?? 0) >= 2) {
    tendencies.push(
      "You leaned into treatment, which reflects how therapy and medication can support symptom management gradually."
    );
  }

  if ((tagCounts.avoidance ?? 0) + (tagCounts.withdrawal ?? 0) >= 3) {
    tendencies.push(
      "You often chose avoidance or withdrawal, which lowered pressure short term but tended to increase isolation or stress later."
    );
  }

  if (tendencies.length === 0) {
    tendencies.push(
      "Your choices were mixed, which fits the reality of PDD: people often shift between coping, rest, support, and avoidance depending on the day."
    );
  }

  return tendencies.slice(0, 3);
}

export default function GamePage() {
  const [screen, setScreen] = useState<"title" | "playing" | "summary">("title");
  const [showInstructions, setShowInstructions] = useState(false);
  const [day, setDay] = useState(1);
  const [meters, setMeters] = useState<Meters>(INITIAL_METERS);
  const [pending, setPending] = useState<PendingEffect[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});

  const currentScenario = SCENARIOS[day - 1];

  const summaryNotes = useMemo(() => summarizeTendencies(tagCounts), [tagCounts]);

  function resetGame() {
    setScreen("title");
    setShowInstructions(false);
    setDay(1);
    setMeters(INITIAL_METERS);
    setPending([]);
    setJournal([]);
    setTagCounts({});
  }

  function startGame() {
    setScreen("playing");
    setShowInstructions(false);
    setDay(1);
    setMeters(INITIAL_METERS);
    setPending([]);
    setJournal([]);
    setTagCounts({});
  }

  function handleChoice(choice: Choice) {
    const withChoice = applyEffects(
      meters,
      choice.effects,
      CHOICE_IMPACT_MULTIPLIER
    );
    const queued = [
      ...pending,
      ...(choice.delayed?.map((effect) => ({
        ...effect,
      })) ?? []),
    ];

    const nextTagCounts = { ...tagCounts };
    choice.tags.forEach((tag) => {
      nextTagCounts[tag] = (nextTagCounts[tag] ?? 0) + 1;
    });

    const currentEntry: JournalEntry = {
      day,
      title: currentScenario.title,
      choice: choice.label,
      note: choice.note,
    };

    if (day === TOTAL_DAYS) {
      setMeters(withChoice);
      setPending(queued);
      setTagCounts(nextTagCounts);
      setJournal((current) => [currentEntry, ...current].slice(0, 8));
      setScreen("summary");
      return;
    }

    const nextDay = day + 1;
    const dueToday = queued.filter((effect) => effect.day === nextDay);
    const later = queued.filter((effect) => effect.day !== nextDay);

    let updatedMeters = applyEffects(withChoice, buildDailyLoad(withChoice));
    dueToday.forEach((effect) => {
      updatedMeters = applyEffects(
        updatedMeters,
        effect.effects,
        CHOICE_IMPACT_MULTIPLIER
      );
    });

    const delayedLabels = dueToday.map((effect) => effect.label);
    const nextEntry =
      delayedLabels.length > 0
        ? { ...currentEntry, appliedLater: delayedLabels }
        : currentEntry;

    setMeters(updatedMeters);
    setPending(later);
    setTagCounts(nextTagCounts);
    setJournal((current) => [nextEntry, ...current].slice(0, 8));
    setDay(nextDay);
  }

  if (screen === "title") {
    return (
      <main className="game-screen game-title-screen min-h-screen bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.22),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#ebf2fb_45%,#dfe8f4_100%)] px-6 py-8 text-slate-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <section className="game-glass-card overflow-hidden rounded-[2rem] border border-sky-100 bg-white/85 p-8 shadow-[0_30px_80px_rgba(44,72,120,0.12)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-sky-800">
                AP Psychology Presentation Game
              </p>
              <div className="flex gap-3 text-sm font-medium">
                <Link
                  href="/"
                  className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:no-underline"
                >
                  Home
                </Link>
                <Link
                  href="/handout"
                  className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:no-underline"
                >
                  Handout
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  A Week with PDD
                </p>
                <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                  Live through seven days shaped by persistent depressive disorder.
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  Persistent Depressive Disorder is a chronic form of depression
                  involving a depressed mood for most of the day for at least 2 years in adults.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  This game is was made to understand how low mood, fatigue, hopelessness, poor
                  concentration, sleep problems, and support systems can shape
                  daily functioning over time.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startGame}
                    className="rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Start the Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInstructions(true)}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    How to Play
                  </button>
                </div>
              </div>

              <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-6 shadow-inner shadow-slate-200/60">
                <h2 className="text-xl font-semibold text-slate-900">
                  Biopsychosocial Perspective
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                  <div>
                    <p className="font-semibold uppercase tracking-[0.14em] text-sky-700">
                      Biological
                    </p>
                    <p>
                      Genetics, neurotransmitter differences, and brain systems
                      involved in mood regulation may contribute to PDD.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-[0.14em] text-sky-700">
                      Psychological
                    </p>
                    <p>
                      Negative thinking patterns, low self-esteem, and reduced
                      coping capacity can keep symptoms going.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-[0.14em] text-sky-700">
                      Environmental
                    </p>
                    <p>
                      Chronic stress, difficult relationships, trauma, and low
                      social support can increase symptom burden over time.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <article className="game-info-card rounded-[1.5rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_40px_rgba(57,81,131,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                What You Track
              </p>
              <p className="mt-3 text-slate-700">
                Mood, energy, stress, and support shift each day based on your
                choices and delayed effects.
              </p>
            </article>
            <article className="game-info-card rounded-[1.5rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_40px_rgba(57,81,131,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Core Idea
              </p>
              <p className="mt-3 text-slate-700">
                Some decisions reduce pressure short term but raise costs later.
                Support and treatment can help gradually rather than instantly.
              </p>
            </article>
            <article className="game-info-card rounded-[1.5rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_40px_rgba(57,81,131,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                Learning Goal
              </p>
              <p className="mt-3 text-slate-700">
                PDD is not laziness or weakness. It is a chronic condition that
                affects functioning across ordinary days.
              </p>
            </article>
          </section>

          {showInstructions ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
              <div className="w-full max-w-2xl rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Instructions
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                      How the week works
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInstructions(false)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-5 space-y-3 text-slate-600">
                  <p>
                    You will move through 7 in-game days. Each day gives you one
                    scenario and 2 to 3 choices.
                  </p>
                  <p>
                    Every choice changes your mood, energy, stress, and support.
                    Some effects happen immediately. Others show up later.
                  </p>
                  <p>
                    There is no perfect ending. The goal is to understand how
                    chronic symptoms can shape everyday life, and how treatment,
                    coping, and support can gradually help.
                  </p>
                
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    );
  }

  if (screen === "summary") {
    const supportStyle =
      meters.support >= 55 ? "more supported" : "still somewhat isolated";
    const functioningStyle =
      meters.energy >= 45 && meters.stress <= 55
        ? "daily functioning became a little steadier"
        : "daily functioning still felt effortful and inconsistent";

    return (
      <main className="game-screen game-summary-screen min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#e9f0f9_100%)] px-6 py-8 text-slate-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <section className="game-glass-card rounded-[2rem] border border-sky-100 bg-white/90 p-8 shadow-[0_28px_70px_rgba(44,72,120,0.12)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  End of Day 7
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Week Summary
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:no-underline"
                >
                  Home
                </Link>
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Restart Game
                </button>
                <Link
                  href="/handout"
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:no-underline"
                >
                  View Handout
                </Link>
              </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {METER_CONFIG.map((meter) => (
                <article
                  key={meter.key}
                  className={`game-meter-card rounded-[1.4rem] border border-slate-200 ${meter.bg} p-4`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {meter.label}
                  </p>
                  <div className="mt-2 text-3xl font-semibold text-slate-950">
                    {meters[meter.key]}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {describeMeter(meters[meter.key], meter.key)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-semibold text-slate-950">
                  What your week showed
                </h2>
                <p className="mt-4 text-slate-700">
                  Across the week, {functioningStyle}. By the end, the character
                  felt {supportStyle}. The chronic nature of PDD stayed present:
                  low mood and low energy did not disappear, but some choices
                  affected how manageable the days felt.
                </p>
                <div className="mt-5 space-y-3 text-slate-700">
                  {summaryNotes.map((note) => (
                    <p
                      key={note}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      {note}
                    </p>
                  ))}
                </div>
                <p className="mt-5 rounded-2xl bg-sky-50 px-4 py-4 text-sky-950">
                  PDD is not laziness or weakness. It is a chronic depressive
                  disorder that can make ordinary tasks feel much heavier while
                  still allowing someone to look functional from the outside.
                </p>
                <p className="mt-4 text-slate-700">
                  Treatment and support can help over time. The game reflects
                  that progress is often gradual, uneven, and built from repeated
                  choices rather than one instant fix.
                </p>
              </article>

              <article className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">
                  How this game represents PDD accurately
                </h2>
                <ul className="mt-4 space-y-3 text-slate-700">
                  <li>
                    It shows PDD as chronic low mood and low energy across
                    ordinary days, not a single dramatic crisis.
                  </li>
                  <li>
                    Choices involve tradeoffs, reflecting how symptoms can make
                    even helpful actions feel effortful.
                  </li>
                  <li>
                    Delayed effects model how withdrawal can worsen isolation and
                    how therapy, routines, and medication help gradually.
                  </li>
                  <li>
                    Support changes outcomes, showing that family, friends, and
                    professionals can affect functioning and recovery.
                  </li>
                  <li>
                    The tone avoids stereotypes and frames PDD as a mental health
                    condition rather than a character flaw.
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-[1.6rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(57,81,131,0.08)]">
              <h2 className="text-2xl font-semibold text-slate-950">
                Biopsychosocial Perspective
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-sky-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sky-700">
                    Biological
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Genetics, neurotransmitters, and brain differences in mood
                    regulation may contribute to persistent depression.
                  </p>
                </div>
                <div className="rounded-2xl bg-violet-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">
                    Psychological
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Hopeless thinking, low self-esteem, and difficulty coping
                    with stress can keep symptoms going.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Environmental
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Stress, family conflict, social pressure, trauma, and low
                    support can make daily functioning harder.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[1.6rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(57,81,131,0.08)]">
              <h2 className="text-2xl font-semibold text-slate-950">
                Week Journal
              </h2>
              <div className="mt-5 space-y-3">
                {journal.map((entry) => (
                  <div
                    key={`${entry.day}-${entry.choice}`}
                    className="game-journal-entry rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Day {entry.day} · {entry.title}
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">{entry.choice}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{entry.note}</p>
                    {entry.appliedLater?.length ? (
                      <p className="mt-2 text-sm text-sky-800">
                        Later effect: {entry.appliedLater.join(" ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="game-screen game-play-screen min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_32%),linear-gradient(180deg,#f9fbfe_0%,#edf3f9_100%)] px-4 py-5 text-slate-900 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="game-glass-card rounded-[1.9rem] border border-white/80 bg-white/88 p-5 shadow-[0_24px_60px_rgba(57,81,131,0.11)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                A Week with PDD
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Day {day} of {TOTAL_DAYS}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Chronic symptoms can shape daily life even when someone looks
                functional from the outside. Each choice has tradeoffs, and some
                effects appear later.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:no-underline"
              >
                Home
              </Link>
              <button
                type="button"
                onClick={() => setShowInstructions(true)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Instructions
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Restart
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)_330px]">
          <aside className="game-side-panel rounded-[1.8rem] border border-white/80 bg-white/88 p-5 shadow-[0_22px_50px_rgba(57,81,131,0.1)]">
            <h2 className="text-lg font-semibold text-slate-950">Status Meters</h2>
            <div className="mt-5 space-y-4">
              {METER_CONFIG.map((meter) => (
                <div className="game-meter-row" key={meter.key}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{meter.label}</span>
                    <span className="font-semibold text-slate-900">
                      {meters[meter.key]}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`game-meter-fill h-full rounded-full bg-gradient-to-r ${meter.tone} transition-all duration-500 ease-out`}
                      style={{ width: `${meters[meter.key]}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                    {describeMeter(meters[meter.key], meter.key)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.4rem] bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Note
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                PDD often involves long-term low mood, fatigue, hopelessness,
                poor concentration, sleep disruption, and low self-esteem. The
                condition can affect everyday functioning even without a dramatic
                outward crisis.
              </p>
            </div>
          </aside>

          <section className="game-scenario-card rounded-[1.8rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(57,81,131,0.1)]">
            <div className="inline-flex rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              Scenario
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              {currentScenario.title}
            </h2>
            <p className="mt-4 text-xl leading-8 text-slate-800">
              {currentScenario.prompt}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {currentScenario.context}
            </p>

            <div className="mt-8 grid gap-4">
              {currentScenario.choices.map((choice) => (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => handleChoice(choice)}
                  className="game-choice-button group rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-[0_16px_40px_rgba(57,81,131,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">
                        {choice.label}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {choice.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 shadow-sm transition group-hover:bg-sky-50">
                      Choose
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="game-side-panel rounded-[1.8rem] border border-white/80 bg-white/88 p-5 shadow-[0_22px_50px_rgba(57,81,131,0.1)]">
            <h2 className="text-lg font-semibold text-slate-950">Journal</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Recent reflections show how choices changed the week over time.
            </p>

            <div className="mt-5 space-y-3">
              {journal.length === 0 ? (
                <div className="rounded-[1.4rem] border border-dashed border-slate-300 px-4 py-5 text-sm leading-6 text-slate-500">
                  No entries yet. After each day, a short journal note will
                  appear here.
                </div>
              ) : (
                journal.map((entry) => (
                  <div
                    key={`${entry.day}-${entry.choice}`}
                    className="game-journal-entry rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Day {entry.day}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{entry.choice}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{entry.note}</p>
                    {entry.appliedLater?.length ? (
                      <p className="mt-2 text-sm leading-6 text-sky-800">
                        Delayed effect: {entry.appliedLater.join(" ")}
                      </p>
                    ) : null}
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 rounded-[1.4rem] bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                Reminder
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-950">
                Helpful choices can cost energy now. Treatment and support are
                shown as gradual influences, not instant cures.
              </p>
            </div>
          </aside>
        </section>
      </div>

      {showInstructions ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-2xl rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Instructions
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                  Play through one week
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="mt-5 space-y-3 text-slate-600">
              <p>
                Each day presents one realistic situation and 2 to 3 choices.
              </p>
              <p>
                Mood and energy begin low to reflect ongoing symptoms. Stress and
                support shift with your decisions, routines, and relationships.
              </p>
              <p>
                Some choices help immediately. Others create delayed benefits or
                delayed costs on future days.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
