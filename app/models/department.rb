class Department < ApplicationRecord
  belongs_to :school
  has_many :majors

  validates :name, presence: true
  validates :name, uniqueness: { scope: :school_id, message: 'already exists in this school' }

  has_many :profs
end
