Rails.application.routes.draw do

  root to: "pages#home"

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount ActionCable.server => "/cable"

  devise_for :users, controllers: { confirmations: 'confirmations', invitations: 'users/invitations' }

  get "/dashboard", to: "pages#dashboard"
  get "/mail", to: "pages#mail"
  resources :bookings, only: %i[show]
  resources :jobs, only: %i[index show new create edit update] do
    resources :job_applications, only: %i[create]
  end

  resources :companies, only: %i[create]

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

  resources :connections, only: %i[destroy]

  resources :managers, only: %i[index show new create]
  resources :conversations, only: %i[index show] do
    resources :messages, only: %i[create]
  end

  resources :job_applications, only: %i[] do
    patch "reject", as: :reject
    patch "accept", as: :accept
    patch "hide", as: :hide
    patch "show", as: :show
  end

  post "download_attachment/:id", to: "profile_attachments#download", as: :download_attachment
  post "booking_download_attachment/:id", to: "booking_attachments#download", as: :booking_download_attachment
  get "schedule", to: "pages#schedule"

  namespace :api do
    namespace :v1 do
      resources :bookings, only: %i[create]
      resources :networks, only: %i[index]
    end
  end
end
