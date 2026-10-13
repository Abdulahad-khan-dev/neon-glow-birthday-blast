import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  Cake,
  Clock3,
  Gift,
  Heart,
  PartyPopper,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

const surpriseMessages = [
  "🎁 Surprise! You make every moment brighter.",
  "💖 Your smile is basically my favorite notification.",
  "⚡ Warning: Birthday happiness level exceeded!",
  "🌟 You deserve a whole galaxy of beautiful moments.",
  "🎂 Another year, another reason to celebrate YOU!",
  "💫 Keep shining. The world looks better with your light.",
  "🎉 Today is officially your main-character day!",
  "💜 Sending you unlimited love, laughs and good vibes.",
];

const initialWishes = [
  "May your new year be brighter than every neon light! ✨",
  "More adventures, more smiles, more unforgettable memories! 💜",
  "Keep shining and never stop being amazing! ⚡",
];

function getTimeUntilMidnight() {
  const now = new Date();
  const tomorrow = new Date(now);

  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const difference = Math.max(0, tomorrow.getTime() - now.getTime());

  return {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    ),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function NeonBalloon({
  color,
  left,
  top,
  delay,
  messageIndex,
  onPop,
}: {
  color: string;
  left: string;
  top: string;
  delay: number;
  messageIndex: number;
  onPop: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onPop(messageIndex)}
      className="absolute z-10"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay, type: "spring" },
        y: {
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.15,
        rotate: 5,
      }}
      whileTap={{
        scale: 0.7,
      }}
      aria-label="Pop birthday balloon"
    >
      <div
        className="relative flex h-20 w-16 items-center justify-center rounded-[50%] border-2 md:h-28 md:w-24"
        style={{
          background: color,
          borderColor: "rgba(255,255,255,.8)",
          boxShadow: `0 0 15px ${color}, 0 0 35px ${color}, inset -8px -10px 20px rgba(0,0,0,.18)`,
        }}
      >
        <div className="absolute left-3 top-3 h-4 w-2 rounded-full bg-white/70 md:h-6 md:w-3" />

        <span className="text-xs font-bold text-white drop-shadow-lg md:text-sm">
          POP
        </span>
      </div>

      <div
        className="mx-auto h-7 w-px"
        style={{
          background: color,
          boxShadow: `0 0 7px ${color}`,
        }}
      />

      <div
        className="mx-auto h-2 w-3 rotate-45"
        style={{
          background: color,
          boxShadow: `0 0 7px ${color}`,
        }}
      />
    </motion.button>
  );
}

