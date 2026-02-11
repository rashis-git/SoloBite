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
    green: { ring: '#22c55e', bg: '#f0fdf4', text: '#15803d' },
    blue: { ring: '#3b82f6', bg: '#eff6ff', text: '#1d4ed8' },
    amber: { ring: '#f59e0b', bg: '#fffbeb', text: '#b45309' },
    rose: { ring: '#f43f5e', bg: '#fff1f2', text: '#be123c' },
  };

  const colors = colorMap[color] || colorMap.green;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
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
          <span className="text-[10px] text-stone-400">{unit}</span>
        </div>
      </div>
      <span className="text-xs text-stone-500 mt-1">{label}</span>
      <span className="text-[10px] text-stone-400">/ {target}{unit === 'cal' ? '' : 'g'}</span>
    </div>
  );
}
