// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/audience/dashboard.proto (package isuxportal.proto.services.audience, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
import type { Leaderboard, LeaderboardItem } from "../../resources/leaderboard_pb";

/**
 * Describes the file isuxportal/services/audience/dashboard.proto.
 */
export declare const file_isuxportal_services_audience_dashboard: GenFile;

/**
 * @generated from message isuxportal.proto.services.audience.DashboardQuery
 */
export declare type DashboardQuery = Message<"isuxportal.proto.services.audience.DashboardQuery"> & {
};

/**
 * Describes the message isuxportal.proto.services.audience.DashboardQuery.
 * Use `create(DashboardQuerySchema)` to create a new message.
 */
export declare const DashboardQuerySchema: GenMessage<DashboardQuery>;

/**
 * @generated from message isuxportal.proto.services.audience.DashboardResponse
 */
export declare type DashboardResponse = Message<"isuxportal.proto.services.audience.DashboardResponse"> & {
  /**
   * @generated from field: isuxportal.proto.resources.Leaderboard leaderboard = 1;
   */
  leaderboard?: Leaderboard;
};

/**
 * Describes the message isuxportal.proto.services.audience.DashboardResponse.
 * Use `create(DashboardResponseSchema)` to create a new message.
 */
export declare const DashboardResponseSchema: GenMessage<DashboardResponse>;

/**
 * @generated from message isuxportal.proto.services.audience.SoloDashboardQuery
 */
export declare type SoloDashboardQuery = Message<"isuxportal.proto.services.audience.SoloDashboardQuery"> & {
};

/**
 * Describes the message isuxportal.proto.services.audience.SoloDashboardQuery.
 * Use `create(SoloDashboardQuerySchema)` to create a new message.
 */
export declare const SoloDashboardQuerySchema: GenMessage<SoloDashboardQuery>;

/**
 * @generated from message isuxportal.proto.services.audience.SoloDashboardResponse
 */
export declare type SoloDashboardResponse = Message<"isuxportal.proto.services.audience.SoloDashboardResponse"> & {
  /**
   * @generated from field: isuxportal.proto.resources.LeaderboardItem leaderboard_item = 1;
   */
  leaderboardItem?: LeaderboardItem;
};

/**
 * Describes the message isuxportal.proto.services.audience.SoloDashboardResponse.
 * Use `create(SoloDashboardResponseSchema)` to create a new message.
 */
export declare const SoloDashboardResponseSchema: GenMessage<SoloDashboardResponse>;
