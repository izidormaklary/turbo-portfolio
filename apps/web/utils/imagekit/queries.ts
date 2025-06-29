// import { getUploadAuthParams } from "@imagekit/next/server";
import ImageKit from "imagekit";
const ik = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});
export async function uploadImageToImageKit(
  file: string,
  folder: string,
  fileName: string,
  fileExtension: string
) {
  const uploadRes = await ik.upload({
    file,
    folder,
    fileName: `${fileName}.${fileExtension}`,
  });
  return uploadRes.url;
}
