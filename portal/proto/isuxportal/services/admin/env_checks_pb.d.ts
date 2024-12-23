// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/admin/env_checks.proto (package isuxportal.proto.services.admin, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { EnvCheck } from "../../resources/env_check_pb";

/**
 * Describes the file isuxportal/services/admin/env_checks.proto.
 */
export declare const file_isuxportal_services_admin_env_checks: GenFile;

/**
 * @generated from message isuxportal.proto.services.admin.ListEnvChecksQuery
 */
export declare type ListEnvChecksQuery = Message<"isuxportal.proto.services.admin.ListEnvChecksQuery"> & {
  /**
   * @generated from field: int64 team_id = 1;
   */
  teamId: bigint;
};

/**
 * Describes the message isuxportal.proto.services.admin.ListEnvChecksQuery.
 * Use `create(ListEnvChecksQuerySchema)` to create a new message.
 */
export declare const ListEnvChecksQuerySchema: GenMessage<ListEnvChecksQuery>;

/**
 * @generated from message isuxportal.proto.services.admin.ListEnvChecksResponse
 */
export declare type ListEnvChecksResponse = Message<"isuxportal.proto.services.admin.ListEnvChecksResponse"> & {
  /**
   * @generated from field: repeated isuxportal.proto.resources.EnvCheck env_checks = 1;
   */
  envChecks: EnvCheck[];
};

/**
 * Describes the message isuxportal.proto.services.admin.ListEnvChecksResponse.
 * Use `create(ListEnvChecksResponseSchema)` to create a new message.
 */
export declare const ListEnvChecksResponseSchema: GenMessage<ListEnvChecksResponse>;

