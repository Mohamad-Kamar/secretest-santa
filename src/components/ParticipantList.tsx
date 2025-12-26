import { useState } from 'react';
import type { Participant } from '../scripts/secret-santa-algorithm';

interface ParticipantListProps {
  participants: Participant[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

const CHRISTMAS_ICONS = ['🎅', '🎄', '🎁', '❄️', '🦌', '🕯️', '🔔', '⭐'];

export default function ParticipantList({
  participants,
  onAdd,
  onRemove,
  onUpdate,
}: ParticipantListProps) {
  const [newName, setNewName] = useState('');
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName);
      setNewName('');
    }
  };

  const handleRemove = (id: string) => {
    if (participants.length <= 3) {
      // Shake animation for minimum participants
      const index = participants.findIndex((p) => p.id === id);
      if (index !== -1) {
        setShakeIndex(index);
        setTimeout(() => setShakeIndex(null), 600);
      }
      return;
    }
    onRemove(id);
  };

  const getIcon = (index: number) => {
    return CHRISTMAS_ICONS[index % CHRISTMAS_ICONS.length];
  };

  return (
    <div className="participant-list fade-in" style={{ animationDelay: '0.3s' }}>
      <h3>Participants ({participants.length})</h3>

      {participants.length > 0 && (
        <div className="participant-items">
          {participants.map((participant, index) => (
            <div
              key={participant.id}
              className={`participant-item ${shakeIndex === index ? 'shake' : ''}`}
            >
              <span className="participant-number">{index + 1}.</span>
              <span className="participant-icon">{getIcon(index)}</span>
              <input
                type="text"
                className="participant-name-input"
                value={participant.name}
                onChange={(e) => onUpdate(participant.id, e.target.value)}
                placeholder="Participant name"
              />
              <button
                className="btn-remove"
                onClick={() => handleRemove(participant.id)}
                aria-label={`Remove ${participant.name}`}
                disabled={participants.length <= 3}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-participant-form">
        <div className="input-group">
          <input
            type="text"
            className="participant-input"
            placeholder="Add participant name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            maxLength={50}
            autoComplete="off"
            aria-label="Participant name"
          />
          <button type="submit" className="btn-add" title="Add participant" aria-label="Add participant">
            +
          </button>
        </div>
      </form>

      {participants.length === 0 && (
        <p className="helper-text">Add at least 3 participants to get started</p>
      )}
    </div>
  );
}

