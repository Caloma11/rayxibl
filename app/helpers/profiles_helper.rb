module ProfilesHelper

  def avatar_url(profile)
    if profile.user.avatar.attached?
      profile.user.avatar.service_url
    else
      "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"
    end
  end

  def skill_pills(skill_list)

  end
end
