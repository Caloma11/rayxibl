# Future TODO List
- Notifications system
- Archiving jobs system -> A manager can archive jobs, which just changes where they're displayed
 -- Bookings => Rejected, expired, cancelled bookings should all fall into the `archived` category, but nobody manually does so.
- Add to google calendar through booking widget on conversations#show 
- Use Cloudflare as asset hoster
- Sign up with google
- Style landing page for desktop
- Calculate booking price on bookings#new dynamically with js
- More toggler on managers#index should have option of destroy connection ( freelancers side )

- ~~Handle error on every form input~~
- ~~Add validations~~
- ~~Profile sharing functionality~~

- ~~Remove users#sign_up -> Should be done through email confirmation.~~
- ~~Rating system -> ( Manager rates a freelancer, he cannot rate twice, but can update (destroy and create again) his previous rating of the freelancer )~~
- ~~In `/profiles`, AJAXify the tab switch (My networe buttons)~~
- ~~In `/profiles/:id`, AJAXify the tab switch (About, Links & Notes)~~
- ~~When pressing "add to network" (user plus icon) in `/profiles`, AJAXify it so that it gets added instantly in the "My network" section~~

- ~~Ajaxify loading of profiles on `profiles#index`~~
- ~~Ajaxify adding to network on `profiles#show`~~
- ~~Jobs#new page styling~~
- ~~Accepting a booking => Both on freelancer`s dashboard and widget~~
  ~~More on point 2 (nice to have behaviours):~~

  - ~~It should not disappear right away in the "Everyone" section~~
  - ~~Newly added person should show up when switching to "My network"~~
  - ~~When switching back to "Everyone" tab, person should already disappear~~

- ~~As a freelancer, when you're already in the network of a company, you don't see their job postings under `/jobs` anymore~~

- ~~Purge CSS for production~~ -> Tried it, no difference cause we're not using a CSS framework
- ~~Add PWA~~
- ~~Add Meta tags~~
- ~~Add Accept/Reject booking in the widget (triple dot icon)~~
