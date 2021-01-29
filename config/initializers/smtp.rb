ActionMailer::Base.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  domain: 'gmail.com',
  user_name: Rails.application.credentials.gmail[:address],
  password: Rails.application.credentials.gmail[:app_password],
  authentication: :login,
  enable_starttls_auto: true
}
