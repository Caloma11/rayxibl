module SendgridMailer
  class FreelancerInvite < SendgridMailer::Base
    attr_reader :sender

    def initialize(sender, user)
      super(user)
      @sender = sender
      self.mail.template_id = TEMPLATES[:freelancer_invite]
    end

    def call
      attach_personalization!
      sg = SendGrid::API.new(api_key: @api_key)
      resp = sg.client.mail._("send").post(request_body: mail.to_json)
    end

    private

    def attach_personalization!
      data = {
        full_name: sender.display_name,
        company_name: sender.company.name,
        url: ROUTES.accept_user_invitation_url({ **routes_host, invitation_token: user.raw_invitation_token || user.invitation_token})
      }
      personalization.add_dynamic_template_data(data)
      mail.add_personalization(personalization)
    end
  end
end
