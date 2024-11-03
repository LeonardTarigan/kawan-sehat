import { getAllMedicalRecords } from "@/actions/medical-record-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryMedicalRecords(query?: Record<string, string>) {
  const res = useQuery({
    queryKey: ["medical-records"],
    queryFn: async () => {
      const res = await getAllMedicalRecords(query);
      return res;
    },
  });

  return res;
}
