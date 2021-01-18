Rails.application.routes.draw do
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/dashboard", to: "pages#dashboard"
  resources :bookings, only: %i[show]
  resources :jobs, only: %i[index show new create] do
    resources :job_applications, only: %i[create]
  end

  resources :companies, only: %i[create]

  resources :profiles do
    resources :notes, only: %i[create]
    resources :ratings, only: %i[create]
    resources :profile_attachments, only: %i[create]
    resources :connections, only: %i[create]
    resources :bookings, only: %i[new create]
    resources :conversations, only: %i[create]
  end

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
end
