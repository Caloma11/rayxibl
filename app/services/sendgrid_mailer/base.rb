module SendgridMailer
  SENDER_EMAIL = "info@flxibl.io"
  SENDER_NAME = "Flxibl Team"
  TEMPLATES = {
    test: "d-c89400bc1ed84349a47e6ac4be5cabcc",
    welcome: "d-b7bed097752043f696444cf1f7d1500b",
    verify: "d-5dfc6e72fc194f92a9875e4713c418d8",
    invitation: "d-f6b6880d9756496e9bd215971224c473"
  }

  class Base
    include SendGrid

    attr_reader :user, :mail, :personalization

    def initialize(user)
      @user = user
      @api_key = Rails.application.credentials.sendgrid[:api_key]
      @from = Email.new(email: SENDER_EMAIL, name: SENDER_NAME)
      @to = Email.new(email: user.email, name: user.display_name)
      @mail = Mail.new
      @mail.from = @from
      @personalization = Personalization.new
      @personalization.add_to(@to)
    end
  end
end
