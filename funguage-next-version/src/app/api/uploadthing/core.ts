import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const handleAuth = () => {
//     const { userId } = auth();
//     if (!userId) {
//         throw new Error("Unauthorized"); // Use `throw` instead of `return new Error()`
//     }
//     return { userId };
// }

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterSubtitle: f({ text: { maxFileSize: "256KB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
