// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/common/me.proto (package isuxportal.proto.services.common, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Team } from "../../resources/team_pb";
import type { Contestant } from "../../resources/contestant_pb";
import type { Contest } from "../../resources/contest_pb";
import type { ContestantInstance } from "../../resources/contestant_instance_pb";

/**
 * Describes the file isuxportal/services/common/me.proto.
 */
export declare const file_isuxportal_services_common_me: GenFile;

/**
 * @generated from message isuxportal.proto.services.common.GetCurrentSessionRequest
 */
export declare type GetCurrentSessionRequest = Message<"isuxportal.proto.services.common.GetCurrentSessionRequest"> & {
};

/**
 * Describes the message isuxportal.proto.services.common.GetCurrentSessionRequest.
 * Use `create(GetCurrentSessionRequestSchema)` to create a new message.
 */
export declare const GetCurrentSessionRequestSchema: GenMessage<GetCurrentSessionRequest>;

/**
 * @generated from message isuxportal.proto.services.common.GetCurrentSessionResponse
 */
export declare type GetCurrentSessionResponse = Message<"isuxportal.proto.services.common.GetCurrentSessionResponse"> & {
  /**
   * @generated from field: isuxportal.proto.resources.Team team = 1;
   */
  team?: Team;

  /**
   * @generated from field: isuxportal.proto.resources.Contestant contestant = 2;
   */
  contestant?: Contestant;

  /**
   * @generated from field: string discord_server_id = 3;
   */
  discordServerId: string;

  /**
   * @generated from field: isuxportal.proto.resources.Contest contest = 4;
   */
  contest?: Contest;

  /**
   * @generated from field: repeated isuxportal.proto.resources.ContestantInstance contestant_instances = 5;
   */
  contestantInstances: ContestantInstance[];

  /**
   * @generated from field: string push_vapid_key = 6;
   */
  pushVapidKey: string;
};

/**
 * Describes the message isuxportal.proto.services.common.GetCurrentSessionResponse.
 * Use `create(GetCurrentSessionResponseSchema)` to create a new message.
 */
export declare const GetCurrentSessionResponseSchema: GenMessage<GetCurrentSessionResponse>;

