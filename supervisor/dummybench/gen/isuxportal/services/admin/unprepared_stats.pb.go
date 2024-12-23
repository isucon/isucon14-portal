// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.2
// 	protoc        (unknown)
// source: isuxportal/services/admin/unprepared_stats.proto

package admin

import (
	resources "github.com/isucon/isucon14-portal/supervisor/dummybench/gen/isuxportal/resources"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type GetSSHKeyStatsQuery struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetSSHKeyStatsQuery) Reset() {
	*x = GetSSHKeyStatsQuery{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetSSHKeyStatsQuery) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSSHKeyStatsQuery) ProtoMessage() {}

func (x *GetSSHKeyStatsQuery) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSSHKeyStatsQuery.ProtoReflect.Descriptor instead.
func (*GetSSHKeyStatsQuery) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{0}
}

type GetSSHKeyStatsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Items []*GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
}

func (x *GetSSHKeyStatsResponse) Reset() {
	*x = GetSSHKeyStatsResponse{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetSSHKeyStatsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSSHKeyStatsResponse) ProtoMessage() {}

func (x *GetSSHKeyStatsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSSHKeyStatsResponse.ProtoReflect.Descriptor instead.
func (*GetSSHKeyStatsResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{1}
}

func (x *GetSSHKeyStatsResponse) GetItems() []*GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam {
	if x != nil {
		return x.Items
	}
	return nil
}

type GetDiscordStatsQuery struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetDiscordStatsQuery) Reset() {
	*x = GetDiscordStatsQuery{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetDiscordStatsQuery) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetDiscordStatsQuery) ProtoMessage() {}

func (x *GetDiscordStatsQuery) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetDiscordStatsQuery.ProtoReflect.Descriptor instead.
func (*GetDiscordStatsQuery) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{2}
}

type GetDiscordStatsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Items []*GetDiscordStatsResponse_DiscordNotJoinedTeam `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
}

func (x *GetDiscordStatsResponse) Reset() {
	*x = GetDiscordStatsResponse{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetDiscordStatsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetDiscordStatsResponse) ProtoMessage() {}

func (x *GetDiscordStatsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetDiscordStatsResponse.ProtoReflect.Descriptor instead.
func (*GetDiscordStatsResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{3}
}

func (x *GetDiscordStatsResponse) GetItems() []*GetDiscordStatsResponse_DiscordNotJoinedTeam {
	if x != nil {
		return x.Items
	}
	return nil
}

type GetEnvCheckStatsQuery struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetEnvCheckStatsQuery) Reset() {
	*x = GetEnvCheckStatsQuery{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetEnvCheckStatsQuery) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetEnvCheckStatsQuery) ProtoMessage() {}

func (x *GetEnvCheckStatsQuery) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetEnvCheckStatsQuery.ProtoReflect.Descriptor instead.
func (*GetEnvCheckStatsQuery) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{4}
}

type GetEnvCheckStatsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Items []*resources.Team `protobuf:"bytes,1,rep,name=items,proto3" json:"items,omitempty"`
}

func (x *GetEnvCheckStatsResponse) Reset() {
	*x = GetEnvCheckStatsResponse{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[5]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetEnvCheckStatsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetEnvCheckStatsResponse) ProtoMessage() {}

func (x *GetEnvCheckStatsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[5]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetEnvCheckStatsResponse.ProtoReflect.Descriptor instead.
func (*GetEnvCheckStatsResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{5}
}

func (x *GetEnvCheckStatsResponse) GetItems() []*resources.Team {
	if x != nil {
		return x.Items
	}
	return nil
}

type GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Team                  *resources.Team `protobuf:"bytes,1,opt,name=team,proto3" json:"team,omitempty"`
	UnregisteredMemberIds []int64         `protobuf:"varint,2,rep,packed,name=unregistered_member_ids,json=unregisteredMemberIds,proto3" json:"unregistered_member_ids,omitempty"`
}

func (x *GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) Reset() {
	*x = GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[6]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) ProtoMessage() {}

func (x *GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[6]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam.ProtoReflect.Descriptor instead.
func (*GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{1, 0}
}

func (x *GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) GetTeam() *resources.Team {
	if x != nil {
		return x.Team
	}
	return nil
}

func (x *GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam) GetUnregisteredMemberIds() []int64 {
	if x != nil {
		return x.UnregisteredMemberIds
	}
	return nil
}

type GetDiscordStatsResponse_DiscordNotJoinedTeam struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Team               *resources.Team `protobuf:"bytes,1,opt,name=team,proto3" json:"team,omitempty"`
	NotJoinedMemberIds []int64         `protobuf:"varint,2,rep,packed,name=not_joined_member_ids,json=notJoinedMemberIds,proto3" json:"not_joined_member_ids,omitempty"`
}

func (x *GetDiscordStatsResponse_DiscordNotJoinedTeam) Reset() {
	*x = GetDiscordStatsResponse_DiscordNotJoinedTeam{}
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[7]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetDiscordStatsResponse_DiscordNotJoinedTeam) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetDiscordStatsResponse_DiscordNotJoinedTeam) ProtoMessage() {}

func (x *GetDiscordStatsResponse_DiscordNotJoinedTeam) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_unprepared_stats_proto_msgTypes[7]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetDiscordStatsResponse_DiscordNotJoinedTeam.ProtoReflect.Descriptor instead.
func (*GetDiscordStatsResponse_DiscordNotJoinedTeam) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP(), []int{3, 0}
}

func (x *GetDiscordStatsResponse_DiscordNotJoinedTeam) GetTeam() *resources.Team {
	if x != nil {
		return x.Team
	}
	return nil
}

func (x *GetDiscordStatsResponse_DiscordNotJoinedTeam) GetNotJoinedMemberIds() []int64 {
	if x != nil {
		return x.NotJoinedMemberIds
	}
	return nil
}

var File_isuxportal_services_admin_unprepared_stats_proto protoreflect.FileDescriptor

var file_isuxportal_services_admin_unprepared_stats_proto_rawDesc = []byte{
	0x0a, 0x30, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x73, 0x2f, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x2f, 0x75, 0x6e, 0x70, 0x72,
	0x65, 0x70, 0x61, 0x72, 0x65, 0x64, 0x5f, 0x73, 0x74, 0x61, 0x74, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x1f, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x64,
	0x6d, 0x69, 0x6e, 0x1a, 0x1f, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2f, 0x74, 0x65, 0x61, 0x6d, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0x15, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x53, 0x53, 0x48, 0x4b, 0x65,
	0x79, 0x53, 0x74, 0x61, 0x74, 0x73, 0x51, 0x75, 0x65, 0x72, 0x79, 0x22, 0x87, 0x02, 0x0a, 0x16,
	0x47, 0x65, 0x74, 0x53, 0x53, 0x48, 0x4b, 0x65, 0x79, 0x53, 0x74, 0x61, 0x74, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x64, 0x0a, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x18,
	0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x4e, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74,
	0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65,
	0x73, 0x2e, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x2e, 0x47, 0x65, 0x74, 0x53, 0x53, 0x48, 0x4b, 0x65,
	0x79, 0x53, 0x74, 0x61, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x53,
	0x53, 0x48, 0x4b, 0x65, 0x79, 0x55, 0x6e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65,
	0x64, 0x54, 0x65, 0x61, 0x6d, 0x52, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x1a, 0x86, 0x01, 0x0a,
	0x16, 0x53, 0x53, 0x48, 0x4b, 0x65, 0x79, 0x55, 0x6e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65,
	0x72, 0x65, 0x64, 0x54, 0x65, 0x61, 0x6d, 0x12, 0x34, 0x0a, 0x04, 0x74, 0x65, 0x61, 0x6d, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x20, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74,
	0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63,
	0x65, 0x73, 0x2e, 0x54, 0x65, 0x61, 0x6d, 0x52, 0x04, 0x74, 0x65, 0x61, 0x6d, 0x12, 0x36, 0x0a,
	0x17, 0x75, 0x6e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x5f, 0x6d, 0x65,
	0x6d, 0x62, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x03, 0x52, 0x15,
	0x75, 0x6e, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x65, 0x64, 0x4d, 0x65, 0x6d, 0x62,
	0x65, 0x72, 0x49, 0x64, 0x73, 0x22, 0x16, 0x0a, 0x14, 0x47, 0x65, 0x74, 0x44, 0x69, 0x73, 0x63,
	0x6f, 0x72, 0x64, 0x53, 0x74, 0x61, 0x74, 0x73, 0x51, 0x75, 0x65, 0x72, 0x79, 0x22, 0xff, 0x01,
	0x0a, 0x17, 0x47, 0x65, 0x74, 0x44, 0x69, 0x73, 0x63, 0x6f, 0x72, 0x64, 0x53, 0x74, 0x61, 0x74,
	0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x63, 0x0a, 0x05, 0x69, 0x74, 0x65,
	0x6d, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x4d, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x2e, 0x47, 0x65, 0x74, 0x44, 0x69,
	0x73, 0x63, 0x6f, 0x72, 0x64, 0x53, 0x74, 0x61, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x2e, 0x44, 0x69, 0x73, 0x63, 0x6f, 0x72, 0x64, 0x4e, 0x6f, 0x74, 0x4a, 0x6f, 0x69,
	0x6e, 0x65, 0x64, 0x54, 0x65, 0x61, 0x6d, 0x52, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x1a, 0x7f,
	0x0a, 0x14, 0x44, 0x69, 0x73, 0x63, 0x6f, 0x72, 0x64, 0x4e, 0x6f, 0x74, 0x4a, 0x6f, 0x69, 0x6e,
	0x65, 0x64, 0x54, 0x65, 0x61, 0x6d, 0x12, 0x34, 0x0a, 0x04, 0x74, 0x65, 0x61, 0x6d, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x20, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61,
	0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65,
	0x73, 0x2e, 0x54, 0x65, 0x61, 0x6d, 0x52, 0x04, 0x74, 0x65, 0x61, 0x6d, 0x12, 0x31, 0x0a, 0x15,
	0x6e, 0x6f, 0x74, 0x5f, 0x6a, 0x6f, 0x69, 0x6e, 0x65, 0x64, 0x5f, 0x6d, 0x65, 0x6d, 0x62, 0x65,
	0x72, 0x5f, 0x69, 0x64, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x03, 0x52, 0x12, 0x6e, 0x6f, 0x74,
	0x4a, 0x6f, 0x69, 0x6e, 0x65, 0x64, 0x4d, 0x65, 0x6d, 0x62, 0x65, 0x72, 0x49, 0x64, 0x73, 0x22,
	0x17, 0x0a, 0x15, 0x47, 0x65, 0x74, 0x45, 0x6e, 0x76, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x53, 0x74,
	0x61, 0x74, 0x73, 0x51, 0x75, 0x65, 0x72, 0x79, 0x22, 0x52, 0x0a, 0x18, 0x47, 0x65, 0x74, 0x45,
	0x6e, 0x76, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x53, 0x74, 0x61, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x36, 0x0a, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x20, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0x2e, 0x54, 0x65, 0x61, 0x6d, 0x52, 0x05, 0x69, 0x74, 0x65, 0x6d, 0x73, 0x42, 0xb2, 0x02, 0x0a,
	0x23, 0x63, 0x6f, 0x6d, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61,
	0x64, 0x6d, 0x69, 0x6e, 0x42, 0x14, 0x55, 0x6e, 0x70, 0x72, 0x65, 0x70, 0x61, 0x72, 0x65, 0x64,
	0x53, 0x74, 0x61, 0x74, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x55, 0x67, 0x69,
	0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x2f,
	0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x31, 0x34, 0x2d, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f,
	0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2f, 0x64, 0x75, 0x6d, 0x6d, 0x79,
	0x62, 0x65, 0x6e, 0x63, 0x68, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f,
	0x72, 0x74, 0x61, 0x6c, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2f, 0x61, 0x64,
	0x6d, 0x69, 0x6e, 0xa2, 0x02, 0x04, 0x49, 0x50, 0x53, 0x41, 0xaa, 0x02, 0x1f, 0x49, 0x73, 0x75,
	0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x53, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x41, 0x64, 0x6d, 0x69, 0x6e, 0xca, 0x02, 0x1f, 0x49,
	0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41, 0x64, 0x6d, 0x69, 0x6e, 0xe2, 0x02,
	0x2b, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41, 0x64, 0x6d, 0x69, 0x6e,
	0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x22, 0x49,
	0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x3a, 0x3a, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x3a, 0x3a, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x3a, 0x3a, 0x41, 0x64, 0x6d, 0x69,
	0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_isuxportal_services_admin_unprepared_stats_proto_rawDescOnce sync.Once
	file_isuxportal_services_admin_unprepared_stats_proto_rawDescData = file_isuxportal_services_admin_unprepared_stats_proto_rawDesc
)

func file_isuxportal_services_admin_unprepared_stats_proto_rawDescGZIP() []byte {
	file_isuxportal_services_admin_unprepared_stats_proto_rawDescOnce.Do(func() {
		file_isuxportal_services_admin_unprepared_stats_proto_rawDescData = protoimpl.X.CompressGZIP(file_isuxportal_services_admin_unprepared_stats_proto_rawDescData)
	})
	return file_isuxportal_services_admin_unprepared_stats_proto_rawDescData
}

var file_isuxportal_services_admin_unprepared_stats_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_isuxportal_services_admin_unprepared_stats_proto_goTypes = []any{
	(*GetSSHKeyStatsQuery)(nil),                           // 0: isuxportal.proto.services.admin.GetSSHKeyStatsQuery
	(*GetSSHKeyStatsResponse)(nil),                        // 1: isuxportal.proto.services.admin.GetSSHKeyStatsResponse
	(*GetDiscordStatsQuery)(nil),                          // 2: isuxportal.proto.services.admin.GetDiscordStatsQuery
	(*GetDiscordStatsResponse)(nil),                       // 3: isuxportal.proto.services.admin.GetDiscordStatsResponse
	(*GetEnvCheckStatsQuery)(nil),                         // 4: isuxportal.proto.services.admin.GetEnvCheckStatsQuery
	(*GetEnvCheckStatsResponse)(nil),                      // 5: isuxportal.proto.services.admin.GetEnvCheckStatsResponse
	(*GetSSHKeyStatsResponse_SSHKeyUnregisteredTeam)(nil), // 6: isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam
	(*GetDiscordStatsResponse_DiscordNotJoinedTeam)(nil),  // 7: isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam
	(*resources.Team)(nil),                                // 8: isuxportal.proto.resources.Team
}
var file_isuxportal_services_admin_unprepared_stats_proto_depIdxs = []int32{
	6, // 0: isuxportal.proto.services.admin.GetSSHKeyStatsResponse.items:type_name -> isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam
	7, // 1: isuxportal.proto.services.admin.GetDiscordStatsResponse.items:type_name -> isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam
	8, // 2: isuxportal.proto.services.admin.GetEnvCheckStatsResponse.items:type_name -> isuxportal.proto.resources.Team
	8, // 3: isuxportal.proto.services.admin.GetSSHKeyStatsResponse.SSHKeyUnregisteredTeam.team:type_name -> isuxportal.proto.resources.Team
	8, // 4: isuxportal.proto.services.admin.GetDiscordStatsResponse.DiscordNotJoinedTeam.team:type_name -> isuxportal.proto.resources.Team
	5, // [5:5] is the sub-list for method output_type
	5, // [5:5] is the sub-list for method input_type
	5, // [5:5] is the sub-list for extension type_name
	5, // [5:5] is the sub-list for extension extendee
	0, // [0:5] is the sub-list for field type_name
}

func init() { file_isuxportal_services_admin_unprepared_stats_proto_init() }
func file_isuxportal_services_admin_unprepared_stats_proto_init() {
	if File_isuxportal_services_admin_unprepared_stats_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_isuxportal_services_admin_unprepared_stats_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_isuxportal_services_admin_unprepared_stats_proto_goTypes,
		DependencyIndexes: file_isuxportal_services_admin_unprepared_stats_proto_depIdxs,
		MessageInfos:      file_isuxportal_services_admin_unprepared_stats_proto_msgTypes,
	}.Build()
	File_isuxportal_services_admin_unprepared_stats_proto = out.File
	file_isuxportal_services_admin_unprepared_stats_proto_rawDesc = nil
	file_isuxportal_services_admin_unprepared_stats_proto_goTypes = nil
	file_isuxportal_services_admin_unprepared_stats_proto_depIdxs = nil
}
