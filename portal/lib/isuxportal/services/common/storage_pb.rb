# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: isuxportal/services/common/storage.proto

require 'google/protobuf'

Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("isuxportal/services/common/storage.proto", :syntax => :proto3) do
    add_message "isuxportal.proto.services.common.GetAvatarUrlRequest" do
    end
    add_message "isuxportal.proto.services.common.GetAvatarUrlResponse" do
      optional :upload_presigned, :string, 1
      optional :url, :string, 2
    end
  end
end

module Isuxportal
  module Proto
    module Services
      module Common
        GetAvatarUrlRequest = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.common.GetAvatarUrlRequest").msgclass
        GetAvatarUrlResponse = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("isuxportal.proto.services.common.GetAvatarUrlResponse").msgclass
      end
    end
  end
end
