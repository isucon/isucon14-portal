import {
  GetTeamResponseSchema,
  ListTeamsResponseSchema,
  UpdateTeamRequestSchema,
  UpdateTeamResponseSchema,
  type UpdateTeamRequest,
} from "../../../proto/isuxportal/services/admin/teams_pb";
import { fromBinary, toBinary } from "@bufbuild/protobuf";
import { ApiError, ApiClient } from "../ApiClient";
import { GetCloudFormationResponseSchema } from "../../../proto/isuxportal/services/admin/cloud_formation_pb";
import { ListEnvChecksResponseSchema } from "../../../proto/isuxportal/services/admin/env_checks_pb";
import type { BenchmarkJob_Status } from "../../../proto/isuxportal/resources/benchmark_job_pb";
import {
  CancelBenchmarkJobResponseSchema,
  EnqueueBenchmarkJobRequestSchema,
  EnqueueBenchmarkJobResponseSchema,
  GetBenchmarkJobResponseSchema,
  ListBenchmarkJobsResponseSchema,
  type EnqueueBenchmarkJobRequest,
} from "../../../proto/isuxportal/services/admin/benchmark_pb";
import {
  CreateClarificationRequestSchema,
  CreateClarificationResponseSchema,
  GetClarificationResponseSchema,
  ListClarificationsResponseSchema,
  RespondClarificationRequestSchema,
  RespondClarificationResponseSchema,
  type CreateClarificationRequest,
  type RespondClarificationRequest,
} from "../../../proto/isuxportal/services/admin/clarifications_pb";
import {
  DashboardResponseSchema,
  SoloDashboardResponseSchema,
} from "../../../proto/isuxportal/services/admin/dashboard_pb";
import { ListContestantInstancesResponseSchema } from "../../../proto/isuxportal/services/admin/contestant_instances_pb";
import { GetLeaderboardDumpResponseSchema } from "../../../proto/isuxportal/services/admin/leaderboard_dump_pb";
import {
  GetDiscordStatsResponseSchema,
  GetEnvCheckStatsResponseSchema,
  GetSSHKeyStatsResponseSchema,
} from "../../../proto/isuxportal/services/admin/unprepared_stats_pb";
import {
  GetInstanceCommandExecuteRequestOutputResponseSchema,
  GetInstanceCommandExecuteRequestResponseSchema,
  ListInstanceCommandExecuteRequestsResponseSchema,
  TriggerEnvCheckResponseSchema,
  TriggerInstanceRestartResponseSchema,
} from "../../../proto/isuxportal/services/admin/last_validations_pb";

