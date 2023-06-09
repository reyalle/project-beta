# CarCar

Team:

* Rob Claus - Sales
* Rey Xeka - Service

## Design

## Service microservice

I set up the poller for the inventory API to pull all necessary data and set it to an AutomobileVO model to be accessed by my microservice views. After that it was a matter of setting up the service API's for Technicians and Service which would create all the necessary database entries for my React forms. In order to develop the VIP service feature

I coded a conditional statemment in my service view that would check to see if the VIN of a vehicle entered on the service form is present inside of the Inventory database and if true, to set the sold status of the vehicle revceiveing the service appointment to true. My Service List page would then display to the user the VIP status of each vehicle based on the wether the sold variable was true or false.

## Sales microservice

I used the inventory api for any information I needed regarding vehicles for my sales, and created an automobileVO for vin and ID for the poller. Once that was established I was able to create my sales apis i.e customers, salespeople, and sales. Sales I had pulling data from inventory, customers, and salespeople. All of my models would store their own information but also gathering the other dependent information from the other microservices.

On a sidenote, I really dislike the index.js file. I do not know why we were told to put the request in there when it makes it a race to see which http request was loaded first. So we opted to put the request on the same file with our JSX.
