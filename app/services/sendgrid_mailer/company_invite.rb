module SendgridMailer
  class CompanyInvite < SendgridMailer::Base
    attr_reader :mail, :sender

    def initialize(sender, user)
      super(user)
      @sender = sender
      self.mail.template_id = TEMPLATES[:company_invite]
    end

    def call
      attach_personalization!
      sg = SendGrid::API.new(api_key: @api_key)
      resp = sg.client.mail._("send").post(request_body: mail.to_json)
    end

    private

    def attach_personalization!
      data = {
        first_name: sender.first_name,
        full_name: sender.display_name,
        company_name: sender.company.name,
        receiver_email: user.email,
        url: ROUTES.accept_user_invitation_url({ **routes_host, invitation_token: user.raw_invitation_token })
      }
      personalization.add_dynamic_template_data(data)
      mail.add_personalization(personalization)
    end
  end
end
