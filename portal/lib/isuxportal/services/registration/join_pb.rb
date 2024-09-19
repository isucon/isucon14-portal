# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: isuxportal/services/registration/join.proto

require 'google/protobuf'

Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("isuxportal/services/registration/join.proto", :syntax => :proto3) do
    add_message "isuxportal.proto.services.registration.JoinTeamRequest" do
      optional :team_id, :int64, 1
      optional :invite_token, :string, 2
      optional :name, :string, 3
      optional :is_student, :bool, 4
      optional :is_in_person, :bool, 5
      optional :avatar_url, :string, 6
    end
    add_message "isuxportal.proto.services.registration.JoinTeamResponse" do
    end
  end
end

module Isuxportal
  module Proto
    module Services
      module Registration
        JoinTeamRequest = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.registration.JoinTeamRequest").msgclass
        JoinTeamResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.registration.JoinTeamResponse").msgclass
      end
    end
  end
end
