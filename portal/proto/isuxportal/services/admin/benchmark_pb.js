// @generated by protoc-gen-es v2.0.0
// @generated from file isuxportal/services/admin/benchmark.proto (package isuxportal.proto.services.admin, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import { file_isuxportal_resources_benchmark_job } from "../../resources/benchmark_job_pb";

/**
 * Describes the file isuxportal/services/admin/benchmark.proto.
 */
export const file_isuxportal_services_admin_benchmark = /*@__PURE__*/
  fileDesc("Cilpc3V4cG9ydGFsL3NlcnZpY2VzL2FkbWluL2JlbmNobWFyay5wcm90bxIfaXN1eHBvcnRhbC5wcm90by5zZXJ2aWNlcy5hZG1pbiKNAQoWTGlzdEJlbmNobWFya0pvYnNRdWVyeRIPCgd0ZWFtX2lkGAEgASgDEj8KBnN0YXR1cxgCIAEoDjIvLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkJlbmNobWFya0pvYi5TdGF0dXMSDAoEcGFnZRgDIAEoAxITCgtmYWlsZWRfb25seRgEIAEoCCJlChlMaXN0QmVuY2htYXJrSm9ic1Jlc3BvbnNlEjYKBGpvYnMYASADKAsyKC5pc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcy5CZW5jaG1hcmtKb2ISEAoIbWF4X3BhZ2UYAiABKAMiQAoaRW5xdWV1ZUJlbmNobWFya0pvYlJlcXVlc3QSDwoHdGVhbV9pZBgBIAEoAxIRCgl0YXJnZXRfaWQYAiABKAMiVAobRW5xdWV1ZUJlbmNobWFya0pvYlJlc3BvbnNlEjUKA2pvYhgBIAEoCzIoLmlzdXhwb3J0YWwucHJvdG8ucmVzb3VyY2VzLkJlbmNobWFya0pvYiIlChdDYW5jZWxCZW5jaG1hcmtKb2JRdWVyeRIKCgJpZBgBIAEoAyJTChpDYW5jZWxCZW5jaG1hcmtKb2JSZXNwb25zZRI1CgNqb2IYASABKAsyKC5pc3V4cG9ydGFsLnByb3RvLnJlc291cmNlcy5CZW5jaG1hcmtKb2IiIgoUR2V0QmVuY2htYXJrSm9iUXVlcnkSCgoCaWQYASABKAMiUAoXR2V0QmVuY2htYXJrSm9iUmVzcG9uc2USNQoDam9iGAEgASgLMiguaXN1eHBvcnRhbC5wcm90by5yZXNvdXJjZXMuQmVuY2htYXJrSm9iQpsCCiNjb20uaXN1eHBvcnRhbC5wcm90by5zZXJ2aWNlcy5hZG1pbkIOQmVuY2htYXJrUHJvdG9QAVpEZ2l0aHViLmNvbS9pc3Vjb24vaXN1Y29uMTQtcG9ydGFsL3Byb3RvLmdvL2lzdXhwb3J0YWwvc2VydmljZXMvYWRtaW6iAgRJUFNBqgIfSXN1eHBvcnRhbC5Qcm90by5TZXJ2aWNlcy5BZG1pbsoCH0lzdXhwb3J0YWxcUHJvdG9cU2VydmljZXNcQWRtaW7iAitJc3V4cG9ydGFsXFByb3RvXFNlcnZpY2VzXEFkbWluXEdQQk1ldGFkYXRh6gIiSXN1eHBvcnRhbDo6UHJvdG86OlNlcnZpY2VzOjpBZG1pbmIGcHJvdG8z", [file_isuxportal_resources_benchmark_job]);

/**
 * Describes the message isuxportal.proto.services.admin.ListBenchmarkJobsQuery.
 * Use `create(ListBenchmarkJobsQuerySchema)` to create a new message.
 */
export const ListBenchmarkJobsQuerySchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 0);

/**
 * Describes the message isuxportal.proto.services.admin.ListBenchmarkJobsResponse.
 * Use `create(ListBenchmarkJobsResponseSchema)` to create a new message.
 */
export const ListBenchmarkJobsResponseSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 1);

/**
 * Describes the message isuxportal.proto.services.admin.EnqueueBenchmarkJobRequest.
 * Use `create(EnqueueBenchmarkJobRequestSchema)` to create a new message.
 */
export const EnqueueBenchmarkJobRequestSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 2);

/**
 * Describes the message isuxportal.proto.services.admin.EnqueueBenchmarkJobResponse.
 * Use `create(EnqueueBenchmarkJobResponseSchema)` to create a new message.
 */
export const EnqueueBenchmarkJobResponseSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 3);

/**
 * Describes the message isuxportal.proto.services.admin.CancelBenchmarkJobQuery.
 * Use `create(CancelBenchmarkJobQuerySchema)` to create a new message.
 */
export const CancelBenchmarkJobQuerySchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 4);

/**
 * Describes the message isuxportal.proto.services.admin.CancelBenchmarkJobResponse.
 * Use `create(CancelBenchmarkJobResponseSchema)` to create a new message.
 */
export const CancelBenchmarkJobResponseSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 5);

/**
 * Describes the message isuxportal.proto.services.admin.GetBenchmarkJobQuery.
 * Use `create(GetBenchmarkJobQuerySchema)` to create a new message.
 */
export const GetBenchmarkJobQuerySchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 6);

/**
 * Describes the message isuxportal.proto.services.admin.GetBenchmarkJobResponse.
 * Use `create(GetBenchmarkJobResponseSchema)` to create a new message.
 */
export const GetBenchmarkJobResponseSchema = /*@__PURE__*/
  messageDesc(file_isuxportal_services_admin_benchmark, 7);

