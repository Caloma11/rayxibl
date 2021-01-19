module ApplicationHelper
  ROUTES = Rails.application.routes.url_helpers
  SHARED_NAVBAR_LINKS = [
    {
      text: "Dashboard",
      icon: "icons/dashboard",
      url: ROUTES.dashboard_path
    }
  ]
  MANAGER_NAVBAR_LINKS = [
    {
      text: "Schedule",
      icon: "icons/schedule",
      url: "#"
    },
    {
      text: "Freelancers",
      icon: "icons/people",
      url: ROUTES.profiles_path
    }
  ].freeze
  FREELANCER_NAVBAR_LINKS = [
    {
      text: "Clients",
      icon: "icons/people",
      url: ROUTES.managers_path
    },
    {
      text: "Gigs",
      icon: "icons/gigs",
      url: "#"
    }
  ].freeze

  def navbar_links(user)
    links = user.manager? ? MANAGER_NAVBAR_LINKS : FREELANCER_NAVBAR_LINKS

    [*SHARED_NAVBAR_LINKS, *links]
  end
end
