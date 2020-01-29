class TasksController < ApplicationController
    before_action :set_task, only: [:show, :update, :destroy]
    def index
        username = request.headers[:username]
        @task = Task.where( username: username).order(params[:sort])
        render json: @task
    end

    def show
        @task = Task.find(params[:id])
        render json: @task
    end
    
    def create
        task = Task.create(task_params)
        if task
            render json: { message: "Task Create Success" }, status: :ok
        else
            render json: { errors: task.errors.full_messages }
        end
    end

    def update
        if @task.update(task_params)
            render json: { message: "Task Update Success"} ,status: :ok
        else
            render json: @task.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @task = Task.find(params[:id])
        @task.destroy
        render json: "task_destoried", status: :ok
    end

    def profile
        if current_task
            render json: current_task
        end
    end

    private
    def set_task
        @task = Task.find(params[:id])
    end

    #fix

    def task_params
        params.permit(
            :id,
            :text,
            :body,
            :start_time,
            :end_time,
            :level,
            :status,
            :tags,
            :username
        )
    end
end
