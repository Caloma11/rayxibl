class AddPreferredCurrencyToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :preferred_currency, :string, default: "USD"
  end
end
