module NavbarLinks
  ROUTES = Rails.application.routes.url_helpers
  MANAGER_NAVBAR_LINKS = [
    {
      icon: "icons/dashboard.svg",
      url: ROUTES.dashboard_path,
      active_icon: "icons/dashboard-black.svg",
      text: "Dashboard"
    },
    {
      icon: "icons/schedule.svg",
      url: ROUTES.schedule_path,
      active_icon: "icons/schedule-black.svg",
      text: "Schedule/calendar"
    },
    {
      icon: "icons/people-gray.svg",
      url: ROUTES.profiles_path,
      active_icon: "icons/people-dark.svg",
      text: "Freelancers"
    },
    {
      icon: "icons/inbox.svg",
      url: ROUTES.conversations_path,
      active_icon: "icons/inbox-black.svg",
      text: "Inbox"
    }
  ].freeze

  FREELANCER_NAVBAR_LINKS = [
    {
      text: "Dashboard",
      icon: "icons/dashboard.svg",
      url: ROUTES.dashboard_path,
      active_icon: "icons/dashboard-black.svg"
    },
    {
      text: "Clients",
      icon: "icons/people-gray.svg",
      url: ROUTES.managers_path,
      active_icon: "icons/people-dark.svg"
    },
    {
      text: "Gigs",
      icon: "icons/brief-gray.svg",
      url: ROUTES.jobs_path,
      active_icon: "icons/brief-black.svg"
    },
    {
      text: "Inbox",
      icon: "icons/inbox.svg",
      url: ROUTES.conversations_path,
      active_icon: "icons/inbox-black.svg"
    }
  ].freeze
end
