import { 
  users, 
  conversations, 
  messages,
  type User, 
  type InsertUser,
  type Conversation,
  type Message,
  type InsertConversation,
  type InsertMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createConversation(): Promise<Conversation>;
  getConversation(id: number): Promise<Conversation | undefined>;
  getMessages(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private userIdCounter: number;
  private conversationIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.userIdCounter = 1;
    this.conversationIdCounter = 1;
    this.messageIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createConversation(): Promise<Conversation> {
    const id = this.conversationIdCounter++;
    const conversation: Conversation = {
      id,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getMessages(conversationId: number): Promise<Message[]> {
    const messages = Array.from(this.messages.values())
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
    return messages;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = {
      id,
      conversationId: insertMessage.conversationId,
      role: insertMessage.role,
      content: insertMessage.content,
      analysisData: insertMessage.analysisData,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
