import { BenchmarkJob_Status } from "../../proto/isuxportal/resources/benchmark_job_pb";

export const parseBenchmarkJobStatus = (statusString: string | null): BenchmarkJob_Status | null => {
  if (statusString === null || statusString === "") return null;

  const status = +statusString;

  switch (status) {
    case BenchmarkJob_Status.PENDING:
      return BenchmarkJob_Status.PENDING;
    case BenchmarkJob_Status.RUNNING:
      return BenchmarkJob_Status.RUNNING;
    case BenchmarkJob_Status.ERRORED:
      return BenchmarkJob_Status.ERRORED;
    case BenchmarkJob_Status.CANCELLED:
      return BenchmarkJob_Status.CANCELLED;
    case BenchmarkJob_Status.FINISHED:
      return BenchmarkJob_Status.FINISHED;
  }
  console.warn("Unexpected status", status);
  return null;
};
