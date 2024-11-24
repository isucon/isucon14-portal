// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.2
// 	protoc        (unknown)
// source: isuxportal/resources/benchmark_result.proto

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

type BenchmarkResult struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Finished       bool                            `protobuf:"varint,1,opt,name=finished,proto3" json:"finished,omitempty"`
	Passed         bool                            `protobuf:"varint,2,opt,name=passed,proto3" json:"passed,omitempty"`
	Score          int64                           `protobuf:"varint,3,opt,name=score,proto3" json:"score,omitempty"`
	ScoreBreakdown *BenchmarkResult_ScoreBreakdown `protobuf:"bytes,4,opt,name=score_breakdown,json=scoreBreakdown,proto3" json:"score_breakdown,omitempty"`
	// only present for finished result
	Execution *BenchmarkResult_Execution `protobuf:"bytes,5,opt,name=execution,proto3" json:"execution,omitempty"`
	MarkedAt  *timestamppb.Timestamp     `protobuf:"bytes,6,opt,name=marked_at,json=markedAt,proto3" json:"marked_at,omitempty"`
	// TODO: not available in responses
	SurveyResponse *SurveyResponse `protobuf:"bytes,8,opt,name=survey_response,json=surveyResponse,proto3" json:"survey_response,omitempty"`
}

func (x *BenchmarkResult) Reset() {
	*x = BenchmarkResult{}
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *BenchmarkResult) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BenchmarkResult) ProtoMessage() {}

func (x *BenchmarkResult) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BenchmarkResult.ProtoReflect.Descriptor instead.
func (*BenchmarkResult) Descriptor() ([]byte, []int) {
	return file_isuxportal_resources_benchmark_result_proto_rawDescGZIP(), []int{0}
}

func (x *BenchmarkResult) GetFinished() bool {
	if x != nil {
		return x.Finished
	}
	return false
}

func (x *BenchmarkResult) GetPassed() bool {
	if x != nil {
		return x.Passed
	}
	return false
}

func (x *BenchmarkResult) GetScore() int64 {
	if x != nil {
		return x.Score
	}
	return 0
}

func (x *BenchmarkResult) GetScoreBreakdown() *BenchmarkResult_ScoreBreakdown {
	if x != nil {
		return x.ScoreBreakdown
	}
	return nil
}

func (x *BenchmarkResult) GetExecution() *BenchmarkResult_Execution {
	if x != nil {
		return x.Execution
	}
	return nil
}

func (x *BenchmarkResult) GetMarkedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.MarkedAt
	}
	return nil
}

func (x *BenchmarkResult) GetSurveyResponse() *SurveyResponse {
	if x != nil {
		return x.SurveyResponse
	}
	return nil
}

type BenchmarkResult_ScoreBreakdown struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Raw       int64 `protobuf:"varint,1,opt,name=raw,proto3" json:"raw,omitempty"`
	Deduction int64 `protobuf:"varint,2,opt,name=deduction,proto3" json:"deduction,omitempty"`
}

func (x *BenchmarkResult_ScoreBreakdown) Reset() {
	*x = BenchmarkResult_ScoreBreakdown{}
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *BenchmarkResult_ScoreBreakdown) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BenchmarkResult_ScoreBreakdown) ProtoMessage() {}

func (x *BenchmarkResult_ScoreBreakdown) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BenchmarkResult_ScoreBreakdown.ProtoReflect.Descriptor instead.
func (*BenchmarkResult_ScoreBreakdown) Descriptor() ([]byte, []int) {
	return file_isuxportal_resources_benchmark_result_proto_rawDescGZIP(), []int{0, 0}
}

func (x *BenchmarkResult_ScoreBreakdown) GetRaw() int64 {
	if x != nil {
		return x.Raw
	}
	return 0
}

func (x *BenchmarkResult_ScoreBreakdown) GetDeduction() int64 {
	if x != nil {
		return x.Deduction
	}
	return 0
}

