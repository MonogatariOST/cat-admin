/**
 * SuiSteps - Step wizard component / 步骤向导组件
 */
import { Check } from "lucide-react";
import { Button } from "@heroui/react";
import type { ReactNode } from "react";

export interface Step {
  title: string;
  description?: string;
  content: ReactNode;
}

export interface SuiStepsProps {
  steps: Step[];
  current: number;
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  finishLabel?: string;
}

export const SuiSteps = ({
  steps, current, onNext, onPrev, onFinish,
  nextLabel = "下一步", prevLabel = "上一步", finishLabel = "完成"
}: SuiStepsProps) => {
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;
  const total = steps.length;
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Step indicators */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isActive = i === current;
            const isCompleted = i < current;
            return (
              <div key={i} className="flex flex-col items-center z-10">
                <div className={
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors " +
                  (isCompleted ? "bg-accent text-accent-foreground" :
                   isActive ? "bg-accent text-accent-foreground ring-2 ring-accent/30" :
                   "bg-surface-tertiary text-foreground-400")
                }>
                  {isCompleted ? <Check size={16} /> : i + 1}
                </div>
                <p className={"mt-1.5 text-xs font-medium " + (isActive ? "text-accent" : "text-foreground-400")}>{step.title}</p>
                {step.description && <p className="text-[10px] text-foreground-400">{step.description}</p>}
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="absolute left-4 right-4 top-4 -z-0 h-0.5 -translate-y-1/2 bg-surface-tertiary">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: progress + "%" }} />
        </div>
      </div>
      {/* Content */}
      <div className="rounded-xl bg-surface p-6">{steps[current].content}</div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" isDisabled={isFirst} onPress={onPrev}>{prevLabel}</Button>
        <div className="text-xs text-foreground-400">{current + 1} / {total}</div>
        {isLast
          ? <Button variant="primary" onPress={onFinish}>{finishLabel}</Button>
          : <Button variant="primary" onPress={onNext}>{nextLabel}</Button>
        }
      </div>
    </div>
  );
};
