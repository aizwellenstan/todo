class ApplicationController < ActionController::Base
    def user_payload(user)
        { user_id: user.id }
    end

    def token
        request.headers["token"]
    end

    def decoded_token
        JWT.decode token, secret, true, { algorithm: 'HS256' }
    end

    def current_user
        User.find(decoded_token[0]["user_id"])        
    end
end
