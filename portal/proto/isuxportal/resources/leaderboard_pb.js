// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/leaderboard.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import { file_isuxportal_resources_team } from "./team_pb";
import { file_isuxportal_resources_contest } from "./contest_pb";

/**
 * Describes the file isuxportal/resources/leaderboard.proto.
 */
export const file_isuxportal_resources_leaderboard = /*@__PURE__*/
  fileDesc("CiZpc3V4cG9ydGFsL3Jlc291cmNlcy9sZWFkZXJib2FyZC5wcm90bxIaaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMijwQKD0xlYWRlcmJvYXJkSXRlbRJQCgpiZXN0X3Njb3JlGAIgASgLMjwuaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuTGVhZGVyYm9hcmRJdGVtLkxlYWRlcmJvYXJkU2NvcmUSUgoMbGF0ZXN0X3Njb3JlGAMgASgLMjwuaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuTGVhZGVyYm9hcmRJdGVtLkxlYWRlcmJvYXJkU2NvcmUSLgoEdGVhbRgQIAEoCzIgLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLlRlYW0SSgoNc2NvcmVfaGlzdG9yeRgRIAEoCzIzLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkxlYWRlcmJvYXJkSXRlbS5IaXN0b3J5GoABChBMZWFkZXJib2FyZFNjb3JlEg0KBXNjb3JlGAEgASgDEi4KCnN0YXJ0ZWRfYXQYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi0KCW1hcmtlZF9hdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAaVwoHSGlzdG9yeRJMCgZzY29yZXMYASADKAsyPC5pc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcy5MZWFkZXJib2FyZEl0ZW0uTGVhZGVyYm9hcmRTY29yZSK1AgoLTGVhZGVyYm9hcmQSOgoFdGVhbXMYASADKAsyKy5pc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcy5MZWFkZXJib2FyZEl0ZW0SQQoMaGlkZGVuX3RlYW1zGAcgAygLMisuaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuTGVhZGVyYm9hcmRJdGVtEj8KCnByb2dyZXNzZXMYBCADKAsyKy5pc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcy5MZWFkZXJib2FyZEl0ZW0SMAoMZ2VuZXJhdGVkX2F0GAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI0Cgdjb250ZXN0GAUgASgLMiMuaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuQ29udGVzdEL9AQoeY29tLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzQhBMZWFkZXJib2FyZFByb3RvUAFaP2dpdGh1Yi5jb20vaXN1Y29uL2lzdWNvbjE0LXBvcnRhbC9wcm90by5nby9pc3V4cG9ydGFsL3Jlc291cmNlc6ICA0lQUqoCGklzdXhwb3J0YWwuUHJvdG8uUmVzb3VyY2VzygIaSXN1eHBvcnRhbFxQcm90b1xSZXNvdXJjZXPiAiZJc3V4cG9ydGFsXFByb3RvXFJlc291cmNlc1xHUEJNZXRhZGF0YeoCHElzdXhwb3J0YWw6OlByb3RvOjpSZXNvdXJjZXNiBnByb3RvMw", [file_google_protobuf_timestamp, file_isuxportal_resources_team, file_isuxportal_resources_contest]);

/**
 * Describes the message isuxportal.proto.resources.LeaderboardItem.
 * Use `create(LeaderboardItemSchema)` to create a new message.
 */
export const LeaderboardItemSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_leaderboard, 0);

/**
 * Describes the message isuxportal.proto.resources.LeaderboardItem.LeaderboardScore.
 * Use `create(LeaderboardItem_LeaderboardScoreSchema)` to create a new message.
 */
export const LeaderboardItem_LeaderboardScoreSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_leaderboard, 0, 0);

/**
 * Describes the message isuxportal.proto.resources.LeaderboardItem.History.
 * Use `create(LeaderboardItem_HistorySchema)` to create a new message.
 */
export const LeaderboardItem_HistorySchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_leaderboard, 0, 1);

/**
 * Describes the message isuxportal.proto.resources.Leaderboard.
 * Use `create(LeaderboardSchema)` to create a new message.
 */
export const LeaderboardSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_leaderboard, 1);

