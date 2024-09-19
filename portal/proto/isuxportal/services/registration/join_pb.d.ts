// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/registration/join.proto (package isuxportal.proto.services.registration, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file isuxportal/services/registration/join.proto.
 */
export declare const file_isuxportal_services_registration_join: GenFile;

/**
 * @generated from message isuxportal.proto.services.registration.JoinTeamRequest
 */
export declare type JoinTeamRequest = Message<"isuxportal.proto.services.registration.JoinTeamRequest"> & {
  /**
   * @generated from field: int64 team_id = 1;
   */
  teamId: bigint;

  /**
   * @generated from field: string invite_token = 2;
   */
  inviteToken: string;

  /**
   * @generated from field: string name = 3;
   */
  name: string;

  /**
   * @generated from field: bool is_student = 4;
   */
  isStudent: boolean;

  /**
   * @generated from field: bool is_in_person = 5;
   */
  isInPerson: boolean;
};

/**
 * Describes the message isuxportal.proto.services.registration.JoinTeamRequest.
 * Use `create(JoinTeamRequestSchema)` to create a new message.
 */
export declare const JoinTeamRequestSchema: GenMessage<JoinTeamRequest>;

/**
 * @generated from message isuxportal.proto.services.registration.JoinTeamResponse
 */
export declare type JoinTeamResponse = Message<"isuxportal.proto.services.registration.JoinTeamResponse"> & {
};

/**
 * Describes the message isuxportal.proto.services.registration.JoinTeamResponse.
 * Use `create(JoinTeamResponseSchema)` to create a new message.
 */
export declare const JoinTeamResponseSchema: GenMessage<JoinTeamResponse>;
