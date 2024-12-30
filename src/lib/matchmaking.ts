import { supabase } from './supabase';
import type { RequestData, MatchResult } from '../types/matchmaking';

export const createTutorRequest = async (requestData: RequestData) => {
  const { data, error } = await supabase
    .from('requests')
    .insert(requestData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const findMatchingTutors = async (requestId: string) => {
  const { data: request, error: requestError } = await supabase
    .from('requests')
    .select(`
      *,
      subjects (
        name,
        category
      )
    `)
    .eq('id', requestId)
    .single();

  if (requestError) throw requestError;

  const { data: tutors, error: tutorsError } = await supabase
    .from('tutors')
    .select(`
      *,
      profiles!inner (
        full_name,
        location
      ),
      tutor_subjects!inner (
        subject_id
      )
    `)
    .eq('tutor_subjects.subject_id', request.subject_id)
    .gte('hourly_rate', request.budget_min)
    .lte('hourly_rate', request.budget_max)
    .eq('verified', true);

  if (tutorsError) throw tutorsError;
  return tutors;
};

export const createMatch = async (requestId: string, tutorId: string): Promise<MatchResult> => {
  const { data, error } = await supabase
    .from('matches')
    .insert({
      request_id: requestId,
      tutor_id: tutorId,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};