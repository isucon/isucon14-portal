// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        (unknown)
// source: isuxportal/resources/survey_response.proto

package resources

import (
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

type SurveyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Language string `protobuf:"bytes,1,opt,name=language,proto3" json:"language,omitempty"`
}

func (x *SurveyResponse) Reset() {
	*x = SurveyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_isuxportal_resources_survey_response_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SurveyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SurveyResponse) ProtoMessage() {}

func (x *SurveyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_isuxportal_resources_survey_response_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SurveyResponse.ProtoReflect.Descriptor instead.
func (*SurveyResponse) Descriptor() ([]byte, []int) {
	return file_isuxportal_resources_survey_response_proto_rawDescGZIP(), []int{0}
}

func (x *SurveyResponse) GetLanguage() string {
	if x != nil {
		return x.Language
	}
	return ""
}

var File_isuxportal_resources_survey_response_proto protoreflect.FileDescriptor

var file_isuxportal_resources_survey_response_proto_rawDesc = []byte{
	0x0a, 0x2a, 0x69, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73,
	0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x2f, 0x73, 0x75, 0x72, 0x76, 0x65, 0x79, 0x5f, 0x72, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x1a, 0x69, 0x73,
	0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x72,
	0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x22, 0x2c, 0x0a, 0x0e, 0x53, 0x75, 0x72, 0x76,
	0x65, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x6c, 0x61,
	0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x6c, 0x61,
	0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x42, 0x80, 0x02, 0x0a, 0x1e, 0x63, 0x6f, 0x6d, 0x2e, 0x69,
	0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x42, 0x13, 0x53, 0x75, 0x72, 0x76, 0x65,
	0x79, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x3f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x69, 0x73, 0x75,
	0x63, 0x6f, 0x6e, 0x2f, 0x69, 0x73, 0x75, 0x63, 0x6f, 0x6e, 0x31, 0x34, 0x2d, 0x70, 0x6f, 0x72,
	0x74, 0x61, 0x6c, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x67, 0x6f, 0x2f, 0x69, 0x73, 0x75,
	0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x2f, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65,
	0x73, 0xa2, 0x02, 0x03, 0x49, 0x50, 0x52, 0xaa, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f,
	0x72, 0x74, 0x61, 0x6c, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x52, 0x65, 0x73, 0x6f, 0x75,
	0x72, 0x63, 0x65, 0x73, 0xca, 0x02, 0x1a, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61,
	0x6c, 0x5c, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65,
	0x73, 0xe2, 0x02, 0x26, 0x49, 0x73, 0x75, 0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x5c, 0x50,
	0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x5c, 0x47,
	0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x1c, 0x49, 0x73, 0x75,
	0x78, 0x70, 0x6f, 0x72, 0x74, 0x61, 0x6c, 0x3a, 0x3a, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x3a, 0x3a,
	0x52, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var (
	file_isuxportal_resources_survey_response_proto_rawDescOnce sync.Once
	file_isuxportal_resources_survey_response_proto_rawDescData = file_isuxportal_resources_survey_response_proto_rawDesc
)

func file_isuxportal_resources_survey_response_proto_rawDescGZIP() []byte {
	file_isuxportal_resources_survey_response_proto_rawDescOnce.Do(func() {
		file_isuxportal_resources_survey_response_proto_rawDescData = protoimpl.X.CompressGZIP(file_isuxportal_resources_survey_response_proto_rawDescData)
	})
	return file_isuxportal_resources_survey_response_proto_rawDescData
}

var file_isuxportal_resources_survey_response_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_isuxportal_resources_survey_response_proto_goTypes = []any{
	(*SurveyResponse)(nil), // 0: isuxportal.proto.resources.SurveyResponse
}
var file_isuxportal_resources_survey_response_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_isuxportal_resources_survey_response_proto_init() }
func file_isuxportal_resources_survey_response_proto_init() {
	if File_isuxportal_resources_survey_response_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_isuxportal_resources_survey_response_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*SurveyResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_isuxportal_resources_survey_response_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_isuxportal_resources_survey_response_proto_goTypes,
		DependencyIndexes: file_isuxportal_resources_survey_response_proto_depIdxs,
		MessageInfos:      file_isuxportal_resources_survey_response_proto_msgTypes,
	}.Build()
	File_isuxportal_resources_survey_response_proto = out.File
	file_isuxportal_resources_survey_response_proto_rawDesc = nil
	file_isuxportal_resources_survey_response_proto_goTypes = nil
	file_isuxportal_resources_survey_response_proto_depIdxs = nil
}
