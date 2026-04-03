import { Sun, UtensilsCrossed, Rocket, Mic, TrendingUp, Moon, Sunrise, BookOpen } from "lucide-react";

export const TIMELINE_DATA = [
  {
    time: "05:30",
    title: "The Wake",
    desc: "Up before Bangalore's auto drivers. No alarm — his body just knows.",
    icon: Sunrise,
    anim: "sunrise"
  },
  {
    time: "06:00",
    title: "The Stare",
    desc: "20 minutes of sun-gazing. Pseudoscience? Maybe. But his retinas remain.",
    icon: Sun,
    anim: null
  },
  {
    time: "06:30",
    title: "The Read",
    desc: "1–2 books a week. Taleb, Thiel, Ram Dass. Anti-fragile, contrarian, ego-dissolved.",
    icon: BookOpen,
    anim: "coffee"
  },
  {
    time: "08:00",
    title: "The Fast",
    desc: "Intermittent fasting until noon. 'If I eat, I think slower.'",
    icon: UtensilsCrossed,
    anim: null
  },
  {
    time: "10:00",
    title: "The Build",
    desc: "Zerodha, True Beacon, Gruhas, WTFund. Rotating between empires.",
    icon: Rocket,
    anim: null
  },
  {
    time: "14:00",
    title: "The Pod",
    desc: "WTF is... with Modi, Gates, Musk. The dropout who interviews world leaders.",
    icon: Mic,
    anim: null
  },
  {
    time: "18:00",
    title: "The Invest",
    desc: "₹400 crore in Radico Khaitan. 5% of SRK's whisky brand. The anti-thesis of passive income.",
    icon: TrendingUp,
    anim: null
  },
  {
    time: "22:00",
    title: "The Fade",
    desc: "No alcohol. Measures air quality in hotel gyms. Asleep by 10:30.",
    icon: Moon,
    anim: null
  }
];
