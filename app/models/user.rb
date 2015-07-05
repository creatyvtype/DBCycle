class User < ActiveRecord::Base
  include BCrypt

  validates :email, format: { with: /[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+/, message: "no spaces, must be all lower case" }
  validates :email, uniqueness: true
  validates :email, presence: true
  validates :handle, uniqueness: true
  validates :handle, presence: true
  before_validation :downcase_email
  after_validation :get_gravatar

  # validates :password, format: { with: /\w{6,}/, message: "password must be 6 or more characters, letters or numbers."}

  def downcase_email
    self.email.downcase!
  end

  def get_gravatar
    email_hash = Digest::MD5.hexdigest(self.email)
    self.img = "http://www.gravatar.com/avatar/#{email_hash}"
  end

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

end
