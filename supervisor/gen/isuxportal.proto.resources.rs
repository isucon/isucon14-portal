// @generated
// This file is @generated by prost-build.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct SurveyResponse {
    #[prost(string, tag="1")]
    pub language: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct BenchmarkResult {
    #[prost(bool, tag="1")]
    pub finished: bool,
    #[prost(bool, tag="2")]
    pub passed: bool,
    #[prost(int64, tag="3")]
    pub score: i64,
    #[prost(message, optional, tag="4")]
    pub score_breakdown: ::core::option::Option<benchmark_result::ScoreBreakdown>,
    /// only present for finished result
    #[prost(message, optional, tag="5")]
    pub execution: ::core::option::Option<benchmark_result::Execution>,
    #[prost(message, optional, tag="6")]
    pub marked_at: ::core::option::Option<::prost_types::Timestamp>,
    /// TODO: not available in responses
    #[prost(message, optional, tag="8")]
    pub survey_response: ::core::option::Option<SurveyResponse>,
}
/// Nested message and enum types in `BenchmarkResult`.
pub mod benchmark_result {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct ScoreBreakdown {
        #[prost(int64, tag="1")]
        pub raw: i64,
        #[prost(int64, tag="2")]
        pub deduction: i64,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct Execution {
        #[prost(string, tag="1")]
        pub reason: ::prost::alloc::string::String,
        #[prost(string, tag="2")]
        pub stdout: ::prost::alloc::string::String,
        #[prost(string, tag="3")]
        pub stderr: ::prost::alloc::string::String,
        #[prost(int32, tag="4")]
        pub exit_status: i32,
        #[prost(int32, tag="5")]
        pub exit_signal: i32,
        #[prost(bool, tag="6")]
        pub signaled: bool,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Contestant {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(string, tag="3")]
    pub name: ::prost::alloc::string::String,
    #[prost(message, optional, tag="7")]
    pub detail: ::core::option::Option<contestant::ContestantDetail>,
}
/// Nested message and enum types in `Contestant`.
pub mod contestant {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct ContestantDetail {
        #[prost(string, tag="1")]
        pub github_login: ::prost::alloc::string::String,
        #[prost(string, tag="2")]
        pub discord_tag: ::prost::alloc::string::String,
        #[prost(bool, tag="3")]
        pub is_student: bool,
        #[prost(string, tag="4")]
        pub avatar_url: ::prost::alloc::string::String,
        #[prost(bool, tag="5")]
        pub is_in_person: bool,
        #[prost(string, tag="16")]
        pub github_id: ::prost::alloc::string::String,
        #[prost(string, tag="17")]
        pub discord_id: ::prost::alloc::string::String,
        #[prost(bool, tag="21")]
        pub is_ssh_key_registered: bool,
        #[prost(bool, tag="22")]
        pub is_discord_guild_member: bool,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Team {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(string, tag="2")]
    pub name: ::prost::alloc::string::String,
    #[prost(int64, tag="3")]
    pub leader_id: i64,
    #[prost(int64, repeated, tag="4")]
    pub member_ids: ::prost::alloc::vec::Vec<i64>,
    #[prost(bool, tag="5")]
    pub final_participation: bool,
    #[prost(bool, tag="6")]
    pub hidden: bool,
    #[prost(bool, tag="7")]
    pub withdrawn: bool,
    #[prost(bool, tag="9")]
    pub disqualified: bool,
    #[prost(message, optional, tag="10")]
    pub student: ::core::option::Option<team::StudentStatus>,
    #[prost(message, optional, tag="8")]
    pub detail: ::core::option::Option<team::TeamDetail>,
    #[prost(message, optional, tag="16")]
    pub leader: ::core::option::Option<Contestant>,
    #[prost(message, repeated, tag="17")]
    pub members: ::prost::alloc::vec::Vec<Contestant>,
}
/// Nested message and enum types in `Team`.
pub mod team {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct StudentStatus {
        #[prost(bool, tag="1")]
        pub status: bool,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct TeamDetail {
        #[prost(string, tag="1")]
        pub email_address: ::prost::alloc::string::String,
        #[prost(string, tag="16")]
        pub invite_token: ::prost::alloc::string::String,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ContestantInstance {
    #[prost(int64, tag="7")]
    pub id: i64,
    #[prost(string, tag="1")]
    pub cloud_id: ::prost::alloc::string::String,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(int64, tag="3")]
    pub number: i64,
    #[prost(string, tag="4")]
    pub public_ipv4_address: ::prost::alloc::string::String,
    #[prost(string, tag="5")]
    pub private_ipv4_address: ::prost::alloc::string::String,
    #[prost(enumeration="contestant_instance::Status", tag="6")]
    pub status: i32,
    #[prost(message, optional, tag="16")]
    pub team: ::core::option::Option<Team>,
}
/// Nested message and enum types in `ContestantInstance`.
pub mod contestant_instance {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
    #[repr(i32)]
    pub enum Status {
        Unknown = 0,
        Pending = 1,
        Modifying = 2,
        Stopped = 3,
        Running = 4,
        Terminated = 5,
    }
    impl Status {
        /// String value of the enum field names used in the ProtoBuf definition.
        ///
        /// The values are not transformed in any way and thus are considered stable
        /// (if the ProtoBuf definition does not change) and safe for programmatic use.
        pub fn as_str_name(&self) -> &'static str {
            match self {
                Status::Unknown => "UNKNOWN",
                Status::Pending => "PENDING",
                Status::Modifying => "MODIFYING",
                Status::Stopped => "STOPPED",
                Status::Running => "RUNNING",
                Status::Terminated => "TERMINATED",
            }
        }
        /// Creates an enum from field names used in the ProtoBuf definition.
        pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
            match value {
                "UNKNOWN" => Some(Self::Unknown),
                "PENDING" => Some(Self::Pending),
                "MODIFYING" => Some(Self::Modifying),
                "STOPPED" => Some(Self::Stopped),
                "RUNNING" => Some(Self::Running),
                "TERMINATED" => Some(Self::Terminated),
                _ => None,
            }
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct BenchmarkJob {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(int64, tag="3")]
    pub target_id: i64,
    #[prost(enumeration="benchmark_job::Status", tag="4")]
    pub status: i32,
    #[prost(message, optional, tag="5")]
    pub created_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="6")]
    pub updated_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="7")]
    pub started_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="8")]
    pub finished_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(int64, tag="9")]
    pub score: i64,
    /// instance_name is not available for contestant
    #[prost(string, tag="10")]
    pub instance_name: ::prost::alloc::string::String,
    /// team is only available at ...
    #[prost(message, optional, tag="16")]
    pub team: ::core::option::Option<Team>,
    /// target & result & execution are only available at GetBenchmarkJobResponse
    #[prost(message, optional, tag="17")]
    pub target: ::core::option::Option<ContestantInstance>,
    #[prost(message, optional, tag="18")]
    pub result: ::core::option::Option<BenchmarkResult>,
}
/// Nested message and enum types in `BenchmarkJob`.
pub mod benchmark_job {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
    #[repr(i32)]
    pub enum Status {
        Pending = 0,
        Running = 1,
        Errored = 2,
        Cancelled = 3,
        Finished = 4,
    }
    impl Status {
        /// String value of the enum field names used in the ProtoBuf definition.
        ///
        /// The values are not transformed in any way and thus are considered stable
        /// (if the ProtoBuf definition does not change) and safe for programmatic use.
        pub fn as_str_name(&self) -> &'static str {
            match self {
                Status::Pending => "PENDING",
                Status::Running => "RUNNING",
                Status::Errored => "ERRORED",
                Status::Cancelled => "CANCELLED",
                Status::Finished => "FINISHED",
            }
        }
        /// Creates an enum from field names used in the ProtoBuf definition.
        pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
            match value {
                "PENDING" => Some(Self::Pending),
                "RUNNING" => Some(Self::Running),
                "ERRORED" => Some(Self::Errored),
                "CANCELLED" => Some(Self::Cancelled),
                "FINISHED" => Some(Self::Finished),
                _ => None,
            }
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Clarification {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(bool, tag="3")]
    pub answered: bool,
    #[prost(bool, tag="4")]
    pub disclosed: bool,
    #[prost(string, tag="5")]
    pub question: ::prost::alloc::string::String,
    #[prost(string, tag="6")]
    pub answer: ::prost::alloc::string::String,
    #[prost(message, optional, tag="7")]
    pub created_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="8")]
    pub answered_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(string, tag="9")]
    pub original_question: ::prost::alloc::string::String,
    #[prost(bool, tag="10")]
    pub admin: bool,
    #[prost(message, optional, tag="16")]
    pub team: ::core::option::Option<Team>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct Contest {
    #[prost(message, optional, tag="1")]
    pub registration_opens_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="2")]
    pub registration_closes_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="3")]
    pub starts_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="4")]
    pub freezes_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="5")]
    pub ends_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(enumeration="contest::Status", tag="6")]
    pub status: i32,
    #[prost(bool, tag="7")]
    pub frozen: bool,
}
/// Nested message and enum types in `Contest`.
pub mod contest {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
    #[repr(i32)]
    pub enum Status {
        Standby = 0,
        Registration = 1,
        Started = 2,
        Finished = 3,
    }
    impl Status {
        /// String value of the enum field names used in the ProtoBuf definition.
        ///
        /// The values are not transformed in any way and thus are considered stable
        /// (if the ProtoBuf definition does not change) and safe for programmatic use.
        pub fn as_str_name(&self) -> &'static str {
            match self {
                Status::Standby => "STANDBY",
                Status::Registration => "REGISTRATION",
                Status::Started => "STARTED",
                Status::Finished => "FINISHED",
            }
        }
        /// Creates an enum from field names used in the ProtoBuf definition.
        pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
            match value {
                "STANDBY" => Some(Self::Standby),
                "REGISTRATION" => Some(Self::Registration),
                "STARTED" => Some(Self::Started),
                "FINISHED" => Some(Self::Finished),
                _ => None,
            }
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Coupon {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(string, repeated, tag="3")]
    pub code: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(bool, tag="4")]
    pub activate: bool,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct EnvCheck {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(string, tag="3")]
    pub name: ::prost::alloc::string::String,
    #[prost(string, tag="4")]
    pub ip_address: ::prost::alloc::string::String,
    #[prost(bool, tag="5")]
    pub passed: bool,
    #[prost(string, tag="6")]
    pub message: ::prost::alloc::string::String,
    #[prost(string, tag="7")]
    pub admin_message: ::prost::alloc::string::String,
    #[prost(string, tag="8")]
    pub raw_data: ::prost::alloc::string::String,
    #[prost(message, optional, tag="9")]
    pub created_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="10")]
    pub updated_at: ::core::option::Option<::prost_types::Timestamp>,
}
#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
#[repr(i32)]
pub enum EnvCheckStatus {
    Preparing = 0,
    NotStarted = 1,
    /// obtained instance ip successfully
    CreatedInstance = 2,
    /// confirmed ssh
    Done = 3,
}
impl EnvCheckStatus {
    /// String value of the enum field names used in the ProtoBuf definition.
    ///
    /// The values are not transformed in any way and thus are considered stable
    /// (if the ProtoBuf definition does not change) and safe for programmatic use.
    pub fn as_str_name(&self) -> &'static str {
        match self {
            EnvCheckStatus::Preparing => "PREPARING",
            EnvCheckStatus::NotStarted => "NOT_STARTED",
            EnvCheckStatus::CreatedInstance => "CREATED_INSTANCE",
            EnvCheckStatus::Done => "DONE",
        }
    }
    /// Creates an enum from field names used in the ProtoBuf definition.
    pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
        match value {
            "PREPARING" => Some(Self::Preparing),
            "NOT_STARTED" => Some(Self::NotStarted),
            "CREATED_INSTANCE" => Some(Self::CreatedInstance),
            "DONE" => Some(Self::Done),
            _ => None,
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct LeaderboardItem {
    #[prost(message, optional, tag="2")]
    pub best_score: ::core::option::Option<leaderboard_item::LeaderboardScore>,
    #[prost(message, optional, tag="3")]
    pub latest_score: ::core::option::Option<leaderboard_item::LeaderboardScore>,
    #[prost(message, optional, tag="16")]
    pub team: ::core::option::Option<Team>,
    #[prost(message, optional, tag="17")]
    pub score_history: ::core::option::Option<leaderboard_item::History>,
}
/// Nested message and enum types in `LeaderboardItem`.
pub mod leaderboard_item {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct LeaderboardScore {
        #[prost(int64, tag="1")]
        pub score: i64,
        #[prost(message, optional, tag="2")]
        pub started_at: ::core::option::Option<::prost_types::Timestamp>,
        #[prost(message, optional, tag="3")]
        pub marked_at: ::core::option::Option<::prost_types::Timestamp>,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
    pub struct History {
        #[prost(message, repeated, tag="1")]
        pub scores: ::prost::alloc::vec::Vec<LeaderboardScore>,
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Leaderboard {
    #[prost(message, repeated, tag="1")]
    pub teams: ::prost::alloc::vec::Vec<LeaderboardItem>,
    #[prost(message, repeated, tag="7")]
    pub hidden_teams: ::prost::alloc::vec::Vec<LeaderboardItem>,
    #[prost(message, repeated, tag="4")]
    pub progresses: ::prost::alloc::vec::Vec<LeaderboardItem>,
    #[prost(message, optional, tag="6")]
    pub generated_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="5")]
    pub contest: ::core::option::Option<Contest>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct Notification {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(message, optional, tag="2")]
    pub created_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(oneof="notification::Content", tags="3, 4, 5")]
    pub content: ::core::option::Option<notification::Content>,
}
/// Nested message and enum types in `Notification`.
pub mod notification {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct BenchmarkJobMessage {
        #[prost(int64, tag="1")]
        pub benchmark_job_id: i64,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct ClarificationMessage {
        #[prost(int64, tag="1")]
        pub clarification_id: i64,
        /// True when a clarification is sent from a team of notification recipient
        #[prost(bool, tag="2")]
        pub owned: bool,
        /// True when a clarification was answered and have updated
        #[prost(bool, tag="3")]
        pub updated: bool,
        /// True when a clarification was opened by admin
        #[prost(bool, tag="4")]
        pub admin: bool,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
    pub struct TestMessage {
        #[prost(int64, tag="1")]
        pub something: i64,
    }
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Oneof)]
    pub enum Content {
        #[prost(message, tag="3")]
        ContentBenchmarkJob(BenchmarkJobMessage),
        #[prost(message, tag="4")]
        ContentClarification(ClarificationMessage),
        #[prost(message, tag="5")]
        ContentTest(TestMessage),
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Staff {
    #[prost(int64, tag="1")]
    pub id: i64,
    #[prost(string, tag="2")]
    pub github_login: ::prost::alloc::string::String,
}
// @@protoc_insertion_point(module)