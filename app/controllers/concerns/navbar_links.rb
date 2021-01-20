module NavbarLinks
  ROUTES = Rails.application.routes.url_helpers
  MANAGER_NAVBAR_LINKS = [
    {
      icon: "icons/dashboard",
      url: ROUTES.dashboard_path
    },
    {
      icon: "icons/schedule",
      url: "#"
    },
    {
      icon: "icons/people",
      url: ROUTES.profiles_path
    },
    {
      icon: "icons/inbox",
      url: ROUTES.conversations_path
    }
  ].freeze

  FREELANCER_NAVBAR_LINKS = [
    {
      text: "Dashboard",
      icon: "icons/dashboard",
      url: ROUTES.dashboard_path
    },
    {
      text: "Inbox",
      icon: "icons/inbox",
      url: ROUTES.conversations_path
    },
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
end
