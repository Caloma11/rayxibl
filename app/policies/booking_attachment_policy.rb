class BookingAttachmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def download?
    booking = record.record
    [booking.manager.user, booking.profile.user].include?(user)
  end
end
