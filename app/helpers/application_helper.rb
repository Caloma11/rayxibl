module ApplicationHelper
  def sanitize_url(url)
    is_value_falsy = url == "" || url.nil?
    if is_value_falsy
      nil
    else
      URI(url).scheme ? url : "https://#{url}"
    end
  end
end
