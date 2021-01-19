require "open-uri"

puts "[BEGIN] - Seeding started"

def remove_everything!
  Message.destroy_all
  Conversation.destroy_all
  JobApplication.destroy_all
  Job.destroy_all
  ProfileAttachment.destroy_all
  Note.destroy_all
  Rating.destroy_all
  Connection.destroy_all
  Booking.destroy_all
  Manager.destroy_all
  Company.destroy_all
  Profile.destroy_all
  User.destroy_all
end

puts "[BEGIN] - Removing everything"
remove_everything!
puts "[END] - Removing everything"

puts "[BEGIN] - Creating users"
user_manager = User.create!(
  email: "manager@test.com",
  password: "123123",
  first_name: "Man",
  last_name: "Ager",
  role: 0
)
user_manager.confirm
user_lancer = User.create!(
  email: "freelancer@test.com",
  password: "123123",
  first_name: "Free",
  last_name: "Lancer",
  role: 1
)
user_lancer.confirm
dummy_freelancers = []
dummy_managers = []
puts ">> Creating 10 dummy managers"
10.times do |i|
  user = User.create!(
    email: "random_manager_#{i}@test.com",
    password: "123123",
    first_name: "User_#{i}",
    last_name: "LastName_#{i}",
    role: 0
  )

  user.confirm

  dummy_managers << user
end

puts ">> Creating 10 dummy freelancers"
10.times do |i|
  user = User.create!(
    email: "random_lancer_#{i}@test.com",
    password: "123123",
    first_name: "User_#{i}",
    last_name: "LastName_#{i}",
    role: 1
  )

  user.confirm

  dummy_freelancers << user
end
puts "[END] - Creating users"

puts "[BEGIN] - Creating a company"
google_logo = URI.open("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png")
google = Company.create!(
  name: "Google"
)
google.logo.attach(io: google_logo, filename: "logo.png", content_type: "image/png")
puts "[END] - Creating a company"

puts "[BEGIN] - Creating managers"
manager = Manager.create!(
  user: user_manager,
  job_title: "CEO",
  company: google
)
dummy_managers.each do |dm|
  Manager.create!(
    user: dm,
    job_title: "Financial",
    company: google
  )
end
puts "[END] - Creating managers"

puts "[BEGIN] - Creating freelancer profiles"
profile = Profile.create!(
  user: user_lancer,
  profession: "Web developer",
  location: "Bali, Indonesia",
  overview: "An aspiring developer"
)
dummy_freelancers.each do |df|
  Profile.create!(
    user: df,
    profession: "Financial something",
    location: "Heaven",
    overview: "Yeah i getcha"
  )
end
puts "[END] - Creating freelancer profiles"

puts "[BEGIN] - Creating connections"
connection = Connection.create!(
  company: google,
  profile: profile
)
dummy_freelancers.each do |df|
  Connection.create!(
    company: google,
    profile: df.profile
  )
end
puts "[END] - Creating connections"

puts "[BEGIN] - Creating a note"
note = Note.create!(
  manager: manager,
  profile: profile,
  content: "A legend"
)
puts "[END] - Creating a note"

puts "[BEGIN] - Creating a rating for `#{profile.user.first_name} #{profile.user.last_name}`"
Rating.create!(
  profile: profile,
  manager: manager,
  value: 5
)
puts "[END] - Creating a rating for `#{profile.user.first_name} #{profile.user.last_name}`"

puts "[BEGIN] - Creating a URL profile attachment"
ProfileAttachment.create!(
  profile: profile,
  title: "LinkedIn",
  url: "https://www.linkedin.com/company/grabapp/"
)
puts "[END] - Creating a URL profile attachment"

puts "[BEGIN] - Creating a job"
job = Job.create!(
  manager: manager,
  location: "Bali, Indonesia",
  profession: "Web Developer",
  expertise: "UX Designer",
  description: "Bacon ipsum dolor amet veniam officia fatback id incididunt. In dolor nulla enim short loin excepteur consectetur nisi in laborum.",
  rate: "$250 - $350 / day",
  expiration_date: DateTime.now + 7.days
)
puts "[END] - Creating a job"

puts "[BEGIN] - Creating a job application"
JobApplication.create!(
  job: job,
  profile: profile
)
puts "[END] - Creating a job application"

puts "[BEGIN] - Creating a conversation"
convo = Conversation.create!(
  profile: profile,
  manager: manager
)
puts "[END] - Creating a conversation"

puts "[BEGIN] - Creating a booking"
booking = Booking.create!(
  manager: manager,
  profile: profile,
  title: "Web Developer needed",
  description: "A web developer who loves bacon is needed",
  start_time: Time.now,
  end_time: Time.now + 6.hours,
  start_date: Date.today + 7.days,
  end_date: Date.today + 12.days,
  billable: true,
  price: 200,
  price_type: 0
)
puts "[END] - Creating a booking"

puts "[BEGIN] - Creating messages"
puts ">> Freelancer sending a message"
Message.create!(
  user: user_lancer,
  conversation: convo,
  content: "Bacon is nice"
)
puts ">> Manager sending a message"
Message.create!(
  user: user_manager,
  conversation: convo,
  content: "I agree, bacon is nice!"
)
puts ">> Creating an embed message"
Message.create!(
  booking: booking,
  user: user_manager,
  conversation: convo
)
puts "[END] - Creating messages"

puts "[END] - Seeding done"
