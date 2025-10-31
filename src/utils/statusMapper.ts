export const statusMapper = (status: string) => {
  const normalized = status?.toLowerCase();
  switch (normalized) {
    case "success":
      return "bg-green-100 text-green-700";
    case "pending":
    case "queued":
    case "processing":
    case "ongoing":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
    case "abandoned":
    case "reversed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};