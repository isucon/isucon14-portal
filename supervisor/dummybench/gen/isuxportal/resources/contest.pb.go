// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.1
// 	protoc        (unknown)
// source: isuxportal/resources/contest.proto

package resources

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Contest_Status int32

const (
	Contest_STANDBY      Contest_Status = 0
	Contest_REGISTRATION Contest_Status = 1
	Contest_STARTED      Contest_Status = 2
	Contest_FINISHED     Contest_Status = 3
)

// Enum value maps for Contest_Status.
var (
	Contest_Status_name = map[int32]string{
		0: "STANDBY",
		1: "REGISTRATION",
		2: "STARTED",
		3: "FINISHED",
	}
	Contest_Status_value = map[string]int32{
		"STANDBY":      0,
		"REGISTRATION": 1,
		"STARTED":      2,
		"FINISHED":     3,
	}
)

func (x Contest_Status) Enum() *Contest_Status {
	p := new(Contest_Status)
	*p = x
	return p
}

func (x Contest_Status) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Contest_Status) Descriptor() protoreflect.EnumDescriptor {
	return file_isuxportal_resources_contest_proto_enumTypes[0].Descriptor()
}

func (Contest_Status) Type() protoreflect.EnumType {
	return &file_isuxportal_resources_contest_proto_enumTypes[0]
}

func (x Contest_Status) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Contest_Status.Descriptor instead.
func (Contest_Status) EnumDescriptor() ([]byte, []int) {
	return file_isuxportal_resources_contest_proto_rawDescGZIP(), []int{0, 0}
}

type Contest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	RegistrationOpensAt  *timestamppb.Timestamp `protobuf:"bytes,1,opt,name=registration_opens_at,json=registrationOpensAt,proto3" json:"registration_opens_at,omitempty"`
	RegistrationClosesAt *timestamppb.Timestamp `protobuf:"bytes,2,opt,name=registration_closes_at,json=registrationClosesAt,proto3" json:"registration_closes_at,omitempty"`
	StartsAt             *timestamppb.Timestamp `protobuf:"bytes,3,opt,name=starts_at,json=startsAt,proto3" json:"starts_at,omitempty"`
	FreezesAt            *timestamppb.Timestamp `protobuf:"bytes,4,opt,name=freezes_at,json=freezesAt,proto3" json:"freezes_at,omitempty"`
	EndsAt               *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=ends_at,json=endsAt,proto3" json:"ends_at,omitempty"`
	Status               Contest_Status         `protobuf:"varint,6,opt,name=status,proto3,enum=isuxportal.proto.resources.Contest_Status" json:"status,omitempty"`
	Frozen               bool                   `protobuf:"varint,7,opt,name=frozen,proto3" json:"frozen,omitempty"`
}

func (x *Contest) Reset() {
	*x = Contest{}
	mi := &file_isuxportal_resources_contest_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Contest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Contest) ProtoMessage() {}

func (x *Contest) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_resources_contest_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Contest.ProtoReflect.Descriptor instead.
func (*Contest) Descriptor() ([]byte, []int) {
	return file_isuxportal_resources_contest_proto_rawDescGZIP(), []int{0}
}

func (x *Contest) GetRegistrationOpensAt() *timestamppb.Timestamp {
	if x != nil {
		return x.RegistrationOpensAt
	}
	return nil
}

func (x *Contest) GetRegistrationClosesAt() *timestamppb.Timestamp {
	if x != nil {
		return x.RegistrationClosesAt
	}
	return nil
}

func (x *Contest) GetStartsAt() *timestamppb.Timestamp {
	if x != nil {
		return x.StartsAt
	}
	return nil
}

func (x *Contest) GetFreezesAt() *timestamppb.Timestamp {
	if x != nil {
		return x.FreezesAt
	}
	return nil
}

func (x *Contest) GetEndsAt() *timestamppb.Timestamp {
	if x != nil {
		return x.EndsAt
	}
	return nil
}

func (x *Contest) GetStatus() Contest_Status {
	if x != nil {
		return x.Status
	}
	return Contest_STANDBY
}

func (x *Contest) GetFrozen() bool {
	if x != nil {
		return x.Frozen
	}
	return false
}

var File_isuxportal_resources_contest_proto protoreflect.FileDescriptor

