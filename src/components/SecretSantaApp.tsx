import { useState, useEffect } from 'react';
import { generateAssignments, generateId, type Participant, type Assignment } from '../scripts/secret-santa-algorithm';
import ParticipantList from './ParticipantList';
import ResultsDisplay from './ResultsDisplay';

interface SecretSantaData {
  eventName: string;
  organizerName: string;
  date: string;
  participants: Participant[];
  assignments: Assignment[] | null;
}

export default function SecretSantaApp() {
  const [data, setData] = useState<SecretSantaData>({
    eventName: '',
    organizerName: '',
    date: '',
    participants: [],
    assignments: null,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('secretSantaData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch (e) {
        console.warn('Failed to load saved data', e);
      }
    }
  }, []);

  // Make fade-in elements visible after React hydration
  // This prevents hydration mismatch while preserving animations
  useEffect(() => {
    const appSection = document.getElementById('app');
    if (appSection) {
      const fadeInElements = appSection.querySelectorAll('.fade-in');
      fadeInElements.forEach((el) => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          el.classList.add('is-visible');
        });
      });
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data.participants.length > 0 || data.eventName) {
      localStorage.setItem('secretSantaData', JSON.stringify(data));
    }
  }, [data]);

  const handleAddParticipant = (name: string) => {
    if (name.trim()) {
      const newParticipant: Participant = {
        id: generateId(),
        name: name.trim(),
      };
      setData((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant],
      }));
      setError(null);
    }
  };

  const handleRemoveParticipant = (id: string) => {
    if (data.participants.length <= 3) {
      setError('Need at least 3 participants');
      return;
    }
    setData((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
      assignments: null, // Clear assignments if participants change
    }));
    setError(null);
  };

  const handleUpdateParticipant = (id: string, name: string) => {
    setData((prev) => ({
      ...prev,
      participants: prev.participants.map((p) =>
        p.id === id ? { ...p, name: name.trim() } : p
      ),
      assignments: null, // Clear assignments if participants change
    }));
  };

  const handleGenerateAssignments = () => {
    if (data.participants.length < 3) {
      setError('Need at least 3 participants');
      return;
    }

    setIsGenerating(true);
    setError(null);

    // Simulate a brief delay for UX
    setTimeout(() => {
      try {
        const assignments = generateAssignments(data.participants);
        setData((prev) => ({ ...prev, assignments }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate assignments');
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all participants and assignments.')) {
      setData({
        eventName: '',
        organizerName: '',
        date: '',
        participants: [],
        assignments: null,
      });
      localStorage.removeItem('secretSantaData');
      setError(null);
    }
  };

  return (
    <section id="app" className="secret-santa-app">
      <div className="container">
        <h2 className="section-title fade-in">Create Your Secret Santa</h2>

        {!data.assignments ? (
          <>
            {/* Setup Form */}
            <div className="setup-form fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input
                  id="eventName"
                  type="text"
                  placeholder="Smith Family Christmas 2025"
                  value={data.eventName}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, eventName: e.target.value }))
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="organizerName">Organizer Name (optional)</label>
                  <input
                    id="organizerName"
                    type="text"
                    placeholder="Your name"
                    value={data.organizerName}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, organizerName: e.target.value }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date (optional)</label>
                  <input
                    id="date"
                    type="date"
                    value={data.date}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Participant List */}
            <ParticipantList
              participants={data.participants}
              onAdd={handleAddParticipant}
              onRemove={handleRemoveParticipant}
              onUpdate={handleUpdateParticipant}
            />

            {/* Error Message */}
            {error && (
              <div className="error-message fade-in" role="alert">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <div className="generate-section fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                className="btn-generate"
                onClick={handleGenerateAssignments}
                disabled={isGenerating || data.participants.length < 3}
                aria-label="Draw names and generate Secret Santa assignments"
              >
                {isGenerating ? (
                  <>
                    <span className="spinner">🎄</span>
                    <span>Drawing Names...</span>
                  </>
                ) : (
                  <>
                    <span>🎁</span>
                    <span>Draw Names!</span>
                  </>
                )}
              </button>
              {data.participants.length < 3 && (
                <p className="helper-text">
                  Add at least 3 participants to continue
                </p>
              )}
            </div>
          </>
        ) : (
          <ResultsDisplay
            participants={data.participants}
            assignments={data.assignments}
            eventName={data.eventName}
            onReset={handleReset}
          />
        )}
      </div>
    </section>
  );
}

