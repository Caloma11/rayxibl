module SendgridMailer
  class Onboarding < SendgridMailer::Base
    attr_reader :mail

    def initialize(user)
      super(user)
      self.mail.template_id = TEMPLATES[:welcome]
    end

    def call
      attach_personalization!
      sg = SendGrid::API.new(api_key: @api_key)
      resp = sg.client.mail._("send").post(request_body: mail.to_json)
      p resp
    end

    private

    def attach_personalization!
      data = {
        first_name: user.email,
        url: ROUTES.accept_user_invitation_url({ **routes_host, invitation_token: user.raw_invitation_token })
      }
      personalization.add_dynamic_template_data(data)
      mail.add_personalization(personalization)
    end
  end
end
