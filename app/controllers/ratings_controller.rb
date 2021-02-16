class RatingsController < ApplicationController
  def create
    @profile = Profile.find(params[:profile_id])
    @rating = Rating.new(rating_params)
    @rating.manager = current_user.manager
    @rating.profile = @profile

    authorize @rating

    if @rating.save
      respond_to do |format|
        format.html { redirect_to profile_path(@profile) }
        format.js
      end
    else
      render "profiles/show"
    end
  end

  def update
    @rating = Rating.find(params[:id])

    authorize @rating

    if @rating.update(rating_params)
      respond_to do |format|
        format.html { redirect_to profile_path(@rating.profile) }
        format.js
      end
    else
      render "profiles/show"
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:value)
  end
end
