// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/instance_command_execute_request.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { ContestantInstance } from "./contestant_instance_pb";

/**
 * Describes the file isuxportal/resources/instance_command_execute_request.proto.
 */
export declare const file_isuxportal_resources_instance_command_execute_request: GenFile;

/**
 * @generated from message isuxportal.proto.resources.InstanceCommandExecuteRequest
 */
export declare type InstanceCommandExecuteRequest = Message<"isuxportal.proto.resources.InstanceCommandExecuteRequest"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: string command = 2;
   */
  command: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 3;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: int64 total_target_count = 4;
   */
  totalTargetCount: bigint;

  /**
   * @generated from field: int64 total_finished_count = 5;
   */
  totalFinishedCount: bigint;
};

/**
 * Describes the message isuxportal.proto.resources.InstanceCommandExecuteRequest.
 * Use `create(InstanceCommandExecuteRequestSchema)` to create a new message.
 */
export declare const InstanceCommandExecuteRequestSchema: GenMessage<InstanceCommandExecuteRequest>;

/**
 * @generated from message isuxportal.proto.resources.InstanceCommandExecuteRequestResult
 */
export declare type InstanceCommandExecuteRequestResult = Message<"isuxportal.proto.resources.InstanceCommandExecuteRequestResult"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * @generated from field: isuxportal.proto.resources.ContestantInstance target = 2;
   */
  target?: ContestantInstance;

  /**
   * @generated from field: int32 exit_code = 3;
   */
  exitCode: number;

  /**
   * @generated from field: google.protobuf.Timestamp finished_at = 4;
   */
  finishedAt?: Timestamp;
};

/**
 * Describes the message isuxportal.proto.resources.InstanceCommandExecuteRequestResult.
 * Use `create(InstanceCommandExecuteRequestResultSchema)` to create a new message.
 */
export declare const InstanceCommandExecuteRequestResultSchema: GenMessage<InstanceCommandExecuteRequestResult>;

