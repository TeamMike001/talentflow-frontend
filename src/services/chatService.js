import { api } from './api';

class ChatService {
  async getMessages() {
    try {
      const response = await api.get('/api/chat/messages');
      return response;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async getActiveUsers() {
    try {
      const response = await api.get('/api/chat/users/active');
      return response;
    } catch (error) {
      console.error('Error fetching active users:', error);
      return [];
    }
  }
}

export const chatService = new ChatService();