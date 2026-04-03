import { ASSETS, ANIMATIONS } from "../utils/constants";

export const SCRAPBOOK_ITEMS = [
  {
    id: 1,
    image: ASSETS.vaticanStamp,
    aspect: "aspect-[4/3]",
    alt: "Vatican City Stamp",
    width: "w-[120px] md:w-[160px]",
    backText: "He collects vintage watches for the stories, not the status. Each timepiece is a chapter from someone else's life.",
    interactive: false
  },
  {
    id: 2,
    image: ASSETS.certMockup,
    aspect: "aspect-[16/9]",
    alt: "Fake Birth Certificate",
    width: "w-[240px] md:w-[320px]",
    backText: "At 17, he faked his age to work a call centre job at ₹8,000/month. His mornings? Teaching himself to trade. His evenings? Convincing his manager to let him invest their money.",
    interactive: false
  },
  {
    id: 3,
    image: ASSETS.retroPhone,
    aspect: "aspect-[1/2]",
    alt: "Retro Phone",
    width: "w-[80px] md:w-[120px]",
    backText: "At 14, Nikhil ran a grey-market operation buying and selling used phones. His mother shut it down. The instinct — find a spread, exploit it — never left.",
    interactive: true,
    easterEggLabel: "His mother shut down the phone business. Flushed.",
    lottie: ANIMATIONS.toiletFlush
  },
  {
    id: 4,
    image: ASSETS.scrapbook,
    aspect: "aspect-[3/4]",
    alt: "Young Nikhil Photo",
    width: "w-[160px] md:w-[220px]",
    backText: "Scored 6 out of 100 in Math. Not because he couldn't do it — because he was already thinking about markets. The school wouldn't let him sit his Class 10 boards. He didn't argue. He just left.",
    interactive: false
  },
  {
    id: 5,
    image: ASSETS.raghuram,
    aspect: "aspect-square",
    alt: "Raghuram Kamath Photo",
    width: "w-[140px] md:w-[180px]",
    backText: "Raghuram Kamath. Canara Bank executive. He gave his teenage son his savings to trade with. That leap of faith built a ₹64,800 crore empire.",
    interactive: false
  }
];
