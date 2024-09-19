require 'aws-sdk-s3'

module Avatar

  @@client = Aws::S3::Client.new(region: Rails.application.config.x.region)
  @@signer = Aws::S3::Presigner.new(client: @@client)


  def self.download_url(key)
    "https://#{bucket_name}.s3.#{Rails.application.config.x.region}.amazonaws.com/#{base_path}#{key}"
  end

  def self.upload_url(key)
    @@signer.presigned_url(
      :put_object,
        bucket: bucket_name,
        key: "#{base_path}#{key}",
        expires_in: 600,
        secure: true,
      )
  end


  def self.bucket_name
    Rails.application.config.x.avatar_bucket_name
  end

  def self.base_path
    Rails.application.config.x.avatar_base_path
  end

end

