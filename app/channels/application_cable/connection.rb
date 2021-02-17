module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_id = session['warden.user.user.key'].try(:[], 0).try(:[], 0)
      if verified_user = User.find(verified_id)
        verified_user
      else
        reject_unauthorized_connection
      end
    end

    def session
      cookies.encrypted[Rails.application.config.session_options[:key]]
    end
  end
end
#
