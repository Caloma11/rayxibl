module ApplicationHelper
  def sanitize_url(url)
    is_value_falsy = url == "" || url.nil?
    if is_value_falsy
      nil
    else
      URI(url).scheme ? url : "https://#{url}"
    end
  end

  def should_navbar?
    user_signed_in? &&
    !(params[:controller] == "conversations" && params[:action] == "show") &&
    !(params[:action] == "new" || params[:action] == "edit") &&
    !(current_page?("/"))
  end

  def currency_mapper(currency)
    case currency
    when "USD"
      return "$"
    when "GBP"
      return "£"
    when "EUR"
      return "€"
    else
      return "$"
    end
  end
end
