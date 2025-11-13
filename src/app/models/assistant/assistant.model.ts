// src/app/models/assistant/assistant.model.ts
import { Message } from './message.model';

export interface ChatState {
  messages: Message[];
  currentStep: 'welcome' | 'main_menu' | 'categories' | 'products' | 'product_detail';
  selectedCategory?: string;
  isMinimized: boolean;
  isOpen: boolean;
}

export interface AssistantConfig {
  name: string;
  greeting: string;
  avatarUrl?: string;
  primaryColor: string;
  secondaryColor: string;
}

export const STOCKI_CONFIG: AssistantConfig = {
  name: 'Stocki',
  greeting: '¡Hola! 👋 Soy Stocki, tu asistente virtual de Stockify Perú. ¿Qué deseas hacer hoy?',
  primaryColor: '#5B9BF3',
  secondaryColor: '#E8F0FE'
};

export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  action: 'view_products' | 'check_stock' | 'view_offers' | 'support';
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', label: 'Ver productos', action: 'view_products' },
  { id: '2', label: 'Consultar stock', action: 'check_stock' },
  { id: '3', label: 'Ver ofertas', action: 'view_offers' },
  { id: '4', label: 'Hablar con soporte', action: 'support' }
];

export interface CategoryOption {
  id: string;
  name: string;
  emoji: string;
  dbKey: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: '1', name: 'Bebidas', emoji: '🥤', dbKey: 'Bebidas' },
  { id: '2', name: 'Snacks', emoji: '🍿', dbKey: 'Snacks' },
  { id: '3', name: 'Pizza', emoji: '🍕', dbKey: 'Pizza' },
  { id: '4', name: 'Burger', emoji: '🍔', dbKey: 'Burger' }
];