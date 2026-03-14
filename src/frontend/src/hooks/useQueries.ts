import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// Extended backend interface that includes the answer-related methods
// The auto-generated backend.ts may lag behind the deployed canister
interface FullDoubt {
  id: string;
  message: string;
  timestamp: bigint;
  category: string;
  answer: { __kind__: "Some"; value: string } | { __kind__: "None" };
  answeredBy: { __kind__: "Some"; value: string } | { __kind__: "None" };
  answeredAt: { __kind__: "Some"; value: bigint } | { __kind__: "None" };
}

interface ExtendedActor {
  getAllDoubts(): Promise<FullDoubt[]>;
  getAnsweredDoubts(): Promise<FullDoubt[]>;
  getUnansweredDoubts(): Promise<FullDoubt[]>;
  submitDoubt(category: string, message: string): Promise<string>;
  answerDoubt(
    doubtId: string,
    teacherName: string,
    answer: string,
  ): Promise<void>;
  deleteDoubt(doubtId: string): Promise<void>;
}

export type { FullDoubt as Doubt };

export function useAnsweredDoubts() {
  const { actor, isFetching } = useActor();
  return useQuery<FullDoubt[]>({
    queryKey: ["answeredDoubts"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as ExtendedActor).getAnsweredDoubts();
    },
    enabled: !!actor && !isFetching,
    refetchOnMount: true,
  });
}

export function useUnansweredDoubts() {
  const { actor, isFetching } = useActor();
  return useQuery<FullDoubt[]>({
    queryKey: ["unansweredDoubts"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as ExtendedActor).getUnansweredDoubts();
    },
    enabled: !!actor && !isFetching,
    refetchOnMount: true,
  });
}

export function useAllDoubts() {
  const { actor, isFetching } = useActor();
  return useQuery<FullDoubt[]>({
    queryKey: ["allDoubts"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as ExtendedActor).getAllDoubts();
    },
    enabled: !!actor && !isFetching,
    refetchOnMount: true,
  });
}

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
      return (actor as unknown as ExtendedActor).submitDoubt(category, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unansweredDoubts"] });
      queryClient.invalidateQueries({ queryKey: ["allDoubts"] });
    },
  });
}

export function useAnswerDoubt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      doubtId,
      teacherName,
      answer,
    }: {
      doubtId: string;
      teacherName: string;
      answer: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ExtendedActor).answerDoubt(
        doubtId,
        teacherName,
        answer,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unansweredDoubts"] });
      queryClient.invalidateQueries({ queryKey: ["answeredDoubts"] });
      queryClient.invalidateQueries({ queryKey: ["allDoubts"] });
    },
  });
}

export function useDeleteDoubt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doubtId: string) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ExtendedActor).deleteDoubt(doubtId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unansweredDoubts"] });
      queryClient.invalidateQueries({ queryKey: ["answeredDoubts"] });
      queryClient.invalidateQueries({ queryKey: ["allDoubts"] });
    },
  });
}
