class NotesController < ApplicationController
  before_action :set_profile, only: :create

  def create
    @note = Note.new(note_params)
    @note.profile = @profile
    @note.manager = current_user.manager
    authorize @note
    if @note.save
      redirect_to profile_path(@profile, anchor: "writeYourNote")
    else
      render 'profiles/show'
    end
  end

  private

  def set_profile
    @profile = Profile.find(params[:profile_id])
  end

  def note_params
    params.require(:note).permit(:content)
  end

end
