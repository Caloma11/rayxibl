module ApplicationHelper
  SHARED_NAVBAR_LINKS = [
    {
      text: "Dashboard",
      icon: "icons/dashboard"
    }
  ]
  MANAGER_NAVBAR_LINKS = [
    {
      text: "Schedule",
      icon: "icons/schedule"
    },
    {
      text: "Freelancers",
      icon: "icons/people"
    }
  ].freeze
  FREELANCER_NAVBAR_LINKS = [
    {
      text: "Clients",
      icon: "icons/people"
    },
    {
      text: "Gigs",
      icon: "icons/gigs"
    }
  ].freeze

  def navbar_links(user)
    links = user.manager? ? MANAGER_NAVBAR_LINKS : FREELANCER_NAVBAR_LINKS

    [*SHARED_NAVBAR_LINKS, *links]
  end
end
