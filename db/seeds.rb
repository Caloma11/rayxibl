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
user_lancer = User.create!(
  email: "freelancer@test.com",
  password: "123123",
  first_name: "Free",
  last_name: "Lancer",
  role: 1
)
puts "[END] - Creating users"

puts "[BEGIN] - Creating a company"
google = Company.create!(name: "Google")
puts "[END] - Creating a company"

puts "[BEGIN] - Creating a manager"
manager = Manager.create!(
  user: user_manager,
  job_title: "CEO",
  company: google
)
puts "[END] - Creating a manager"

puts "[BEGIN] - Creating a freelancer profile"
profile = Profile.create!(
  user: user_lancer,
  profession: "Web developer",
  location: "Bali, Indonesia",
  overview: "An aspiring developer"
)
puts "[END] - Creating a freelancer profile"

puts "[BEGIN] - Creating a connection"
connection = Connection.create!(
  company: google,
  profile: profile
)
puts "[END] - Creating a connection"

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
