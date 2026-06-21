class AddVerifiedToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_verified, :boolean
    add_column :users, :id_proof_url, :string
  end
end
