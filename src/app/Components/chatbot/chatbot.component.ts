import { Component, inject } from '@angular/core';
import { ChatbotService } from '../../utils/chatbot.service';
import { UserMessage } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  private chatbotService = inject(ChatbotService);
  userMessages: UserMessage[] = [];
  userQuestion: string = '';

  fetchResponse(event: Event) {
    event.preventDefault();
    this.userMessages.push(new UserMessage(this.userQuestion))
    if (this.userMessages?.length > 0) {
      this.chatbotService.getChatbotResponse(this.userMessages).subscribe({
        next: (response) => {
          debugger;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
