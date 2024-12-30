import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findMatchingTutors, createMatch } from '../../lib/matchmaking';
import TutorCard from './TutorCard';
import type { TutorMatch } from '../../types/matchmaking';

const MatchResults = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const [tutors, setTutors] = useState<TutorMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  useEffect(() => {
    loadTutors();
  }, [requestId]);

  const loadTutors = async () => {
    try {
      const matchedTutors = await findMatchingTutors(requestId!);
      setTutors(matchedTutors);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleTutorSelect = async (tutorId: string) => {
    setSelectedTutorId(tutorId);
    try {
      await createMatch(requestId!, tutorId);
      // Navigate to request details or show success message
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select tutor');
    } finally {
      setSelectedTutorId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading matching tutors...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Matching Tutors</h2>
      
      {tutors.length === 0 ? (
        <div className="text-center py-8 text-brown-600">
          No matching tutors found. Please try adjusting your requirements.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onSelect={handleTutorSelect}
              isLoading={selectedTutorId === tutor.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};