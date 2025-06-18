"use strict"; 

function BlogR() {
    return (
              <div id = "blog">
                <div id="content">
                  <h1>Blog</h1>
                  <h3>Server Page</h3>
                  <p>
                    If you would like to see my Server Side Page open up in a new tab, click
                    <a href="hello" target="_blank" style={{ color: 'green' }}>here</a>.
                  </p>
          
                  <h3>Proposed Database Table</h3>
                  <p>
                    I propose a database table called CafeReviews for this site. This table
                    will allow users to share info about cafes they visit, including the
                    names, photos of their orders, and reviews about Wi-Fi, ambiance, and
                    how suitable they are for remote work or studying. Users can also
                    include other details like prices. Hours they are open, and other
                    information will be available in a free space.
                  </p>
          
                  <h3>Fields</h3>
                  <ul>
                    <li>reviewId <strong>(INTEGER)</strong>: auto increment primary key</li>
                    <li>cafeName <strong>(CHARACTER)</strong>: unique name - required</li>
                    <li>
                      imageURL <strong>(CHARACTER)</strong>: URL that points to image of the
                      cafe - required
                    </li>
                    <li>
                      orderImage <strong>(IMAGE)</strong>: need to figure out if this is
                      possible for people to input an image of their own orders
                    </li>
                    <li>
                      wifiQuality <strong>(INTEGER)</strong>: rating the wifi 1-5, NULLABLE
                    </li>
                    <li>
                      ambianceForWork <strong>(INTEGER)</strong>: rating the ambiance 1-5,
                      NULLABLE
                    </li>
                    <li>order <strong>(TEXT)</strong>: description of what they order</li>
                    <li>priceOfOrder <strong>(DECIMAL)</strong>: Price of what they got</li>
                    <li>userComment <strong>(TEXT)</strong>: anything else they need</li>
                    <li>
                      userId <strong>(INTEGER)</strong>: key linking to web_user table
                    </li>
                  </ul>
          
                  <h3>My Database Experience</h3>
                  <p>I have no database experience. I need some though.</p>
          
                  <h3>My Web Development Experience</h3>
                  <p>
                    I have experience using React, NextJs, HTML, and CSS. I have built my own
                    portfolio, but I didn't like it that much. I really like web dev, but it
                    is very particular. I would say I am a 4/10 web developer because I
                    don't know much about hosting and need more help with design, HTML, and
                    CSS.
                  </p>
          
                  <h3>HW1 Blog</h3>
                  <p>
                    I found the nav bar very confusing. Figuring out exactly how to space
                    the links was confusing. I still think I need to fix them. Everything
                    else is pretty simple. I think the hardest part will be databases.
                  </p>
          
                  <h3>My Database Experience</h3>
                  <p>
                    I actually do not have any database experience. This is my first time
                    working with MySQL Workbench.
                  </p>

                  <h3>HW2 Blog</h3>
                  <p>
                    I found making the database pretty easy. The tutorials made it a lot
                    easier to handle! The select statements were a little bit hard, but they
                    were easily manageable. Overall, I think it is not super difficult to
                    understand. I would like to dive deeper into databases. Here is my 
                    <a href="docs/Mettille_database.pdf"> database document</a>.
                  </p>

                  <h3>HW3 Blog </h3>
                  <p>
                    For some reason, I really struggled with this project. Part of it was becasue my entire
                    IDE was deleted from my computer with everything saved. I also could not access somethings at some points. 
                    After I figured that out though, it was smooth sailing! Styling is pretty simple, and same with the routing! 
                  </p>

                  <h3>HW4 Blog</h3>
                  <p>
                  I found this project to be a lot easier than the last one. It helps that the lab was very similar. I think the hardest part was the select element. 
                  I think the most valuable part that differentiates this from the lab, is applying it to our idea. It really makes you understan what you are doing!
                  </p>

                  <h3>ListUsers API Navigation</h3>
                  <p>To see my <strong>List Users API</strong> open up in a new tab, click <a href = "webUser/getAll" target="_blank">here</a></p>

                  <h3>ListOther API Navigation</h3>
                  <p>To see my <strong>List CafeReviews API</strong> open up in a new tab, click <a href = "cafeReview/getAll" target="_blank">here</a></p>
                  
                  <h3>HW5 Blog</h3>
                  <p>There was not much server side access code I needed to write. 
                    
                    I found almost all of this hard because I have no prior experiene whatsoever. The hardest part was understanding what access I had and how SQL worked in terms of this project.
                    I also did not realize how particular was. I missed a space and it couldn't find anything!</p>
                    <p> Here is a link to my webapi database errors document. click <a href="docs/Mettille_WebAPI.pdf">here</a></p>

                    <h3>HW6 Blog</h3>
                    <p>Creating the tables was pretty straightforward, thanks to professor's sample code she shared. I had a harder time figuring out how to make the list both filterable and sortable, 
                      but I think I executed it with ease! I learned about filtering and showing data. I think in the future I want to make the table a bit prettier! </p>

                    <h3>HW 7 Blog</h3>
                    <p>I found this project very hard. I think it is just something I am not used to and I did not feel completely prepared from the Lab Activity, which is entirely okay but just added a bit of work! 
                      I think I followed it pretty accurately, but I feel like there might be things i missed.
                    </p>

                    <h3>HW 8 Blog</h3>
                    <p>I found this to be easy, it just took a lot of time. I think what made it easy is the lab activity and having to do most of this in it. The only thing different was the UI which was easy given the sample code. </p>
                </div>

              </div>
    );
}