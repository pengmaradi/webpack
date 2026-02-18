import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Color themes with gradients
const themes = {
  sunrise: {
    face: 'bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100',
    faceStroke: 'stroke-orange-200/50',
    hourHand: 'stroke-orange-600',
    minuteHand: 'stroke-purple-500',
    secondHand: 'stroke-red-500',
    markers: 'stroke-orange-400/60',
    center: 'fill-gradient-to-br from-orange-400 to-red-500',
    shadow: 'shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)]',
    glow: 'drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]',
  },
  midnight: {
    face: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900',
    faceStroke: 'stroke-blue-800/50',
    hourHand: 'stroke-blue-300',
    minuteHand: 'stroke-purple-300',
    secondHand: 'stroke-cyan-400',
    markers: 'stroke-blue-400/40',
    center: 'fill-gradient-to-br from-blue-400 to-cyan-400',
    shadow: 'shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]',
    glow: 'drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
  forest: {
    face: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50',
    faceStroke: 'stroke-emerald-200/50',
    hourHand: 'stroke-emerald-700',
    minuteHand: 'stroke-teal-600',
    secondHand: 'stroke-amber-600',
    markers: 'stroke-emerald-400/60',
    center: 'fill-gradient-to-br from-emerald-500 to-teal-500',
    shadow: 'shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)]',
    glow: 'drop-shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  sunset: {
    face: 'bg-gradient-to-br from-rose-100 via-pink-100 to-violet-100',
    faceStroke: 'stroke-rose-200/50',
    hourHand: 'stroke-rose-600',
    minuteHand: 'stroke-fuchsia-500',
    secondHand: 'stroke-violet-500',
    markers: 'stroke-pink-400/60',
    center: 'fill-gradient-to-br from-rose-500 to-fuchsia-500',
    shadow: 'shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)]',
    glow: 'drop-shadow-[0_0_20px_rgba(236,72,153,0.2)]',
  },
};

type ThemeKey = keyof typeof themes;

const CLOCK_CONFIG = {
  size: 300,
  padding: 10,
  get center() { return this.size / 2; },
  get radius() { return this.center - this.padding; },
  hourHandLength: 0.5,
  minuteHandLength: 0.7,
  secondHandLength: 0.85,
} as const;

const getHandAngle = (value: number, max: number) => (value / max) * 360;

const ClockFace = ({ theme }: { theme: ThemeKey }) => {
  const { center, radius } = CLOCK_CONFIG;
  const themeColors = themes[theme];

  return (
    <>
      {/* Background glow */}
      <circle
        cx={center}
        cy={center}
        r={radius + 8}
        className={`${themeColors.faceStroke} fill-transparent`}
        strokeWidth="2"
      />
      
      {/* Clock face */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        className={`${themeColors.face} ${themeColors.faceStroke} fill-sky-500/20`}
        strokeWidth="2"
      />

      {/* Minute markers (small dots) */}
      {[...Array(60)].map((_, i) => {
        if (i % 5 === 0) return null; // Skip hour markers
        const angle = (i / 60) * 2 * Math.PI;
        const x = center + Math.sin(angle) * (radius - 8);
        const y = center - Math.cos(angle) * (radius - 8);
        
        return (
          <circle
            key={`minute-${i}`}
            cx={x}
            cy={y}
            r="1"
            className={themeColors.markers}
          />
        );
      })}

      {/* Hour markers with numbers */}
      {[...Array(12)].map((_, i) => {
        const hour = i === 0 ? 12 : i;
        const angle = (i / 12) * 2 * Math.PI;
        const x = center + Math.sin(angle) * (radius - 24);
        const y = center - Math.cos(angle) * (radius - 24);
        const markerX = center + Math.sin(angle) * (radius - 8);
        const markerY = center - Math.cos(angle) * (radius - 8);

        return (
          <g key={`hour-${i}`}>
            {/* Hour marker line */}
            <line
              x1={center + Math.sin(angle) * (radius - 14)}
              y1={center - Math.cos(angle) * (radius - 14)}
              x2={markerX}
              y2={markerY}
              className={themeColors.markers}
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Hour number */}
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              className={`text-xl font-bold fill-current ${themeColors.markers.replace('stroke', 'text')}`}
              style={{ fill: 'currentColor' }}
            >
              {hour}
            </text>
          </g>
        );
      })}
    </>
  );
};

const ClockHands = ({ 
  hourAngle, 
  minuteAngle, 
  secondAngle,
  theme, 
}: { 
  hourAngle: number; 
  minuteAngle: number; 
  secondAngle: number;
  theme: ThemeKey;
}) => {
  const { center, radius } = CLOCK_CONFIG;
  const themeColors = themes[theme];

  return (
    <>
      {/* Hour hand with decorative element */}
      <g transform={`rotate(${hourAngle} ${center} ${center})`}>
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius * CLOCK_CONFIG.hourHandLength}
          className={themeColors.hourHand}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Hour hand accent */}
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius * CLOCK_CONFIG.hourHandLength}
          className="stroke-white/30"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Minute hand with decorative element */}
      <g transform={`rotate(${minuteAngle} ${center} ${center})`}>
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius * CLOCK_CONFIG.minuteHandLength}
          className={themeColors.minuteHand}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Minute hand accent */}
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius * CLOCK_CONFIG.minuteHandLength}
          className="stroke-white/30"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Second hand with smooth animation and tail */}
      <g transform={`rotate(${secondAngle} ${center} ${center})`}>
        {/* Second hand tail */}
        <line
          x1={center}
          y1={center + 20}
          x2={center}
          y2={center + 12}
          className={themeColors.secondHand}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Main second hand */}
        <line
          x1={center}
          y1={center + 12}
          x2={center}
          y2={center - radius * CLOCK_CONFIG.secondHandLength}
          className={themeColors.secondHand}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Second hand tip */}
        <circle
          cx={center}
          cy={center - radius * CLOCK_CONFIG.secondHandLength}
          r="4"
          className={themeColors.secondHand.replace('stroke', 'fill')}
        />
      </g>

      {/* Center cap with gradient effect */}
      <g>
        <circle
          cx={center}
          cy={center}
          r="14"
          className={themeColors.center}
        />
        <circle
          cx={center}
          cy={center}
          r="8"
          className="fill-white/90"
        />
        <circle
          cx={center}
          cy={center}
          r="4"
          className={themeColors.center.replace('fill', 'stroke')}
          strokeWidth="2"
        />
      </g>
    </>
  );
};

