import * as Rails from "@rails/ujs";
import { ErrorSchema, type Error as RemoteError } from "../../proto/isuxportal/error_pb";
import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import { ListTeamsResponseSchema } from "../../proto/isuxportal/services/audience/team_list_pb";
import { GetCurrentSessionResponseSchema } from "../../proto/isuxportal/services/common/me_pb";
import {
  DeleteRegistrationResponseSchema,
  GetRegistrationSessionQuerySchema,
  GetRegistrationSessionResponseSchema,
  UpdateRegistrationRequestSchema,
  UpdateRegistrationResponseSchema,
  type GetRegistrationSessionQuery,
  type UpdateRegistrationRequest,
} from "../../proto/isuxportal/services/registration/session_pb";
import {
  CreateTeamRequestSchema,
  CreateTeamResponseSchema,
  type CreateTeamRequest,
} from "../../proto/isuxportal/services/registration/create_team_pb";
import {
  JoinTeamRequestSchema,
  JoinTeamResponseSchema,
  type JoinTeamRequest,
} from "../../proto/isuxportal/services/registration/join_pb";
import { GetEnvCheckInformationResponseSchema } from "../../proto/isuxportal/services/registration/env_check_pb";
import {
  ActivateCouponRequestSchema,
  ActivateCouponResponseSchema,
  type ActivateCouponRequest,
} from "../../proto/isuxportal/services/registration/activate_coupon_pb";
import {
  EnqueueBenchmarkJobRequestSchema,
  EnqueueBenchmarkJobResponseSchema,
  GetBenchmarkJobResponseSchema,
  ListBenchmarkJobsResponseSchema,
  type EnqueueBenchmarkJobRequest,
} from "../../proto/isuxportal/services/contestant/benchmark_pb";
import {
  ListNotificationsResponseSchema,
  SubscribeNotificationRequestSchema,
  SubscribeNotificationResponseSchema,
  UnsubscribeNotificationRequestSchema,
  UnsubscribeNotificationResponseSchema,
} from "../../proto/isuxportal/services/contestant/notifications_pb";
import { SoloDashboardResponseSchema } from "../../proto/isuxportal/services/audience/dashboard_pb";
import {
  ListClarificationsResponseSchema,
  RequestClarificationRequestSchema,
  RequestClarificationResponseSchema,
  type RequestClarificationRequest,
} from "../../proto/isuxportal/services/contestant/clarifications_pb";
import { DashboardResponseSchema } from "../../proto/isuxportal/services/contestant/dashboard_pb";
import { DashboardResponseSchema as AudienceDashboardResponseSchema } from "../../proto/isuxportal/services/audience/dashboard_pb";
import { GetCloudFormationResponseSchema } from "../../proto/isuxportal/services/contestant/cloud_formation_pb";
import { GetAvatarUrlResponseSchema } from "../../proto/isuxportal/services/common/storage_pb";

export class ApiError extends Error {
  public localError: Error;
  public remoteError: RemoteError | null;

  constructor(localError: Error, remoteError: RemoteError | null, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = `ApiError(local=${localError.name},remote=${remoteError && remoteError.name})`;
    this.message = `${localError.message}, ${remoteError && remoteError.humanMessage}`;
    this.localError = localError;
    this.remoteError = remoteError;
  }
}

export class ApiClient {
  public baseUrl: string;

