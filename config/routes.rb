Rails.application.routes.draw do

  root to: "pages#home"

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount ActionCable.server => "/cable"

  devise_for :users, controllers: { registrations: 'registrations', confirmations: 'confirmations', invitations: 'users/invitations', omniauth_callbacks: "callbacks" }

  get "/dashboard", to: "pages#dashboard"

  resources :bookings, only: %i[index show edit update]
  patch "/bookings/:id/update_status", to: "bookings#accept_or_reject", as: :booking_update_status

  get "/mail", to: "pages#mail", as: :mail
  get "/edit_password", to: "users#edit_password", as: :edit_password
  patch "/update_password", to: "users#update_password", as: :update_password
  patch "/users/update", to: "users#update", as: :user_update
  delete "/users/destroy", to: "users#destroy", as: :user_delete
  get "/settings", to: "pages#settings", as: :settings

  resources :jobs, only: %i[index show new create edit update] do
    patch "/archive", to: "jobs#archive"
    resources :job_applications, only: %i[create]
  end

  resources :companies, only: %i[create]

  resources :ratings, only: %i[update]

  resources :profiles do
    resources :notes, only: %i[create]
    resources :ratings, only: %i[create]
    resources :profile_attachments, only: %i[create]
    resources :connections, only: %i[create] do
      collection do
        post :ajax, to: "connections#ajax_create", as: :ajax
      end
    end
    resources :bookings, only: %i[new create]
    resources :conversations, only: %i[create]
  end

  resources :profile_attachments, only: %i[destroy update]

  resources :connections, only: %i[destroy]

  delete "connections/:id/as_fl", to: "connections#destroy_as_fl", as: :connection_as_fl

  resources :managers, except: %i[destroy]
  resources :conversations, only: %i[index show] do
    resources :messages, only: %i[create]
  end

  resources :job_applications, only: %i[] do
    patch "reject", as: :reject
    patch "accept", as: :accept
    patch "hide", as: :hide
    patch "show", as: :show
  end

  post "custom_invitations", to: "custom_invitations#create", as: :home_invitation
  get "invite", to: "custom_invitations#new", as: :new_invitation
  post "csv_invitations", to: "custom_invitations#csv_create", as: :bulk_invitation

  post "download_attachment/:id", to: "profile_attachments#download", as: :download_attachment
  post "booking_download_attachment/:id", to: "booking_attachments#download", as: :booking_download_attachment
  get "schedule", to: "pages#schedule"
  patch "/bookings/:id/cancel", to: "bookings#cancel", as: :booking_cancel

  namespace :api do
    namespace :v1 do
      resources :bookings, only: %i[create]
      resources :networks, only: %i[index]
    end
  end

  # Sidekiq Web UI, only for admins.
  require "sidekiq/web"
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get '/bookings/:id/redirect', to: 'bookings#redirect', as: 'booking_redirect'
  get '/users/google_oauth2/callback', to: 'bookings#callback', as: 'callback'
  get '/new_calendar_event', to: "bookings#new_calendar_event", as: 'new_calendar_event'
end
