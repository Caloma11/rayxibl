class JobApplication < ApplicationRecord
  include JobApplications::Constants

  belongs_to :job
  belongs_to :profile

  validates :job, uniqueness: { scope: :profile }
  enum status: STATUSES

  after_create :create_conversation

  private

  def create_conversation
    Conversation.first_or_create(
      profile: profile,
      manager: job.manager
    )
  end
end
