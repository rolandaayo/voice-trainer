import { Dimensions } from 'react-native';

export const { width } = Dimensions.get('window');

export const C = {
  bg: '#09090F',
  card: '#111119',
  cardBorder: '#1C1C2E',
  accent: '#7C4DFF',
  accentLight: '#A07AFF',
  accentGlow: 'rgba(124,77,255,0.15)',
  gold: '#FFD166',
  teal: '#06D6A0',
  red: '#FF6B6B',
  white: '#FFFFFF',
  muted: '#7777AA',
  sub: '#AAAACC',
};

export type Screen =
  | 'login'
  | 'register'
  | 'payment'
  | 'home'
  | 'exercise'
  | 'progress'
  | 'profile'
  | 'chat';

export type UserPlan = 'free' | 'monthly' | 'annual';
