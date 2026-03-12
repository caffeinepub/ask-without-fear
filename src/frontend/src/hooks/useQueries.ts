import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitDoubt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      category,
      message,
    }: {
      category: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitDoubt(category, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doubts"] });
    },
  });
}

export function useGetAllDoubts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["doubts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDoubts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendTeacherMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      teacherName,
      studentName,
      message,
    }: {
      teacherName: string;
      studentName: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      // Store as a doubt with teacher-specific category
      return actor.submitDoubt(
        `Teacher: ${teacherName} (from ${studentName})`,
        message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doubts"] });
    },
  });
}
