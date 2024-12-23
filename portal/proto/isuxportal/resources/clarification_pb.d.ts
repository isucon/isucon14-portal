// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/clarification.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Team } from "./team_pb";

/**
 * Describes the file isuxportal/resources/clarification.proto.
 */
export declare const file_isuxportal_resources_clarification: GenFile;

/**
 * @generated from message isuxportal.proto.resources.Clarification
 */
export declare type Clarification = Message<"isuxportal.proto.resources.Clarification"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: int64 team_id = 2;
   */
  teamId: bigint;

  /**
   * @generated from field: bool answered = 3;
   */
  answered: boolean;

  /**
   * @generated from field: bool disclosed = 4;
   */
  disclosed: boolean;

  /**
   * @generated from field: string question = 5;
   */
  question: string;

  /**
   * @generated from field: string answer = 6;
   */
  answer: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 7;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp answered_at = 8;
   */
  answeredAt?: Timestamp;

  /**
   * @generated from field: string original_question = 9;
   */
  originalQuestion: string;

  /**
   * @generated from field: bool admin = 10;
   */
  admin: boolean;

  /**
   * @generated from field: isuxportal.proto.resources.Team team = 16;
   */
  team?: Team;
};

/**
 * Describes the message isuxportal.proto.resources.Clarification.
 * Use `create(ClarificationSchema)` to create a new message.
 */
export declare const ClarificationSchema: GenMessage<Clarification>;

