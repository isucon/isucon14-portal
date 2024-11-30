// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/admin/last_validations.proto (package isuxportal.proto.services.admin, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { InstanceCommandExecuteRequest, InstanceCommandExecuteRequestResult } from "../../resources/instance_command_execute_request_pb";

/**
 * Describes the file isuxportal/services/admin/last_validations.proto.
 */
export declare const file_isuxportal_services_admin_last_validations: GenFile;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerEnvCheckRequest
 */
export declare type TriggerEnvCheckRequest = Message<"isuxportal.proto.services.admin.TriggerEnvCheckRequest"> & {
  /**
   * @generated from field: repeated int64 team_ids = 1;
   */
  teamIds: bigint[];
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerEnvCheckRequest.
 * Use `create(TriggerEnvCheckRequestSchema)` to create a new message.
 */
export declare const TriggerEnvCheckRequestSchema: GenMessage<TriggerEnvCheckRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerEnvCheckResponse
 */
export declare type TriggerEnvCheckResponse = Message<"isuxportal.proto.services.admin.TriggerEnvCheckResponse"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerEnvCheckResponse.
 * Use `create(TriggerEnvCheckResponseSchema)` to create a new message.
 */
export declare const TriggerEnvCheckResponseSchema: GenMessage<TriggerEnvCheckResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerInstanceRestartRequest
 */
export declare type TriggerInstanceRestartRequest = Message<"isuxportal.proto.services.admin.TriggerInstanceRestartRequest"> & {
  /**
   * @generated from field: repeated int64 team_ids = 1;
   */
  teamIds: bigint[];
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerInstanceRestartRequest.
 * Use `create(TriggerInstanceRestartRequestSchema)` to create a new message.
 */
export declare const TriggerInstanceRestartRequestSchema: GenMessage<TriggerInstanceRestartRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerInstanceRestartResponse
 */
export declare type TriggerInstanceRestartResponse = Message<"isuxportal.proto.services.admin.TriggerInstanceRestartResponse"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerInstanceRestartResponse.
 * Use `create(TriggerInstanceRestartResponseSchema)` to create a new message.
 */
export declare const TriggerInstanceRestartResponseSchema: GenMessage<TriggerInstanceRestartResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerBenchmarksRequest
 */
export declare type TriggerBenchmarksRequest = Message<"isuxportal.proto.services.admin.TriggerBenchmarksRequest"> & {
  /**
   * @generated from field: repeated int64 team_ids = 1;
   */
  teamIds: bigint[];

  /**
   * @generated from field: bool post_validation = 2;
   */
  postValidation: boolean;
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerBenchmarksRequest.
 * Use `create(TriggerBenchmarksRequestSchema)` to create a new message.
 */
export declare const TriggerBenchmarksRequestSchema: GenMessage<TriggerBenchmarksRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.TriggerBenchmarksResponse
 */
export declare type TriggerBenchmarksResponse = Message<"isuxportal.proto.services.admin.TriggerBenchmarksResponse"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.TriggerBenchmarksResponse.
 * Use `create(TriggerBenchmarksResponseSchema)` to create a new message.
 */
export declare const TriggerBenchmarksResponseSchema: GenMessage<TriggerBenchmarksResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsRequest
 */
export declare type ListInstanceCommandExecuteRequestsRequest = Message<"isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsRequest"> & {
};

/**
 * Describes the message isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsRequest.
 * Use `create(ListInstanceCommandExecuteRequestsRequestSchema)` to create a new message.
 */
export declare const ListInstanceCommandExecuteRequestsRequestSchema: GenMessage<ListInstanceCommandExecuteRequestsRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsResponse
 */
export declare type ListInstanceCommandExecuteRequestsResponse = Message<"isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.resources.InstanceCommandExecuteRequest requests = 1;
   */
  requests: InstanceCommandExecuteRequest[];
};

/**
 * Describes the message isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsResponse.
 * Use `create(ListInstanceCommandExecuteRequestsResponseSchema)` to create a new message.
 */
export declare const ListInstanceCommandExecuteRequestsResponseSchema: GenMessage<ListInstanceCommandExecuteRequestsResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestRequest
 */
export declare type GetInstanceCommandExecuteRequestRequest = Message<"isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestRequest"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;
};

/**
 * Describes the message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestRequest.
 * Use `create(GetInstanceCommandExecuteRequestRequestSchema)` to create a new message.
 */
export declare const GetInstanceCommandExecuteRequestRequestSchema: GenMessage<GetInstanceCommandExecuteRequestRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestResponse
 */
export declare type GetInstanceCommandExecuteRequestResponse = Message<"isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.resources.InstanceCommandExecuteRequestResult results = 1;
   */
  results: InstanceCommandExecuteRequestResult[];
};

/**
 * Describes the message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestResponse.
 * Use `create(GetInstanceCommandExecuteRequestResponseSchema)` to create a new message.
 */
export declare const GetInstanceCommandExecuteRequestResponseSchema: GenMessage<GetInstanceCommandExecuteRequestResponse>;

/**
 * @generated from message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputRequest
 */
export declare type GetInstanceCommandExecuteRequestOutputRequest = Message<"isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputRequest"> & {
  /**
   * @generated from field: int64 id = 1;
   */
  id: bigint;
};

/**
 * Describes the message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputRequest.
 * Use `create(GetInstanceCommandExecuteRequestOutputRequestSchema)` to create a new message.
 */
export declare const GetInstanceCommandExecuteRequestOutputRequestSchema: GenMessage<GetInstanceCommandExecuteRequestOutputRequest>;

/**
 * @generated from message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputResponse
 */
export declare type GetInstanceCommandExecuteRequestOutputResponse = Message<"isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputResponse"> & {
  /**
   * @generated from field: string output = 1;
   */
  output: string;
};

/**
 * Describes the message isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestOutputResponse.
 * Use `create(GetInstanceCommandExecuteRequestOutputResponseSchema)` to create a new message.
 */
export declare const GetInstanceCommandExecuteRequestOutputResponseSchema: GenMessage<GetInstanceCommandExecuteRequestOutputResponse>;

