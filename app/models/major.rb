class Major < ApplicationRecord
  belongs_to :department

  validates :name, presence: true
  validates :name, uniqueness: { scope: :department_id, message: 'already exists in this department' }

  has_many :profs
end
