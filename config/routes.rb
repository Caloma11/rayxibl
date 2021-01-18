Rails.application.routes.draw do
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
    patch "reject", as: :reject_application
    patch "accept", as: :reject_application
    patch "hide", as: :reject_application
    patch "show", as: :reject_application
  end
end
