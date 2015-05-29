class User < ActiveRecord::Base
  include BCrypt

  validates :email, format: { with: /\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}/, message: "has invalid format" }
  validates :email, uniqueness: true
  validates :email, presence: true
  validates :handle, uniqueness: true
  validates :handle, presence: true
  # validates :password, format: { with: /\w{6,}/, message: "password must be 6 or more characters, letters or numbers."}

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

end
