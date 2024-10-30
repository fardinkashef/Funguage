export type course = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type chapter = {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  isPublished?: boolean;
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
