// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/env_check.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Timestamp } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file isuxportal/resources/env_check.proto.
 */
export declare const file_isuxportal_resources_env_check: GenFile;

/**
 * @generated from message isuxportal.proto.resources.EnvCheck
 */
export declare type EnvCheck = Message<"isuxportal.proto.resources.EnvCheck"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: int64 team_id = 2;
   */
  teamId: bigint;

  /**
   * @generated from field: string name = 3;
   */
  name: string;

  /**
   * @generated from field: string ip_address = 4;
   */
  ipAddress: string;

  /**
   * @generated from field: bool passed = 5;
   */
  passed: boolean;

  /**
   * @generated from field: string message = 6;
   */
  message: string;

  /**
   * @generated from field: string admin_message = 7;
   */
  adminMessage: string;

  /**
   * @generated from field: string raw_data = 8;
   */
  rawData: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 9;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 10;
   */
  updatedAt?: Timestamp;
};

/**
 * Describes the message isuxportal.proto.resources.EnvCheck.
 * Use `create(EnvCheckSchema)` to create a new message.
 */
export declare const EnvCheckSchema: GenMessage<EnvCheck>;

/**
 * @generated from enum isuxportal.proto.resources.EnvCheckStatus
 */
export enum EnvCheckStatus {
  /**
   * @generated from enum value: PREPARING = 0;
   */
  PREPARING = 0,

  /**
   * @generated from enum value: NOT_STARTED = 1;
   */
  NOT_STARTED = 1,

  /**
   * obtained instance ip successfully
   *
   * @generated from enum value: CREATED_INSTANCE = 2;
   */
  CREATED_INSTANCE = 2,

  /**
   * confirmed ssh
   *
   * @generated from enum value: DONE = 3;
   */
  DONE = 3,
}

/**
 * Describes the enum isuxportal.proto.resources.EnvCheckStatus.
 */
export declare const EnvCheckStatusSchema: GenEnum<EnvCheckStatus>;
