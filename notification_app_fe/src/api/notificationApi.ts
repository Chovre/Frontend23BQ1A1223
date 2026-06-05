import type { Notification, NotificationType } from '../types/notification';

// Use the exact data from your API response
const API_RESPONSE_DATA = {
  "notifications": [
    {
      "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
      "Type": "Result",
      "Message": "mid-sem",
      "Timestamp": "2026-04-22 17:51:30"
    },
    {
      "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
      "Type": "Placement",
      "Message": "CSX Corporation hiring",
      "Timestamp": "2026-04-22 17:51:18"
    },
    {
      "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d",
      "Type": "Event",
      "Message": "farewell",
      "Timestamp": "2026-04-22 17:51:06"
    },
    {
      "ID": "0005513a-142b-4bbc-8678-eefec65e1ede",
      "Type": "Result",
      "Message": "mid-sem",
      "Timestamp": "2026-04-22 17:50:54"
    },
    {
      "ID": "ea836726-c25e-4f21-a72f-544a6af8a37f",
      "Type": "Result",
      "Message": "project-review",
      "Timestamp": "2026-04-22 17:50:42"
    },
    {
      "ID": "003cb427-8fc6-47f7-bb00-be228f6b0d2c",
      "Type": "Result",
      "Message": "external",
      "Timestamp": "2026-04-22 17:50:30"
    },
    {
      "ID": "e5c4ff20-31bf-4d40-8f02-72fda59e8918",
      "Type": "Result",
      "Message": "project-review",
      "Timestamp": "2026-04-22 17:50:18"
    },
    {
      "ID": "1cfce5ee-ad37-4894-8946-d707627176a5",
      "Type": "Event",
      "Message": "tech-fest",
      "Timestamp": "2026-04-22 17:50:06"
    },
    {
      "ID": "cf2885a6-45ac-4ba0-b548-6e9e9d4c52c8",
      "Type": "Result",
      "Message": "project-review",
      "Timestamp": "2026-04-22 17:49:54"
    },
    {
      "ID": "8a7412bd-6065-4d09-8501-a37f11cc848b",
      "Type": "Placement",
      "Message": "Advanced Micro Devices Inc. hiring",
      "Timestamp": "2026-04-22 17:49:42"
    }
  ]
};

// Add priority to notifications based on message content
const addPriorityToNotification = (notification: Notification): Notification => {
  const priorityKeywords = {
    High: ['hiring', 'urgent', 'critical', 'important', 'immediate', 'amd', 'corporation'],
    Medium: ['review', 'mid-sem', 'external', 'fest', 'project'],
    Low: ['farewell', 'event', 'social', 'tech-fest']
  };

  const message = notification.Message.toLowerCase();
  
  if (priorityKeywords.High.some(keyword => message.includes(keyword))) {
    return { ...notification, priority: 'High', isViewed: false };
  } else if (priorityKeywords.Medium.some(keyword => message.includes(keyword))) {
    return { ...notification, priority: 'Medium', isViewed: false };
  } else {
    return { ...notification, priority: 'Low', isViewed: false };
  }
};

export const notificationApi = {
  // Get all notifications - using the exact data from your API response
  getAllNotifications: async (): Promise<Notification[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Using API response data:', API_RESPONSE_DATA);
    
    // Add priority and viewed status to each notification
    const notificationsWithPriority = API_RESPONSE_DATA.notifications.map(
      addPriorityToNotification
    );
    
    // Sort by timestamp (newest first)
    return notificationsWithPriority.sort((a, b) => 
      new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
    );
  },

  // Get priority notifications (High priority only)
  getPriorityNotifications: (notifications: Notification[]): Notification[] => {
    return notifications.filter(notif => notif.priority === 'High');
  },

  // Get notifications by type
  getNotificationsByType: (notifications: Notification[], type: NotificationType): Notification[] => {
    return notifications.filter(notif => notif.Type === type);
  },

  // Mark notification as viewed (local state only)
  markAsViewed: (notifications: Notification[], id: string): Notification[] => {
    return notifications.map(notif =>
      notif.ID === id ? { ...notif, isViewed: true } : notif
    );
  },

  // Get top N notifications
  getTopNNotifications: (notifications: Notification[], limit: number): Notification[] => {
    return notifications.slice(0, limit);
  },

  // Filter notifications by type
  filterByType: (notifications: Notification[], type: NotificationType | 'All'): Notification[] => {
    if (type === 'All') return notifications;
    return notifications.filter(notif => notif.Type === type);
  }
};