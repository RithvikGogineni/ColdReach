"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './useAuth';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type Plan = 'free' | 'starter' | 'pro' | null;

interface PlanContextType {
  plan: Plan;
  loading: boolean;
  error: string | null;
  upgradePlan: (newPlan: 'free' | 'starter' | 'pro') => Promise<void>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setPlan(null);
      setLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setPlan(doc.data().plan || null);
      } else {
        setPlan(null);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error fetching plan:', err);
      setError('Failed to fetch plan information');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const upgradePlan = async (newPlan: 'free' | 'starter' | 'pro') => {
    if (!user) {
      setError('Must be logged in to upgrade plan');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { plan: newPlan }, { merge: true });
      setPlan(newPlan);
    } catch (err) {
      console.error('Error upgrading plan:', err);
      setError('Failed to upgrade plan');
    }
  };

  return (
    <PlanContext.Provider value={{ plan, loading, error, upgradePlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}

export function useRequirePlan() {
  const { plan, loading } = usePlan();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !plan) {
      router.replace('/pricing');
    }
  }, [plan, loading, router]);

  return { plan, loading };
} 