Hello! We can use this as a log I suppose.

2/13 Sandra
    I added a sql file to the repository with the creation of a base user, fish_inventory, and alt_inventory
    The tables are not connected and there is currently no cart. I'm debating if we make carts their own things or an array of references in the user, tbd

    For the fish_inventory and alt_inventory suggestions its gonna be many-to-many connection, but need to decide best way

    Next task now that we have the data in database is to sync it to the actual program and website, but need to then add in ways to sign up users (log in page) and how thatll work in the code

    I didn't run the sql code in my own terminal bc want to do all group mod and suggestions first, I'm hoping theres a way to just have that all here

2/24 Jose
    Ryan and I added the HTML, CSS, and JavaScript files for the Login/Sign-Up and Home pages.


3/17 Daisy
    I was able to get minimal usuability with the database and our website working, I think we should have a good base now on how to route functions and pages. Since I set it up on my desktop I will have access to it but I can turn on the live when you want to see how the ejs pages look because I think node needs to be running for them to work. 

3/24 Ryan
    I was able to add css to the skeletal sign up page that was provided. I also fixed the problem with the images not loading on our pages. For future reference, instead of ../public/images/imageName for the src, do /images/imageName.

3/26 Daisy
    Added basic cart functionality we just need the admin functionality.