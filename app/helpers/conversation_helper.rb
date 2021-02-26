module ConversationHelper
  def truncate_snippet(content)
    return unless content

    if content.length > 60
      content.truncate(60)
    else
      content
    end
  end
end
