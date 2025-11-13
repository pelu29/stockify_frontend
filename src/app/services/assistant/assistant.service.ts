import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, MessageBuilder, MessageOption } from '../../models/assistant/message.model';
import { ChatState, QUICK_ACTIONS, CATEGORIES, STOCKI_CONFIG } from '../../models/assistant/assistant.model';
import { Product } from '../../models/inventario/product.model';
import { PRODUCTS } from '../../models/inventario/mock-products';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private chatState: ChatState = {
    messages: [],
    currentStep: 'welcome',
    isMinimized: true,
    isOpen: false
  };

  private chatStateSubject = new BehaviorSubject<ChatState>(this.chatState);
  public chatState$ = this.chatStateSubject.asObservable();

  constructor() {
    this.initializeChat();
  }

  private initializeChat(): void {
    const welcomeMessage = MessageBuilder.createBotMessage(
      STOCKI_CONFIG.greeting,
      'text'
    );
    
    this.addMessage(welcomeMessage);
    this.showMainMenu();
  }

  private addMessage(message: Message): void {
    this.chatState.messages.push(message);
    this.updateState();
  }

  private updateState(): void {
    this.chatStateSubject.next({ ...this.chatState });
  }

  public toggleChat(): void {
    this.chatState.isOpen = !this.chatState.isOpen;
    if (this.chatState.isOpen) {
      this.chatState.isMinimized = false;
    }
    this.updateState();
  }

  public minimizeChat(): void {
    this.chatState.isMinimized = true;
    this.updateState();
  }

  public closeChat(): void {
    this.chatState.isOpen = false;
    this.chatState.isMinimized = true;
    this.updateState();
  }

  private showMainMenu(): void {
    const options: MessageOption[] = QUICK_ACTIONS.map(action => ({
      id: action.id,
      label: action.label,
      value: action.action,
      icon: action.icon
    }));

    const menuMessage = MessageBuilder.createBotMessage(
      '¿Qué deseas hacer?',
      'options',
      options
    );

    this.addMessage(menuMessage);
    this.chatState.currentStep = 'main_menu';
    this.updateState();
  }

  public handleUserAction(action: string, label: string): void {
    // Añadir mensaje del usuario
    const userMessage = MessageBuilder.createUserMessage(label);
    this.addMessage(userMessage);

    // Procesar acción
    switch (action) {
      case 'view_products':
        this.showCategories();
        break;
      case 'check_stock':
        this.showCategories('stock');
        break;
      case 'view_offers':
        this.showOffers();
        break;
      case 'support':
        this.showSupport();
        break;
      default:
        this.showMainMenu();
    }
  }

  private showCategories(context: string = 'products'): void {
    const options: MessageOption[] = CATEGORIES.map(cat => ({
      id: cat.id,
      label: `${cat.name} ${cat.emoji}`,
      value: cat.dbKey
    }));

    const message = MessageBuilder.createBotMessage(
      context === 'stock' 
        ? 'Selecciona una categoría para consultar el stock:'
        : 'Puedo mostrarte nuestros catálogos disponibles:',
      'options',
      options
    );

    this.addMessage(message);
    this.chatState.currentStep = 'categories';
    this.updateState();
  }

  public handleCategorySelection(categoryKey: string, categoryLabel: string): void {
    const userMessage = MessageBuilder.createUserMessage(categoryLabel);
    this.addMessage(userMessage);

    this.chatState.selectedCategory = categoryKey;
    
    // Filtrar productos por categoría
    const products = PRODUCTS.filter(p => 
      p.categoria.toLowerCase() === categoryKey.toLowerCase() && 
      p.estado === 'Active'
    );
    
    if (products.length > 0) {
      const productsMessage = MessageBuilder.createBotMessage(
        `Aquí tienes ${categoryLabel.toLowerCase() === 'bebidas' ? 'nuestras bebidas' : 
           categoryLabel.toLowerCase() === 'pizza' ? 'nuestras pizzas' : 
           categoryLabel.toLowerCase() === 'burger' ? 'nuestras burgers' : 
           'nuestros ' + categoryLabel.toLowerCase()} más recomendados 😊✨`,
        'product_card',
        undefined,
        products
      );
      
      this.addMessage(productsMessage);
    } else {
      const noProductsMessage = MessageBuilder.createBotMessage(
        `Lo siento, no tenemos ${categoryLabel.toLowerCase()} disponibles en este momento 😔`,
        'text'
      );
      this.addMessage(noProductsMessage);
    }
    
    // Botón para volver al menú
    setTimeout(() => {
      const backMessage = MessageBuilder.createBotMessage(
        '¿Deseas ver otra categoría?',
        'options',
        [{
          id: 'back',
          label: 'Ir al Menú',
          value: 'main_menu'
        }]
      );
      this.addMessage(backMessage);
    }, 1000);
    
    this.chatState.currentStep = 'products';
    this.updateState();
  }

  private showOffers(): void {
    const message = MessageBuilder.createBotMessage(
      'Actualmente no tenemos ofertas disponibles, pero pronto tendremos promociones especiales para ti 🎉',
      'text'
    );
    this.addMessage(message);
    
    setTimeout(() => this.showMainMenu(), 2000);
  }

  private showSupport(): void {
    const message = MessageBuilder.createBotMessage(
      'Para hablar con nuestro equipo de soporte, puedes contactarnos al WhatsApp: +51 999 888 777 o escribirnos a soporte@stockify.pe',
      'text'
    );
    this.addMessage(message);
    
    setTimeout(() => this.showMainMenu(), 3000);
  }

  public sendMessage(text: string): void {
    const userMessage = MessageBuilder.createUserMessage(text);
    this.addMessage(userMessage);

    // Respuesta automática simple
    const botResponse = MessageBuilder.createBotMessage(
      'Gracias por tu mensaje. ¿En qué más puedo ayudarte?',
      'text'
    );
    
    setTimeout(() => {
      this.addMessage(botResponse);
      this.showMainMenu();
    }, 500);
  }

  public resetChat(): void {
    this.chatState = {
      messages: [],
      currentStep: 'welcome',
      isMinimized: true,
      isOpen: false
    };
    this.initializeChat();
  }
}