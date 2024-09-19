// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/team.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Contestant } from "./contestant_pb";

/**
 * Describes the file isuxportal/resources/team.proto.
 */
export declare const file_isuxportal_resources_team: GenFile;

/**
 * @generated from message isuxportal.proto.resources.Team
 */
export declare type Team = Message<"isuxportal.proto.resources.Team"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: int64 leader_id = 3;
   */
  leaderId: bigint;

  /**
   * @generated from field: repeated int64 member_ids = 4;
   */
  memberIds: bigint[];

  /**
   * @generated from field: bool final_participation = 5;
   */
  finalParticipation: boolean;

  /**
   * @generated from field: bool hidden = 6;
   */
  hidden: boolean;

  /**
   * @generated from field: bool withdrawn = 7;
   */
  withdrawn: boolean;

  /**
   * @generated from field: bool disqualified = 9;
   */
  disqualified: boolean;

  /**
   * @generated from field: isuxportal.proto.resources.Team.StudentStatus student = 10;
   */
  student?: Team_StudentStatus;

  /**
   * @generated from field: isuxportal.proto.resources.Team.TeamDetail detail = 8;
   */
  detail?: Team_TeamDetail;

  /**
   * @generated from field: isuxportal.proto.resources.Contestant leader = 16;
   */
  leader?: Contestant;

  /**
   * @generated from field: repeated isuxportal.proto.resources.Contestant members = 17;
   */
  members: Contestant[];
};

/**
 * Describes the message isuxportal.proto.resources.Team.
 * Use `create(TeamSchema)` to create a new message.
 */
export declare const TeamSchema: GenMessage<Team>;

/**
 * @generated from message isuxportal.proto.resources.Team.StudentStatus
 */
export declare type Team_StudentStatus = Message<"isuxportal.proto.resources.Team.StudentStatus"> & {
  /**
   * @generated from field: bool status = 1;
   */
  status: boolean;
};

/**
 * Describes the message isuxportal.proto.resources.Team.StudentStatus.
 * Use `create(Team_StudentStatusSchema)` to create a new message.
 */
export declare const Team_StudentStatusSchema: GenMessage<Team_StudentStatus>;

/**
 * @generated from message isuxportal.proto.resources.Team.TeamDetail
 */
export declare type Team_TeamDetail = Message<"isuxportal.proto.resources.Team.TeamDetail"> & {
  /**
   * @generated from field: string email_address = 1;
   */
  emailAddress: string;

  /**
   * @generated from field: string invite_token = 16;
   */
  inviteToken: string;
};

/**
 * Describes the message isuxportal.proto.resources.Team.TeamDetail.
 * Use `create(Team_TeamDetailSchema)` to create a new message.
 */
export declare const Team_TeamDetailSchema: GenMessage<Team_TeamDetail>;
