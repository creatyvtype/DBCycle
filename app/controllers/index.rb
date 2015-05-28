
get '/' do
  erb :index
end

get '/sessions/new/single' do
  erb :single_login
end

get '/sessions/new/multi' do
  erb :multi_login
end
