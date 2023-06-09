# CarCar

Team:

* Rob Claus - Sales
* Rey Xeka - Service

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

I used the inventory api for any information I needed regarding vehicles for my sales, and created an automobileVO for vin and ID for the poller. Once that was established I was able to create my sales apis i.e customers, salespeople, and sales. Sales I had pulling data from inventory, customers, and salespeople. All of my models would store their own information but also gathering the other dependent information from the other microservices.

On a sidenote, I really dislike the index.js file. I do not know why we were told to put the request in there when it makes it a race to see which http request was loaded first. So we opted to put the request on the same file with our JSX.
