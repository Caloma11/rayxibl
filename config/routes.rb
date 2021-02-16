Rails.application.routes.draw do

  root to: "pages#home"

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount ActionCable.server => "/cable"

  devise_for :users, controllers: { registrations: 'registrations', confirmations: 'confirmations', invitations: 'users/invitations' }

  get "/dashboard", to: "pages#dashboard"

  resources :bookings, only: %i[index show edit update]
  patch "/bookings/:id/update_status", to: "bookings#accept_or_reject", as: :booking_update_status

  get "/mail", to: "pages#mail", as: :mail

  resources :jobs, only: %i[index show new create edit update] do
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
        post :ajax, to: "connections#ajax_create" ,as: :ajax
      end
    end
    resources :bookings, only: %i[new create]
    resources :conversations, only: %i[create]
  end

  resources :profile_attachments, only: %i[destroy update]

  resources :connections, only: %i[destroy]

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
end
