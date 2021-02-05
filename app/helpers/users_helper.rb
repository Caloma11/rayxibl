module UsersHelper
  def user_avatar_url(user)
    if user.avatar.attached?
      user.avatar.service_url
    else
      "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"
    end
  end
end
