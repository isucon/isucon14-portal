// @generated
// This file is @generated by prost-build.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct BypassTokenPayload {
    #[prost(string, tag="1")]
    pub filler: ::prost::alloc::string::String,
    #[prost(int64, tag="2")]
    pub expiry: i64,
    #[prost(enumeration="bypass_token_payload::Usage", repeated, tag="3")]
    pub usages: ::prost::alloc::vec::Vec<i32>,
}
/// Nested message and enum types in `BypassTokenPayload`.
pub mod bypass_token_payload {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
    #[repr(i32)]
    pub enum Usage {
        CreateTeam = 0,
        JoinTeam = 1,
        HiddenTeam = 2,
        LeaveTeam = 3,
    }
    impl Usage {
        /// String value of the enum field names used in the ProtoBuf definition.
        ///
        /// The values are not transformed in any way and thus are considered stable
        /// (if the ProtoBuf definition does not change) and safe for programmatic use.
        pub fn as_str_name(&self) -> &'static str {
            match self {
                Usage::CreateTeam => "CREATE_TEAM",
                Usage::JoinTeam => "JOIN_TEAM",
                Usage::HiddenTeam => "HIDDEN_TEAM",
                Usage::LeaveTeam => "LEAVE_TEAM",
            }
        }
        /// Creates an enum from field names used in the ProtoBuf definition.
        pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
            match value {
                "CREATE_TEAM" => Some(Self::CreateTeam),
                "JOIN_TEAM" => Some(Self::JoinTeam),
                "HIDDEN_TEAM" => Some(Self::HiddenTeam),
                "LEAVE_TEAM" => Some(Self::LeaveTeam),
                _ => None,
            }
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, Copy, PartialEq, ::prost::Message)]
pub struct LeaderboardEtag {
    #[prost(bool, tag="1")]
    pub admin: bool,
    #[prost(int64, tag="2")]
    pub team_id: i64,
    #[prost(int64, tag="3")]
    pub team_count: i64,
    #[prost(message, optional, tag="4")]
    pub team_last_updated: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(int64, tag="5")]
    pub latest_result_id: i64,
    #[prost(int64, tag="6")]
    pub latest_progress_id: i64,
    #[prost(bool, tag="7")]
    pub has_progress: bool,
    #[prost(message, optional, tag="8")]
    pub latest_result_at: ::core::option::Option<::prost_types::Timestamp>,
    #[prost(message, optional, tag="9")]
    pub latest_progress_at: ::core::option::Option<::prost_types::Timestamp>,
}
// @@protoc_insertion_point(module)
