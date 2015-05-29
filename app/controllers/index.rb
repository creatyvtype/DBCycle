
get '/' do
  erb :index
end

get '/sessions/new/single' do
  erb :single_login
end

get '/sessions/new/multi' do
  erb :multi_login
end

post '/sessions/new' do
  if params[:email]
    @user = User.find_by(email: params[:email])
    if @user && @user.password == (params[:password])
      log_in(@user)
      @user.to_json
    else
      status 400
      "email or password incorrect".to_json
    end
  end
end

post '/users/new' do
  @user = User.new(params)
  if @user.save
    log_in(@user)
    @user.to_json
  else
    status 400
    @user.errors.full_messages.to_json
  end
end

get '/game' do
  @current_user
  erb :game
end
