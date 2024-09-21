Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.config.x.github.client_id, Rails.application.config.x.github.client_secret
  provider :discord, Rails.application.config.x.discord.client_id, Rails.application.config.x.discord.client_secret, scope: 'identify'
  on_failure do |env|
    SessionsController.action(:failure).call(env)
  end
end