export class AdminApiClient {
  public apiClient: ApiClient;
  public baseUrl: string;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.baseUrl = this.apiClient.baseUrl;
  }

  public async listTeams() {
    const resp = await this.request(`${this.baseUrl}/api/admin/teams`, "GET", null, null);
    return fromBinary(ListTeamsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getTeam(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/teams/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetTeamResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async updateTeam(payload: UpdateTeamRequest) {
    const payloadMessage = toBinary(UpdateTeamRequestSchema, payload);
    const resp = await this.request(
      `${this.baseUrl}/api/admin/teams/${encodeURIComponent(payload.team!.id.toString())}`,
      "PUT",
      null,
      payloadMessage,
    );
    return fromBinary(UpdateTeamResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getCloudFormation(id: bigint, type: "test" | "qualify") {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/teams/${encodeURIComponent(id.toString())}/cloud_formation?type=${encodeURIComponent(type)}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetCloudFormationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listEnvChecks(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/teams/${encodeURIComponent(id.toString())}/env_checks`,
      "GET",
      null,
      null,
    );
    return fromBinary(ListEnvChecksResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listBenchmarkJobs(
    teamId?: bigint | null,
    status?: BenchmarkJob_Status,
    failedOnly?: boolean,
    page?: number,
  ) {
    const query: Record<string, string> = {
      teamId: teamId?.toString() ?? "",
      status: status?.toString() ?? "",
      failedOnly: failedOnly ? "1" : "0",
      page: page?.toString() ?? "",
    };
    const resp = await this.request(`${this.baseUrl}/api/admin/benchmark_jobs`, "GET", query, null);
    return fromBinary(ListBenchmarkJobsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async enqueueBenchmarkJob(payload: EnqueueBenchmarkJobRequest) {
    const payloadMessage = toBinary(EnqueueBenchmarkJobRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/admin/benchmark_jobs`, "POST", null, payloadMessage);
    return fromBinary(EnqueueBenchmarkJobResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getBenchmarkJob(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/benchmark_jobs/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetBenchmarkJobResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async cancelBenchmarkJob(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/benchmark_jobs/${encodeURIComponent(id.toString())}`,
      "DELETE",
      null,
      null,
    );
    return fromBinary(CancelBenchmarkJobResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listClarifications(teamId?: bigint, unansweredOnly?: boolean) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/clarifications?team_id=${encodeURIComponent(teamId?.toString() ?? "")}&unanswered_only=${
        unansweredOnly ? "1" : "0"
      }`,
      "GET",
      null,
      null,
    );
    return fromBinary(ListClarificationsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getClarification(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/clarifications/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetClarificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async respondClarification(payload: RespondClarificationRequest) {
    const payloadMessage = toBinary(RespondClarificationRequestSchema, payload);
    const resp = await this.request(
      `${this.baseUrl}/api/admin/clarifications/${encodeURIComponent(payload.id!.toString())}`,
      "PUT",
      null,
      payloadMessage,
    );
    return fromBinary(RespondClarificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async createClarification(payload: CreateClarificationRequest) {
    const payloadMessage = toBinary(CreateClarificationRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/admin/clarifications`, "POST", null, payloadMessage);
    return fromBinary(CreateClarificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getDashboard() {
    const resp = await this.request(`${this.baseUrl}/api/admin/dashboard`, "GET", null, null);
    return fromBinary(DashboardResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getDashboardSolo(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/dashboard/teams/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(SoloDashboardResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listContestantInstances(teamId?: bigint | null) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/contestant_instances?team_id=${teamId ? teamId.toString() : ""}`,
      "GET",
      null,
      null,
    );
    return fromBinary(ListContestantInstancesResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getDumpLeaderboard(date: Date | "qualify-end") {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/dump_leaderboard`,
      "GET",
      { when: typeof date === "string" ? date : date.toISOString() },
      null,
    );
    return fromBinary(GetLeaderboardDumpResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  // retrieve admin solo leaderboard items (where contains score history) for specified list of team IDs.
  public async getLeaderboardItems(ids: bigint[]) {
    const result = [];
    for (let i = 0; i < ids.length; i++) {
      try {
        const resp = await this.getDashboardSolo(ids[i]);
        result.push(resp.leaderboardItem!);
      } catch (e) {
        if (e instanceof ApiError) {
          if (e.remoteError?.code === 404) {
            continue;
          }
        }
        throw e;
      }
    }
    return result;
  }

  public async getSSHKeyStats() {
    const resp = await this.request(`${this.baseUrl}/api/admin/unprepared_stats/ssh_key_stats`, "GET", null, null);
    return fromBinary(GetSSHKeyStatsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getDiscordStats() {
    const resp = await this.request(`${this.baseUrl}/api/admin/unprepared_stats/discord_stats`, "GET", null, null);
    return fromBinary(GetDiscordStatsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getEnvCheckStats() {
    const resp = await this.request(`${this.baseUrl}/api/admin/unprepared_stats/env_check_stats`, "GET", null, null);
    return fromBinary(GetEnvCheckStatsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listInstanceCommandExecuteRequests() {
    const resp = await this.request(`${this.baseUrl}/api/admin/instance_command_execute_requests`, "GET", null, null);
    return fromBinary(ListInstanceCommandExecuteRequestsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getInstanceCommandExecuteRequest(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/instance_command_execute_requests/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetInstanceCommandExecuteRequestResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getInstanceCommandExecuteRequestOutput(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/admin/instance_command_execute_requests/_/${encodeURIComponent(id.toString())}/output`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetInstanceCommandExecuteRequestOutputResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async triggerEnvCheck() {
    const resp = await this.request(`${this.baseUrl}/api/admin/last_validations/env_check`, "POST", null, null);
    return fromBinary(TriggerEnvCheckResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async triggerInstanceRestart() {
    const resp = await this.request(`${this.baseUrl}/api/admin/last_validations/instance_restart`, "POST", null, null);
    return fromBinary(TriggerInstanceRestartResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public request(path: string, method: string, query: object | null, payload: Uint8Array | null) {
    return this.apiClient.request(path, method, query, payload);
  }
}
