class ExchangeRate
  attr_reader :preferred_currency

  include Users::Constants

  def initialize(user)
    @user = user
    @preferred_currency = user.preferred_currency.to_sym
    @credentials = Rails.application.credentials.exchange_rate[:api_key]
  end

  def call
    response = RestClient.get("https://v6.exchangerate-api.com/v6/#{@credentials}/latest/USD")
    data = JSON.parse(response).deep_transform_keys(&:to_sym)
    data[:conversion_rates][preferred_currency]
  end
end
