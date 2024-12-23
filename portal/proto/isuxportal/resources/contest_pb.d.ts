// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/contest.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Timestamp } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file isuxportal/resources/contest.proto.
 */
export declare const file_isuxportal_resources_contest: GenFile;

/**
 * @generated from message isuxportal.proto.resources.Contest
 */
export declare type Contest = Message<"isuxportal.proto.resources.Contest"> & {
  /**
   * @generated from field: google.protobuf.Timestamp registration_opens_at = 1;
   */
  registrationOpensAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp registration_closes_at = 2;
   */
  registrationClosesAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp starts_at = 3;
   */
  startsAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp freezes_at = 4;
   */
  freezesAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp ends_at = 5;
   */
  endsAt?: Timestamp;

  /**
   * @generated from field: isuxportal.proto.resources.Contest.Status status = 6;
   */
  status: Contest_Status;

  /**
   * @generated from field: bool frozen = 7;
   */
  frozen: boolean;
};

/**
 * Describes the message isuxportal.proto.resources.Contest.
 * Use `create(ContestSchema)` to create a new message.
 */
export declare const ContestSchema: GenMessage<Contest>;

/**
 * @generated from enum isuxportal.proto.resources.Contest.Status
 */
export enum Contest_Status {
  /**
   * @generated from enum value: STANDBY = 0;
   */
  STANDBY = 0,

  /**
   * @generated from enum value: REGISTRATION = 1;
   */
  REGISTRATION = 1,

  /**
   * @generated from enum value: STARTED = 2;
   */
  STARTED = 2,

  /**
   * @generated from enum value: FINISHED = 3;
   */
  FINISHED = 3,
}

/**
 * Describes the enum isuxportal.proto.resources.Contest.Status.
 */
export declare const Contest_StatusSchema: GenEnum<Contest_Status>;

