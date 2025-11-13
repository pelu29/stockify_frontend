import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AssistantService } from '../../services/assistant/assistant.service';
import { ChatState } from '../../models/assistant/assistant.model';
import { MessageOption } from '../../models/assistant/message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistant',
  standalone: true, // 👈 IMPORTANTE: Esto le dice a Angular que es un componente independiente
  imports: [CommonModule, FormsModule], // 👈 Aquí declaras que usa ngIf, ngFor y ngModel
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class AssistantComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  chatState: ChatState = {
    messages: [],
    currentStep: 'welcome',
    isMinimized: true,
    isOpen: false
  };

  messageInput: string = '';
  botAvatar: string = 'assets/images/stocki-bot.png';
  
  private subscription = new Subscription();
  private shouldScrollToBottom = false;

  constructor(private assistantService: AssistantService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.assistantService.chatState$.subscribe(state => {
        this.chatState = state;
        this.shouldScrollToBottom = true;
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleChat(): void {
    this.assistantService.toggleChat();
  }

  minimizeChat(): void {
    this.assistantService.minimizeChat();
  }

  closeChat(): void {
    this.assistantService.closeChat();
  }

  handleOptionClick(option: MessageOption): void {
    if (option.value === 'main_menu') {
      this.assistantService.resetChat();
      this.assistantService.toggleChat();
      return;
    }

    if (this.chatState.currentStep === 'categories') {
      this.assistantService.handleCategorySelection(option.value, option.label);
    } else {
      this.assistantService.handleUserAction(option.value, option.label);
    }
  }

  sendMessage(): void {
    if (this.messageInput.trim()) {
      this.assistantService.sendMessage(this.messageInput.trim());
      this.messageInput = '';
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  handleImageError(event: any): void {
    event.target.src = 'public/images/placeholder-product.png';
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }
}
