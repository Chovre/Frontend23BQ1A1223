export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
  isViewed?: boolean;
  priority?: 'High' | 'Medium' | 'Low';
}

export interface ApiResponse {
  notifications: Notification[];
}