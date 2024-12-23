// @generated
// This file is @generated by prost-build.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ReceiveBenchmarkJobRequest {
    #[prost(string, tag="1")]
    pub token: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub instance_name: ::prost::alloc::string::String,
    #[prost(int64, tag="3")]
    pub team_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ReceiveBenchmarkJobResponse {
    /// optional
    #[prost(message, optional, tag="1")]
    pub job_handle: ::core::option::Option<receive_benchmark_job_response::JobHandle>,
}
/// Nested message and enum types in `ReceiveBenchmarkJobResponse`.
pub mod receive_benchmark_job_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct JobHandle {
        #[prost(int64, tag="1")]
        pub job_id: i64,
        #[prost(string, tag="2")]
        pub handle: ::prost::alloc::string::String,
        #[prost(string, tag="3")]
        pub target_ipv4_address: ::prost::alloc::string::String,
        #[prost(string, tag="4")]
        pub description_human: ::prost::alloc::string::String,
        #[prost(string, repeated, tag="5")]
        pub all_ipv4_addresses: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
        #[prost(string, repeated, tag="6")]
        pub extra_command_args: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct CancelOwnedBenchmarkJobRequest {
    #[prost(string, tag="1")]
    pub token: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub instance_name: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct CancelOwnedBenchmarkJobResponse {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ReportBenchmarkResultRequest {
    #[prost(int64, tag="1")]
    pub job_id: i64,
    #[prost(string, tag="2")]
    pub handle: ::prost::alloc::string::String,
    #[deprecated]
    #[prost(int64, tag="3")]
    pub nonce: i64,
    #[prost(message, optional, tag="4")]
    pub result: ::core::option::Option<super::super::resources::BenchmarkResult>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ReportBenchmarkResultResponse {
    #[deprecated]
    #[prost(int64, tag="1")]
    pub acked_nonce: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct CompleteBenchmarkJobRequest {
    #[prost(int64, tag="1")]
    pub job_id: i64,
    #[prost(string, tag="2")]
    pub handle: ::prost::alloc::string::String,
    #[prost(message, optional, tag="4")]
    pub result: ::core::option::Option<super::super::resources::BenchmarkResult>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct CompleteBenchmarkJobResponse {
}
// @@protoc_insertion_point(module)