const TimeDisplay = ({ time, theme }: { time: Date; theme: ThemeKey }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-CH', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const themeColors = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-8 text-center ${themeColors.markers.replace('stroke', 'text')}`}
    >
      <div className="text-3xl font-bold tracking-wider">
        {formatTime(time)}
      </div>
      <div className="text-sm font-medium opacity-75 mt-2">
        {time.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </motion.div>
  );
};

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('sunrise');
  const [showDigital, setShowDigital] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secondAngle = getHandAngle(seconds, 60);
  const minuteAngle = getHandAngle(minutes, 60);
  const hourAngle = getHandAngle(hours, 12);

  const themeColors = themes[currentTheme];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-600/50 dark:to-gray-400/50">

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Clock Container */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative text-white ${themeColors.glow}`}
        >
          <svg
            width={CLOCK_CONFIG.size}
            height={CLOCK_CONFIG.size}
            viewBox={`0 0 ${CLOCK_CONFIG.size} ${CLOCK_CONFIG.size}`}
            className={`rounded-full ${themeColors.shadow} transition-all duration-300`}
          >
            <ClockFace theme={currentTheme} />
            <ClockHands 
              hourAngle={hourAngle}
              minuteAngle={minuteAngle}
              secondAngle={secondAngle}
              theme={currentTheme}
            />
          </svg>

          {/* Theme indicator ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderImage: `linear-gradient(45deg, ${themeColors.hourHand}, ${themeColors.minuteHand}, ${themeColors.secondHand}) 1`,
            }}
          />
        </motion.div>

        {/* Controls Panel */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200"
        >

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(themes).map(([key]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentTheme(key as ThemeKey)}
                    className={`p-1 rounded-xl transition-all shadow bg-gray-300/90 hover:bg-gray-200/90 ${
                      currentTheme === key 
                        ? 'ring-1 ring-offset-1 ring-sky-500' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="text-sm capitalize text-sky-600">
                      {key}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Toggle Digital Display */}
            <div className="flex items-center justify-between p-3 gap-4 bg-gray-50/50 rounded-lg">
              <span className="text-gray-700 text-sm">Digital Display</span>
              <button type="button"
                onClick={() => setShowDigital(!showDigital)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  showDigital ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-200'
                }`}
                aria-label={showDigital ? 'Hide digital clock' : 'Show digital clock'}
                title={showDigital ? 'Hide digital clock' : 'Show digital clock'}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white/80 rounded-full"
                  animate={{ x: showDigital ? 32 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Digital Time Display */}
      <AnimatePresence>
        {showDigital && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <TimeDisplay time={time} theme={currentTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}