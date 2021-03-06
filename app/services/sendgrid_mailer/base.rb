module SendgridMailer
  SENDER_EMAIL = "info@flxibl.io"
  SENDER_NAME = "Flxibl Team"
  TEMPLATES = {
    welcome: "d-6c9645400baa4e41811c746a4ff9c190",
    company_invite: "d-9f4a6789c6bd48f791393d0b5c227a04",
    freelancer_invite: "d-fb2ea0b85e0b42f5b900ad0d32956ebd"
  }
  ROUTES = Rails.application.routes.url_helpers

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

    def routes_host
      if Rails.env.development?
        { host: "http://localhost:3000" }
      else
        { host: ENV["STAGING"] ? "https://flxibl-staging.herokuapp.com" : "https://www.flxibl.io" }
      end
    end
  end
end