var file_isuxportal_resources_contest_proto_rawDesc = []byte{
	0x0a, 0x22, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73,
	0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2f, 0x63, 0x6f, 0x6e, 0x74, 0x65, 0x73, 0x74, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x12, 0x1a, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x22, 0xf4, 0x03, 0x0a, 0x07, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x73, 0x74, 0x12, 0x4e, 0x0a,
	0x15, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x6f, 0x70,
	0x65, 0x6e, 0x73, 0x5f, 0x61, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x13, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4f, 0x70, 0x65, 0x6e, 0x73, 0x41, 0x74, 0x12, 0x50, 0x0a,
	0x16, 0x72, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x63, 0x6c,
	0x6f, 0x73, 0x65, 0x73, 0x5f, 0x61, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x14, 0x72, 0x65, 0x67, 0x69, 0x73,
	0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6c, 0x6f, 0x73, 0x65, 0x73, 0x41, 0x74, 0x12,
	0x37, 0x0a, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74, 0x73, 0x5f, 0x61, 0x74, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x08,
	0x73, 0x74, 0x61, 0x72, 0x74, 0x73, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x66, 0x72, 0x65, 0x65,
	0x7a, 0x65, 0x73, 0x5f, 0x61, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x66, 0x72, 0x65, 0x65, 0x7a, 0x65,
	0x73, 0x41, 0x74, 0x12, 0x33, 0x0a, 0x07, 0x65, 0x6e, 0x64, 0x73, 0x5f, 0x61, 0x74, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70,
	0x52, 0x06, 0x65, 0x6e, 0x64, 0x73, 0x41, 0x74, 0x12, 0x42, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74,
	0x75, 0x73, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x2a, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f,
	0x75, 0x72, 0x63, 0x65, 0x73, 0x2e, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x73, 0x74, 0x2e, 0x53, 0x74,
	0x61, 0x74, 0x75, 0x73, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x16, 0x0a, 0x06,
	0x66, 0x72, 0x6f, 0x7a, 0x65, 0x6e, 0x18, 0x07, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x66, 0x72,
	0x6f, 0x7a, 0x65, 0x6e, 0x22, 0x42, 0x0a, 0x06, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x0b,
	0x0a, 0x07, 0x53, 0x54, 0x41, 0x4e, 0x44, 0x42, 0x59, 0x10, 0x00, 0x12, 0x10, 0x0a, 0x0c, 0x52,
	0x45, 0x47, 0x49, 0x53, 0x54, 0x52, 0x41, 0x54, 0x49, 0x4f, 0x4e, 0x10, 0x01, 0x12, 0x0b, 0x0a,
	0x07, 0x53, 0x54, 0x41, 0x52, 0x54, 0x45, 0x44, 0x10, 0x02, 0x12, 0x0c, 0x0a, 0x08, 0x46, 0x49,
	0x4e, 0x49, 0x53, 0x48, 0x45, 0x44, 0x10, 0x03, 0x42, 0x8a, 0x02, 0x0a, 0x1e, 0x63, 0x6f, 0x6d,
	0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x42, 0x0c, 0x43, 0x6f, 0x6e,
	0x74, 0x65, 0x73, 0x74, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x50, 0x67, 0x69, 0x74,
	0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x2f, 0x69,
	0x73, 0x75, 0x63, 0x6f, 0x6e, 0x31, 0x34, 0x2d, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x73,
	0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2f, 0x64, 0x75, 0x6d, 0x6d, 0x79, 0x62,
	0x65, 0x6e, 0x63, 0x68, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72,
	0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0xa2, 0x02, 0x03,
	0x49, 0x50, 0x52, 0xaa, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0xca, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72,
	0x6f, 0x74, 0x6f, 0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0xe2, 0x02, 0x26,
	0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x1c, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72,
	0x74, 0x61, 0x6c, 0x3a, 0x3a, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x3a, 0x3a, 0x52, 0x65, 0x73, 0x6f,
	0x75, 0x72, 0x63, 0x65, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_isuxportal_resources_contest_proto_rawDescOnce sync.Once
	file_isuxportal_resources_contest_proto_rawDescData = file_isuxportal_resources_contest_proto_rawDesc
)

func file_isuxportal_resources_contest_proto_rawDescGZIP() []byte {
	file_isuxportal_resources_contest_proto_rawDescOnce.Do(func() {
		file_isuxportal_resources_contest_proto_rawDescData = protoimpl.X.CompressGZIP(file_isuxportal_resources_contest_proto_rawDescData)
	})
	return file_isuxportal_resources_contest_proto_rawDescData
}

var file_isuxportal_resources_contest_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_isuxportal_resources_contest_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_isuxportal_resources_contest_proto_goTypes = []any{
	(Contest_Status)(0),           // 0: isuxportal.proto.resources.Contest.Status
	(*Contest)(nil),               // 1: isuxportal.proto.resources.Contest
	(*timestamppb.Timestamp)(nil), // 2: google.protobuf.Timestamp
}
var file_isuxportal_resources_contest_proto_depIdxs = []int32{
	2, // 0: isuxportal.proto.resources.Contest.registration_opens_at:type_name -> google.protobuf.Timestamp
	2, // 1: isuxportal.proto.resources.Contest.registration_closes_at:type_name -> google.protobuf.Timestamp
	2, // 2: isuxportal.proto.resources.Contest.starts_at:type_name -> google.protobuf.Timestamp
	2, // 3: isuxportal.proto.resources.Contest.freezes_at:type_name -> google.protobuf.Timestamp
	2, // 4: isuxportal.proto.resources.Contest.ends_at:type_name -> google.protobuf.Timestamp
	0, // 5: isuxportal.proto.resources.Contest.status:type_name -> isuxportal.proto.resources.Contest.Status
	6, // [6:6] is the sub-list for method output_type
	6, // [6:6] is the sub-list for method input_type
	6, // [6:6] is the sub-list for extension type_name
	6, // [6:6] is the sub-list for extension extendee
	0, // [0:6] is the sub-list for field type_name
}

func init() { file_isuxportal_resources_contest_proto_init() }
func file_isuxportal_resources_contest_proto_init() {
	if File_isuxportal_resources_contest_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_isuxportal_resources_contest_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_isuxportal_resources_contest_proto_goTypes,
		DependencyIndexes: file_isuxportal_resources_contest_proto_depIdxs,
		EnumInfos:         file_isuxportal_resources_contest_proto_enumTypes,
		MessageInfos:      file_isuxportal_resources_contest_proto_msgTypes,
	}.Build()
	File_isuxportal_resources_contest_proto = out.File
	file_isuxportal_resources_contest_proto_rawDesc = nil
	file_isuxportal_resources_contest_proto_goTypes = nil
	file_isuxportal_resources_contest_proto_depIdxs = nil
}
