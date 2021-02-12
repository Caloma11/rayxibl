module SendgridMailer
  class Onboarding < SendgridMailer::Base
    attr_reader :mail

    def initialize(user)
      super(user)
      # TODO: Change to `TEMPLATES[:welcome]` once finished
      self.mail.template_id = TEMPLATES[:test]
    end

    def call
      attach_personalization!
      sg = SendGrid::API.new(api_key: @api_key)
      sg.client.mail._("send").post(request_body: mail.to_json)
    end

    private

    def attach_personalization!
      # TODO: Add this once template is finished
      personalization.add_dynamic_template_data(name: user.display_name)
      mail.add_personalization(personalization)
    end
  end
end
