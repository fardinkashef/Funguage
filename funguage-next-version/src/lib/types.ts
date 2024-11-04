export type course = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type chapter = {
  _id?: string;
  title: string;
  description?: string;
  videoUrl?: string;
  subtitle: {
    url: string;
    name: string;
  };
  isPublished?: boolean;
  position?: number;
  course?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
