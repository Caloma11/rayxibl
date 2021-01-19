class Connection < ApplicationRecord
  belongs_to :company
  belongs_to :profile

  validates :company, uniqueness: { scope: :profile }
end
