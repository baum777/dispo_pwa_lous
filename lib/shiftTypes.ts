export type ShiftStaffMember = {
  name: string;
  whatsappNumber?: string;
};

export type Shift = {
  id: string;
  date: string;
  weekday: string;
  timeRange: string;
  locationName: string;
  locationContactEmail: string;
  eventName: string;
  detailsPdfUrl?: string;
  staff: ShiftStaffMember[];
};

export type RepairFormPayload = {
  name: string;
  location: string;
  area: string;
  item: string;
  description: string;
  file?: File;
};

export type FeedbackFormPayload = {
  message: string;
  wantsReply?: boolean;
  email?: string;
};
