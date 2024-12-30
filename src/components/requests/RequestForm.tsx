import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, IndianRupee } from 'lucide-react';
import { createTutorRequest } from '../../lib/matchmaking';
import InputField from '../auth/InputField';
import Button from '../ui/Button';
import FormError from '../auth/FormError';

const RequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject_id: '',
    grade: '',
    budget_min: '',
    budget_max: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const request = await createTutorRequest({
        ...formData,
        grade: parseInt(formData.grade),
        budget_min: parseInt(formData.budget_min),
        budget_max: parseInt(formData.budget_max)
      });
      navigate(`/parent/requests/${request.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-brown-800 mb-6">Find a Tutor</h2>
      
      {error && <FormError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          icon={BookOpen}
          type="select"
          name="subject_id"
          value={formData.subject_id}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            subject_id: e.target.value
          }))}
          required
        />

        <InputField
          icon={GraduationCap}
          type="number"
          placeholder="Grade (1-12)"
          name="grade"
          value={formData.grade}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            grade: e.target.value
          }))}
          min="1"
          max="12"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={IndianRupee}
            type="number"
            placeholder="Min Budget"
            name="budget_min"
            value={formData.budget_min}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget_min: e.target.value
            }))}
            required
          />

          <InputField
            icon={IndianRupee}
            type="number"
            placeholder="Max Budget"
            name="budget_max"
            value={formData.budget_max}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              budget_max: e.target.value
            }))}
            required
          />
        </div>

        <textarea
          placeholder="Additional requirements or preferences..."
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            description: e.target.value
          }))}
          className="w-full p-3 border border-brown-300 rounded-md"
          rows={4}
        />

        <Button
          type="submit"
          isLoading={isLoading}
          variant="primary"
        >
          Find Tutors
        </Button>
      </form>
    </div>
  );
};