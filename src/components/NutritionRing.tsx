'use client';

interface NutritionRingProps {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
  size?: number;
}

export default function NutritionRing({ label, value, target, unit, color, size = 80 }: NutritionRingProps) {
  const percentage = Math.min((value / target) * 100, 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap: Record<string, { ring: string; bg: string; text: string }> = {
    green: { ring: '#FEA322', bg: '#FFF8EB', text: '#BB6A0A' },
    blue: { ring: '#007771', bg: '#F0FDFB', text: '#234C4C' },
    amber: { ring: '#FCC44A', bg: '#FFF8EB', text: '#98520F' },
    rose: { ring: '#f43f5e', bg: '#fff1f2', text: '#be123c' },
  };

  const colors = colorMap[color] || colorMap.green;

  return (
    <div
      className="flex flex-col items-center"
      role="meter"
      aria-label={`${label}: ${value} ${unit === 'cal' ? 'calories' : `grams of ${label.toLowerCase()}`} of ${target} target`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={target}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.bg}
            strokeWidth={6}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.ring}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="nutrition-ring transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold" style={{ color: colors.text }}>
            {value}
          </span>
          <span className="text-[10px] text-warm-400">{unit}</span>
        </div>
      </div>
      <span className="text-xs text-warm-500 mt-1">{label}</span>
      <span className="text-[10px] text-warm-400">/ {target}{unit === 'cal' ? '' : 'g'}</span>
    </div>
  );
}
