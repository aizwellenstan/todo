class AuthController < ApplicationController
    def login
        user = User.find_by(username: params[:Username])
        if user
            is_authenticated = user.authenticate(params[:Password])

            if is_authenticated
                payload =  user_payload(user)

                render json: { message: "login success" }, :status => :ok
            else
                render json: { message: "Wrong password.", code: 401}, :status => :unauthorized
            end
        else
            render json: { message: "Wrong username.", code: 401} , :status => :unauthorized
        end
    end
end