type BenchmarkResult_Execution struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Reason     string `protobuf:"bytes,1,opt,name=reason,proto3" json:"reason,omitempty"`
	Stdout     string `protobuf:"bytes,2,opt,name=stdout,proto3" json:"stdout,omitempty"`
	Stderr     string `protobuf:"bytes,3,opt,name=stderr,proto3" json:"stderr,omitempty"`
	ExitStatus int32  `protobuf:"varint,4,opt,name=exit_status,json=exitStatus,proto3" json:"exit_status,omitempty"`
	ExitSignal int32  `protobuf:"varint,5,opt,name=exit_signal,json=exitSignal,proto3" json:"exit_signal,omitempty"`
	Signaled   bool   `protobuf:"varint,6,opt,name=signaled,proto3" json:"signaled,omitempty"`
}

func (x *BenchmarkResult_Execution) Reset() {
	*x = BenchmarkResult_Execution{}
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *BenchmarkResult_Execution) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BenchmarkResult_Execution) ProtoMessage() {}

func (x *BenchmarkResult_Execution) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_resources_benchmark_result_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BenchmarkResult_Execution.ProtoReflect.Descriptor instead.
func (*BenchmarkResult_Execution) Descriptor() ([]byte, []int) {
	return file_isuxportal_resources_benchmark_result_proto_rawDescGZIP(), []int{0, 1}
}

func (x *BenchmarkResult_Execution) GetReason() string {
	if x != nil {
		return x.Reason
	}
	return ""
}

func (x *BenchmarkResult_Execution) GetStdout() string {
	if x != nil {
		return x.Stdout
	}
	return ""
}

func (x *BenchmarkResult_Execution) GetStderr() string {
	if x != nil {
		return x.Stderr
	}
	return ""
}

func (x *BenchmarkResult_Execution) GetExitStatus() int32 {
	if x != nil {
		return x.ExitStatus
	}
	return 0
}

func (x *BenchmarkResult_Execution) GetExitSignal() int32 {
	if x != nil {
		return x.ExitSignal
	}
	return 0
}

func (x *BenchmarkResult_Execution) GetSignaled() bool {
	if x != nil {
		return x.Signaled
	}
	return false
}

var File_isuxportal_resources_benchmark_result_proto protoreflect.FileDescriptor

