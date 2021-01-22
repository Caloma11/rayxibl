module NavbarLinks
  ROUTES = Rails.application.routes.url_helpers
  MANAGER_NAVBAR_LINKS = [
    {
      icon: "icons/dashboard.svg",
      url: ROUTES.dashboard_path
    },
    {
      icon: "icons/schedule.svg",
      url: "#"
    },
    {
      icon: "icons/people.svg",
      url: ROUTES.profiles_path
    },
    {
      icon: "icons/inbox.svg",
      url: ROUTES.conversations_path
    }
  ].freeze

  FREELANCER_NAVBAR_LINKS = [
    {
      text: "Dashboard",
      icon: "icons/dashboard.svg",
      url: ROUTES.dashboard_path
    },
    {
      text: "Inbox",
      icon: "icons/inbox.svg",
      url: ROUTES.conversations_path
    },
    {
      text: "Clients",
      icon: "icons/people.svg",
      url: ROUTES.managers_path
    },
    {
      text: "Gigs",
      icon: "icons/gigs.svg",
      url: "#"
    }
  ].freeze
end
