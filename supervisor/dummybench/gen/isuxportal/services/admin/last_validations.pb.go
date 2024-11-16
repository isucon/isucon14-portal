// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.2
// 	protoc        (unknown)
// source: isuxportal/services/admin/last_validations.proto

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

type TriggerEnvCheckRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TriggerEnvCheckRequest) Reset() {
	*x = TriggerEnvCheckRequest{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *TriggerEnvCheckRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TriggerEnvCheckRequest) ProtoMessage() {}

func (x *TriggerEnvCheckRequest) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TriggerEnvCheckRequest.ProtoReflect.Descriptor instead.
func (*TriggerEnvCheckRequest) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{0}
}

type TriggerEnvCheckResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TriggerEnvCheckResponse) Reset() {
	*x = TriggerEnvCheckResponse{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *TriggerEnvCheckResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TriggerEnvCheckResponse) ProtoMessage() {}

func (x *TriggerEnvCheckResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TriggerEnvCheckResponse.ProtoReflect.Descriptor instead.
func (*TriggerEnvCheckResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{1}
}

type TriggerInstanceRestartRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TriggerInstanceRestartRequest) Reset() {
	*x = TriggerInstanceRestartRequest{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *TriggerInstanceRestartRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TriggerInstanceRestartRequest) ProtoMessage() {}

func (x *TriggerInstanceRestartRequest) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TriggerInstanceRestartRequest.ProtoReflect.Descriptor instead.
func (*TriggerInstanceRestartRequest) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{2}
}

type TriggerInstanceRestartResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TriggerInstanceRestartResponse) Reset() {
	*x = TriggerInstanceRestartResponse{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *TriggerInstanceRestartResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TriggerInstanceRestartResponse) ProtoMessage() {}

func (x *TriggerInstanceRestartResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TriggerInstanceRestartResponse.ProtoReflect.Descriptor instead.
func (*TriggerInstanceRestartResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{3}
}

type ListInstanceCommandExecuteRequestsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ListInstanceCommandExecuteRequestsRequest) Reset() {
	*x = ListInstanceCommandExecuteRequestsRequest{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ListInstanceCommandExecuteRequestsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListInstanceCommandExecuteRequestsRequest) ProtoMessage() {}

func (x *ListInstanceCommandExecuteRequestsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListInstanceCommandExecuteRequestsRequest.ProtoReflect.Descriptor instead.
func (*ListInstanceCommandExecuteRequestsRequest) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{4}
}

type ListInstanceCommandExecuteRequestsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Requests []*resources.InstanceCommandExecuteRequest `protobuf:"bytes,1,rep,name=requests,proto3" json:"requests,omitempty"`
}

func (x *ListInstanceCommandExecuteRequestsResponse) Reset() {
	*x = ListInstanceCommandExecuteRequestsResponse{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[5]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ListInstanceCommandExecuteRequestsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListInstanceCommandExecuteRequestsResponse) ProtoMessage() {}

func (x *ListInstanceCommandExecuteRequestsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[5]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListInstanceCommandExecuteRequestsResponse.ProtoReflect.Descriptor instead.
func (*ListInstanceCommandExecuteRequestsResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{5}
}

func (x *ListInstanceCommandExecuteRequestsResponse) GetRequests() []*resources.InstanceCommandExecuteRequest {
	if x != nil {
		return x.Requests
	}
	return nil
}

type GetInstanceCommandExecuteRequestRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	RequestId int64 `protobuf:"varint,1,opt,name=request_id,json=requestId,proto3" json:"request_id,omitempty"`
}

func (x *GetInstanceCommandExecuteRequestRequest) Reset() {
	*x = GetInstanceCommandExecuteRequestRequest{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[6]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetInstanceCommandExecuteRequestRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetInstanceCommandExecuteRequestRequest) ProtoMessage() {}

func (x *GetInstanceCommandExecuteRequestRequest) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[6]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetInstanceCommandExecuteRequestRequest.ProtoReflect.Descriptor instead.
func (*GetInstanceCommandExecuteRequestRequest) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{6}
}

func (x *GetInstanceCommandExecuteRequestRequest) GetRequestId() int64 {
	if x != nil {
		return x.RequestId
	}
	return 0
}

type GetInstanceCommandExecuteRequestResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Results []*resources.InstanceCommandExecuteRequestResult `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
}

func (x *GetInstanceCommandExecuteRequestResponse) Reset() {
	*x = GetInstanceCommandExecuteRequestResponse{}
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[7]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *GetInstanceCommandExecuteRequestResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetInstanceCommandExecuteRequestResponse) ProtoMessage() {}

func (x *GetInstanceCommandExecuteRequestResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_services_admin_last_validations_proto_msgTypes[7]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetInstanceCommandExecuteRequestResponse.ProtoReflect.Descriptor instead.
func (*GetInstanceCommandExecuteRequestResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_services_admin_last_validations_proto_rawDescGZIP(), []int{7}
}

func (x *GetInstanceCommandExecuteRequestResponse) GetResults() []*resources.InstanceCommandExecuteRequestResult {
	if x != nil {
		return x.Results
	}
	return nil
}

var File_isuxportal_services_admin_last_validations_proto protoreflect.FileDescriptor

var file_isuxportal_services_admin_last_validations_proto_rawDesc = []byte{
	0x0a, 0x30, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x73, 0x2f, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x2f, 0x6c, 0x61, 0x73, 0x74,
	0x5f, 0x76, 0x61, 0x6c, 0x69, 0x64, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x1f, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x61, 0x64,
	0x6d, 0x69, 0x6e, 0x1a, 0x3b, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2f, 0x69, 0x6e, 0x73, 0x74, 0x61, 0x6e,
	0x63, 0x65, 0x5f, 0x63, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x5f, 0x65, 0x78, 0x65, 0x63, 0x75,
	0x74, 0x65, 0x5f, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x18, 0x0a, 0x16, 0x54, 0x72, 0x69, 0x67, 0x67, 0x65, 0x72, 0x45, 0x6e, 0x76, 0x43, 0x68,
	0x65, 0x63, 0x6b, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x19, 0x0a, 0x17, 0x54, 0x72,
	0x69, 0x67, 0x67, 0x65, 0x72, 0x45, 0x6e, 0x76, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x1f, 0x0a, 0x1d, 0x54, 0x72, 0x69, 0x67, 0x67, 0x65, 0x72,
	0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x52, 0x65, 0x73, 0x74, 0x61, 0x72, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x20, 0x0a, 0x1e, 0x54, 0x72, 0x69, 0x67, 0x67, 0x65,
	0x72, 0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x52, 0x65, 0x73, 0x74, 0x61, 0x72, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x2b, 0x0a, 0x29, 0x4c, 0x69, 0x73, 0x74,
	0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x45,
	0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x83, 0x01, 0x0a, 0x2a, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e,
	0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x45, 0x78, 0x65,
	0x63, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x55, 0x0a, 0x08, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73,
	0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x39, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72,
	0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72,
	0x63, 0x65, 0x73, 0x2e, 0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d,
	0x61, 0x6e, 0x64, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x52, 0x08, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x73, 0x22, 0x48, 0x0a, 0x27, 0x47,
	0x65, 0x74, 0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e,
	0x64, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x09, 0x72, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x49, 0x64, 0x22, 0x85, 0x01, 0x0a, 0x28, 0x47, 0x65, 0x74, 0x49, 0x6e, 0x73,
	0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x45, 0x78, 0x65, 0x63,
	0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x59, 0x0a, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x3f, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0x2e, 0x49, 0x6e, 0x73, 0x74, 0x61, 0x6e, 0x63, 0x65, 0x43, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64,
	0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x52, 0x65,
	0x73, 0x75, 0x6c, 0x74, 0x52, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x42, 0xb2, 0x02,
	0x0a, 0x23, 0x63, 0x6f, 0x6d, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e,
	0x61, 0x64, 0x6d, 0x69, 0x6e, 0x42, 0x14, 0x4c, 0x61, 0x73, 0x74, 0x56, 0x61, 0x6c, 0x69, 0x64,
	0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x55, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e,
	0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x31, 0x34, 0x2d, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2f, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2f, 0x64, 0x75, 0x6d, 0x6d,
	0x79, 0x62, 0x65, 0x6e, 0x63, 0x68, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x69, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2f, 0x61,
	0x64, 0x6d, 0x69, 0x6e, 0xa2, 0x02, 0x04, 0x49, 0x50, 0x53, 0x41, 0xaa, 0x02, 0x1f, 0x49, 0x73,
	0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x41, 0x64, 0x6d, 0x69, 0x6e, 0xca, 0x02, 0x1f,
	0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41, 0x64, 0x6d, 0x69, 0x6e, 0xe2,
	0x02, 0x2b, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f,
	0x74, 0x6f, 0x5c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x5c, 0x41, 0x64, 0x6d, 0x69,
	0x6e, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x22,
	0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x3a, 0x3a, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0x3a, 0x3a, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x73, 0x3a, 0x3a, 0x41, 0x64, 0x6d,
	0x69, 0x6e, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_isuxportal_services_admin_last_validations_proto_rawDescOnce sync.Once
	file_isuxportal_services_admin_last_validations_proto_rawDescData = file_isuxportal_services_admin_last_validations_proto_rawDesc
)

func file_isuxportal_services_admin_last_validations_proto_rawDescGZIP() []byte {
	file_isuxportal_services_admin_last_validations_proto_rawDescOnce.Do(func() {
		file_isuxportal_services_admin_last_validations_proto_rawDescData = protoimpl.X.CompressGZIP(file_isuxportal_services_admin_last_validations_proto_rawDescData)
	})
	return file_isuxportal_services_admin_last_validations_proto_rawDescData
}

var file_isuxportal_services_admin_last_validations_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_isuxportal_services_admin_last_validations_proto_goTypes = []any{
	(*TriggerEnvCheckRequest)(nil),                        // 0: isuxportal.proto.services.admin.TriggerEnvCheckRequest
	(*TriggerEnvCheckResponse)(nil),                       // 1: isuxportal.proto.services.admin.TriggerEnvCheckResponse
	(*TriggerInstanceRestartRequest)(nil),                 // 2: isuxportal.proto.services.admin.TriggerInstanceRestartRequest
	(*TriggerInstanceRestartResponse)(nil),                // 3: isuxportal.proto.services.admin.TriggerInstanceRestartResponse
	(*ListInstanceCommandExecuteRequestsRequest)(nil),     // 4: isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsRequest
	(*ListInstanceCommandExecuteRequestsResponse)(nil),    // 5: isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsResponse
	(*GetInstanceCommandExecuteRequestRequest)(nil),       // 6: isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestRequest
	(*GetInstanceCommandExecuteRequestResponse)(nil),      // 7: isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestResponse
	(*resources.InstanceCommandExecuteRequest)(nil),       // 8: isuxportal.proto.resources.InstanceCommandExecuteRequest
	(*resources.InstanceCommandExecuteRequestResult)(nil), // 9: isuxportal.proto.resources.InstanceCommandExecuteRequestResult
}
var file_isuxportal_services_admin_last_validations_proto_depIdxs = []int32{
	8, // 0: isuxportal.proto.services.admin.ListInstanceCommandExecuteRequestsResponse.requests:type_name -> isuxportal.proto.resources.InstanceCommandExecuteRequest
	9, // 1: isuxportal.proto.services.admin.GetInstanceCommandExecuteRequestResponse.results:type_name -> isuxportal.proto.resources.InstanceCommandExecuteRequestResult
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_isuxportal_services_admin_last_validations_proto_init() }
func file_isuxportal_services_admin_last_validations_proto_init() {
	if File_isuxportal_services_admin_last_validations_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_isuxportal_services_admin_last_validations_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_isuxportal_services_admin_last_validations_proto_goTypes,
		DependencyIndexes: file_isuxportal_services_admin_last_validations_proto_depIdxs,
		MessageInfos:      file_isuxportal_services_admin_last_validations_proto_msgTypes,
	}.Build()
	File_isuxportal_services_admin_last_validations_proto = out.File
	file_isuxportal_services_admin_last_validations_proto_rawDesc = nil
	file_isuxportal_services_admin_last_validations_proto_goTypes = nil
	file_isuxportal_services_admin_last_validations_proto_depIdxs = nil
}
