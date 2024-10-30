// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/admin/unprepared_stats.proto (package isuxportal.proto.services.admin, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Team } from "../../resources/team_pb";

/**
 * Describes the file isuxportal/services/admin/unprepared_stats.proto.
 */
export declare const file_isuxportal_services_admin_unprepared_stats: GenFile;

/**
 * @generated from message isuxportal.proto.services.admin.GetSSHKeyStatsQuery
 */
export declare type GetSSHKeyStatsQuery = Message<"isuxportal.proto.services.admin.GetSSHKeyStatsQuery"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.GetSSHKeyStatsQuery.
 * Use `create(GetSSHKeyStatsQuerySchema)` to create a new message.
 */
export declare const GetSSHKeyStatsQuerySchema: GenMessage<GetSSHKeyStatsQuery>;

/**
 * @generated from message isuxportal.proto.services.admin.GetSSHKeyStatsResponse
 */
export declare type GetSSHKeyStatsResponse = Message<"isuxportal.proto.services.admin.GetSSHKeyStatsResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam items = 1;
   */
  items: GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetSSHKeyStatsResponse.
 * Use `create(GetSSHKeyStatsResponseSchema)` to create a new message.
 */
export declare const GetSSHKeyStatsResponseSchema: GenMessage<GetSSHKeyStatsResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam
 */
export declare type GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam = Message<"isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam"> & {
  /**
   * @generated from field: isuxportal.proto.resources.Team team = 1;
   */
  team?: Team;

  /**
   * @generated from field: repeated int64 unregistered_member_ids = 2;
   */
  unregisteredMemberIds: bigint[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam.
 * Use `create(GetSSHKeyStatsResponse_SSHKeyUnregisteredTeamSchema)` to create a new message.
 */
export declare const GetSSHKeyStatsResponse_SSHKeyUnregisteredTeamSchema: GenMessage<GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam>;

/**
 * @generated from message isuxportal.proto.services.admin.GetDiscordStatsQuery
 */
export declare type GetDiscordStatsQuery = Message<"isuxportal.proto.services.admin.GetDiscordStatsQuery"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.GetDiscordStatsQuery.
 * Use `create(GetDiscordStatsQuerySchema)` to create a new message.
 */
export declare const GetDiscordStatsQuerySchema: GenMessage<GetDiscordStatsQuery>;

/**
 * @generated from message isuxportal.proto.services.admin.GetDiscordStatsResponse
 */
export declare type GetDiscordStatsResponse = Message<"isuxportal.proto.services.admin.GetDiscordStatsResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam items = 1;
   */
  items: GetDiscordStatsResponse_DiscordNotJoinedTeam[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetDiscordStatsResponse.
 * Use `create(GetDiscordStatsResponseSchema)` to create a new message.
 */
export declare const GetDiscordStatsResponseSchema: GenMessage<GetDiscordStatsResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam
 */
export declare type GetDiscordStatsResponse_DiscordNotJoinedTeam = Message<"isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam"> & {
  /**
   * @generated from field: isuxportal.proto.resources.Team team = 1;
   */
  team?: Team;

  /**
   * @generated from field: repeated int64 not_joined_member_ids = 2;
   */
  notJoinedMemberIds: bigint[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam.
 * Use `create(GetDiscordStatsResponse_DiscordNotJoinedTeamSchema)` to create a new message.
 */
export declare const GetDiscordStatsResponse_DiscordNotJoinedTeamSchema: GenMessage<GetDiscordStatsResponse_DiscordNotJoinedTeam>;

/**
 * @generated from message isuxportal.proto.services.admin.GetEnvCheckStatsQuery
 */
export declare type GetEnvCheckStatsQuery = Message<"isuxportal.proto.services.admin.GetEnvCheckStatsQuery"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.GetEnvCheckStatsQuery.
 * Use `create(GetEnvCheckStatsQuerySchema)` to create a new message.
 */
export declare const GetEnvCheckStatsQuerySchema: GenMessage<GetEnvCheckStatsQuery>;

/**
 * @generated from message isuxportal.proto.services.admin.GetEnvCheckStatsResponse
 */
export declare type GetEnvCheckStatsResponse = Message<"isuxportal.proto.services.admin.GetEnvCheckStatsResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.resources.Team items = 1;
   */
  items: Team[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetEnvCheckStatsResponse.
 * Use `create(GetEnvCheckStatsResponseSchema)` to create a new message.
 */
export declare const GetEnvCheckStatsResponseSchema: GenMessage<GetEnvCheckStatsResponse>;
