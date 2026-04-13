"use client";

import { useMemo, useState } from "react";

// Keep these weird, specific, and fun — no textbook facts.
const WEIRD_FACTS: string[] = [
  // Method & apparatus
  "The method was originally called \"Contrology.\" We are, collectively, glad the rebrand happened.",
  "The Reformer started as bedsprings rigged to hospital cots in a WWI internment camp.",
  "\"The Boomerang\" is a real mat exercise. That is why we picked the name. Also: everyone's going to try the trendy stuff. They always come back.",
  "There are 34 classical mat exercises. Not 33. Not 35. Someone counted, and they were very sure.",
  "The Hundred is called the Hundred because you breathe 100 times. Naming convention: extremely literal.",
  "The Cadillac is named the Cadillac because it was, at the time, the fanciest thing anyone could imagine.",
  "The Wunda Chair was designed to double as actual living room furniture. Mid-century multitasking.",
  "Teasers are called Teasers because they look easy. They are not easy. The name is bullying.",
  "The Magic Circle was reportedly made from a beer keg ring. Classical Pilates: resourceful from day one.",
  "\"Powerhouse\" sounds like a 2006 pre-workout. It means your deep core, glutes, and inner thighs. Respect the powerhouse.",
  "The Short Box series is neither short nor a box. Discuss.",
  "The Spine Corrector looks like a medieval torture device. It is, in fact, very nice to your back.",
  "Footwork is always first. Always. Do not try us.",
  "Apparatus springs are louder than you think. That squeak is part of the experience.",
  "The Reformer has a headrest with three positions. Knowing which one to use is 40% of being a good student.",
  "The Long Stretch Series on the reformer is four exercises that look nearly identical and feel completely different. Classical in a nutshell.",

  // Lineage
  "Romana Kryzanowska kept the classical work alive for decades while the fitness industry tried to water it down. Thanks, Romana.",
  "Jay Grimes reportedly teaches entire classes with maybe twelve words. Economy of cueing is a flex.",
  "Lolita San Miguel was one of only two people personally certified by Joe's own studio to teach. She taught into her 90s.",
  "Mary Bowen trained with Joe, became a Jungian analyst, and called it \"Pilates plus psyche.\" We respect the bit.",
  "Eve Gentry had a radical mastectomy and rebuilt her own mobility using Pilates. The method is for bodies, plural.",
  "Clara ran the original NYC studio with Joe and taught most of the clients.",
  "Clara was the patient one. She's who you can thank for most of the teaching style that survived.",
  "There are only a handful of living \"Elders\" left — people who trained directly with Joe. The number shrinks. The work keeps going.",

  // Classical anecdotes
  "Classical Pilates predates the fitness industry, the core workout trend, and the sports bra. It's older than most of your assumptions.",
  "The classical order isn't arbitrary. Each exercise prepares the body for the next. Skip one and the next one tells on you.",
  "A Pilates session is choreography. Same shape every time. What changes is you.",
  "Before reformers were beautiful blonde wood, they were hospital cots. Never forget the cot era.",
  "Classical Pilates has no music on purpose. Your breath is the metronome.",
  "The full mat order takes about 50 minutes. Designed to fit into a workday — respectfully ahead of its time.",
  "\"Classical\" doesn't mean old-fashioned. It means the original choreography, kept intact.",
  "Pilates was almost exclusively taught to dancers until the 90s. Then Madonna happened. Then everyone else.",

  // Body & breath
  "Breathing is a core exercise. You are doing it right now.",
  "The diaphragm drops about an inch and a half on a full inhale. That is an astonishing amount of real estate.",
  "Your pelvic floor has 14+ muscles doing quiet, serious work under the hood. Classical Pilates is the one workout that actually notices.",
  "Lateral breathing — expanding your ribs sideways — is a skill. Most adults forgot how. Pilates remembers.",
  "Your spine has 33 vertebrae. Classical Pilates has an exercise for basically all of them.",
  "\"Neutral pelvis\" is a vibe and also a measurable thing. Both are correct.",
  "The glutes are the largest muscle group in your body. Pilates is, quietly, a glute sport.",
  "Your fascia is one continuous sheet of connective tissue. Classical Pilates treats the body like it knows this.",
  "The deepest abdominal muscle is the transverse abdominis. It wraps around you like a corset. Polite, but firm.",
  "Your feet have 26 bones each. Footwork on the reformer is basically couples therapy for all of them.",
  "The psoas is the only muscle that connects your spine to your legs. It has feelings. Be nice to it.",
  "Pilates has opinions about your neck. Most of them are: please relax it.",
  "Your diaphragm is a muscle. It gets stronger. Nobody told you that in gym class.",
  "The \"C-curve\" is not slouching. We promise. We can tell the difference.",

  // Studio culture
  "If someone says they \"do Pilates,\" ask if they mean classical. Then grab popcorn.",
  "Pilates instructors can spot a rounded shoulder from across a Whole Foods. It's a gift and a burden.",

  // Emilie & Annie
  "The sisters trained under Rebecca Quinn and Marianne Adams at App State — direct lineage back to Joe and Clara.",
];

function pickOfDay(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % WEIRD_FACTS.length;
}

export default function PilatesWisdom() {
  const [idx, setIdx] = useState(() => pickOfDay());
  const [fading, setFading] = useState(false);
  const fact = useMemo(() => WEIRD_FACTS[idx], [idx]);

  const shuffle = () => {
    setFading(true);
    setTimeout(() => {
      setIdx((i) => (i + 1) % WEIRD_FACTS.length);
      setFading(false);
    }, 200);
  };

  return (
    <div className="max-w-xl mx-auto px-6 text-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-muted/50 mb-2">
        Pilates Fact of the Day
      </p>
      <button
        type="button"
        onClick={shuffle}
        className={`text-xs italic font-serif text-muted/70 hover:text-accent transition-all duration-200 cursor-pointer leading-relaxed ${
          fading ? "opacity-0" : "opacity-100"
        }`}
        aria-label="Shuffle Pilates fact"
      >
        {fact}
      </button>
    </div>
  );
}
