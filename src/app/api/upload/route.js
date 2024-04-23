import { storage } from "@/libs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");
    const ext = file.name.split(".").slice(-1)[0];
    const filename = uniqid() + "." + ext;
    const storageRef = ref(storage, "cafeImages/" + filename);

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    return Response.json(downloadURL);
  }
  return Response.json(true);
}
