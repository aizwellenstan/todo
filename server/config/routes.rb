Rails.application.routes.draw do

  # devise_for :users
  # resources :posts do
  # 	resources :comments
  # end

  post "/login", to: "auth#login"
  post "/signup", to: "users#create"
  # get "/profile", to: "users#profile"
  post "/user/search", to: "users#index"
  put "/user/:id(.:format)", to: "users#update"
  delete "/user/:id(.:format)", to: "users#destroy"

  get "/tasks", to: "tasks#index"
  post "/tasks", to: "tasks#create"
  get "/tasks/:id", to: "tasks#show"
  put "/tasks/:id", to: "tasks#update"
  delete "/tasks/:id", to: "tasks#destroy"

end
