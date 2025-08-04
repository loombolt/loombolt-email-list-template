import { DB } from '@loombolt/db';

// Initialize Loombolt DB client using public key from env
const db = new DB({ publicKey: process.env.NEXT_PUBLIC_LOOMBOLTDB_PUBLIC_KEY! });

// Reference to the 'subscribers' collection defined in init-schema.json
const subscribers = db.collection('subscribers');

export interface Subscriber {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subscribedAt?: string;
}

/**
 * Create a new subscriber record
 */
export async function addSubscriber(data: Omit<Subscriber, 'id' | 'subscribedAt'>) {
  const payload = { ...data, subscribedAt: new Date().toISOString() };
  const { data: record, error } = await subscribers.create(payload);
  if (error) console.error('Error adding subscriber:', error.message);
  return { record, error };
}

/**
 * Check if a subscriber with the same email already exists
 */
export async function findSubscriberByEmail(email: string) {
  const { data, error } = await subscribers.find().eq('email', email).single();
  if (error) console.error('Error finding subscriber:', error.message);
  return { data, error };
}

/**
 * Fetch the latest subscribers limited by count
 */
export async function getLatestSubscribers(limit = 20) {
  const { data, error } = await subscribers.find().order('subscribedAt', { ascending: false }).limit(limit);
  if (error) console.error('Error fetching subscribers:', error.message);
  return { data, error };
}
