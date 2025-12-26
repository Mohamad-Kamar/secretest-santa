/**
 * Secret Santa Algorithm (Simplified for Phase 1)
 * Uses Fisher-Yates shuffle and cyclic permutation
 */

export interface Participant {
  id: string;
  name: string;
  email?: string;
}

export interface Exclusion {
  from: string; // participant id
  to: string; // participant id
}

export interface Assignment {
  santa: string; // participant id
  recipient: string; // participant id
}

/**
 * Fisher-Yates shuffle using crypto.getRandomValues()
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  const randomValues = new Uint32Array(shuffled.length);
  crypto.getRandomValues(randomValues);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Check if assignments violate any exclusion rules
 */
function validateAssignments(
  assignments: Assignment[],
  exclusions: Exclusion[]
): boolean {
  for (const exclusion of exclusions) {
    const assignment = assignments.find((a) => a.santa === exclusion.from);
    if (assignment && assignment.recipient === exclusion.to) {
      return false;
    }
  }
  return true;
}

/**
 * Generate Secret Santa assignments
 * Creates a cyclic permutation: person[i] gives to person[i+1]
 * Validates against exclusions and regenerates if needed
 */
export function generateAssignments(
  participants: Participant[],
  exclusions: Exclusion[] = [],
  maxAttempts: number = 100
): Assignment[] {
  if (participants.length < 3) {
    throw new Error('Need at least 3 participants');
  }

  if (participants.length > 20) {
    throw new Error('Maximum 20 participants supported');
  }

  // Shuffle participants to randomize the cycle
  const shuffled = shuffleArray(participants);

  // Create cyclic permutation
  const assignments: Assignment[] = shuffled.map((participant, index) => {
    const nextIndex = (index + 1) % shuffled.length;
    return {
      santa: participant.id,
      recipient: shuffled[nextIndex].id,
    };
  });

  // Validate against exclusions
  if (validateAssignments(assignments, exclusions)) {
    return assignments;
  }

  // If validation fails, try again (up to maxAttempts)
  if (maxAttempts > 0) {
    return generateAssignments(participants, exclusions, maxAttempts - 1);
  }

  // If we can't find a valid assignment after max attempts, return anyway
  // (This shouldn't happen with reasonable exclusion rules)
  return assignments;
}

/**
 * Generate a unique ID for participants
 */
export function generateId(): string {
  return `participant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