  constructor(baseUrl?: string) {
    if (!baseUrl) {
      const metaBaseUrl = document.querySelector('meta[name="isux:api-base-url"]') as HTMLMetaElement;
      if (!metaBaseUrl) {
        throw new Error("undeterminable base url");
      }
      baseUrl = metaBaseUrl.content;
    }
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  public async listTeams() {
    const resp = await this.request(`${this.baseUrl}/api/audience/teams`, "GET", null, null);
    return fromBinary(ListTeamsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getCurrentSession() {
    const resp = await this.request(`${this.baseUrl}/api/session`, "GET", null, null);
    return fromBinary(GetCurrentSessionResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getRegistrationSession(query?: GetRegistrationSessionQuery) {
    const queryMessage: Record<string, string | null> = {
      teamId: query?.teamId.toString() ?? null,
      inviteToken: query?.inviteToken.toString() ?? null,
      byPassToken: query?.bypassToken.toString() ?? null,
    };
    const resp = await this.request(`${this.baseUrl}/api/registration/session`, "GET", queryMessage ?? null, null);
    return fromBinary(GetRegistrationSessionResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async createTeam(payload: CreateTeamRequest) {
    const payloadMessage = toBinary(CreateTeamRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/registration/team`, "POST", null, payloadMessage);
    return fromBinary(CreateTeamResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async joinTeam(payload: JoinTeamRequest) {
    const payloadMessage = toBinary(JoinTeamRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/registration/contestant`, "POST", null, payloadMessage);
    return fromBinary(JoinTeamResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async updateRegistration(payload: UpdateRegistrationRequest) {
    const payloadMessage = toBinary(UpdateRegistrationRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/registration`, "PUT", null, payloadMessage);
    return fromBinary(UpdateRegistrationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async deleteRegistration() {
    const resp = await this.request(`${this.baseUrl}/api/registration`, "DELETE", null, null);
    return fromBinary(DeleteRegistrationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getEnvCheckInformation() {
    const resp = await this.request(`${this.baseUrl}/api/registration/env_check`, "GET", null, null);
    return fromBinary(GetEnvCheckInformationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getAvatarUrl() {
    const resp = await this.request(`${this.baseUrl}/api/registration/avatar/url`, "GET", null, null);
    return fromBinary(GetAvatarUrlResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async activateCoupon(payload: ActivateCouponRequest) {
    const payloadMessage = toBinary(ActivateCouponRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/registration/coupon`, "PUT", null, payloadMessage);
    return fromBinary(ActivateCouponResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listBenchmarkJobs(limit?: number) {
    const resp = await this.request(
      `${this.baseUrl}/api/contestant/benchmark_jobs?limit=${limit?.toString() || "0"}`,
      "GET",
      null,
      null,
    );
    return fromBinary(ListBenchmarkJobsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async enqueueBenchmarkJob(payload: EnqueueBenchmarkJobRequest) {
    const payloadMessage = toBinary(EnqueueBenchmarkJobRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/contestant/benchmark_jobs`, "POST", null, payloadMessage);
    return fromBinary(EnqueueBenchmarkJobResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getBenchmarkJob(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/contestant/benchmark_jobs/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(GetBenchmarkJobResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getDashboard() {
    const resp = await this.request(`${this.baseUrl}/api/contestant/dashboard`, "GET", null, null);
    return fromBinary(DashboardResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getAudienceDashboard() {
    const resp = await this.request(`${this.baseUrl}/api/audience/dashboard`, "GET", null, null);
    return fromBinary(AudienceDashboardResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getAudienceDashboardSolo(id: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/audience/dashboard/teams/${encodeURIComponent(id.toString())}`,
      "GET",
      null,
      null,
    );
    return fromBinary(SoloDashboardResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listClarifications() {
    const resp = await this.request(`${this.baseUrl}/api/contestant/clarifications`, "GET", null, null);
    return fromBinary(ListClarificationsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async requestClarification(payload: RequestClarificationRequest) {
    const payloadMessage = toBinary(RequestClarificationRequestSchema, payload);
    const resp = await this.request(`${this.baseUrl}/api/contestant/clarifications`, "POST", null, payloadMessage);
    return fromBinary(RequestClarificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async listNotifications(after?: bigint) {
    const resp = await this.request(
      `${this.baseUrl}/api/contestant/notifications?after=${after ? encodeURIComponent(after.toString()) : ""}`,
      "GET",
      null,
      null,
    );
    return fromBinary(ListNotificationsResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async subscribeNotification(subscription: PushSubscription) {
    const b64 = (buf: ArrayBuffer | null) => (buf ? btoa(String.fromCharCode(...new Uint8Array(buf))) : null);
    const payloadMessage = toBinary(
      SubscribeNotificationRequestSchema,
      create(SubscribeNotificationRequestSchema, {
        endpoint: subscription.endpoint,
        p256dh: b64(subscription.getKey("p256dh")) ?? undefined,
        auth: b64(subscription.getKey("auth")) ?? undefined,
      }),
    );
    const resp = await this.request(`${this.baseUrl}/api/contestant/push_subscriptions`, "POST", null, payloadMessage);
    return fromBinary(SubscribeNotificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async unsubscribeNotification(subscription: PushSubscription) {
    const payloadMessage = toBinary(
      UnsubscribeNotificationRequestSchema,
      create(UnsubscribeNotificationRequestSchema, { endpoint: subscription.endpoint }),
    );
    const resp = await this.request(
      `${this.baseUrl}/api/contestant/push_subscriptions`,
      "DELETE",
      null,
      payloadMessage,
    );
    return fromBinary(UnsubscribeNotificationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  public async getCloudFormation() {
    const resp = await this.request(`${this.baseUrl}/api/contestant/cloud_formation`, "GET", null, null);
    return fromBinary(GetCloudFormationResponseSchema, new Uint8Array(await resp.arrayBuffer()));
  }

  // contestant getDashboard API returns only informations of a team logged in, so need to combine with getAudienceDashboard and merge them at a client side.
  public async getContestantMergedDashboard(id: bigint) {
    const [contestantBoard, audienceBoard] = await Promise.all([this.getDashboard(), this.getAudienceDashboard()]);

    const contestantLeaderboardItem = contestantBoard.leaderboardItem!;

    const dest = contestantLeaderboardItem.team!.hidden
      ? audienceBoard.leaderboard!.hiddenTeams!
      : audienceBoard.leaderboard!.teams!;

    const idx = dest.findIndex((v) => v.team!.id === contestantLeaderboardItem.team!.id);
    if (idx >= 0) {
      dest.splice(idx, 1, contestantLeaderboardItem);
    } else {
      dest.push(contestantLeaderboardItem);
    }

    dest.sort((a, b) => {
      const as = a.latestScore?.score ?? 0n;
      const bs = b.latestScore?.score ?? 0n;
      const scoreComparision = bs - as;
      if (scoreComparision !== 0n) return Number(scoreComparision);

      const ats = a.latestScore?.markedAt?.seconds ?? 0n;
      const bts = b.latestScore?.markedAt?.seconds ?? 0n;
      const timeSecondsComparison = bts - ats;
      if (timeSecondsComparison !== 0n) return Number(timeSecondsComparison);

      const atn = a.latestScore?.markedAt?.nanos ?? 0;
      const btn = b.latestScore?.markedAt?.nanos ?? 0;
      const timeNanosComparison = btn - atn;
      if (timeNanosComparison !== 0) return timeNanosComparison;

      return 0;
    });

    return audienceBoard;
  }

  // retrieve audience solo leaderboard items (where contains score history) for specified list of team IDs.
  public async getAudienceLeaderboardItems(ids: bigint[]) {
    const result = [];
    for (let i = 0; i < ids.length; i++) {
      try {
        const resp = await this.getAudienceDashboardSolo(ids[i]);
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

  public async request(path: string, method: string, query: object | null, payload: Uint8Array | null) {
    let url = path[0] == "/" ? `${this.baseUrl}${path}` : path;
    const headers = new Headers();
    const opts: RequestInit = { method: method, headers: headers };
    if (query) {
      const queryParams = [];
      for (const [k, v] of Object.entries(query)) {
        const snakeK = k.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`);
        queryParams.push(`${snakeK}=${encodeURIComponent(v as string)}`);
      }
      url += `?${queryParams.join("&")}`;
    }
    headers.append("Accept", "application/protobuf, application/vnd.google.protobuf, text/plain");
    headers.append("X-Csrf-Token", Rails.csrfToken() || "");
    if (payload) {
      opts.body = payload;
      headers.append("Content-Type", "application/vnd.google.protobuf");
    }
    const resp = await fetch(url, opts);
    if (!resp.ok) {
      const contentType = resp.headers.get("Content-Type");

      let err;
      if (
        contentType &&
        contentType.match(/^application\/(vnd\.google\.)?protobuf(; proto=isuxportal\.proto\.Error|; charset=.*)?$/)
      ) {
        const pbError = fromBinary(ErrorSchema, new Uint8Array(await resp.arrayBuffer()));
        err = new ApiError(new Error(`${path} returned error ${resp.status}`), pbError);
      } else {
        err = new ApiError(new Error(`${path} returned error ${resp.status}: ${await resp.text()}`), null);
      }
      console.error(err.localError, err.remoteError);
      throw err;
    }
    return resp;
  }
}
