import { Notification } from "../Entities/notification";
 
 
export const createNotificationHelper = async (  userId:any, jobId:any ) => {
  try {
    if (!userId) return null;

    const notification = Notification.create({
      userId,
      jobId: jobId ?? null,
      isVerified: 0, 
    });

    await notification.save();

    return notification;
  } catch (error) {
    console.error("Notification create error:", error);
    return null;
  }
};
