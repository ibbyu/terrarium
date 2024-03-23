import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFileByUrl(url: string) {
  const pathSegments = new URL(url).pathname.split('/');

  const key = pathSegments[pathSegments.length - 1];

  await utapi.deleteFiles(key!);
}
