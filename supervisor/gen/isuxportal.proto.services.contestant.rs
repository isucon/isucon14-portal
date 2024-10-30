// @generated
// This file is @generated by prost-build.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListBenchmarkJobsQuery {
    #[prost(int64, tag="1")]
    pub limit: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListBenchmarkJobsResponse {
    #[prost(message, repeated, tag="1")]
    pub jobs: ::prost::alloc::vec::Vec<super::super::resources::BenchmarkJob>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct EnqueueBenchmarkJobRequest {
    /// target ContestantInstance id
    #[prost(int64, tag="1")]
    pub target_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct EnqueueBenchmarkJobResponse {
    #[prost(message, optional, tag="1")]
    pub job: ::core::option::Option<super::super::resources::BenchmarkJob>,
}
/// Query parameter
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetBenchmarkJobQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetBenchmarkJobResponse {
    #[prost(message, optional, tag="1")]
    pub job: ::core::option::Option<super::super::resources::BenchmarkJob>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListClarificationsQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListClarificationsResponse {
    #[prost(message, repeated, tag="1")]
    pub clarifications: ::prost::alloc::vec::Vec<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct RequestClarificationRequest {
    #[prost(string, tag="1")]
    pub question: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct RequestClarificationResponse {
    #[prost(message, optional, tag="1")]
    pub clarification: ::core::option::Option<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetCloudFormationQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetCloudFormationResponse {
    #[prost(string, tag="1")]
    pub template: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct DashboardQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DashboardResponse {
    #[prost(message, optional, tag="1")]
    pub leaderboard_item: ::core::option::Option<super::super::resources::LeaderboardItem>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListContestantInstancesRequest {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListContestantInstancesResponse {
    #[prost(message, repeated, tag="1")]
    pub contestant_instances: ::prost::alloc::vec::Vec<super::super::resources::ContestantInstance>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListNotificationsQuery {
    /// Last notifications.id that a user-agent has received through ListNotificationsQuery during a current session.
    /// If not specified (=0), uses server-side `read` column as a hint.
    #[prost(int64, tag="1")]
    pub after: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListNotificationsResponse {
    #[prost(int64, tag="1")]
    pub last_answered_clarification_id: i64,
    #[prost(message, repeated, tag="2")]
    pub notifications: ::prost::alloc::vec::Vec<super::super::resources::Notification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct SubscribeNotificationRequest {
    #[prost(string, tag="1")]
    pub endpoint: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub p256dh: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub auth: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct SubscribeNotificationResponse {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct UnsubscribeNotificationRequest {
    #[prost(string, tag="1")]
    pub endpoint: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct UnsubscribeNotificationResponse {
}
// @@protoc_insertion_point(module)
