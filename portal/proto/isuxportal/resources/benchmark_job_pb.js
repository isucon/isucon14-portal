// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/resources/benchmark_job.proto (package isuxportal.proto.resources, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, tsEnum } from "@bufbuild/protobuf/codegenv1";
import { file_isuxportal_resources_benchmark_result } from "./benchmark_result_pb";
import { file_isuxportal_resources_contestant_instance } from "./contestant_instance_pb";
import { file_isuxportal_resources_team } from "./team_pb";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";

/**
 * Describes the file isuxportal/resources/benchmark_job.proto.
 */
export const file_isuxportal_resources_benchmark_job = /*@__PURE__*/
  fileDesc("Cihpc3V4cG9ydGFsL3Jlc291cmNlcy9iZW5jaG1hcmtfam9iLnByb3RvEhppc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcyL0BQoMQmVuY2htYXJrSm9iEgoKAmlkGAEgASgDEg8KB3RlYW1faWQYAiABKAMSEQoJdGFyZ2V0X2lkGAMgASgDEj8KBnN0YXR1cxgEIAEoDjIvLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkJlbmNobWFya0pvYi5TdGF0dXMSLgoKY3JlYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKc3RhcnRlZF9hdBgHIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLwoLZmluaXNoZWRfYXQYCCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEg0KBXNjb3JlGAkgASgDEhUKDWluc3RhbmNlX25hbWUYCiABKAkSLgoEdGVhbRgQIAEoCzIgLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLlRlYW0SPgoGdGFyZ2V0GBEgASgLMi4uaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuQ29udGVzdGFudEluc3RhbmNlEjsKBnJlc3VsdBgSIAEoCzIrLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkJlbmNobWFya1Jlc3VsdBJICgtlbnF1ZXVlZF9ieRgTIAEoCzIzLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkJlbmNobWFya0pvYi5FbnF1ZXVlZEJ5EhcKD3Bvc3RfdmFsaWRhdGlvbhgUIAEoCBouCgpFbnF1ZXVlZEJ5EgwKBG5hbWUYASABKAkSEgoKYXZhdGFyX3VybBgCIAEoCSJMCgZTdGF0dXMSCwoHUEVORElORxAAEgsKB1JVTk5JTkcQARILCgdFUlJPUkVEEAISDQoJQ0FOQ0VMTEVEEAMSDAoIRklOSVNIRUQQBEKPAgoeY29tLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzQhFCZW5jaG1hcmtKb2JQcm90b1ABWlBnaXRodWIuY29tL2lzdWNvbi9pc3Vjb24xNC1wb3J0YWwvc3VwZXJ2aXNvci9kdW1teWJlbmNoL2dlbi9pc3V4cG9ydGFsL3Jlc291cmNlc6ICA0lQUqoCGklzdXhwb3J0YWwuUHJvdG8uUmVzb3VyY2VzygIaSXN1eHBvcnRhbFxQcm90b1xSZXNvdXJjZXPiAiZJc3V4cG9ydGFsXFByb3RvXFJlc291cmNlc1xHUEJNZXRhZGF0YeoCHElzdXhwb3J0YWw6OlByb3RvOjpSZXNvdXJjZXNiBnByb3RvMw", [file_isuxportal_resources_benchmark_result, file_isuxportal_resources_contestant_instance, file_isuxportal_resources_team, file_google_protobuf_timestamp]);

/**
 * Describes the message isuxportal.proto.resources.BenchmarkJob.
 * Use `create(BenchmarkJobSchema)` to create a new message.
 */
export const BenchmarkJobSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_benchmark_job, 0);

/**
 * Describes the message isuxportal.proto.resources.BenchmarkJob.EnqueuedBy.
 * Use `create(BenchmarkJob_EnqueuedBySchema)` to create a new message.
 */
export const BenchmarkJob_EnqueuedBySchema = /*@__PURE__*/
  messageDesc(file_isuxportal_resources_benchmark_job, 0, 0);

/**
 * Describes the enum isuxportal.proto.resources.BenchmarkJob.Status.
 */
export const BenchmarkJob_StatusSchema = /*@__PURE__*/
  enumDesc(file_isuxportal_resources_benchmark_job, 0, 0);

/**
 * @generated from enum isuxportal.proto.resources.BenchmarkJob.Status
 */
export const BenchmarkJob_Status = /*@__PURE__*/
  tsEnum(BenchmarkJob_StatusSchema);

