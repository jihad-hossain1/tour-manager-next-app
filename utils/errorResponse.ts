import toast from "react-hot-toast";

export function errorResponse(response: any) {
  let error_message = response?.data?.split(":")[0].trim() as any;
  toast.error(error_message);
  return;
}
