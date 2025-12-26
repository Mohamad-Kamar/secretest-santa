import { useState, useEffect, useRef } from 'react';
import type { Participant, Assignment } from '../scripts/secret-santa-algorithm';
import ConfettiEffect from './ConfettiEffect';

interface ResultsDisplayProps {
  participants: Participant[];
  assignments: Assignment[];
  eventName: string;
  onReset: () => void;
}

export default function ResultsDisplay({
  participants,
  assignments,
  eventName,
  onReset,
}: ResultsDisplayProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [confettiKey, setConfettiKey] = useState(0);
  const resultsDisplayRef = useRef<HTMLDivElement>(null);

  const getParticipantName = (id: string) => {
    return participants.find((p) => p.id === id)?.name || 'Unknown';
  };

  const getAssignment = (participantId: string): Assignment | undefined => {
    return assignments.find((a) => a.santa === participantId);
  };

  const handleCardFlip = (participantId: string) => {
    if (revealed.has(participantId)) return;

    setRevealed((prev) => new Set(prev).add(participantId));
    // Trigger confetti after a short delay (at flip midpoint)
    setTimeout(() => {
      setConfettiKey((prev) => prev + 1);
    }, 300);
  };

  const handleRevealAll = () => {
    if (
      confirm(
        'Are you sure you want to reveal all assignments at once? This will show everyone their Secret Santa.'
      )
    ) {
      const allIds = new Set(participants.map((p) => p.id));
      setRevealed(allIds);
      setConfettiKey((prev) => prev + 1);
    }
  };

  const handleCopyResults = async () => {
    const results = participants
      .map((p) => {
        const assignment = getAssignment(p.id);
        if (!assignment) return null;
        const recipient = getParticipantName(assignment.recipient);
        return `${p.name} → ${recipient}`;
      })
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(results);
      alert('Results copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const allRevealed = revealed.size === participants.length;
  const revealedCount = revealed.size;

  // Make fade-in elements visible immediately on mount
  useEffect(() => {
    if (resultsDisplayRef.current) {
      const element = resultsDisplayRef.current;
      // Add is-visible to the results-display element itself (it has fade-in class)
      requestAnimationFrame(() => {
        if (element.classList.contains('fade-in') && !element.classList.contains('is-visible')) {
          element.classList.add('is-visible');
        }
      });
    }
  }, []); // Run once on mount

  // Handle dynamically added fade-in elements (like completion message)
  useEffect(() => {
    if (resultsDisplayRef.current) {
      const element = resultsDisplayRef.current;
      const fadeInElements = element.querySelectorAll('.fade-in:not(.is-visible)');
      fadeInElements.forEach((el) => {
        requestAnimationFrame(() => {
          el.classList.add('is-visible');
        });
      });
    }
  }, [revealed.size, participants.length]); // Re-run when completion message appears

  return (
    <div ref={resultsDisplayRef} className="results-display fade-in">
      <ConfettiEffect trigger={confettiKey} />

      <div className="results-header">
        <h3>{eventName || 'Secret Santa Results'}</h3>
        <div className="results-progress">
          {revealedCount} of {participants.length} revealed
        </div>
      </div>

      <div className="cards-grid">
        {participants.map((participant) => {
          const assignment = getAssignment(participant.id);
          const isRevealed = revealed.has(participant.id);
          const recipientName = assignment
            ? getParticipantName(assignment.recipient)
            : '';

          return (
            <div
              key={participant.id}
              className={`card-wrapper ${isRevealed ? 'revealed' : ''}`}
              onClick={() => handleCardFlip(participant.id)}
            >
              <div className="card">
                <div className="card-front">
                  <div className="card-icon">🎄</div>
                  <div className="card-name">{participant.name}</div>
                  <div className="card-hint">Click to reveal</div>
                </div>
                <div className="card-back">
                  <div className="card-back-icon">🎁</div>
                  <div className="card-back-text">
                    <span className="card-back-label">Your Secret Santa is:</span>
                    <span className="card-back-name">{recipientName}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="results-actions">
        {!allRevealed && (
          <button className="btn-reveal-all" onClick={handleRevealAll}>
            Reveal All
          </button>
        )}
        <button className="btn-copy" onClick={handleCopyResults}>
          Copy Results
        </button>
        <button className="btn-reset" onClick={onReset}>
          Create Another
        </button>
      </div>

      {allRevealed && (
        <div className="completion-message fade-in">
          <h4>🎉 All assignments revealed!</h4>
          <p>Have fun with your Secret Santa exchange!</p>
        </div>
      )}
    </div>
  );
}

