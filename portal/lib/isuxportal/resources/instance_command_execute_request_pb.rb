# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: isuxportal/resources/instance_command_execute_request.proto

require 'google/protobuf'

require 'isuxportal/resources/contestant_instance_pb'
require 'google/protobuf/timestamp_pb'
Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("isuxportal/resources/instance_command_execute_request.proto", :syntax => :proto3) do
    add_message "isuxportal.proto.resources.InstanceCommandExecuteRequest" do
      optional :id, :int64, 1
      optional :command, :string, 2
      optional :created_at, :message, 3, "google.protobuf.Timestamp"
      optional :total_target_count, :int64, 4
      optional :total_finished_count, :int64, 5
    end
    add_message "isuxportal.proto.resources.InstanceCommandExecuteRequestResult" do
      optional :id, :int64, 1
      optional :target, :message, 2, "isuxportal.proto.resources.ContestantInstance"
      optional :exit_code, :int32, 3
      optional :finished_at, :message, 4, "google.protobuf.Timestamp"
    end
    add_message "isuxportal.proto.resources.InstanceCommandExecuteRequestResultOutput" do
      optional :output, :string, 1
    end
  end
end

module Isuxportal
  module Proto
    module Resources
      InstanceCommandExecuteRequest = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.resources.InstanceCommandExecuteRequest").msgclass
      InstanceCommandExecuteRequestResult = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.resources.InstanceCommandExecuteRequestResult").msgclass
      InstanceCommandExecuteRequestResultOutput = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.resources.InstanceCommandExecuteRequestResultOutput").msgclass
    end
  end
end