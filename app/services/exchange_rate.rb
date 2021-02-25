class ExchangeRate
  attr_reader :preferred_currency

  def initialize(user)
    @user = user
    @preferred_currency = user.preferred_currency.to_sym
  end

  def call
    response = RestClient.get("https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR")
    data = JSON.parse(response).deep_transform_keys(&:to_sym)

    data[:rates][preferred_currency]
  end
end
