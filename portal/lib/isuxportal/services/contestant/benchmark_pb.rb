# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: isuxportal/services/contestant/benchmark.proto

require 'google/protobuf'

require 'isuxportal/resources/benchmark_job_pb'
Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("isuxportal/services/contestant/benchmark.proto", :syntax => :proto3) do
    add_message "isuxportal.proto.services.contestant.ListBenchmarkJobsQuery" do
      optional :limit, :int64, 1
      optional :status, :enum, 2, "isuxportal.proto.resources.BenchmarkJob.Status"
    end
    add_message "isuxportal.proto.services.contestant.ListBenchmarkJobsResponse" do
      repeated :jobs, :message, 1, "isuxportal.proto.resources.BenchmarkJob"
    end
    add_message "isuxportal.proto.services.contestant.EnqueueBenchmarkJobRequest" do
      optional :target_id, :int64, 1
    end
    add_message "isuxportal.proto.services.contestant.EnqueueBenchmarkJobResponse" do
      optional :job, :message, 1, "isuxportal.proto.resources.BenchmarkJob"
    end
    add_message "isuxportal.proto.services.contestant.GetBenchmarkJobQuery" do
      optional :id, :int64, 1
    end
    add_message "isuxportal.proto.services.contestant.GetBenchmarkJobResponse" do
      optional :job, :message, 1, "isuxportal.proto.resources.BenchmarkJob"
    end
  end
end

module Isuxportal
  module Proto
    module Services
      module Contestant
        ListBenchmarkJobsQuery = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.ListBenchmarkJobsQuery").msgclass
        ListBenchmarkJobsResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.ListBenchmarkJobsResponse").msgclass
        EnqueueBenchmarkJobRequest = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.EnqueueBenchmarkJobRequest").msgclass
        EnqueueBenchmarkJobResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.EnqueueBenchmarkJobResponse").msgclass
        GetBenchmarkJobQuery = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.GetBenchmarkJobQuery").msgclass
        GetBenchmarkJobResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.contestant.GetBenchmarkJobResponse").msgclass
      end
    end
  end
end
