class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    def index
        @user = User.where(companyId: params[:CompanyId], productId: params[:ProductId], projectId: params[:ProjectId])
        render json: @user
    end
    
    def create
        checkuser = User.find_by(username: params[:username])
        if checkuser
            render json: { "message":"user exits" }, status: :conflict
        else
            user = User.create(user_params)
            if user
                render json: { message: "User Create Success" }, status: :ok
            else
                render json: { errors: user.errors.full_messages }
            end
        end
    end

    def update
        if @user.update(user_params)
            render json: { message: "User Update Success"} ,status: :ok
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        render json: "user_destoried", status: :ok
    end

    def profile
        if current_user
            render json: current_user
        end
    end

    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(
            :username, :password, :companyId, :productId, :projectId,
            :description, :group, :language, :address, :phone, :email, :belongs
        )
    end
end
