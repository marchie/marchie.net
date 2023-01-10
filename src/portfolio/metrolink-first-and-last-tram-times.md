---
title: Metrolink First and Last Tram Times
year: 2019
order: 5
synopsis: >
  Helping people get home from the pub without having to shell out for a taxi

technologies:
  - Go (Golang)
  - AWS Lambda
  - AWS API Gateway
  - AWS ElastiCache (Redis)
  - AWS CloudWatch
  - AWS S3
  - TransXChange

---
TfGM's first and last trams service enables users to find the earliest and latest journeys between
any combination of the 99 tram stops on the Metrolink network for the next seven days.

## Background

The original first and last tram times service was developed by an external contractor. Unfortunately, the application
was incredibly slow to run, taking up to four hours to generate data for one day's tram journeys - and if it needed
to generate multiple days' of data, it could only do this sequentially. 

There were a number of flaws with the data it generated. It did not make any time allowance in cases where people needed 
to change trams on their journey - and TfGM had complaints from people who had been left stranded because the tram 
they were travelling on pulled into one platform, just as the tram they needed to catch pulled out of the other platform.

Then, for certain journeys, it directed people to change at the Trafford Bar tram stop. This made sense on the basis of 
the available data - but in reality it involves exiting uphill from the station, crossing the tracks via a road bridge, 
then descending down to the other platform. This was troublesome for people with low mobility.

Finally, the application ran on an AWS EC2 instance, the size of which had been repeatedly increased to try and improve
performance - with only marginal gains. These instances were costly to run and - despite the slow performance of the
application - they sat redundant for most of the day.

## Redevelopment

I architected, built and maintained the application which tackled these issues.

The application is an AWS Lambda function written in Go. It is triggered on an overnight schedule, or on demand,
whenever a new TransXChange dataset is uploaded to an AWS S3 bucket. The application is very performant, 
taking around six seconds to generate one day's worth of data. As it is a Lambda function, it can be executed 
concurrently - so even if there's a need to generate more than one day's data, it still takes only six seconds. 

I included a configuration value whereby a minimum duration could be specified for tram interchanges, so that people
would not be left stranded on the stop. Another configuration value identified the stops that should not be used
as interchanges - which solved the Trafford Bar problem.

You can see the data in action at: [https://tfgm.com/public-transport/tram/tram-schedule#first-last-tram-times](https://tfgm.com/public-transport/tram/tram-schedule#first-last-tram-times)

## Conclusions

I'm proud of this application because I know it solves a problem for people. It's not a fully-fledged journey
planner, but it provides useful information in an easy-to-access way. I've regularly seen people in pubs and bars in
Manchester city centre using the service on their phones - it's nice to know that I've helped people get home.