var file_isuxportal_resources_benchmark_result_proto_rawDesc = []byte{
	0x0a, 0x2b, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73,
	0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2f, 0x62, 0x65, 0x6e, 0x63, 0x68, 0x6d, 0x61, 0x72, 0x6b,
	0x5f, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x1a, 0x69,
	0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x2a, 0x69, 0x73, 0x75, 0x78,
	0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73,
	0x2f, 0x73, 0x75, 0x72, 0x76, 0x65, 0x79, 0x5f, 0x72, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x99, 0x05, 0x0a, 0x0f, 0x42, 0x65, 0x6e, 0x63, 0x68,
	0x6d, 0x61, 0x72, 0x6b, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x12, 0x1a, 0x0a, 0x08, 0x66, 0x69,
	0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x08, 0x66, 0x69,
	0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x12, 0x16, 0x0a, 0x06, 0x70, 0x61, 0x73, 0x73, 0x65, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x70, 0x61, 0x73, 0x73, 0x65, 0x64, 0x12, 0x14,
	0x0a, 0x05, 0x73, 0x63, 0x6f, 0x72, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x73,
	0x63, 0x6f, 0x72, 0x65, 0x12, 0x63, 0x0a, 0x0f, 0x73, 0x63, 0x6f, 0x72, 0x65, 0x5f, 0x62, 0x72,
	0x65, 0x61, 0x6b, 0x64, 0x6f, 0x77, 0x6e, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x3a, 0x2e,
	0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2e, 0x42, 0x65, 0x6e, 0x63, 0x68,
	0x6d, 0x61, 0x72, 0x6b, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x2e, 0x53, 0x63, 0x6f, 0x72, 0x65,
	0x42, 0x72, 0x65, 0x61, 0x6b, 0x64, 0x6f, 0x77, 0x6e, 0x52, 0x0e, 0x73, 0x63, 0x6f, 0x72, 0x65,
	0x42, 0x72, 0x65, 0x61, 0x6b, 0x64, 0x6f, 0x77, 0x6e, 0x12, 0x53, 0x0a, 0x09, 0x65, 0x78, 0x65,
	0x63, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x35, 0x2e, 0x69,
	0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2e, 0x42, 0x65, 0x6e, 0x63, 0x68, 0x6d,
	0x61, 0x72, 0x6b, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x2e, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74,
	0x69, 0x6f, 0x6e, 0x52, 0x09, 0x65, 0x78, 0x65, 0x63, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x37,
	0x0a, 0x09, 0x6d, 0x61, 0x72, 0x6b, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x06, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x08, 0x6d,
	0x61, 0x72, 0x6b, 0x65, 0x64, 0x41, 0x74, 0x12, 0x53, 0x0a, 0x0f, 0x73, 0x75, 0x72, 0x76, 0x65,
	0x79, 0x5f, 0x72, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x2a, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2e, 0x53, 0x75,
	0x72, 0x76, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x52, 0x0e, 0x73, 0x75,
	0x72, 0x76, 0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x1a, 0x40, 0x0a, 0x0e,
	0x53, 0x63, 0x6f, 0x72, 0x65, 0x42, 0x72, 0x65, 0x61, 0x6b, 0x64, 0x6f, 0x77, 0x6e, 0x12, 0x10,
	0x0a, 0x03, 0x72, 0x61, 0x77, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x03, 0x72, 0x61, 0x77,
	0x12, 0x1c, 0x0a, 0x09, 0x64, 0x65, 0x64, 0x75, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x03, 0x52, 0x09, 0x64, 0x65, 0x64, 0x75, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x1a, 0xb1,
	0x01, 0x0a, 0x09, 0x45, 0x78, 0x65, 0x63, 0x75, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x16, 0x0a, 0x06,
	0x72, 0x65, 0x61, 0x73, 0x6f, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x72, 0x65,
	0x61, 0x73, 0x6f, 0x6e, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x64, 0x6f, 0x75, 0x74, 0x18, 0x02,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x64, 0x6f, 0x75, 0x74, 0x12, 0x16, 0x0a, 0x06,
	0x73, 0x74, 0x64, 0x65, 0x72, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74,
	0x64, 0x65, 0x72, 0x72, 0x12, 0x1f, 0x0a, 0x0b, 0x65, 0x78, 0x69, 0x74, 0x5f, 0x73, 0x74, 0x61,
	0x74, 0x75, 0x73, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a, 0x65, 0x78, 0x69, 0x74, 0x53,
	0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x1f, 0x0a, 0x0b, 0x65, 0x78, 0x69, 0x74, 0x5f, 0x73, 0x69,
	0x67, 0x6e, 0x61, 0x6c, 0x18, 0x05, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0a, 0x65, 0x78, 0x69, 0x74,
	0x53, 0x69, 0x67, 0x6e, 0x61, 0x6c, 0x12, 0x1a, 0x0a, 0x08, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x6c,
	0x65, 0x64, 0x18, 0x06, 0x20, 0x01, 0x28, 0x08, 0x52, 0x08, 0x73, 0x69, 0x67, 0x6e, 0x61, 0x6c,
	0x65, 0x64, 0x42, 0x92, 0x02, 0x0a, 0x1e, 0x63, 0x6f, 0x6d, 0x2e, 0x69, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72, 0x65, 0x73, 0x6f,
	0x75, 0x72, 0x63, 0x65, 0x73, 0x42, 0x14, 0x42, 0x65, 0x6e, 0x63, 0x68, 0x6d, 0x61, 0x72, 0x6b,
	0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x50, 0x67,
	0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e,
	0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x31, 0x34, 0x2d, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c,
	0x2f, 0x73, 0x75, 0x70, 0x65, 0x72, 0x76, 0x69, 0x73, 0x6f, 0x72, 0x2f, 0x64, 0x75, 0x6d, 0x6d,
	0x79, 0x62, 0x65, 0x6e, 0x63, 0x68, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x69, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0xa2,
	0x02, 0x03, 0x49, 0x50, 0x52, 0xaa, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74,
	0x61, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63,
	0x65, 0x73, 0xca, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c,
	0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0xe2,
	0x02, 0x26, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50, 0x72, 0x6f,
	0x74, 0x6f, 0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x5c, 0x47, 0x50, 0x42,
	0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x1c, 0x49, 0x73, 0x75, 0x78, 0x70,
	0x6f, 0x72, 0x74, 0x61, 0x6c, 0x3a, 0x3a, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x3a, 0x3a, 0x52, 0x65,
	0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_isuxportal_resources_benchmark_result_proto_rawDescOnce sync.Once
	file_isuxportal_resources_benchmark_result_proto_rawDescData = file_isuxportal_resources_benchmark_result_proto_rawDesc
)

