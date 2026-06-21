# Rails 5.2 + older Ruby may fail with OpenSSL AEAD cookie encryption on newer systems.
# Use legacy cookie encryption to keep development server usable.
Rails.application.config.action_dispatch.use_authenticated_cookie_encryption = false