export default function NeonGlowBirthday() {
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());
  const [muted, setMuted] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [popped, setPopped] = useState<number[]>([]);
  const [wishes, setWishes] = useState(initialWishes);
  const [wishInput, setWishInput] = useState("");
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const fireConfetti = () => {
    const end = Date.now() + 1800;

    const colors = [
      "#ff00cc",
      "#00e5ff",
      "#8b5cf6",
      "#ffffff",
      "#ffea00",
    ];

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const handleBalloonPop = (index: number) => {
    if (popped.includes(index)) return;

    setPopped((current) => [...current, index]);
    setSelectedMessage(surpriseMessages[index % surpriseMessages.length]);

    confetti({
      particleCount: 70,
      spread: 90,
      origin: {
        x: 0.5,
        y: 0.55,
      },
      colors: ["#ff00cc", "#00e5ff", "#8b5cf6", "#ffffff"],
    });
  };

  const addWish = () => {
    const cleanWish = wishInput.trim();

    if (!cleanWish) return;

    setWishes((current) => [cleanWish, ...current]);
    setWishInput("");

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x: 0.5, y: 0.7 },
    });
  };

  const celebrate = () => {
    setCelebrated(true);
    fireConfetti();

    setTimeout(() => {
      document
        .getElementById("wishes")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const balloons = [
    {
      color: "#ff00cc",
      left: "7%",
      top: "15%",
      delay: 0,
    },
    {
      color: "#00e5ff",
      left: "24%",
      top: "8%",
      delay: 0.3,
    },
    {
      color: "#8b5cf6",
      left: "43%",
      top: "20%",
      delay: 0.6,
    },
    {
      color: "#ffea00",
      left: "62%",
      top: "10%",
      delay: 0.9,
    },
    {
      color: "#ff006e",
      left: "80%",
      top: "18%",
      delay: 1.2,
    },
    {
      color: "#00ff9d",
      left: "14%",
      top: "52%",
      delay: 1.5,
    },
    {
      color: "#7c3aed",
      left: "72%",
      top: "55%",
      delay: 1.8,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#05000f] text-white">
      <div className="scanline" />

     
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-40" />

        <div
          className="glow-pulse absolute -left-40 top-20 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[100px]"
        />

        <div
          className="glow-pulse absolute -right-40 top-60 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px]"
          style={{ animationDelay: "1s" }}
        />

        <div
          className="glow-pulse absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

     
      <header className="glass fixed left-0 right-0 top-0 z-50 border-b border-cyan-400/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                boxShadow: [
                  "0 0 10px #ff00cc",
                  "0 0 25px #00e5ff",
                  "0 0 10px #ff00cc",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-400 bg-fuchsia-500/10"
            >
              <Cake className="h-5 w-5 text-fuchsia-300" />
            </motion.div>

            <div>
              <p className="neon-font text-xs font-bold tracking-[0.22em] text-cyan-300">
                BIRTHDAY
              </p>
              <p className="neon-font text-sm font-black tracking-wider text-white">
                NEON BLAST
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a
              href="#features"
              className="text-white/60 transition hover:text-cyan-300"
            >
              Features
            </a>

            <a
              href="#balloons"
              className="text-white/60 transition hover:text-fuchsia-300"
            >
              Balloon Game
            </a>

            <a
              href="#wishes"
              className="text-white/60 transition hover:text-cyan-300"
            >
              Wish Wall
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMuted((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/50 hover:text-cyan-300"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      
      <main id="home" className="relative z-10">
        <section className="relative flex min-h-screen items-center justify-center px-5 pb-20 pt-32">
          
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-500/10" />

          <div className="rotate-slow pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 border-dashed" />

          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold tracking-wider text-fuchsia-200"
            >
              <Sparkles className="h-4 w-4" />
              HIGH-ENERGY CYBER CELEBRATION
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                type: "spring",
              }}
              className="neon-font text-5xl font-black leading-[1.05] sm:text-6xl md:text-8xl"
            >
              <span className="block text-white">BIRTHDAY</span>

              <span
                className="block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent"
                style={{
                  filter:
                    "drop-shadow(0 0 18px rgba(255,0,204,.55))",
                }}
              >
                BLAST
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/60 md:text-lg"
            >
              An electrifying interactive birthday party portal featuring
              neon laser effects, an interactive balloon popping mini-game,
              birthday wishes, and customized celebratory fanfare.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={celebrate}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-fuchsia-300/60 bg-fuchsia-500/15 px-7 py-4 font-bold text-white shadow-[0_0_30px_rgba(255,0,204,.2)] transition hover:shadow-[0_0_45px_rgba(255,0,204,.45)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-full" />

                <PartyPopper className="relative h-5 w-5 text-fuchsia-300" />
                <span className="relative">START THE BLAST</span>
              </button>

              <a
                href="#balloons"
                className="flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 px-7 py-4 font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/10"
              >
                POP BALLOONS
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mx-auto mt-16 max-w-xl"
            >
              <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-cyan-300">
                <Clock3 className="h-4 w-4" />
                COUNTDOWN TO MIDNIGHT
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["HOURS", countdown.hours],
                  ["MINUTES", countdown.minutes],
                  ["SECONDS", countdown.seconds],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="neon-border glass rounded-2xl p-4"
                  >
                    <div className="neon-font text-3xl font-black text-white md:text-4xl">
                      {pad(Number(value))}
                    </div>

                    <div className="mt-1 text-[9px] font-bold tracking-[0.2em] text-white/40">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="float-animation absolute left-[5%] top-[27%] hidden text-4xl md:block"
            style={{
              filter: "drop-shadow(0 0 15px #ff00cc)",
            }}
          >
            🎈
          </motion.div>

          <motion.div
            className="float-animation absolute right-[7%] top-[34%] hidden text-4xl md:block"
            style={{
              animationDelay: "1s",
              filter: "drop-shadow(0 0 15px #00e5ff)",
            }}
          >
            🎉
          </motion.div>

          <motion.div
            className="float-animation absolute bottom-[15%] left-[12%] hidden text-3xl md:block"
            style={{
              animationDelay: "2s",
              filter: "drop-shadow(0 0 15px #8b5cf6)",
            }}
          >
            ✨
          </motion.div>
        </section>

       
        <section
          id="features"
          className="relative border-t border-white/5 px-5 py-24 md:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="neon-font mb-3 text-xs font-bold tracking-[0.3em] text-fuchsia-300">
                SYSTEM FEATURES
              </p>

              <h2 className="neon-font text-3xl font-black md:text-5xl">
                LET THE PARTY{" "}
                <span className="text-cyan-300">BEGIN</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Gift,
                  number: "01",
                  title: "3D CONFETTI CANNON",
                  description:
                    "Launch a full-screen celebration blast whenever the birthday moment deserves maximum energy.",
                  color: "fuchsia",
                },
                {
                  icon: Sparkles,
                  number: "02",
                  title: "BALLOON SURPRISES",
                  description:
                    "Pop glowing balloons to unlock random personalized birthday messages and surprises.",
                  color: "cyan",
                },
                {
                  icon: Clock3,
                  number: "03",
                  title: "MIDNIGHT COUNTDOWN",
                  description:
                    "A live countdown keeps the excitement going until the clock hits the next birthday moment.",
                  color: "violet",
                },
              ].map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                    }}
                    whileHover={{ y: -8 }}
                    className="glass group relative overflow-hidden rounded-3xl border border-white/10 p-7"
                  >
                    <div className="absolute right-5 top-5 text-5xl font-black text-white/[0.03]">
                      {feature.number}
                    </div>

                    <div
                      className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                        feature.color === "fuchsia"
                          ? "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-300"
                          : feature.color === "cyan"
                            ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300"
                            : "border-violet-400/40 bg-violet-500/10 text-violet-300"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="neon-font text-lg font-bold">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/45">
                      {feature.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-xs font-bold tracking-wider text-white/30">
                      <Zap className="h-3.5 w-3.5" />
                      READY TO ACTIVATE
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BALLOON GAME */}
        <section
          id="balloons"
          className="relative border-t border-white/5 px-5 py-24 md:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <p className="neon-font mb-3 text-xs font-bold tracking-[0.3em] text-cyan-300">
                  MINI GAME
                </p>

                <h2 className="neon-font text-3xl font-black md:text-5xl">
                  POP THE{" "}
                  <span className="text-fuchsia-400">BALLOONS</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                  Every balloon is hiding a tiny birthday surprise. Click
                  them all and discover the messages.
                </p>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/5 px-5 py-3 text-sm">
                <span className="text-white/40">POPPED:</span>{" "}
                <span className="neon-font font-bold text-fuchsia-300">
                  {popped.length}
                </span>{" "}
                <span className="text-white/30">/ {balloons.length}</span>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-black/20 cyber-grid">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.12),transparent_60%)]" />

              {/* laser lines */}
              <motion.div
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute left-1/2 top-0 h-full w-px bg-cyan-400 shadow-[0_0_15px_#00e5ff]"
              />

              <motion.div
                animate={{
                  opacity: [0.1, 0.45, 0.1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="absolute left-0 top-1/2 h-px w-full bg-fuchsia-400 shadow-[0_0_15px_#ff00cc]"
              />

              {balloons.map((balloon, index) => {
                if (popped.includes(index)) {
                  return null;
                }

                return (
                  <NeonBalloon
                    key={index}
                    color={balloon.color}
                    left={balloon.left}
                    top={balloon.top}
                    delay={balloon.delay}
                    messageIndex={index}
                    onPop={handleBalloonPop}
                  />
                );
              })}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-5 py-2 text-center text-xs text-white/40 backdrop-blur">
                CLICK A BALLOON TO POP IT
              </div>

              {popped.length === balloons.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <div className="mb-5 text-6xl">🎉</div>

                    <h3 className="neon-font text-2xl font-black text-cyan-300">
                      ALL BALLOONS POPPED!
                    </h3>

                    <p className="mt-3 text-sm text-white/50">
                      You unlocked every birthday surprise.
                    </p>

                    <button
                      type="button"
                      onClick={() => setPopped([])}
                      className="mt-6 rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-5 py-3 text-sm font-bold text-fuchsia-200"
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* WISH WALL */}
        <section
          id="wishes"
          className="relative border-t border-white/5 px-5 py-24 md:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="neon-font mb-3 text-xs font-bold tracking-[0.3em] text-fuchsia-300">
                BIRTHDAY WISH WALL
              </p>

              <h2 className="neon-font text-3xl font-black md:text-5xl">
                SEND SOME{" "}
                <span className="text-fuchsia-400">LOVE</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45">
                Leave a birthday wish and make this celebration even more
                special.
              </p>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-[1fr_.85fr]">
              <div className="glass rounded-3xl border border-white/10 p-6 md:p-8">
                <label
                  htmlFor="birthday-wish"
                  className="neon-font text-xs font-bold tracking-wider text-cyan-300"
                >
                  YOUR WISH
                </label>

                <textarea
                  id="birthday-wish"
                  value={wishInput}
                  onChange={(event) => setWishInput(event.target.value)}
                  placeholder="Write something beautiful..."
                  rows={6}
                  className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(0,229,255,.08)]"
                />

                <button
                  type="button"
                  onClick={addWish}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-4 text-sm font-bold text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  <Heart className="h-4 w-4" />
                  ADD MY WISH
                </button>
              </div>

              <div className="space-y-3">
                {wishes.map((wish, index) => (
                  <motion.div
                    key={`${wish}-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-2xl border border-white/10 p-5"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 fill-fuchsia-400 text-fuchsia-400" />
                      <span className="text-[10px] font-bold tracking-widest text-white/30">
                        BIRTHDAY WISH
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-white/65">
                      {wish}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONFETTI CANNON */}
        <section className="relative border-t border-white/5 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/5 to-cyan-500/10 p-8 text-center md:p-14"
            >
              <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-[80px]" />
              <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-500/20 blur-[80px]" />

              <div className="relative">
                <div className="mb-6 text-6xl">🎊</div>

                <p className="neon-font text-xs font-bold tracking-[0.3em] text-cyan-300">
                  CONFETTI CANNON
                </p>

                <h2 className="neon-font mt-4 text-3xl font-black md:text-5xl">
                  MAKE IT{" "}
                  <span className="text-fuchsia-400">LOUD</span>
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45">
                  Press the button and unleash the celebration. This is your
                  official permission to make an unreasonable amount of
                  confetti.
                </p>

                <button
                  type="button"
                  onClick={fireConfetti}
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-fuchsia-300/60 bg-fuchsia-500/15 px-8 py-4 font-bold shadow-[0_0_30px_rgba(255,0,204,.2)] transition hover:scale-105 hover:shadow-[0_0_50px_rgba(255,0,204,.4)]"
                >
                  <PartyPopper className="h-5 w-5 text-fuchsia-300" />
                  FIRE CONFETTI CANNON
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL */}
        <section className="relative flex min-h-[75vh] items-center justify-center border-t border-white/5 px-5 py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,204,.1),transparent_50%)]" />

          <div className="relative max-w-3xl">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10"
            >
              <Cake className="h-11 w-11 text-fuchsia-300" />
            </motion.div>

            <p className="neon-font text-xs font-bold tracking-[0.35em] text-cyan-300">
              THE FINAL MESSAGE
            </p>

            <h2 className="neon-font mt-5 text-4xl font-black leading-tight md:text-6xl">
              HAVE THE{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                BEST
              </span>
              <br />
              BIRTHDAY EVER.
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/45 md:text-base">
              May this next chapter be filled with impossible dreams coming
              true, unforgettable adventures, genuine laughter and people who
              make your world glow.
            </p>

            <button
              type="button"
              onClick={celebrate}
              className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-cyan-300/50 bg-cyan-500/10 px-7 py-4 font-bold text-cyan-200 transition hover:bg-cyan-500/20"
            >
              <Sparkles className="h-5 w-5" />
              CELEBRATE AGAIN
            </button>

            <AnimatePresence>
              {celebrated && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-sm font-semibold text-fuchsia-300"
                >
                  🎉 CELEBRATION ACTIVATED — LET THE GOOD TIMES GLOW! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="neon-font text-xs font-bold tracking-[0.2em] text-cyan-300">
              NEON GLOW BIRTHDAY BLAST
            </p>

            <p className="mt-1 text-xs text-white/25">
              Built for unforgettable celebrations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/25">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-fuchsia-500 text-fuchsia-500" />
            <span>& neon energy</span>
          </div>
        </div>
      </footer>

      {/* SURPRISE MODAL */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5 backdrop-blur-md"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 30 }}
              transition={{
                type: "spring",
                damping: 18,
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-fuchsia-400/40 bg-[#0d0320] p-8 text-center shadow-[0_0_80px_rgba(255,0,204,.25)]"
            >
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition hover:text-white"
                aria-label="Close surprise"
              >
                <X className="h-4 w-4" />
              </button>

              <motion.div
                animate={{
                  rotate: [0, -8, 8, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="mx-auto mb-6 text-6xl"
              >
                🎈
              </motion.div>

              <p className="neon-font text-xs font-bold tracking-[0.25em] text-fuchsia-300">
                SURPRISE UNLOCKED
              </p>

              <h3 className="neon-font mt-4 text-xl font-black text-white">
                A MESSAGE FOR YOU
              </h3>

              <p className="mt-6 text-base leading-8 text-white/70">
                {selectedMessage}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedMessage(null);
                  fireConfetti();
                }}
                className="mt-7 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-6 py-3 text-sm font-bold text-cyan-200"
              >
                AWESOME! 🎉                  
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}