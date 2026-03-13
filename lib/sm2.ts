// SM-2 spaced repetition algorithm
export interface SM2State {
  interval: number;       // days until next review
  easeFactor: number;     // ease multiplier (min 1.3)
  repetitions: number;    // total reviews
  nextReviewDate: string; // ISO date string
}

// rating: 1-10 → mapped to SM-2 quality 0-5
function ratingToQuality(rating: number): number {
  if (rating <= 2) return 0;
  if (rating <= 4) return 1;
  if (rating <= 5) return 2;
  if (rating <= 6) return 3;
  if (rating <= 8) return 4;
  return 5;
}

export function applyReview(state: SM2State, rating: number): SM2State {
  const q = ratingToQuality(rating);
  let { interval, easeFactor, repetitions } = state;

  if (q < 3) {
    // Failed — restart
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);

    repetitions++;
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  }

  const next = new Date();
  next.setDate(next.getDate() + interval);

  return {
    interval,
    easeFactor,
    repetitions,
    nextReviewDate: next.toISOString().split('T')[0],
  };
}

export function defaultSM2State(): SM2State {
  const today = new Date().toISOString().split('T')[0];
  return {
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: today,
  };
}
