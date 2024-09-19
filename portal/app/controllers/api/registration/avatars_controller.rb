require 'isuxportal/services/common/storage_pb'
class Api::Registration::AvatarsController < Api::Registration::ApplicationController

  def show
    key = SecureRandom.urlsafe_base64(64)
    upload_url = Avatar.upload_url(key)
    download_url = Avatar.download_url(key)

    render protobuf: Isuxportal::Proto::Services::Common::GetAvatarUrlResponse.new(
      upload_presigned: upload_url,
      url: download_url
    )
  end
end