func file_isuxportal_resources_benchmark_result_proto_rawDescGZIP() []byte {
	file_isuxportal_resources_benchmark_result_proto_rawDescOnce.Do(func() {
		file_isuxportal_resources_benchmark_result_proto_rawDescData = protoimpl.X.CompressGZIP(file_isuxportal_resources_benchmark_result_proto_rawDescData)
	})
	return file_isuxportal_resources_benchmark_result_proto_rawDescData
}

var file_isuxportal_resources_benchmark_result_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_isuxportal_resources_benchmark_result_proto_goTypes = []any{
	(*BenchmarkResult)(nil),                // 0: isuxportal.proto.resources.BenchmarkResult
	(*BenchmarkResult_ScoreBreakdown)(nil), // 1: isuxportal.proto.resources.BenchmarkResult.ScoreBreakdown
	(*BenchmarkResult_Execution)(nil),      // 2: isuxportal.proto.resources.BenchmarkResult.Execution
	(*timestamppb.Timestamp)(nil),          // 3: google.protobuf.Timestamp
	(*SurveyResponse)(nil),                 // 4: isuxportal.proto.resources.SurveyResponse
}
var file_isuxportal_resources_benchmark_result_proto_depIdxs = []int32{
	1, // 0: isuxportal.proto.resources.BenchmarkResult.score_breakdown:type_name -> isuxportal.proto.resources.BenchmarkResult.ScoreBreakdown
	2, // 1: isuxportal.proto.resources.BenchmarkResult.execution:type_name -> isuxportal.proto.resources.BenchmarkResult.Execution
	3, // 2: isuxportal.proto.resources.BenchmarkResult.marked_at:type_name -> google.protobuf.Timestamp
	4, // 3: isuxportal.proto.resources.BenchmarkResult.survey_response:type_name -> isuxportal.proto.resources.SurveyResponse
	4, // [4:4] is the sub-list for method output_type
	4, // [4:4] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_isuxportal_resources_benchmark_result_proto_init() }
func file_isuxportal_resources_benchmark_result_proto_init() {
	if File_isuxportal_resources_benchmark_result_proto != nil {
		return
	}
	file_isuxportal_resources_survey_response_proto_init()
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_isuxportal_resources_benchmark_result_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_isuxportal_resources_benchmark_result_proto_goTypes,
		DependencyIndexes: file_isuxportal_resources_benchmark_result_proto_depIdxs,
		MessageInfos:      file_isuxportal_resources_benchmark_result_proto_msgTypes,
	}.Build()
	File_isuxportal_resources_benchmark_result_proto = out.File
	file_isuxportal_resources_benchmark_result_proto_rawDesc = nil
	file_isuxportal_resources_benchmark_result_proto_goTypes = nil
	file_isuxportal_resources_benchmark_result_proto_depIdxs = nil
}
