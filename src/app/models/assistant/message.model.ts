// src/app/models/assistant/message.model.ts

export type MessageType = 'bot' | 'user';
export type MessageContentType = 'text' | 'options' | 'product_card' | 'category_list';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  contentType: MessageContentType;
  timestamp: Date;
  options?: MessageOption[];
  products?: any[]; // Usarás tu modelo Product aquí
  metadata?: any;
}

export interface MessageOption {
  id: string;
  label: string;
  value: any;
  icon?: string;
}

export class MessageBuilder {
  static createBotMessage(
    content: string, 
    contentType: MessageContentType = 'text',
    options?: MessageOption[],
    products?: any[]
  ): Message {
    return {
      id: this.generateId(),
      type: 'bot',
      content,
      contentType,
      timestamp: new Date(),
      options,
      products
    };
  }

  static createUserMessage(content: string): Message {
    return {
      id: this.generateId(),
      type: 'user',
      content,
      contentType: 'text',
      timestamp: new Date()
    };
  }

  private static generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}