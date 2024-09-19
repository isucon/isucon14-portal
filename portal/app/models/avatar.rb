require 'aws-sdk-s3'

module Avatar

  @@client = Aws::S3::Client.new(region: region)
  @@signer = Aws::S3::Presigner.new(client: client)


  def self.download_url(key)
    "https://#{bucket_name}.s3.#{region}.amazonaws.com/#{base_path}/#{key}"
  end

  def self.upload_url(key)
    @@signer.presigned_url(
      :put_object,
        bucket: bucket_name,
        key: key,
        expires_in: 600,
        secure: true,
      )
  end


  private def self.region
    Rails.application.config.x.region
  end

  private def self.bucket_name
    Rails.application.config.x.avatar_bucket_name
  end

  private def self.base_path
    Rails.application.config.x.avatar_base_path
  end

end

