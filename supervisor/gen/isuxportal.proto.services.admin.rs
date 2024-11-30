// @generated
// This file is @generated by prost-build.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListBenchmarkJobsQuery {
    /// optional filter by team_id
    #[prost(int64, tag="1")]
    pub team_id: i64,
    /// optional filter by status
    #[prost(enumeration="super::super::resources::benchmark_job::Status", tag="2")]
    pub status: i32,
    /// optional paganation
    #[prost(int64, tag="3")]
    pub page: i64,
    /// return only failed
    #[prost(bool, tag="4")]
    pub failed_only: bool,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListBenchmarkJobsResponse {
    #[prost(message, repeated, tag="1")]
    pub jobs: ::prost::alloc::vec::Vec<super::super::resources::BenchmarkJob>,
    #[prost(int64, tag="2")]
    pub max_page: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct EnqueueBenchmarkJobRequest {
    #[prost(int64, tag="1")]
    pub team_id: i64,
    /// target ContestantInstance id
    #[prost(int64, tag="2")]
    pub target_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct EnqueueBenchmarkJobResponse {
    #[prost(message, optional, tag="1")]
    pub job: ::core::option::Option<super::super::resources::BenchmarkJob>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct CancelBenchmarkJobQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct CancelBenchmarkJobResponse {
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
    /// optional to filter
    #[prost(int64, tag="1")]
    pub team_id: i64,
    #[prost(bool, tag="2")]
    pub unanswered_only: bool,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListClarificationsResponse {
    #[prost(message, repeated, tag="1")]
    pub clarifications: ::prost::alloc::vec::Vec<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetClarificationQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetClarificationResponse {
    #[prost(message, optional, tag="1")]
    pub clarification: ::core::option::Option<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct RespondClarificationRequest {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(bool, tag="2")]
    pub disclose: bool,
    #[prost(string, tag="3")]
    pub answer: ::prost::alloc::string::String,
    /// optional to override original question
    #[prost(string, tag="4")]
    pub question: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct RespondClarificationResponse {
    #[prost(message, optional, tag="1")]
    pub clarification: ::core::option::Option<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct CreateClarificationRequest {
    #[prost(string, tag="2")]
    pub answer: ::prost::alloc::string::String,
    #[prost(string, tag="3")]
    pub question: ::prost::alloc::string::String,
    #[prost(int64, tag="4")]
    pub team_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct CreateClarificationResponse {
    #[prost(message, optional, tag="1")]
    pub clarification: ::core::option::Option<super::super::resources::Clarification>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetCloudFormationQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
    /// query parameter. "test" | "contest"
    #[prost(string, tag="2")]
    pub r#type: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetCloudFormationResponse {
    #[prost(string, tag="1")]
    pub template: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListContestantInstancesQuery {
    /// optional filter by team_id
    #[prost(int64, tag="1")]
    pub team_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListContestantInstancesResponse {
    #[prost(message, repeated, tag="1")]
    pub contestant_instances: ::prost::alloc::vec::Vec<super::super::resources::ContestantInstance>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct DashboardQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct DashboardResponse {
    #[prost(message, optional, tag="1")]
    pub leaderboard: ::core::option::Option<super::super::resources::Leaderboard>,
    #[prost(message, optional, tag="2")]
    pub earliest_unanswered_clarification_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(int64, tag="3")]
    pub unanswered_clarification_count: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct SoloDashboardQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct SoloDashboardResponse {
    #[prost(message, optional, tag="1")]
    pub leaderboard_item: ::core::option::Option<super::super::resources::LeaderboardItem>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListEnvChecksQuery {
    #[prost(int64, tag="1")]
    pub team_id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListEnvChecksResponse {
    #[prost(message, repeated, tag="1")]
    pub env_checks: ::prost::alloc::vec::Vec<super::super::resources::EnvCheck>,
}
/// limit to top-N teams (filter student teams?)
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct TriggerEnvCheckRequest {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct TriggerEnvCheckResponse {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetLeaderboardDumpQuery {
    /// ISO8601 or "contest-end"
    #[prost(string, tag="1")]
    pub when: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetLeaderboardDumpResponse {
    #[prost(message, repeated, tag="1")]
    pub items: ::prost::alloc::vec::Vec<get_leaderboard_dump_response::LeaderboardDumpItem>,
}
/// Nested message and enum types in `GetLeaderboardDumpResponse`.
pub mod get_leaderboard_dump_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct LeaderboardDumpItem {
        #[prost(int64, tag="1")]
        pub position: i64,
        #[prost(message, optional, tag="2")]
        pub team: ::core::option::Option<super::super::super::resources::Team>,
        #[prost(message, optional, tag="3")]
        pub best_score: ::core::option::Option<super::super::super::resources::leaderboard_item::LeaderboardScore>,
        #[prost(message, optional, tag="4")]
        pub latest_score: ::core::option::Option<super::super::super::resources::leaderboard_item::LeaderboardScore>,
        #[prost(message, optional, tag="5")]
        pub target: ::core::option::Option<super::super::super::resources::ContestantInstance>,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct ListTeamsQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ListTeamsResponse {
    #[prost(message, repeated, tag="1")]
    pub teams: ::prost::alloc::vec::Vec<list_teams_response::TeamListItem>,
}
/// Nested message and enum types in `ListTeamsResponse`.
pub mod list_teams_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct TeamListItem {
        #[prost(int64, tag="1")]
        pub team_id: i64,
        #[prost(string, tag="2")]
        pub name: ::prost::alloc::string::String,
        #[prost(string, repeated, tag="3")]
        pub member_names: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
        #[prost(bool, tag="4")]
        pub final_participation: bool,
        #[prost(bool, tag="5")]
        pub is_student: bool,
        #[prost(bool, tag="6")]
        pub withdrawn: bool,
        #[prost(bool, tag="7")]
        pub disqualified: bool,
        #[prost(bool, tag="8")]
        pub hidden: bool,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetTeamQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetTeamResponse {
    #[prost(message, optional, tag="1")]
    pub team: ::core::option::Option<super::super::resources::Team>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct UpdateTeamQuery {
    #[prost(int64, tag="1")]
    pub id: i64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct UpdateTeamRequest {
    #[prost(message, optional, tag="1")]
    pub team: ::core::option::Option<super::super::resources::Team>,
    /// Update only specified contestants
    #[prost(message, repeated, tag="2")]
    pub contestants: ::prost::alloc::vec::Vec<super::super::resources::Contestant>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct UpdateTeamResponse {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetSshKeyStatsQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetSshKeyStatsResponse {
    #[prost(message, repeated, tag="1")]
    pub items: ::prost::alloc::vec::Vec<get_ssh_key_stats_response::SshKeyUnregisteredTeam>,
}
/// Nested message and enum types in `GetSSHKeyStatsResponse`.
pub mod get_ssh_key_stats_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct SshKeyUnregisteredTeam {
        #[prost(message, optional, tag="1")]
        pub team: ::core::option::Option<super::super::super::resources::Team>,
        #[prost(int64, repeated, tag="2")]
        pub unregistered_member_ids: ::prost::alloc::vec::Vec<i64>,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetDiscordStatsQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetDiscordStatsResponse {
    #[prost(message, repeated, tag="1")]
    pub items: ::prost::alloc::vec::Vec<get_discord_stats_response::DiscordNotJoinedTeam>,
}
/// Nested message and enum types in `GetDiscordStatsResponse`.
pub mod get_discord_stats_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct DiscordNotJoinedTeam {
        #[prost(message, optional, tag="1")]
        pub team: ::core::option::Option<super::super::super::resources::Team>,
        #[prost(int64, repeated, tag="2")]
        pub not_joined_member_ids: ::prost::alloc::vec::Vec<i64>,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct GetEnvCheckStatsQuery {
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct GetEnvCheckStatsResponse {
    #[prost(message, repeated, tag="1")]
    pub items: ::prost::alloc::vec::Vec<super::super::resources::Team>,
}
// @@protoc_insertion_point(module)
