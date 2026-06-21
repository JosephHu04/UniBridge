Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :schools, only: [:create, :index, :show]
    resources :school_ratings, only: [:index, :create, :show, :destroy]
    resources :profs, except: [:new, :edit, :destroy]
    resources :prof_reviews, only: [:create, :update, :destroy, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update, :show, :destroy, :index]
    resources :likes, only: [:create, :destroy]
    resources :prof_saves, only: [:create, :destroy, :index]
    resources :school_rating_likes, only: [:create, :destroy]
    resources :regions, only: [:index, :show]
    resources :departments, only: [:index, :show]
    resources :majors, only: [:index, :show]
    resources :rankings, only: [:index, :show]
  end

end